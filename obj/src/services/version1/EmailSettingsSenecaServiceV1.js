"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class EmailSettingsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('email_settings');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-emailsettings', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailSettingsSenecaServiceV1 = EmailSettingsSenecaServiceV1;
//# sourceMappingURL=EmailSettingsSenecaServiceV1.js.map