"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const EmailSettingsCouchbasePersistence_1 = require("../persistence/EmailSettingsCouchbasePersistence");
const EmailSettingsMongoDbPersistence_1 = require("../persistence/EmailSettingsMongoDbPersistence");
const EmailSettingsFilePersistence_1 = require("../persistence/EmailSettingsFilePersistence");
const EmailSettingsMemoryPersistence_1 = require("../persistence/EmailSettingsMemoryPersistence");
const EmailSettingsController_1 = require("../logic/EmailSettingsController");
const EmailSettingsHttpServiceV1_1 = require("../services/version1/EmailSettingsHttpServiceV1");
const EmailSettingsCommandableGrpcServiceV1_1 = require("../services/version1/EmailSettingsCommandableGrpcServiceV1");
const EmailSettingsGrpcServiceV1_1 = require("../services/version1/EmailSettingsGrpcServiceV1");
class EmailSettingsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EmailSettingsServiceFactory.MemoryPersistenceDescriptor, EmailSettingsMemoryPersistence_1.EmailSettingsMemoryPersistence);
        this.registerAsType(EmailSettingsServiceFactory.FilePersistenceDescriptor, EmailSettingsFilePersistence_1.EmailSettingsFilePersistence);
        this.registerAsType(EmailSettingsServiceFactory.MongoDbPersistenceDescriptor, EmailSettingsMongoDbPersistence_1.EmailSettingsMongoDbPersistence);
        this.registerAsType(EmailSettingsServiceFactory.CouchbasePersistenceDescriptor, EmailSettingsCouchbasePersistence_1.EmailSettingsCouchbasePersistence);
        this.registerAsType(EmailSettingsServiceFactory.ControllerDescriptor, EmailSettingsController_1.EmailSettingsController);
        this.registerAsType(EmailSettingsServiceFactory.HttpServiceDescriptor, EmailSettingsHttpServiceV1_1.EmailSettingsHttpServiceV1);
        this.registerAsType(EmailSettingsServiceFactory.CommandableGrpcServiceDescriptor, EmailSettingsCommandableGrpcServiceV1_1.EmailSettingsCommandableGrpcServiceV1);
        this.registerAsType(EmailSettingsServiceFactory.GrpcServiceDescriptor, EmailSettingsGrpcServiceV1_1.EmailSettingsGrpcServiceV1);
    }
}
EmailSettingsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "factory", "default", "default", "1.0");
EmailSettingsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "persistence", "memory", "*", "1.0");
EmailSettingsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "persistence", "file", "*", "1.0");
EmailSettingsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "persistence", "mongodb", "*", "1.0");
EmailSettingsServiceFactory.CouchbasePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "persistence", "couchbase", "*", "1.0");
EmailSettingsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "controller", "default", "*", "1.0");
EmailSettingsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "service", "http", "*", "1.0");
EmailSettingsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "service", "commandable-grpc", "*", "1.0");
EmailSettingsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-emailsettings", "service", "grpc", "*", "1.0");
exports.EmailSettingsServiceFactory = EmailSettingsServiceFactory;
//# sourceMappingURL=EmailSettingsServiceFactory.js.map