let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { EmailDeliveryNullClientV1 } from 'pip-clients-emaildelivery-node';

import { EmailSettingsV1 } from '../../src/data/version1/EmailSettingsV1';
import { EmailSettingsMemoryPersistence } from '../../src/persistence/EmailSettingsMemoryPersistence';
import { EmailSettingsController } from '../../src/logic/EmailSettingsController';
import { EmailSettingsLambdaFunction } from '../../src/container/EmailSettingsLambdaFunction';

let SETTINGS = <EmailSettingsV1> {
    id: '1',
    name: 'User 1',
    email: 'user1@conceptual.vision',
    language: 'en',
    verified: false
};

suite('EmailSettingsLambdaFunction', ()=> {
    let lambda: EmailSettingsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-emailsettings:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-emailsettings:controller:default:default:1.0',
            'emaildelivery.descriptor', 'pip-services-emaildelivery:client:null:default:1.0'
        );

        lambda = new EmailSettingsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    

    test('CRUD Operations', (done) => {
        let settings1: EmailSettingsV1;

        async.series([
        // Create email settings
            (callback) => {
                lambda.act(
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

                lambda.act(
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
                lambda.act(
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
                lambda.act(
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