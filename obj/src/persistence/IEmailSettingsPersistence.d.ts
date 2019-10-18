import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
export interface IEmailSettingsPersistence extends IGetter<EmailSettingsV1, string>, IWriter<EmailSettingsV1, string> {
    getListByIds(correlationId: string, ids: string[], callback: (err: any, items: EmailSettingsV1[]) => void): void;
    getOneById(correlation_id: string, id: string, callback: (err: any, item: EmailSettingsV1) => void): void;
    getOneByEmail(correlation_id: string, email: string, callback: (err: any, item: EmailSettingsV1) => void): void;
    set(correlation_id: string, item: EmailSettingsV1, callback?: (err: any, item: EmailSettingsV1) => void): void;
    deleteById(correlation_id: string, id: string, callback?: (err: any, item: EmailSettingsV1) => void): void;
}
