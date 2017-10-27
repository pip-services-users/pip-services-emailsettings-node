import { ConfigParams } from 'pip-services-commons-node';

import { EmailSettingsMongoDbPersistence } from '../../src/persistence/EmailSettingsMongoDbPersistence';
import { EmailSettingsPersistenceFixture } from './EmailSettingsPersistenceFixture';

suite('EmailSettingsMongoDbPersistence', ()=> {
    let persistence: EmailSettingsMongoDbPersistence;
    let fixture: EmailSettingsPersistenceFixture;

    let mongoUri = process.env['MONGO_URI'];
    let mongoHost = process.env['MONGO_HOST'] || 'localhost';
    let mongoPort = process.env['MONGO_PORT'] || 27017;
    let mongoDatabase = process.env['MONGO_DB'] || 'test';

    if (mongoUri == null && mongoHost == null)
        return;
    
    setup((done) => {
        let dbConfig = ConfigParams.fromTuples(
            'connection.uri', mongoUri,
            'connection.host', mongoHost,
            'connection.port', mongoPort,
            'connection.database', mongoDatabase
        );

        persistence = new EmailSettingsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new EmailSettingsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});