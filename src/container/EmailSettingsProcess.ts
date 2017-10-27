import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { EmailSettingsServiceFactory } from '../build/EmailSettingsServiceFactory';

export class EmailSettingsProcess extends ProcessContainer {

    public constructor() {
        super("email_settings", "Email settings microservice");
        this._factories.add(new EmailSettingsServiceFactory);
    }


}
