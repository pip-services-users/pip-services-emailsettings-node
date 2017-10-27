import { EmailSettingsMemoryPersistence } from '../../src/persistence/EmailSettingsMemoryPersistence';
import { EmailSettingsPersistenceFixture } from './EmailSettingsPersistenceFixture';

suite('EmailSettingsMemoryPersistence', ()=> {
    let persistence: EmailSettingsMemoryPersistence;
    let fixture: EmailSettingsPersistenceFixture;
    
    setup((done) => {
        persistence = new EmailSettingsMemoryPersistence();
        fixture = new EmailSettingsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});