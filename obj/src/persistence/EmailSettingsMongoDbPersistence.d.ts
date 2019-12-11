import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from './IEmailSettingsPersistence';
export declare class EmailSettingsMongoDbPersistence extends IdentifiableMongoDbPersistence<EmailSettingsV1, string> implements IEmailSettingsPersistence {
    constructor();
    getOneByEmail(correlationId: string, email: string, callback: (err: any, item: EmailSettingsV1) => void): void;
}
