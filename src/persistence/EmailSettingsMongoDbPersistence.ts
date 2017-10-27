let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';

import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from './IEmailSettingsPersistence';
import { EmailSettingsMongoDbSchema } from './EmailSettingsMongoDbSchema';

export class EmailSettingsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<EmailSettingsV1, string> 
    implements IEmailSettingsPersistence {

    constructor() {
        super('email_settings', EmailSettingsMongoDbSchema());
    }

    public getOneByEmailSettings(correlationId: string, email: string,
        callback: (err: any, item: EmailSettingsV1) => void): void {
        this._model.findOne(
            {
                email: email
            }, 
            (err, item) => {
                if (!err)
                    this._logger.trace(correlationId, "Retrieved from %s with email = %s", this._collection, email);

                item = this.convertToPublic(item);
                callback(err, item);
            }
        );
    }
}
