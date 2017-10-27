"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_data_node_1 = require("pip-services-data-node");
class EmailSettingsMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    getOneByEmailSettings(correlationId, email, callback) {
        let items = this._items.filter((x) => { return x.email == email; });
        let item = items.length > 0 ? items[0] : null;
        if (item != null)
            this._logger.trace(correlationId, "Retrieved %s by %s", item, email);
        else
            this._logger.trace(correlationId, "Cannot find item by %s", email);
        callback(null, item);
    }
}
exports.EmailSettingsMemoryPersistence = EmailSettingsMemoryPersistence;
//# sourceMappingURL=EmailSettingsMemoryPersistence.js.map