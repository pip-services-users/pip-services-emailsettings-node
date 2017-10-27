# Seneca Protocol (version 1) <br/> Email Settings Microservice

Email settings microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        protocol: 'tcp', // Microservice seneca protocol
        host: 'localhost', // Microservice localhost
        port: 8805, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'email',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```
* [EmailSettingsV1 class](#class1)
* [cmd: 'get_settings_by_id'](#operation1)
* [cmd: 'get_settings_by_email'](#operation2)
* [cmd: 'set_settings'](#operation3)
* [cmd: 'set_recipient'](#operation4)
* [cmd: 'set_subscriptions'](#operation5)
* [cmd: 'delete_settings_by_id'](#operation6)
* [cmd: 'resend_verification'](#operation7)
* [cmd: 'verify_email'](#operation8)

## Data types

### <a name="class1"></a> EmailSettingsV1 class

Represents a user email settings with his ID, primary email and key settings.

**Properties:**
- id: string - unique user id
- name: string - user full name
- email: string - primary user email
- language: string - user preferred language
- verified: boolean - true if email was verified
- ver_code: - email verification code that was sent in email message to the user
- ver\_expire\_time: Date - expiration time for email verification code
- subscriptions: Object - subscriptions to enable or disable certain types of email messages
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)


## Operations

### <a name="operation1"></a> Cmd: 'get\_settings\_by_id'

Retrieves email settings by recipient unique id. 

**Arguments:** 
- recipient_id: string - unique receipient id

**Returns:**
- err: Error - occured error or null for success
- result: EmailSettingsV1 - retrieved EmailSettings object

### <a name="operation2"></a> Cmd: 'get\_settings\_by_email'

Retrieves email settings by recipient email. 

**Arguments:** 
- email: string - email address

**Returns:**
- err: Error - occured error or null for success
- result: EmailSettingsV1 - retrieved EmailSettings object

### <a name="operation3"></a> Cmd: 'set_settings'

Sets recipient email settings

**Arguments:** 
- settings: EmailSettingsV1 -  email settings to be set

**Returns:**
- err: Error - occured error or null for success
- result: EmailSettingsV1 - set EmailSettings object

### <a name="operation4"></a> Cmd: 'set_recipient'

Sets recipient information into email settings.
If some properties are not set, they keep their old values.

**Arguments:** 
- recipient_id: string - recipient unique id
- name: string - recipient full name
- email: string - recipient email address
- language: string - recipient preferred language

**Returns:**
- err: Error - occured error or null for success
- result: EmailSettingsV1 - set EmailSettings object

### <a name="operation5"></a> Cmd: 'set_subscriptions'

Sets subscriptions to specific email types.

**Arguments:** 
- recipient_id: string - recipient unique id
- subscriptions: any - subscriptions hashmap where email types are enabled or disabled

**Returns:**
- err: Error - occured error or null for success
- result: EmailSettingsV1 - set EmailSettings object

### <a name="operation6"></a> Cmd: 'delete\_settings\_by_id'

Deletes email settings from the system (use it carefully!)

**Arguments:** 
- recipient_id: string - recipient unique id

**Returns:**
- err: Error - occured error or null for success

### <a name="operation7"></a> Cmd: 'resend_verification'

Generates a new email verification code and sends it to recipient via email message.
Initial verification code is send in welcome message during user registration.

**Arguments:** 
- recipient_id: string - recipient unique id

**Returns:**
- err: Error - occured error or null for success

### <a name="operation8"></a> Cmd: 'verify_email'

Confirms (verifies) primary email address using verification code.

**Arguments:** 
- recipient_id: string - recipient unique id
- code: string - password recovery code

**Returns:**
- err: Error - occured error or null for success
