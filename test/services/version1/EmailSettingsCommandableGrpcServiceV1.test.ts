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
import { EmailSettingsCommandableGrpcServiceV1 } from '../../../src/services/version1/EmailSettingsCommandableGrpcServiceV1';

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

suite('EmailSettingsCommandableGrpcServiceV1', ()=> {
    let service: EmailSettingsCommandableGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new EmailSettingsMemoryPersistence();
        let controller = new EmailSettingsController();

        service = new EmailSettingsCommandableGrpcServiceV1();
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
            __dirname + "../../../../../node_modules/pip-services3-grpc-node/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', (done) => {
        let settings1: EmailSettingsV1;

        async.series([
        // Create email settings
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/email_settings.set_settings',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            settings: SETTINGS
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let settings = JSON.parse(response.result_json);
                        
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

                client.invoke(
                    {
                        method: 'v1/email_settings.set_settings',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            settings: settings1 
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);
                        
                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let settings = JSON.parse(response.result_json);

                        assert.isObject(settings);
                        assert.equal(settings.id, settings1.id)
                        assert.isTrue(settings.subscriptions.engagement);

                        callback();
                    }
                );
            },
        // Delete settings
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/email_settings.delete_settings_by_id',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            recipient_id: settings1.id
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isTrue(response.result_empty);

                        callback();
                    }
                );
            },
        // Try to get deleted settings
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/email_settings.get_settings_by_id',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            recipient_id: settings1.id
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isTrue(response.result_empty);

                        callback();
                    }
                );
            }
        ], done);
    });

});
