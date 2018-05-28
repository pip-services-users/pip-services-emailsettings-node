"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const pip_clients_activities_node_1 = require("pip-clients-activities-node");
const pip_clients_msgtemplates_node_1 = require("pip-clients-msgtemplates-node");
const EmailSettingsServiceFactory_1 = require("../build/EmailSettingsServiceFactory");
class EmailSettingsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("email_settings", "Email settings microservice");
        this._factories.add(new EmailSettingsServiceFactory_1.EmailSettingsServiceFactory);
        this._factories.add(new pip_clients_activities_node_1.ActivitiesClientFactory());
        this._factories.add(new pip_clients_msgtemplates_node_1.MessageTemplatesClientFactory());
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.EmailSettingsProcess = EmailSettingsProcess;
//# sourceMappingURL=EmailSettingsProcess.js.map