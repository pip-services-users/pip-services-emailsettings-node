let EmailSettingsLambdaFunction = require('../obj/src/container/EmailSettingsLambdaFunction').EmailSettingsLambdaFunction;

module.exports = new EmailSettingsLambdaFunction().getHandler();