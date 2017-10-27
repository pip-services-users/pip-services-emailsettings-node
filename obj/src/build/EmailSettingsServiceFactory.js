"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EmailSettingsMongoDbPersistence_1 = require("../persistence/EmailSettingsMongoDbPersistence");
const EmailSettingsFilePersistence_1 = require("../persistence/EmailSettingsFilePersistence");
const EmailSettingsMemoryPersistence_1 = require("../persistence/EmailSettingsMemoryPersistence");
const EmailSettingsController_1 = require("../logic/EmailSettingsController");
const EmailSettingsHttpServiceV1_1 = require("../services/version1/EmailSettingsHttpServiceV1");
const EmailSettingsSenecaServiceV1_1 = require("../services/version1/EmailSettingsSenecaServiceV1");
class EmailSettingsServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EmailSettingsServiceFactory.MemoryPersistenceDescriptor, EmailSettingsMemoryPersistence_1.EmailSettingsMemoryPersistence);
        this.registerAsType(EmailSettingsServiceFactory.FilePersistenceDescriptor, EmailSettingsFilePersistence_1.EmailSettingsFilePersistence);
        this.registerAsType(EmailSettingsServiceFactory.MongoDbPersistenceDescriptor, EmailSettingsMongoDbPersistence_1.EmailSettingsMongoDbPersistence);
        this.registerAsType(EmailSettingsServiceFactory.ControllerDescriptor, EmailSettingsController_1.EmailSettingsController);
        this.registerAsType(EmailSettingsServiceFactory.SenecaServiceDescriptor, EmailSettingsSenecaServiceV1_1.EmailSettingsSenecaServiceV1);
        this.registerAsType(EmailSettingsServiceFactory.HttpServiceDescriptor, EmailSettingsHttpServiceV1_1.EmailSettingsHttpServiceV1);
    }
}
EmailSettingsServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailsettings", "factory", "default", "default", "1.0");
EmailSettingsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailsettings", "persistence", "memory", "*", "1.0");
EmailSettingsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailsettings", "persistence", "file", "*", "1.0");
EmailSettingsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailsettings", "persistence", "mongodb", "*", "1.0");
EmailSettingsServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailsettings", "controller", "default", "*", "1.0");
EmailSettingsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailsettings", "service", "seneca", "*", "1.0");
EmailSettingsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emailsettings", "service", "http", "*", "1.0");
exports.EmailSettingsServiceFactory = EmailSettingsServiceFactory;
//# sourceMappingURL=EmailSettingsServiceFactory.js.map