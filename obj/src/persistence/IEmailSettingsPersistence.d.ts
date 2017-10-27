import { IGetter } from 'pip-services-data-node';
import { IWriter } from 'pip-services-data-node';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
export interface IEmailSettingsPersistence extends IGetter<EmailSettingsV1, string>, IWriter<EmailSettingsV1, string> {
    getListByIds(correlationId: string, ids: string[], callback: (err: any, items: EmailSettingsV1[]) => void): void;
    getOneById(correlation_id: string, id: string, callback: (err: any, item: EmailSettingsV1) => void): void;
    getOneByEmailSettings(correlation_id: string, email: string, callback: (err: any, item: EmailSettingsV1) => void): void;
    set(correlation_id: string, item: EmailSettingsV1, callback?: (err: any, item: EmailSettingsV1) => void): void;
    deleteById(correlation_id: string, id: string, callback?: (err: any, item: EmailSettingsV1) => void): void;
}
