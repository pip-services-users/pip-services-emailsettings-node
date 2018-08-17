let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { EmailNullClientV1 } from 'pip-clients-email-node';

import { EmailSettingsV1 } from '../../../src/data/version1/EmailSettingsV1';
import { EmailSettingsMemoryPersistence } from '../../../src/persistence/EmailSettingsMemoryPersistence';
import { EmailSettingsController } from '../../../src/logic/EmailSettingsController';
import { EmailSettingsSenecaServiceV1 } from '../../../src/services/version1/EmailSettingsSenecaServiceV1';

let SETTINGS = <EmailSettingsV1> {
    id: '1',
    name: 'User 1',
    email: 'user1@conceptual.vision',
    language: 'en',
    verified: false
};

suite('EmailSettingsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: EmailSettingsSenecaServiceV1;
    let persistence: EmailSettingsMemoryPersistence;
    let controller: EmailSettingsController;

    suiteSetup((done) => {
        persistence = new EmailSettingsMemoryPersistence();

        controller = new EmailSettingsController();
        controller.configure(new ConfigParams());

        service = new EmailSettingsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-emailsettings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-emailsettings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-email', 'client', 'null', 'default', '1.0'), new EmailNullClientV1(),
            new Descriptor('pip-services-emailsettings', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });

    test('CRUD Operations', (done) => {
        let settings1: EmailSettingsV1;

        async.series([
        // Create email settings
            (callback) => {
                seneca.act(
                    {
                        role: 'email_settings',
                        cmd: 'set_settings',
                        settings: SETTINGS
                    },
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal(settings.id, SETTINGS.id);
                        assert.equal(settings.email, SETTINGS.email);
                        assert.isFalse(settings.verified);

                        settings1 = settings;

                        callback();
                    }
                );
            },
        // Update the settings
            (callback) => {
                settings1.subscriptions.engagement = true;

                seneca.act(
                    {
                        role: 'email_settings',
                        cmd: 'set_settings',
                        settings: settings1
                    },
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal(settings.id, settings1.id)
                        assert.isTrue(settings.subscriptions.engagement);

                        callback();
                    }
                );
            },
        // Delete settings
            (callback) => {
                seneca.act(
                    {
                        role: 'email_settings',
                        cmd: 'delete_settings_by_id',
                        recipient_id: SETTINGS.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get deleted settings
            (callback) => {
                seneca.act(
                    {
                        role: 'email_settings',
                        cmd: 'get_settings_by_id',
                        recipient_id: SETTINGS.id
                    },
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isNull(settings);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});