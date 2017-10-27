import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { EmailSettingsMemoryPersistence } from './EmailSettingsMemoryPersistence';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
export declare class EmailSettingsFilePersistence extends EmailSettingsMemoryPersistence {
    protected _persister: JsonFilePersister<EmailSettingsV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
