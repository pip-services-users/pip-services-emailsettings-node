let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';

import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from './IEmailSettingsPersistence';
import { EmailSettingsMongooseSchema } from './EmailSettingsMongooseSchema';

export class EmailSettingsMongoDbPersistence 
    extends IdentifiableMongoosePersistence<EmailSettingsV1, string> 
    implements IEmailSettingsPersistence {

    constructor() {
        super('email_settings', EmailSettingsMongooseSchema());
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
