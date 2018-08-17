"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
const pip_services_seneca_node_2 = require("pip-services-seneca-node");
const EmailSettingsMemoryPersistence_1 = require("../persistence/EmailSettingsMemoryPersistence");
const EmailSettingsFilePersistence_1 = require("../persistence/EmailSettingsFilePersistence");
const EmailSettingsMongoDbPersistence_1 = require("../persistence/EmailSettingsMongoDbPersistence");
const EmailSettingsController_1 = require("../logic/EmailSettingsController");
const EmailSettingsSenecaServiceV1_1 = require("../services/version1/EmailSettingsSenecaServiceV1");
const pip_clients_activities_node_1 = require("pip-clients-activities-node");
const pip_clients_email_node_1 = require("pip-clients-email-node");
class EmailSettingsSenecaPlugin extends pip_services_seneca_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-emailsettings', seneca, EmailSettingsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_components_node_1.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let activitiesClient = new pip_clients_activities_node_1.ActivitiesSenecaClientV1();
        let activitiesOptions = options.activities || {};
        activitiesClient.configure(pip_services_commons_node_3.ConfigParams.fromValue(activitiesOptions));
        let emailClient = new pip_clients_email_node_1.EmailSenecaClientV1();
        let emailOptions = options.email || {};
        emailClient.configure(pip_services_commons_node_3.ConfigParams.fromValue(emailOptions));
        let controller = new EmailSettingsController_1.EmailSettingsController();
        controller.configure(pip_services_commons_node_3.ConfigParams.fromValue(options));
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new EmailSettingsMongoDbPersistence_1.EmailSettingsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new EmailSettingsFilePersistence_1.EmailSettingsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new EmailSettingsMemoryPersistence_1.EmailSettingsMemoryPersistence();
        else
            throw new pip_services_commons_node_4.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let service = new EmailSettingsSenecaServiceV1_1.EmailSettingsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        let senecaInstance = new pip_services_seneca_node_2.SenecaInstance(seneca);
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-activities', 'client', 'seneca', 'default', '1.0'), activitiesClient, new pip_services_commons_node_2.Descriptor('pip-services-email', 'client', 'seneca', 'default', '1.0'), emailClient, new pip_services_commons_node_2.Descriptor('pip-services-emailsettings', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-emailsettings', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-emailsettings', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.EmailSettingsSenecaPlugin = EmailSettingsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new EmailSettingsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=EmailSettingsSenecaPlugin.js.map