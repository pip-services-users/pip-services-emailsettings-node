import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { EmailSettingsMemoryPersistence } from './EmailSettingsMemoryPersistence';
import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';

export class EmailSettingsFilePersistence extends EmailSettingsMemoryPersistence {
	protected _persister: JsonFilePersister<EmailSettingsV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<EmailSettingsV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}