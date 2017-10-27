import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class EmailSettingsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('email_settings');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emailsettings', 'controller', 'default', '*', '1.0'));
    }
}