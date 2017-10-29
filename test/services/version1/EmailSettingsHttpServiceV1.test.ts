let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { EmailNullClientV1 } from 'pip-clients-email-node';

import { EmailSettingsV1 } from '../../../src/data/version1/EmailSettingsV1';
import { EmailSettingsMemoryPersistence } from '../../../src/persistence/EmailSettingsMemoryPersistence';
import { EmailSettingsController } from '../../../src/logic/EmailSettingsController';
import { EmailSettingsHttpServiceV1 } from '../../../src/services/version1/EmailSettingsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let SETTINGS = <EmailSettingsV1> {
    id: '1',
    name: 'User 1',
    email: 'user1@conceptual.vision',
    language: 'en',
    verified: false
};

suite('EmailSettingsHttpServiceV1', ()=> {
    let service: EmailSettingsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new EmailSettingsMemoryPersistence();

        let controller = new EmailSettingsController();
        controller.configure(new ConfigParams());

        service = new EmailSettingsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-emailsettings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-emailsettings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-email', 'client', 'null', 'default', '1.0'), new EmailNullClientV1(),
            new Descriptor('pip-services-emailsettings', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });

    test('CRUD Operations', (done) => {
        let settings1: EmailSettingsV1;

        async.series([
        // Create email settings
            (callback) => {
                rest.post('/email_settings/set_settings',
                    {
                        settings: SETTINGS
                    },
                    (err, req,res, settings) => {
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

                rest.post('/email_settings/set_settings',
                    { 
                        settings: settings1 
                    },
                    (err, req, res, settings) => {
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
                rest.post('/email_settings/delete_settings_by_id',
                    {
                        recipient_id: settings1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get deleted settings
            (callback) => {
                rest.post('/email_settings/get_settings_by_id',
                    {
                        recipient_id: settings1.id
                    },
                    (err, req, res, settings) => {
                        assert.isNull(err);

                        //assert.isNull(settings);

                        callback();
                    }
                );
            }
        ], done);
    });
        
});