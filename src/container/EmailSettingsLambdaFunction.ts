import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { EmailSettingsServiceFactory } from '../build/EmailSettingsServiceFactory';

import { EmailClientFactory } from 'pip-clients-email-node';
import { MessageTemplatesClientFactory } from 'pip-clients-msgtemplates-node';
import { ActivitiesClientFactory } from 'pip-clients-activities-node';

export class EmailSettingsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("email_settings", "Email settings function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emailsettings', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailSettingsServiceFactory());
        this._factories.add(new EmailClientFactory());
        this._factories.add(new MessageTemplatesClientFactory());
        this._factories.add(new ActivitiesClientFactory());
    }
}

export const handler = new EmailSettingsLambdaFunction().getHandler();