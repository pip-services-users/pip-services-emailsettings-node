let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from './IEmailSettingsPersistence';

export class EmailSettingsCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<EmailSettingsV1, string> 
    implements IEmailSettingsPersistence {

    constructor() {
        super('users', 'email_settings');
    }

    public getOneByEmail(correlationId: string, email: string,
        callback: (err: any, item: EmailSettingsV1) => void): void {
        let emailFilter = "email='" + email + "'";
        super.getListByFilter(correlationId, emailFilter, null, null, (err, items) => {
            if (err) {
                callback(err, null);
                return;
            }

            let item = items && items.length > 0 ? items[0] : null;

            if (item != null)
                this._logger.trace(correlationId, "Retrieved item by %s", email);
            else
                this._logger.trace(correlationId, "Cannot find item by %s", email);

            callback(null, item);
        });
    }

}
