"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const EmailSettingsServiceFactory_1 = require("../build/EmailSettingsServiceFactory");
class EmailSettingsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("email_settings", "Email settings microservice");
        this._factories.add(new EmailSettingsServiceFactory_1.EmailSettingsServiceFactory);
    }
}
exports.EmailSettingsProcess = EmailSettingsProcess;
//# sourceMappingURL=EmailSettingsProcess.js.map