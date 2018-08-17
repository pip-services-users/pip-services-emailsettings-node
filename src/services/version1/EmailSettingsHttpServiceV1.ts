import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class EmailSettingsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/email_settings');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emailsettings', 'controller', 'default', '*', '1.0'));
    }
}