let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/emailsettings_v1_grpc_pb');
let messages = require('../../../../src/protos/emailsettings_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { EmailNullClientV1 } from 'pip-clients-email-node';

import { EmailSettingsV1 } from '../../../src/data/version1/EmailSettingsV1';
import { EmailSettingsMemoryPersistence } from '../../../src/persistence/EmailSettingsMemoryPersistence';
import { EmailSettingsController } from '../../../src/logic/EmailSettingsController';
import { EmailSettingsGrpcServiceV1 } from '../../../src/services/version1/EmailSettingsGrpcServiceV1';
import { EmailSettingsGrpcConverterV1 } from '../../../src/services/version1/EmailSettingsGrpcConverterV1';

var grpcConfig = ConfigParams.fromTuples(
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

suite('EmailSettingsGrpcServiceV1', ()=> {
    let service: EmailSettingsGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new EmailSettingsMemoryPersistence();
        let controller = new EmailSettingsController();

        service = new EmailSettingsGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-emailsettings', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-emailsettings', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-email', 'client', 'null', 'default', '1.0'), new EmailNullClientV1(),
            new Descriptor('pip-services-emailsettings', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/emailsettings_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).emailsettings_v1.EmailSettingsx;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', (done) => {
        let settings1: EmailSettingsV1;

        async.series([
        // Create email settings
            (callback) => {
                client.set_settings(
                    {
                        settings: SETTINGS
                    },
                    (err, response) => {
                        err = err || response.error;
                        let settings = response ? response.settings : null;

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
                settings1.subscriptions = '{"engagement": true}';
                // settings1.subscriptions.engagement = true;

                client.set_settings(
                    {
                        settings: settings1 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let settings = response ? response.settings : null;

                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal(settings.id, settings1.id)

                        let subscriptions = EmailSettingsGrpcConverterV1.fromJson(settings.subscriptions);
                        assert.isTrue(subscriptions.engagement);

                        callback();
                    }
                );
            },
        // Delete settings
            (callback) => {
                client.delete_settings_by_id(
                    {
                        recipient_id: settings1.id
                    },
                    (err, response) => {
                        err = err || response.error;

                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get deleted settings
            (callback) => {
                client.get_settings_by_id(
                    {
                        recipient_id: settings1.id
                    },
                    (err, response) => {
                        err = err || response.error;
                        let settings = response ? response.settings : null;

                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});
