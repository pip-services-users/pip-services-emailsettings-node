"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const EmailSettingsServiceFactory_1 = require("../build/EmailSettingsServiceFactory");
class EmailSettingsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("email_settings", "Email settings microservice");
        this._factories.add(new EmailSettingsServiceFactory_1.EmailSettingsServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.EmailSettingsProcess = EmailSettingsProcess;
//# sourceMappingURL=EmailSettingsProcess.js.map