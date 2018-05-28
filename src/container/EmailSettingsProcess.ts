import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { ActivitiesClientFactory } from 'pip-clients-activities-node';
import { MessageTemplatesClientFactory } from 'pip-clients-msgtemplates-node';

import { EmailSettingsServiceFactory } from '../build/EmailSettingsServiceFactory';

export class EmailSettingsProcess extends ProcessContainer {

    public constructor() {
        super("email_settings", "Email settings microservice");
        this._factories.add(new EmailSettingsServiceFactory);
        this._factories.add(new ActivitiesClientFactory());
        this._factories.add(new MessageTemplatesClientFactory());
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }


}
