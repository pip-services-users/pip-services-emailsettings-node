"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_mongodb_node_1 = require("pip-services-mongodb-node");
const EmailSettingsMongoDbSchema_1 = require("./EmailSettingsMongoDbSchema");
class EmailSettingsMongoDbPersistence extends pip_services_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('email_settings', EmailSettingsMongoDbSchema_1.EmailSettingsMongoDbSchema());
    }
    getOneByEmailSettings(correlationId, email, callback) {
        this._model.findOne({
            email: email
        }, (err, item) => {
            if (!err)
                this._logger.trace(correlationId, "Retrieved from %s with email = %s", this._collection, email);
            item = this.convertToPublic(item);
            callback(err, item);
        });
    }
}
exports.EmailSettingsMongoDbPersistence = EmailSettingsMongoDbPersistence;
//# sourceMappingURL=EmailSettingsMongoDbPersistence.js.map