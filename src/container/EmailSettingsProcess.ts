import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { ActivitiesClientFactory } from 'pip-clients-activities-node';
import { MessageTemplatesClientFactory } from 'pip-clients-msgtemplates-node';
import { EmailClientFactory } from 'pip-clients-email-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { EmailSettingsServiceFactory } from '../build/EmailSettingsServiceFactory';

export class EmailSettingsProcess extends ProcessContainer {

    public constructor() {
        super("email_settings", "Email settings microservice");
        this._factories.add(new EmailSettingsServiceFactory);
        this._factories.add(new ActivitiesClientFactory());
        this._factories.add(new MessageTemplatesClientFactory());
        this._factories.add(new EmailClientFactory());
        this._factories.add(new DefaultRpcFactory());
    }


}
