let _ = require('lodash');
let messages = require('../../../../src/protos/emailsettings_v1_pb');

import { DataPage } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { ErrorDescriptionFactory } from 'pip-services3-commons-node';
import { ErrorDescription } from 'pip-services3-commons-node';
import { ApplicationExceptionFactory } from 'pip-services3-commons-node';

import { EmailSettingsV1 } from '../../data/version1/EmailSettingsV1';

export class EmailSettingsGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
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

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: EmailSettingsGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (_.isFunction(values.toObject))
            values = values.toObject();

        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        EmailSettingsGrpcConverterV1.setMap(values, map);
        return values;
    }

    public static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    public static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromEmailSettings(settings: EmailSettingsV1): any {
        if (settings == null) return null;

        let obj = new messages.EmailSettings();

        obj.setId(settings.id);
        obj.setName(settings.name);
        obj.setEmail(settings.email);
        obj.setLanguage(settings.language);

        obj.setSubscriptions(EmailSettingsGrpcConverterV1.toJson(settings.subscriptions));
        obj.setVerified(settings.verified);
        obj.setVerCode(settings.ver_code);
        obj.setVerExpireTime(StringConverter.toString(settings.ver_expire_time))

        obj.setCustomHdr(EmailSettingsGrpcConverterV1.toJson(settings.custom_hdr));
        obj.setCustomDat(EmailSettingsGrpcConverterV1.toJson(settings.custom_dat));

        return obj;
    }

    public static toEmailSettings(obj: any): EmailSettingsV1 {
        if (obj == null) return null;

        let settings: EmailSettingsV1 = {
            id: obj.getId(),
            name: obj.getName(),
            email: obj.getEmail(),
            language: obj.getLanguage(),

            subscriptions: EmailSettingsGrpcConverterV1.fromJson(obj.getSubscriptions()),
            verified: obj.getVerified(),
            ver_code: obj.getVerCode(),
            ver_expire_time: DateTimeConverter.toDateTime(obj.getVerExpireTime()),

            custom_hdr: EmailSettingsGrpcConverterV1.fromJson(obj.getCustomHdr()),
            custom_dat: EmailSettingsGrpcConverterV1.fromJson(obj.getCustomDat())
        };

        return settings;
    }

    public static fromEmailSettingsList(settings: EmailSettingsV1[]): any {
        if (settings == null) return null;

        let data = _.map(settings, EmailSettingsGrpcConverterV1.fromEmailSettings);

        return data;
    }

    public static toEmailSettingsList(obj: any): EmailSettingsV1[] {
        if (obj == null) return null;

        let data = _.map(obj, EmailSettingsGrpcConverterV1.toEmailSettings);

        return data;
    }

}