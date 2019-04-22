let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from './IEmailSettingsPersistence';

export class EmailSettingsMemoryPersistence 
    extends IdentifiableMemoryPersistence<EmailSettingsV1, string> 
    implements IEmailSettingsPersistence {

    constructor() {
        super();
    }

    public getOneByEmailSettings(correlationId: string, email: string,
        callback: (err: any, settings: EmailSettingsV1) => void): void {
        
        let items = this._items.filter((x) => {return x.email == email;});
        let item = items.length > 0 ? items[0] : null;

        if (item != null)
            this._logger.trace(correlationId, "Retrieved %s by %s", item, email);
        else
            this._logger.trace(correlationId, "Cannot find item by %s", email);

        callback(null, item);
    }
}
