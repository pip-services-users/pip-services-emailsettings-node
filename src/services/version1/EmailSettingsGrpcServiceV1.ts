let _ = require('lodash');
let services = require('../../../../src/protos/emailsettings_v1_grpc_pb');
let messages = require('../../../../src/protos/emailsettings_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { EmailSettingsV1 } from '../../data/version1/EmailSettingsV1';
import { EmailSettingsV1Schema } from '../../data/version1/EmailSettingsV1Schema';
import { IEmailSettingsController } from '../../logic/IEmailSettingsController';
import { EmailSettingsGrpcConverterV1 } from './EmailSettingsGrpcConverterV1';

export class EmailSettingsGrpcServiceV1 extends GrpcService {
    private _controller: IEmailSettingsController;
	
    public constructor() {
        super(services.EmailSettingsxService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-emailsettings", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IEmailSettingsController>('controller');
    }
    
    private getSettingsByIds(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let recipientIds = call.request.getRecipientIdsList();

        this._controller.getSettingsByIds(
            correlationId,
            recipientIds,
            (err, result) => {
                let error = EmailSettingsGrpcConverterV1.fromError(err);
                let settings = err == null ? EmailSettingsGrpcConverterV1.fromEmailSettingsList(result) : null;

                let response = new messages.EmailSettingsListReply();
                response.setError(error);
                response.setSettingsList(settings);

                callback(err, response);
            }
        );
    }

    private getSettingsById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();

        this._controller.getSettingsById(
            correlationId,
            recipientId,
            (err, result) => {
                let error = EmailSettingsGrpcConverterV1.fromError(err);
                let settings = err == null ? EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;

                let response = new messages.EmailSettingsObjectReply();
                response.setError(error);
                response.setSettings(settings);

                callback(err, response);
            }
        );
    }

    private getSettingsByEmail(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let email = call.request.getEmail();

        this._controller.getSettingsByEmail(
            correlationId,
            email,
            (err, result) => {
                let error = EmailSettingsGrpcConverterV1.fromError(err);
                let settings = err == null ? EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;

                let response = new messages.EmailSettingsObjectReply();
                response.setError(error);
                response.setSettings(settings);

                callback(err, response);
            }
        );
    }
    
    private setSettings(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let settings = EmailSettingsGrpcConverterV1.toEmailSettings(call.request.getSettings());

        this._controller.setSettings(
            correlationId,
            settings,
            (err, result) => {
                let error = EmailSettingsGrpcConverterV1.fromError(err);
                let settings = err == null ? EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;

                let response = new messages.EmailSettingsObjectReply();
                response.setError(error);
                response.setSettings(settings);

                callback(err, response);
            }
        );
    }

    private setVerifiedSettings(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let settings = EmailSettingsGrpcConverterV1.toEmailSettings(call.request.getSettings());

        this._controller.setVerifiedSettings(
            correlationId,
            settings,
            (err, result) => {
                let error = EmailSettingsGrpcConverterV1.fromError(err);
                let settings = err == null ? EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;

                let response = new messages.EmailSettingsObjectReply();
                response.setError(error);
                response.setSettings(settings);

                callback(err, response);
            }
        );
    }

    private setRecipient(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();
        let name = call.request.getName();
        let email = call.request.getEmail();
        let language = call.request.getLanguage();

        this._controller.setRecipient(
            correlationId,
            recipientId, name, email, language,
            (err, result) => {
                let error = EmailSettingsGrpcConverterV1.fromError(err);
                let settings = err == null ? EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;

                let response = new messages.EmailSettingsObjectReply();
                response.setError(error);
                response.setSettings(settings);

                callback(err, response);
            }
        );
    }

    private setSubscriptions(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();
        let subscriptions = EmailSettingsGrpcConverterV1.fromJson(call.request.getName());

        this._controller.setSubscriptions(
            correlationId,
            recipientId, subscriptions,
            (err, result) => {
                let error = EmailSettingsGrpcConverterV1.fromError(err);
                let settings = err == null ? EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;

                let response = new messages.EmailSettingsObjectReply();
                response.setError(error);
                response.setSettings(settings);

                callback(err, response);
            }
        );
    }

    private deleteSettingsById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();

        this._controller.deleteSettingsById(
            correlationId,
            recipientId,
            (err) => {
                let error = EmailSettingsGrpcConverterV1.fromError(err);

                let response = new messages.EmailSettingsEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }    

    private resendVerification(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();

        this._controller.resendVerification(
            correlationId,
            recipientId,
            (err) => {
                let error = EmailSettingsGrpcConverterV1.fromError(err);

                let response = new messages.EmailSettingsEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }    
    
    public register() {
        this.registerMethod(
            'get_settings_by_ids', 
            null,
            this.getSettingsByIds
        );

        this.registerMethod(
            'get_settings_by_id', 
            null,
            this.getSettingsById
        );

        this.registerMethod(
            'get_settings_by_email', 
            null,
            this.getSettingsByEmail
        );

        this.registerMethod(
            'set_settings', 
            null,
            this.setSettings
        );

        this.registerMethod(
            'set_verified_settings', 
            null,
            this.setVerifiedSettings
        );

        this.registerMethod(
            'set_recipient', 
            null,
            this.setRecipient
        );

        this.registerMethod(
            'set_subscriptions', 
            null,
            this.setSubscriptions
        );

        this.registerMethod(
            'delete_settings_by_id',
            null, 
            this.deleteSettingsById
        );

        this.registerMethod(
            'resend_verification',
            null, 
            this.resendVerification
        );
    }
}
