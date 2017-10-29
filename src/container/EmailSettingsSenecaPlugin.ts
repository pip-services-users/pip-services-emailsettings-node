import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';
import { SenecaInstance } from 'pip-services-net-node';

import { EmailSettingsMemoryPersistence } from '../persistence/EmailSettingsMemoryPersistence';
import { EmailSettingsFilePersistence } from '../persistence/EmailSettingsFilePersistence';
import { EmailSettingsMongoDbPersistence } from '../persistence/EmailSettingsMongoDbPersistence';
import { EmailSettingsController } from '../logic/EmailSettingsController';
import { EmailSettingsSenecaServiceV1 } from '../services/version1/EmailSettingsSenecaServiceV1';
import { ActivitiesSenecaClientV1 } from 'pip-clients-activities-node';
import { EmailSenecaClientV1 } from 'pip-clients-email-node';

export class EmailSettingsSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-emailsettings', seneca, EmailSettingsSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let activitiesClient = new ActivitiesSenecaClientV1();
        let activitiesOptions = options.activities || {};
        activitiesClient.configure(ConfigParams.fromValue(activitiesOptions));

        let emailClient = new EmailSenecaClientV1();
        let emailOptions = options.email || {};
        emailClient.configure(ConfigParams.fromValue(emailOptions));

        let controller = new EmailSettingsController();
        controller.configure(ConfigParams.fromValue(options));

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new EmailSettingsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new EmailSettingsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new EmailSettingsMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let service = new EmailSettingsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-activities', 'client', 'seneca', 'default', '1.0'), activitiesClient,
            new Descriptor('pip-services-email', 'client', 'seneca', 'default', '1.0'), emailClient,
            new Descriptor('pip-services-emailsettings', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-emailsettings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-emailsettings', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new EmailSettingsSenecaPlugin(seneca, options);
    return { name: plugin.name };
}