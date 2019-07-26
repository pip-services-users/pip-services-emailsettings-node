let async = require('async');
let assert = require('chai').assert;

import { EmailSettingsV1 } from '../../src/data/version1/EmailSettingsV1';
import { IEmailSettingsPersistence } from '../../src/persistence/IEmailSettingsPersistence';

let SETTINGS1 = <EmailSettingsV1> {
    id: '1',
    name: 'User 1',
    email: 'user1@conceptual.vision',
    language: 'en',
    verified: false,
    ver_code: null,
    subscriptions: { notifications: true, ads: false }
};
let SETTINGS2 = <EmailSettingsV1> {
    id: '2',
    name: 'User 2',
    email: 'user2@conceptual.vision',
    language: 'en',
    verified: false,
    ver_code: null,
    subscriptions: { notifications: true, ads: true }
};
let SETTINGS3 = <EmailSettingsV1> {
    id: '3',
    name: 'User 3',
    email: 'user3@conceptual.vision',
    language: 'en',
    verified: false,
    ver_code: null,
    subscriptions: { notifications: false, ads: false }
};

export class EmailSettingsPersistenceFixture {
    private _persistence: IEmailSettingsPersistence;
    
    constructor(persistence: IEmailSettingsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
                
    testCrudOperations(done) {
        let settings1: EmailSettingsV1;

        async.series([
        // Create items
            (callback) => {
                this._persistence.set(
                    null,
                    SETTINGS1,
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal(settings.id, SETTINGS1.id);
                        assert.equal(settings.email, SETTINGS1.email);
                        assert.isFalse(settings.verified);
                        assert.isNull(settings.ver_code || null);

                        callback();
                    }
                );
            },
        // Get settings by email
            (callback) => {
                this._persistence.getOneByEmail(
                    null,
                    SETTINGS1.email,
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal(settings.id, SETTINGS1.id);
                        
                        settings1 = settings;

                        callback();
                    }
                );
            },
        // Update settings
            (callback) => {
                settings1.email = 'newuser@conceptual.vision';

                this._persistence.set(
                    null,
                    settings1,
                    (err, settings) => {
                        assert.isNull(err);
                        
                        assert.isObject(settings);
                        assert.equal(settings.id, SETTINGS1.id)
                        assert.isFalse(settings.verified);
                        assert.equal(settings.email, 'newuser@conceptual.vision');

                        callback();
                    }
                );
            },
        // Try to get deleted settings
            (callback) => {
                this._persistence.getListByIds(
                    null,
                    [ SETTINGS1.id ],
                    (err, settings) => {
                        assert.isNull(err);

                        assert.lengthOf(settings, 1);

                        callback();
                    }
                );
            },
        // Delete settings
            (callback) => {
                this._persistence.deleteById(
                    null,
                    SETTINGS1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get deleted settings
            (callback) => {
                this._persistence.getOneById(
                    null,
                    SETTINGS1.id,
                    (err, settings) => {
                        assert.isNull(err);

                        assert.isNull(settings || null);

                        callback();
                    }
                );
            }
        ], done);
    }

}
