"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_mongoose_node_1 = require("pip-services3-mongoose-node");
const EmailSettingsMongooseSchema_1 = require("./EmailSettingsMongooseSchema");
class EmailSettingsMongoDbPersistence extends pip_services3_mongoose_node_1.IdentifiableMongoosePersistence {
    constructor() {
        super('email_settings', EmailSettingsMongooseSchema_1.EmailSettingsMongooseSchema());
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