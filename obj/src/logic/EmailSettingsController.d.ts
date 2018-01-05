import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsController } from './IEmailSettingsController';
export declare class EmailSettingsController implements IConfigurable, IReferenceable, ICommandable, IEmailSettingsController {
    private static _emailRegex;
    private static _defaultConfig;
    private _verifyOnCreate;
    private _verifyOnUpdate;
    private _expireTimeout;
    private _magicCode;
    private _config;
    private _dependencyResolver;
    private _templatesResolver;
    private _logger;
    private _activitiesClient;
    private _emailClient;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    private settingsToPublic(settings);
    getSettingsByIds(correlationId: string, recipientIds: string[], callback: (err: any, settings: EmailSettingsV1[]) => void): void;
    getSettingsById(correlationId: string, recipientId: string, callback: (err: any, settings: EmailSettingsV1) => void): void;
    getSettingsByEmailSettings(correlationId: string, email: string, callback: (err: any, settings: EmailSettingsV1) => void): void;
    private verifyAndSaveSettings(correlationId, oldSettings, newSettings, callback);
    private sendVerificationMessage(correlationId, newSettings);
    setSettings(correlationId: string, settings: EmailSettingsV1, callback: (err: any, settings: EmailSettingsV1) => void): void;
    setVerifiedSettings(correlationId: string, settings: EmailSettingsV1, callback: (err: any, settings: EmailSettingsV1) => void): void;
    setRecipient(correlationId: string, recipientId: string, name: string, email: string, language: string, callback?: (err: any, settings: EmailSettingsV1) => void): void;
    setSubscriptions(correlationId: string, recipientId: string, subscriptions: any, callback?: (err: any, settings: EmailSettingsV1) => void): void;
    deleteSettingsById(correlationId: string, recipientId: string, callback?: (err: any) => void): void;
    resendVerification(correlationId: string, recipientId: string, callback?: (err: any) => void): void;
    private logActivity(correlationId, settings, activityType);
    verifyEmail(correlationId: string, recipientId: string, code: string, callback?: (err: any) => void): void;
}
