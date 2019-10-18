"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_couchbase_node_1 = require("pip-services3-couchbase-node");
class EmailSettingsCouchbasePersistence extends pip_services3_couchbase_node_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('users', 'email_settings');
    }
    getOneByEmail(correlationId, email, callback) {
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
exports.EmailSettingsCouchbasePersistence = EmailSettingsCouchbasePersistence;
//# sourceMappingURL=EmailSettingsCouchbasePersistence.js.map