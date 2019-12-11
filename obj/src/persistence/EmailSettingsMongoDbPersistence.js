"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class EmailSettingsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('email_settings');
    }
    getOneByEmail(correlationId, email, callback) {
        this._collection.findOne({
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