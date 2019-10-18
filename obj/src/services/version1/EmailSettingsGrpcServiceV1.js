"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/emailsettings_v1_grpc_pb');
let messages = require('../../../../src/protos/emailsettings_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const EmailSettingsGrpcConverterV1_1 = require("./EmailSettingsGrpcConverterV1");
class EmailSettingsGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.EmailSettingsxService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getSettingsByIds(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let recipientIds = call.request.getRecipientIdsList();
        this._controller.getSettingsByIds(correlationId, recipientIds, (err, result) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let settings = err == null ? EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromEmailSettingsList(result) : null;
            let response = new messages.EmailSettingsListReply();
            response.setError(error);
            response.setSettingsList(settings);
            callback(err, response);
        });
    }
    getSettingsById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();
        this._controller.getSettingsById(correlationId, recipientId, (err, result) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let settings = err == null ? EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;
            let response = new messages.EmailSettingsObjectReply();
            response.setError(error);
            response.setSettings(settings);
            callback(err, response);
        });
    }
    getSettingsByEmail(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let email = call.request.getEmail();
        this._controller.getSettingsByEmail(correlationId, email, (err, result) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let settings = err == null ? EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;
            let response = new messages.EmailSettingsObjectReply();
            response.setError(error);
            response.setSettings(settings);
            callback(err, response);
        });
    }
    setSettings(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let settings = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.toEmailSettings(call.request.getSettings());
        this._controller.setSettings(correlationId, settings, (err, result) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let settings = err == null ? EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;
            let response = new messages.EmailSettingsObjectReply();
            response.setError(error);
            response.setSettings(settings);
            callback(err, response);
        });
    }
    setVerifiedSettings(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let settings = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.toEmailSettings(call.request.getSettings());
        this._controller.setVerifiedSettings(correlationId, settings, (err, result) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let settings = err == null ? EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;
            let response = new messages.EmailSettingsObjectReply();
            response.setError(error);
            response.setSettings(settings);
            callback(err, response);
        });
    }
    setRecipient(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();
        let name = call.request.getName();
        let email = call.request.getEmail();
        let language = call.request.getLanguage();
        this._controller.setRecipient(correlationId, recipientId, name, email, language, (err, result) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let settings = err == null ? EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;
            let response = new messages.EmailSettingsObjectReply();
            response.setError(error);
            response.setSettings(settings);
            callback(err, response);
        });
    }
    setSubscriptions(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();
        let subscriptions = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromJson(call.request.getName());
        this._controller.setSubscriptions(correlationId, recipientId, subscriptions, (err, result) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let settings = err == null ? EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromEmailSettings(result) : null;
            let response = new messages.EmailSettingsObjectReply();
            response.setError(error);
            response.setSettings(settings);
            callback(err, response);
        });
    }
    deleteSettingsById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();
        this._controller.deleteSettingsById(correlationId, recipientId, (err) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let response = new messages.EmailSettingsEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    resendVerification(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();
        this._controller.resendVerification(correlationId, recipientId, (err) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let response = new messages.EmailSettingsEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    verifyEmail(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let recipientId = call.request.getRecipientId();
        let code = call.request.getCode();
        this._controller.verifyEmail(correlationId, recipientId, code, (err) => {
            let error = EmailSettingsGrpcConverterV1_1.EmailSettingsGrpcConverterV1.fromError(err);
            let response = new messages.EmailSettingsEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_settings_by_ids', null, this.getSettingsByIds);
        this.registerMethod('get_settings_by_id', null, this.getSettingsById);
        this.registerMethod('get_settings_by_email', null, this.getSettingsByEmail);
        this.registerMethod('set_settings', null, this.setSettings);
        this.registerMethod('set_verified_settings', null, this.setVerifiedSettings);
        this.registerMethod('set_recipient', null, this.setRecipient);
        this.registerMethod('set_subscriptions', null, this.setSubscriptions);
        this.registerMethod('delete_settings_by_id', null, this.deleteSettingsById);
        this.registerMethod('resend_verification', null, this.resendVerification);
        this.registerMethod('verify_email', null, this.verifyEmail);
    }
}
exports.EmailSettingsGrpcServiceV1 = EmailSettingsGrpcServiceV1;
//# sourceMappingURL=EmailSettingsGrpcServiceV1.js.map