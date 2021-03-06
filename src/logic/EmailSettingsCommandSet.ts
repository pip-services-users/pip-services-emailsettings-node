import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { EmailSettingsV1Schema } from '../data/version1/EmailSettingsV1Schema';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsController } from './IEmailSettingsController';

export class EmailSettingsCommandSet extends CommandSet {
    private _logic: IEmailSettingsController;

    constructor(logic: IEmailSettingsController) {
        super();

        this._logic = logic;

		this.addCommand(this.makeGetSettingsByIdsCommand());
		this.addCommand(this.makeGetSettingsByIdCommand());
		this.addCommand(this.makeGetSettingsByEmailSettingsCommand());
		this.addCommand(this.makeSetSettingsCommand());
		this.addCommand(this.makeSetVerifiedSettingsCommand());
		this.addCommand(this.makeSetRecipientCommand());
		this.addCommand(this.makeSetSubscriptionsCommand());
		this.addCommand(this.makeDeleteSettingsByIdCommand());
		this.addCommand(this.makeResendVerificationCommand());
		this.addCommand(this.makeVerifyEmailCommand());
    }

	private makeGetSettingsByIdsCommand(): ICommand {
		return new Command(
			"get_settings_by_ids",
			new ObjectSchema(true)
				.withRequiredProperty('recipient_ids', new ArraySchema(TypeCode.String)),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let recipientIds = args.get("recipient_ids");
                this._logic.getSettingsByIds(correlationId, recipientIds, callback);
            }
		);
	}

	private makeGetSettingsByIdCommand(): ICommand {
		return new Command(
			"get_settings_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('recipient_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let recipientId = args.getAsNullableString("recipient_id");
                this._logic.getSettingsById(correlationId, recipientId, callback);
            }
		);
	}

	private makeGetSettingsByEmailSettingsCommand(): ICommand {
		return new Command(
			"get_settings_by_email",
			new ObjectSchema(true)
				.withRequiredProperty('email', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let email = args.getAsNullableString("email");
                this._logic.getSettingsByEmail(correlationId, email, callback);
            }
		);
	}

	private makeSetSettingsCommand(): ICommand {
		return new Command(
			"set_settings",
			new ObjectSchema(true)
				.withRequiredProperty('settings', new EmailSettingsV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let settings = args.get("settings");
                this._logic.setSettings(correlationId, settings, callback);
            }
		);
	}

	private makeSetVerifiedSettingsCommand(): ICommand {
		return new Command(
			"set_verified_settings",
			new ObjectSchema(true)
				.withRequiredProperty('settings', new EmailSettingsV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let settings = args.get("settings");
                this._logic.setVerifiedSettings(correlationId, settings, callback);
            }
		);
	}

	private makeSetRecipientCommand(): ICommand {
		return new Command(
			"set_recipient",
			new ObjectSchema(true)
				.withRequiredProperty('recipient_id', TypeCode.String)
				.withOptionalProperty('name', TypeCode.String)
				.withOptionalProperty('email', TypeCode.String)
				.withOptionalProperty('language', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let recipientId = args.getAsString("recipient_id");
                let name = args.getAsString("name");
                let email = args.getAsString("email");
                let language = args.getAsString("language");
                this._logic.setRecipient(correlationId, recipientId, name, email, language, callback);
            }
		);
	}

	private makeSetSubscriptionsCommand(): ICommand {
		return new Command(
			"set_subscriptions",
			new ObjectSchema(true)
				.withRequiredProperty('recipient_id', TypeCode.String)
				.withRequiredProperty('subscriptions', TypeCode.Map),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let recipientId = args.getAsString("recipient_id");
                let subscriptions = args.get("subscriptions");
                this._logic.setSubscriptions(correlationId, recipientId, subscriptions, callback);
            }
		);
	}
	
	private makeDeleteSettingsByIdCommand(): ICommand {
		return new Command(
			"delete_settings_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('recipient_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let recipientId = args.getAsNullableString("recipient_id");
                this._logic.deleteSettingsById(correlationId, recipientId, (err) => {
					callback(err, null);
				});
			}
		);
	}

	private makeResendVerificationCommand(): ICommand {
		return new Command(
			"resend_verification",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let recipientId = args.getAsString("recipient_id");
                this._logic.resendVerification(correlationId, recipientId, (err) => {
					callback(err, null);
				});
            }
		);
	}

	private makeVerifyEmailCommand(): ICommand {
		return new Command(
			"verify_email",
			new ObjectSchema(true)
				.withRequiredProperty('recipient_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let recipientId = args.getAsString("recipient_id");
                let code = args.getAsString("code");
                this._logic.verifyEmail(correlationId, recipientId, code, (err) => {
					callback(err, null);
				});
            }
		);
	}

}