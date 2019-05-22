"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_clients_activities_node_1 = require("pip-clients-activities-node");
const pip_clients_msgtemplates_node_1 = require("pip-clients-msgtemplates-node");
const EmailSettingsActivityTypeV1_1 = require("../data/version1/EmailSettingsActivityTypeV1");
const EmailSettingsCommandSet_1 = require("./EmailSettingsCommandSet");
class EmailSettingsController {
    constructor() {
        this._verifyOnCreate = true;
        this._verifyOnUpdate = true;
        this._expireTimeout = 24 * 60; // in minutes
        this._magicCode = null;
        this._config = new pip_services3_commons_node_1.ConfigParams();
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(EmailSettingsController._defaultConfig);
        this._templatesResolver = new pip_clients_msgtemplates_node_1.MessageTemplatesResolverV1();
        this._logger = new pip_services3_components_node_1.CompositeLogger();
    }
    configure(config) {
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
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._templatesResolver.setReferences(references);
        this._logger.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._activitiesClient = this._dependencyResolver.getOneOptional('activities');
        this._emailClient = this._dependencyResolver.getOneOptional('emaildelivery');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new EmailSettingsCommandSet_1.EmailSettingsCommandSet(this);
        return this._commandSet;
    }
    settingsToPublic(settings) {
        if (settings == null)
            return null;
        delete settings.ver_code;
        delete settings.ver_expire_time;
        return settings;
    }
    getSettingsByIds(correlationId, recipientIds, callback) {
        this._persistence.getListByIds(correlationId, recipientIds, (err, settings) => {
            if (settings)
                settings = _.map(settings, s => this.settingsToPublic(s));
            callback(err, settings);
        });
    }
    getSettingsById(correlationId, recipientId, callback) {
        this._persistence.getOneById(correlationId, recipientId, (err, settings) => {
            settings = this.settingsToPublic(settings);
            callback(err, settings);
        });
    }
    getSettingsByEmailSettings(correlationId, email, callback) {
        this._persistence.getOneByEmailSettings(correlationId, email, (err, settings) => {
            callback(err, this.settingsToPublic(settings));
        });
    }
    verifyAndSaveSettings(correlationId, oldSettings, newSettings, callback) {
        let verify = false;
        async.series([
            // Check if verification is needed
            (callback) => {
                verify = (oldSettings == null && this._verifyOnCreate)
                    || (oldSettings.email != newSettings.email && this._verifyOnUpdate);
                if (verify) {
                    newSettings.verified = false;
                    newSettings.ver_code = pip_services3_commons_node_6.IdGenerator.nextShort();
                    newSettings.ver_expire_time = new Date(new Date().getTime() + this._expireTimeout * 60000);
                }
                callback();
            },
            // Set new settings
            (callback) => {
                this._persistence.set(correlationId, newSettings, (err, data) => {
                    newSettings = data;
                    callback(err);
                });
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
    sendVerificationMessage(correlationId, newSettings) {
        this._templatesResolver.resolve('verify_email', (err, template) => {
            if (err == null && template == null) {
                err = new pip_services3_commons_node_4.ConfigException(correlationId, 'MISSING_VERIFY_EMAIL', 'Message template "verify_email" is missing');
            }
            if (err) {
                this._logger.error(correlationId, err, 'Cannot find verify_email message template');
                return;
            }
            let message = {
                subject: template.subject,
                text: template.text,
                html: template.html
            };
            let recipient = {
                id: newSettings.id,
                name: newSettings.name,
                email: newSettings.email,
                language: newSettings.language
            };
            let parameters = pip_services3_commons_node_1.ConfigParams.fromTuples('code', newSettings.ver_code, 'email', newSettings.email);
            if (this._emailClient) {
                this._emailClient.sendMessageToRecipient(correlationId, recipient, message, parameters, (err) => {
                    if (err)
                        this._logger.error(correlationId, err, 'Failed to send email verification message');
                });
            }
        });
    }
    setSettings(correlationId, settings, callback) {
        if (settings.id == null) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_RECIPIENT_ID', 'Missing recipient id'), null);
            return;
        }
        if (settings.email == null) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_EMAIL', 'Missing email'), null);
            return;
        }
        if (!EmailSettingsController._emailRegex.test(settings.email)) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'WRONG_EMAIL', 'Invalid email ' + settings.email).withDetails('email', settings.email), null);
            return;
        }
        let newSettings = _.clone(settings);
        newSettings.verified = false;
        newSettings.ver_code = null;
        newSettings.ver_expire_time = null;
        newSettings.subscriptions = newSettings.subscriptions || {};
        let oldSettings;
        async.series([
            // Get existing settings
            (callback) => {
                this._persistence.getOneById(correlationId, newSettings.id, (err, data) => {
                    if (data != null) {
                        oldSettings = data;
                        // Override
                        newSettings.verified = data.verified;
                        newSettings.ver_code = data.ver_code;
                        newSettings.ver_expire_time = data.ver_expire_time;
                    }
                    callback(err);
                });
            },
            // Verify and save settings
            (callback) => {
                this.verifyAndSaveSettings(correlationId, oldSettings, newSettings, (err, data) => {
                    newSettings = data;
                    callback(err);
                });
            },
        ], (err) => {
            if (callback)
                callback(err, newSettings);
        });
    }
    setVerifiedSettings(correlationId, settings, callback) {
        if (settings.id == null) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_RECIPIENT_ID', 'Missing recipient id'), null);
            return;
        }
        if (settings.email == null) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_EMAIL', 'Missing email'), null);
            return;
        }
        if (!EmailSettingsController._emailRegex.test(settings.email)) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'WRONG_EMAIL', 'Invalid email ' + settings.email).withDetails('email', settings.email), null);
            return;
        }
        let newSettings = _.clone(settings);
        newSettings.verified = true;
        newSettings.ver_code = null;
        newSettings.ver_expire_time = null;
        newSettings.subscriptions = newSettings.subscriptions || {};
        this._persistence.set(correlationId, newSettings, callback);
    }
    setRecipient(correlationId, recipientId, name, email, language, callback) {
        if (recipientId == null) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_RECIPIENT_ID', 'Missing recipient id'), null);
            return;
        }
        if (email != null && !EmailSettingsController._emailRegex.test(email)) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'WRONG_EMAIL', 'Invalid email ' + email).withDetails('email', email), null);
            return;
        }
        let oldSettings;
        let newSettings;
        async.series([
            // Get existing settings
            (callback) => {
                this._persistence.getOneById(correlationId, recipientId, (err, data) => {
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
                    }
                    else {
                        // Create new settings if they are not exist
                        oldSettings = null;
                        newSettings = {
                            id: recipientId,
                            name: name,
                            email: email,
                            language: language
                        };
                    }
                    callback();
                });
            },
            // Verify and save settings
            (callback) => {
                this.verifyAndSaveSettings(correlationId, oldSettings, newSettings, (err, data) => {
                    newSettings = data;
                    callback(err);
                });
            },
        ], (err) => {
            if (callback)
                callback(err, newSettings);
        });
    }
    setSubscriptions(correlationId, recipientId, subscriptions, callback) {
        if (recipientId == null) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_ID', 'Missing id'), null);
            return;
        }
        let oldSettings;
        let newSettings;
        async.series([
            // Get existing settings
            (callback) => {
                this._persistence.getOneById(correlationId, recipientId, (err, data) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    if (data != null) {
                        // Copy and modify existing settings
                        oldSettings = data;
                        newSettings = _.clone(data);
                        newSettings.subscriptions = subscriptions || data.subscriptions;
                    }
                    else {
                        // Create new settings if they are not exist
                        oldSettings = null;
                        newSettings = {
                            id: recipientId,
                            name: null,
                            email: null,
                            language: null,
                            subscriptions: subscriptions
                        };
                    }
                    callback();
                });
            },
            // Verify and save settings
            (callback) => {
                this.verifyAndSaveSettings(correlationId, oldSettings, newSettings, (err, data) => {
                    newSettings = data;
                    callback(err);
                });
            },
        ], (err) => {
            if (callback)
                callback(err, newSettings);
        });
    }
    deleteSettingsById(correlationId, recipientId, callback) {
        this._persistence.deleteById(correlationId, recipientId, (err, settings) => {
            if (callback)
                callback(err);
        });
    }
    resendVerification(correlationId, recipientId, callback) {
        if (recipientId == null) {
            callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'NO_RECIPIENT_ID', 'Missing recipient id'));
            return;
        }
        let settings;
        async.series([
            // Get existing settings
            (callback) => {
                this._persistence.getOneById(correlationId, recipientId, (err, data) => {
                    if (err == null && data == null) {
                        err = new pip_services3_commons_node_5.NotFoundException(correlationId, 'RECIPIENT_NOT_FOUND', 'Recipient ' + recipientId + ' was not found')
                            .withDetails('recipient_id', recipientId);
                    }
                    settings = data;
                    callback(err);
                });
            },
            // Check if verification is needed
            (callback) => {
                settings.verified = false;
                settings.ver_code = pip_services3_commons_node_6.IdGenerator.nextShort();
                settings.ver_expire_time = new Date(new Date().getTime() + this._expireTimeout * 60000);
                callback();
            },
            // Set new settings
            (callback) => {
                this._persistence.set(correlationId, settings, (err, data) => {
                    settings = data;
                    callback(err);
                });
            },
            // Send verification
            (callback) => {
                // Send verification message and do not wait
                this.sendVerificationMessage(correlationId, settings);
                callback();
            }
        ], (err) => {
            if (callback)
                callback(err);
        });
    }
    logActivity(correlationId, settings, activityType) {
        if (this._activitiesClient) {
            this._activitiesClient.logPartyActivity(correlationId, new pip_clients_activities_node_1.PartyActivityV1(null, activityType, {
                id: settings.id,
                type: 'account',
                name: settings.name
            }), (err, activity) => {
                if (err)
                    this._logger.error(correlationId, err, 'Failed to log user activity');
            });
        }
    }
    verifyEmail(correlationId, recipientId, code, callback) {
        let settings;
        async.series([
            // Read settings
            (callback) => {
                this._persistence.getOneById(correlationId, recipientId, (err, data) => {
                    settings = data;
                    if (settings == null && err == null) {
                        err = new pip_services3_commons_node_5.NotFoundException(correlationId, 'RECIPIENT_NOT_FOUND', 'Recipient ' + recipientId + ' was not found')
                            .withDetails('recipient_id', recipientId);
                    }
                    callback(err);
                });
            },
            // Check and update verification code
            (callback) => {
                let verified = settings.ver_code == code;
                verified = verified || (this._magicCode != null && code == this._magicCode);
                verified = verified && new Date().getTime() < settings.ver_expire_time.getTime();
                if (!verified) {
                    callback(new pip_services3_commons_node_3.BadRequestException(correlationId, 'INVALID_CODE', 'Invalid email verification code ' + code)
                        .withDetails('recipient_id', recipientId)
                        .withDetails('code', code));
                    return;
                }
                settings.verified = true;
                settings.ver_code = null;
                settings.ver_expire_time = null;
                callback();
            },
            // Save user
            (callback) => {
                this._persistence.set(correlationId, settings, callback);
            },
            // Asynchronous post-processing
            (callback) => {
                this.logActivity(correlationId, settings, EmailSettingsActivityTypeV1_1.EmailSettingsActivityTypeV1.EmailVerified);
                callback();
            }
        ], (err) => {
            if (callback)
                callback(err);
        });
    }
}
EmailSettingsController._emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
EmailSettingsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-emailsettings:persistence:*:*:1.0', 'dependencies.activities', 'pip-services-activities:client:*:*:1.0', 'dependencies.msgtemplates', 'pip-services-msgtemplates:client:*:*:1.0', 'dependencies.emaildelivery', 'pip-services-email:client:*:*:1.0', 'message_templates.verify_email.subject', 'Verify email', 'message_templates.verify_email.text', 'Verification code for {{email}} is {{ code }}.', 'options.magic_code', null, 'options.signature_length', 100, 'options.verify_on_create', true, 'options.verify_on_update', true);
exports.EmailSettingsController = EmailSettingsController;
//# sourceMappingURL=EmailSettingsController.js.map