import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from './IEmailSettingsPersistence';
export declare class EmailSettingsMemoryPersistence extends IdentifiableMemoryPersistence<EmailSettingsV1, string> implements IEmailSettingsPersistence {
    constructor();
    getOneByEmailSettings(correlationId: string, email: string, callback: (err: any, settings: EmailSettingsV1) => void): void;
}
