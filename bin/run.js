let EmailSettingsProcess = require('../obj/src/container/EmailSettingsProcess').EmailSettingsProcess;

try {
    new EmailSettingsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
