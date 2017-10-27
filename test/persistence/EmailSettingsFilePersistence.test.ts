import { ConfigParams } from 'pip-services-commons-node';

import { EmailSettingsFilePersistence } from '../../src/persistence/EmailSettingsFilePersistence';
import { EmailSettingsPersistenceFixture } from './EmailSettingsPersistenceFixture';

suite('EmailSettingsFilePersistence', ()=> {
    let persistence: EmailSettingsFilePersistence;
    let fixture: EmailSettingsPersistenceFixture;
    
    setup((done) => {
        persistence = new EmailSettingsFilePersistence('./data/email_settings.test.json');

        fixture = new EmailSettingsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});