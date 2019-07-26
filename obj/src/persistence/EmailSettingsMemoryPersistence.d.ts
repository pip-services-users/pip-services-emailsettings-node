import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from './IEmailSettingsPersistence';
export declare class EmailSettingsMemoryPersistence extends IdentifiableMemoryPersistence<EmailSettingsV1, string> implements IEmailSettingsPersistence {
    constructor();
    getOneByEmail(correlationId: string, email: string, callback: (err: any, settings: EmailSettingsV1) => void): void;
}
