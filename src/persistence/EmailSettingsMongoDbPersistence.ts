let _ = require('lodash');

import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { EmailSettingsV1 } from '../data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from './IEmailSettingsPersistence';

export class EmailSettingsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<EmailSettingsV1, string> 
    implements IEmailSettingsPersistence {

    constructor() {
        super('email_settings');
    }

    public getOneByEmail(correlationId: string, email: string,
        callback: (err: any, item: EmailSettingsV1) => void): void {
        this._collection.findOne(
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
