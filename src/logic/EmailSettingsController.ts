let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { ConfigException } from 'pip-services3-commons-node';
import { NotFoundException } from 'pip-services3-commons-node';
import { IOpenable } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';
import { CompositeLogger } from 'pip-services3-components-node';

import { PartyActivityV1 } from 'pip-clients-activities-node';
import { IActivitiesClientV1 } from 'pip-clients-activities-node';
import { MessageTemplatesResolverV1 } from 'pip-clients-msgtemplates-node';
import { EmailMessageV1 } from 'pip-clients-email-node';
import { EmailRecipientV1 } from 'pip-clients-email-node';
import { IEmailClientV1 } from 'pip-clients-email-node';

import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { EmailSettingsActivityTypeV1 } from '../data/version1/EmailSettingsActivityTypeV1';
import { IEmailSettingsPersistence } from '../persistence/IEmailSettingsPersistence';
import { IEmailSettingsController } from './IEmailSettingsController';
import { EmailSettingsCommandSet } from './EmailSettingsCommandSet';

export class EmailSettingsController implements IConfigurable, IReferenceable, ICommandable, IEmailSettingsController {
    private static _emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-emailsettings:persistence:*:*:1.0',
        'dependencies.activities', 'pip-services-activities:client:*:*:1.0',
        'dependencies.msgtemplates', 'pip-services-msgtemplates:client:*:*:1.0',
        'dependencies.emaildelivery', 'pip-services-email:client:*:*:1.0',
        
        'message_templates.verify_email.subject', 'Verify email',
        'message_templates.verify_email.text', 'Verification code for {{email}} is {{ code }}.',

        'options.magic_code', null,
        'options.signature_length', 100,
        'options.verify_on_create', true,
        'options.verify_on_update', true
    );

    private _verifyOnCreate: boolean = true;
    private _verifyOnUpdate: boolean = true;
    private _expireTimeout: number = 24 * 60; // in minutes
    private _magicCode: string = null;
    private _config: ConfigParams = new ConfigParams();

    private _dependencyResolver: DependencyResolver = new DependencyResolver(EmailSettingsController._defaultConfig);
    private _templatesResolver: MessageTemplatesResolverV1 = new MessageTemplatesResolverV1();
    private _logger: CompositeLogger = new CompositeLogger();
    private _activitiesClient: IActivitiesClientV1;
    private _emailClient: IEmailClientV1;
    private _persistence: IEmailSettingsPersistence;
    private _commandSet: EmailSettingsCommandSet;

    public configure(config: ConfigParams): void {
        config = config.setDefaults(EmailSettingsController._defaultConfig);

        this._dependencyResolver.configure(config);
        this._templatesResolver.configure(config);
        this._logger.configure(config);

        this._verifyOnCreate = config.getAsBooleanWithDefault('options.verify_on_create', this._verifyOnCreate);
        this._verifyOnUpdate = config.getAsBooleanWithDefault('options.verify_on_update', this._verifyOnUpdate);
        this._expireTimeout = config.getAsIntegerWithDefault('options.verify_expire_timeout', this._expireTimeout);
        this._magicCode = config.getAsStringWithDefault('options.magic_code', this._magicCode);
        
        this._config = config;
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._templatesResolver.setReferences(references);
        this._logger.setReferences(references);

        this._persistence = this._dependencyResolver.getOneRequired<IEmailSettingsPersistence>('persistence');
        this._activitiesClient = this._dependencyResolver.getOneOptional<IActivitiesClientV1>('activities');
        this._emailClient = this._dependencyResolver.getOneOptional<IEmailClientV1>('emaildelivery');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new EmailSettingsCommandSet(this);
        return this._commandSet;
    }
    
    private settingsToPublic(settings: EmailSettingsV1): EmailSettingsV1 {
        if (settings == null) return null;
        delete settings.ver_code;
        delete settings.ver_expire_time;
        return settings;
    }
    
    public getSettingsByIds(correlationId: string, recipientIds: string[],
        callback: (err: any, settings: EmailSettingsV1[]) => void): void {
        this._persistence.getListByIds(correlationId, recipientIds, (err, settings) => {

            if (settings)
                settings = _.map(settings, s => this.settingsToPublic(s));

            callback(err, settings);
        });
    }
    
    public getSettingsById(correlationId: string, recipientId: string,
        callback: (err: any, settings: EmailSettingsV1) => void): void {
        this._persistence.getOneById(correlationId, recipientId, (err, settings) => {
            settings = this.settingsToPublic(settings);
            callback(err, settings);
        });
    }

    public getSettingsByEmailSettings(correlationId: string, email: string,
        callback: (err: any, settings: EmailSettingsV1) => void): void {
        this._persistence.getOneByEmailSettings(correlationId, email, (err, settings) => {
            callback(err, this.settingsToPublic(settings));
        });
    }

    private verifyAndSaveSettings(correlationId: string,
        oldSettings: EmailSettingsV1, newSettings: EmailSettingsV1,
        callback: (err: any, settings: EmailSettingsV1) => void): void {

        let verify = false;

        async.series([
            // Check if verification is needed
            (callback) => {
                verify = (oldSettings == null && this._verifyOnCreate)
                    || (oldSettings.email != newSettings.email && this._verifyOnUpdate);
                if (verify) {
                    newSettings.verified = false;
                    newSettings.ver_code = IdGenerator.nextShort();
                    newSettings.ver_expire_time = new Date(new Date().getTime() + this._expireTimeout * 60000);
                }
                callback();
            },
            // Set new settings
            (callback) => {
                this._persistence.set(correlationId, newSettings, (err, data) => {
                    newSettings = data;
                    callback(err);
                })
            },
            // Send verification if needed
            (callback) => {
                // Send verification message and do not wait
                if (verify)
                    this.sendVerificationMessage(correlationId, newSettings);
                callback();
            }
        ], (err) => {
            callback(err, newSettings);
        });
    }

    private sendVerificationMessage(correlationId: string, newSettings: EmailSettingsV1): void {
        this._templatesResolver.resolve('verify_email', (err, template) => {
            if (err == null && template == null) {
                err = new ConfigException(
                    correlationId, 
                    'MISSING_VERIFY_EMAIL',
                    'Message template "verify_email" is missing'
                );
            }

            if (err) {
                this._logger.error(correlationId, err, 'Cannot find verify_email message template');
                return;
            }

            let message = <EmailMessageV1> {
                subject: template.subject,
                text: template.text,
                html: template.html
            };

            let recipient = <EmailRecipientV1> {
                id: newSettings.id,
                name: newSettings.name,
                email: newSettings.email,
                language: newSettings.language
            };

            let parameters = ConfigParams.fromTuples(
                'code', newSettings.ver_code,
                'email', newSettings.email
            );

            if (this._emailClient) {
                this._emailClient.sendMessageToRecipient(correlationId, recipient, message, parameters, (err) => {
                    if (err)
                        this._logger.error(correlationId, err, 'Failed to send email verification message');
                });
            }
        });
    }
    
    public setSettings(correlationId: string, settings: EmailSettingsV1,
        callback: (err: any, settings: EmailSettingsV1) => void): void {
        if (settings.id == null) {
            callback(new BadRequestException(correlationId, 'NO_RECIPIENT_ID', 'Missing recipient id'), null);
            return;
        }
        if (settings.email == null) {
            callback(new BadRequestException(correlationId, 'NO_EMAIL', 'Missing email'), null);
            return;
        }
        if (!EmailSettingsController._emailRegex.test(settings.email)) {
            callback(
                new BadRequestException(
                    correlationId, 
                    'WRONG_EMAIL', 
                    'Invalid email ' + settings.email
                ).withDetails('email', settings.email),
                null
            );
            return;
        }
    
        let newSettings: EmailSettingsV1 = _.clone(settings);
        newSettings.verified = false;
        newSettings.ver_code = null;
        newSettings.ver_expire_time = null;
        newSettings.subscriptions = newSettings.subscriptions || {};

        let oldSettings: EmailSettingsV1;

        async.series([
            // Get existing settings
            (callback) => {
                this._persistence.getOneById(
                    correlationId,
                    newSettings.id,
                    (err, data) => {
                        if (data != null) {
                            oldSettings = data;

                            // Override
                            newSettings.verified = data.verified;
                            newSettings.ver_code = data.ver_code;
                            newSettings.ver_expire_time = data.ver_expire_time;
                        }
                        callback(err);
                    }
                );
            },
            // Verify and save settings
            (callback) => {
                this.verifyAndSaveSettings(correlationId, oldSettings, newSettings, (err, data) => {
                    newSettings = data;
                    callback(err);
                })
            },
        ], (err) => {
            if (callback) callback(err, newSettings);
        });
    }


    public setVerifiedSettings(correlationId: string, settings: EmailSettingsV1,
        callback: (err: any, settings: EmailSettingsV1) => void): void {
        if (settings.id == null) {
            callback(new BadRequestException(correlationId, 'NO_RECIPIENT_ID', 'Missing recipient id'), null);
            return;
        }
        if (settings.email == null) {
            callback(new BadRequestException(correlationId, 'NO_EMAIL', 'Missing email'), null);
            return;
        }
        if (!EmailSettingsController._emailRegex.test(settings.email)) {
            callback(
                new BadRequestException(
                    correlationId, 
                    'WRONG_EMAIL', 
                    'Invalid email ' + settings.email
                ).withDetails('email', settings.email),
                null
            );
            return;
        }
    
        let newSettings: EmailSettingsV1 = _.clone(settings);
        newSettings.verified = true;
        newSettings.ver_code = null;
        newSettings.ver_expire_time = null;
        newSettings.subscriptions = newSettings.subscriptions || {};

        this._persistence.set(correlationId, newSettings, callback);
    }
    

    public setRecipient(correlationId: string, recipientId: string,
        name: string, email: string, language: string,
        callback?: (err: any, settings: EmailSettingsV1) => void): void {

        if (recipientId == null) {
            callback(new BadRequestException(correlationId, 'NO_RECIPIENT_ID', 'Missing recipient id'), null);
            return;
        }
        if (email != null && !EmailSettingsController._emailRegex.test(email)) {
            callback(
                new BadRequestException(
                    correlationId, 
                    'WRONG_EMAIL', 
                    'Invalid email ' + email
                ).withDetails('email', email),
                null
            );
            return;
        }
    
        let oldSettings: EmailSettingsV1;
        let newSettings: EmailSettingsV1;

        async.series([
            // Get existing settings
            (callback) => {
                this._persistence.getOneById(
                    correlationId,
                    recipientId,
                    (err, data) => {
                        if (err) {
                            callback(err);
                            return;
                        }

                        if (data != null) {
                            // Copy and modify existing settings
                            oldSettings = data;
                            newSettings = _.clone(data);
                            newSettings.name = name || data.name;
                            newSettings.email = email || data.email;
                            newSettings.language = language || data.language;
                        } else {
                            // Create new settings if they are not exist
                            oldSettings = null;
                            newSettings = <EmailSettingsV1> {
                                id: recipientId,
                                name: name,
                                email: email,
                                language: language
                            };
                        }

                        callback();
                    }
                );
            },
            // Verify and save settings
            (callback) => {
                this.verifyAndSaveSettings(correlationId, oldSettings, newSettings, (err, data) => {
                    newSettings = data;
                    callback(err);
                })
            },
        ], (err) => {
            if (callback) callback(err, newSettings);
        });
    }

    public setSubscriptions(correlationId: string, recipientId: string, subscriptions: any,
        callback?: (err: any, settings: EmailSettingsV1) => void): void {

        if (recipientId == null) {
            callback(new BadRequestException(correlationId, 'NO_ID', 'Missing id'), null);
            return;
        }
    
        let oldSettings: EmailSettingsV1;
        let newSettings: EmailSettingsV1;

        async.series([
            // Get existing settings
            (callback) => {
                this._persistence.getOneById(
                    correlationId,
                    recipientId,
                    (err, data) => {
                        if (err) {
                            callback(err);
                            return;
                        }

                        if (data != null) {
                            // Copy and modify existing settings
                            oldSettings = data;
                            newSettings = _.clone(data);
                            newSettings.subscriptions = subscriptions || data.subscriptions;
                        } else {
                            // Create new settings if they are not exist
                            oldSettings = null;
                            newSettings = <EmailSettingsV1> {
                                id: recipientId,
                                name: null,
                                email: null,
                                language: null,
                                subscriptions: subscriptions
                            };
                        }

                        callback();
                    }
                );
            },
            // Verify and save settings
            (callback) => {
                this.verifyAndSaveSettings(correlationId, oldSettings, newSettings, (err, data) => {
                    newSettings = data;
                    callback(err);
                })
            },
        ], (err) => {
            if (callback) callback(err, newSettings);
        });
    }

    public deleteSettingsById(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {
        this._persistence.deleteById(correlationId, recipientId, (err, settings) => {
            if (callback) callback(err);
        });
    }

    public resendVerification(correlationId: string, recipientId: string,
        callback?: (err: any) => void): void {

        if (recipientId == null) {
            callback(new BadRequestException(correlationId, 'NO_RECIPIENT_ID', 'Missing recipient id'));
            return;
        }
    
        let settings: EmailSettingsV1;

        async.series([
            // Get existing settings
            (callback) => {
                this._persistence.getOneById(correlationId, recipientId, (err, data) => {
                    if (err == null && data == null) {
                        err = new NotFoundException(
                            correlationId, 
                            'RECIPIENT_NOT_FOUND', 
                            'Recipient ' + recipientId + ' was not found'
                        )
                        .withDetails('recipient_id', recipientId);
                    }
                    settings = data;
                    callback(err); 
                });
            },
            // Check if verification is needed
            (callback) => {
                settings.verified = false;
                settings.ver_code = IdGenerator.nextShort();
                settings.ver_expire_time = new Date(new Date().getTime() + this._expireTimeout * 60000);

                callback();
            },
            // Set new settings
            (callback) => {
                this._persistence.set(correlationId, settings, (err, data) => {
                    settings = data;
                    callback(err);
                })
            },
            // Send verification
            (callback) => {
                // Send verification message and do not wait
                this.sendVerificationMessage(correlationId, settings);
                callback();
            }
        ], (err) => {
            if (callback) callback(err);
        });
    }

    private logActivity(correlationId: string, settings: EmailSettingsV1, activityType: string) {
        if (this._activitiesClient) {
            this._activitiesClient.logPartyActivity(
                correlationId,
                new PartyActivityV1(
                    null,
                    activityType,
                    {
                        id: settings.id,
                        type: 'account',
                        name: settings.name
                    }
                ),
                (err, activity) => {
                    if (err)
                       this._logger.error(correlationId, err, 'Failed to log user activity');
                }
            );
        }
    }
    
    public verifyEmail(correlationId: string, recipientId: string, code: string,
        callback?: (err: any) => void): void {
        let settings: EmailSettingsV1;

        async.series([
            // Read settings
            (callback) => {
                this._persistence.getOneById(
                    correlationId,
                    recipientId, 
                    (err, data) => {
                        settings = data;

                        if (settings == null && err == null) {
                            err = new NotFoundException(
                                correlationId,
                                'RECIPIENT_NOT_FOUND',
                                'Recipient ' + recipientId + ' was not found'
                            )
                            .withDetails('recipient_id', recipientId);
                        }

                        callback(err);
                    }
                );
            },
            // Check and update verification code
            (callback) => {
                let verified = settings.ver_code == code;
                verified = verified || (this._magicCode != null && code == this._magicCode);
                verified = verified && new Date().getTime() < settings.ver_expire_time.getTime();

                if (!verified) {
                    callback(
                        new BadRequestException(
                            correlationId,
                            'INVALID_CODE',
                            'Invalid email verification code ' + code
                        )
                        .withDetails('recipient_id', recipientId)
                        .withDetails('code', code)
                    );
                    return;
                }

                settings.verified = true;
                settings.ver_code = null;
                settings.ver_expire_time = null;

                callback();
            },
            // Save user
            (callback) => {
                this._persistence.set(
                    correlationId,
                    settings,
                    callback
                );
            },
            // Asynchronous post-processing
            (callback) => {
                this.logActivity(
                    correlationId,
                    settings,
                    EmailSettingsActivityTypeV1.EmailVerified
                );

                callback();
            }
        ], (err) => {
            if (callback) callback(err);
        });
    }

}
