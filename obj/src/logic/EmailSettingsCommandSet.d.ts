import { CommandSet } from 'pip-services3-commons-node';
import { IEmailSettingsController } from './IEmailSettingsController';
export declare class EmailSettingsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IEmailSettingsController);
    private makeGetSettingsByIdsCommand;
    private makeGetSettingsByIdCommand;
    private makeGetSettingsByEmailSettingsCommand;
    private makeSetSettingsCommand;
    private makeSetVerifiedSettingsCommand;
    private makeSetRecipientCommand;
    private makeSetSubscriptionsCommand;
    private makeDeleteSettingsByIdCommand;
    private makeResendVerificationCommand;
    private makeVerifyEmailCommand;
}
