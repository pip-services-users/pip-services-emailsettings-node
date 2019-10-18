"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class EmailSettingsCommandableGrpcServiceV1 extends pip_services3_grpc_node_1.CommandableGrpcService {
    constructor() {
        super('v1/email_settings');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-emailsettings', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailSettingsCommandableGrpcServiceV1 = EmailSettingsCommandableGrpcServiceV1;
//# sourceMappingURL=EmailSettingsCommandableGrpcServiceV1.js.map