import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { EmailSettingsMongoDbPersistence } from '../persistence/EmailSettingsMongoDbPersistence';
import { EmailSettingsFilePersistence } from '../persistence/EmailSettingsFilePersistence';
import { EmailSettingsMemoryPersistence } from '../persistence/EmailSettingsMemoryPersistence';
import { EmailSettingsController } from '../logic/EmailSettingsController';
import { EmailSettingsHttpServiceV1 } from '../services/version1/EmailSettingsHttpServiceV1';

export class EmailSettingsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-emailsettings", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-emailsettings", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-emailsettings", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-emailsettings", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-emailsettings", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-emailsettings", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EmailSettingsServiceFactory.MemoryPersistenceDescriptor, EmailSettingsMemoryPersistence);
		this.registerAsType(EmailSettingsServiceFactory.FilePersistenceDescriptor, EmailSettingsFilePersistence);
		this.registerAsType(EmailSettingsServiceFactory.MongoDbPersistenceDescriptor, EmailSettingsMongoDbPersistence);
		this.registerAsType(EmailSettingsServiceFactory.ControllerDescriptor, EmailSettingsController);
		this.registerAsType(EmailSettingsServiceFactory.HttpServiceDescriptor, EmailSettingsHttpServiceV1);
	}
	
}
