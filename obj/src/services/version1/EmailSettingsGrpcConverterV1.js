"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let messages = require('../../../../src/protos/emailsettings_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
class EmailSettingsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_node_4.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        EmailSettingsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: EmailSettingsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_node_5.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (_.isFunction(values.toObject))
            values = values.toObject();
        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        EmailSettingsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_node_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromEmailSettings(settings) {
        if (settings == null)
            return null;
        let obj = new messages.EmailSettings();
        obj.setId(settings.id);
        obj.setName(settings.name);
        obj.setEmail(settings.email);
        obj.setLanguage(settings.language);
        obj.setSubscriptions(EmailSettingsGrpcConverterV1.toJson(settings.subscriptions));
        obj.setVerified(settings.verified);
        obj.setVerCode(settings.ver_code);
        obj.setVerExpireTime(pip_services3_commons_node_2.StringConverter.toString(settings.ver_expire_time));
        obj.setCustomHdr(EmailSettingsGrpcConverterV1.toJson(settings.custom_hdr));
        obj.setCustomDat(EmailSettingsGrpcConverterV1.toJson(settings.custom_dat));
        return obj;
    }
    static toEmailSettings(obj) {
        if (obj == null)
            return null;
        let settings = {
            id: obj.getId(),
            name: obj.getName(),
            email: obj.getEmail(),
            language: obj.getLanguage(),
            subscriptions: EmailSettingsGrpcConverterV1.fromJson(obj.getSubscriptions()),
            verified: obj.getVerified(),
            ver_code: obj.getVerCode(),
            ver_expire_time: pip_services3_commons_node_3.DateTimeConverter.toDateTime(obj.getVerExpireTime()),
            custom_hdr: EmailSettingsGrpcConverterV1.fromJson(obj.getCustomHdr()),
            custom_dat: EmailSettingsGrpcConverterV1.fromJson(obj.getCustomDat())
        };
        return settings;
    }
    static fromEmailSettingsList(settings) {
        if (settings == null)
            return null;
        let data = _.map(settings, EmailSettingsGrpcConverterV1.fromEmailSettings);
        return data;
    }
    static toEmailSettingsList(obj) {
        if (obj == null)
            return null;
        let data = _.map(obj, EmailSettingsGrpcConverterV1.toEmailSettings);
        return data;
    }
}
exports.EmailSettingsGrpcConverterV1 = EmailSettingsGrpcConverterV1;
//# sourceMappingURL=EmailSettingsGrpcConverterV1.js.map