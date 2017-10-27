"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const EmailSettingsServiceFactory_1 = require("../build/EmailSettingsServiceFactory");
const pip_clients_emaildelivery_node_1 = require("pip-clients-emaildelivery-node");
const pip_clients_msgtemplates_node_1 = require("pip-clients-msgtemplates-node");
const pip_clients_activities_node_1 = require("pip-clients-activities-node");
class EmailSettingsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("email_settings", "Email settings function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-emailsettings', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailSettingsServiceFactory_1.EmailSettingsServiceFactory());
        this._factories.add(new pip_clients_emaildelivery_node_1.EmailDeliveryClientFactory());
        this._factories.add(new pip_clients_msgtemplates_node_1.MessageTemplatesClientFactory());
        this._factories.add(new pip_clients_activities_node_1.ActivitiesClientFactory());
    }
}
exports.EmailSettingsLambdaFunction = EmailSettingsLambdaFunction;
exports.handler = new EmailSettingsLambdaFunction().getHandler();
//# sourceMappingURL=EmailSettingsLambdaFunction.js.map