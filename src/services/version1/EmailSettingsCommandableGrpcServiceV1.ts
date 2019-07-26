import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class EmailSettingsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/email_settings');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emailsettings', 'controller', 'default', '*', '1.0'));
    }
}