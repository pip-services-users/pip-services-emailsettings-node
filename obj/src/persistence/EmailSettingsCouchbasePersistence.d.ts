import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from './IEmailSettingsPersistence';
export declare class EmailSettingsCouchbasePersistence extends IdentifiableCouchbasePersistence<EmailSettingsV1, string> implements IEmailSettingsPersistence {
    constructor();
    getOneByEmail(correlationId: string, email: string, callback: (err: any, item: EmailSettingsV1) => void): void;
}
