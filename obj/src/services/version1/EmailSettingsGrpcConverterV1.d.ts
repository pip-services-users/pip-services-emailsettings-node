import { PagingParams } from 'pip-services3-commons-node';
import { EmailSettingsV1 } from '../../data/version1/EmailSettingsV1';
export declare class EmailSettingsGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    static toJson(value: any): string;
    static fromJson(value: string): any;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromEmailSettings(settings: EmailSettingsV1): any;
    static toEmailSettings(obj: any): EmailSettingsV1;
    static fromEmailSettingsList(settings: EmailSettingsV1[]): any;
    static toEmailSettingsList(obj: any): EmailSettingsV1[];
}
