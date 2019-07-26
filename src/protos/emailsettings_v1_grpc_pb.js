// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var emailsettings_v1_pb = require('./emailsettings_v1_pb.js');

function serialize_emailsettings_v1_EmailSettingsCodeRequest(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsCodeRequest)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsCodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsCodeRequest(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsCodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_emailsettings_v1_EmailSettingsEmailRequest(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsEmailRequest)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsEmailRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsEmailRequest(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsEmailRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_emailsettings_v1_EmailSettingsEmptyReply(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsEmptyReply)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsEmptyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsEmptyReply(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsEmptyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_emailsettings_v1_EmailSettingsIdRequest(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsIdRequest)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsIdRequest(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_emailsettings_v1_EmailSettingsIdsRequest(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsIdsRequest)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsIdsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsIdsRequest(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsIdsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_emailsettings_v1_EmailSettingsListReply(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsListReply)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsListReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsListReply(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsListReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_emailsettings_v1_EmailSettingsObjectReply(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsObjectReply)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsObjectReply(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_emailsettings_v1_EmailSettingsObjectRequest(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsObjectRequest)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsObjectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsObjectRequest(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsObjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_emailsettings_v1_EmailSettingsRecipientRequest(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsRecipientRequest)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsRecipientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsRecipientRequest(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsRecipientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_emailsettings_v1_EmailSettingsSubscriptionsRequest(arg) {
  if (!(arg instanceof emailsettings_v1_pb.EmailSettingsSubscriptionsRequest)) {
    throw new Error('Expected argument of type emailsettings_v1.EmailSettingsSubscriptionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_emailsettings_v1_EmailSettingsSubscriptionsRequest(buffer_arg) {
  return emailsettings_v1_pb.EmailSettingsSubscriptionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The emailsettings service definition.
var EmailSettingsxService = exports.EmailSettingsxService = {
  get_settings_by_ids: {
    path: '/emailsettings_v1.EmailSettingsx/get_settings_by_ids',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsIdsRequest,
    responseType: emailsettings_v1_pb.EmailSettingsListReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsIdsRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsIdsRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsListReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsListReply,
  },
  get_settings_by_id: {
    path: '/emailsettings_v1.EmailSettingsx/get_settings_by_id',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsIdRequest,
    responseType: emailsettings_v1_pb.EmailSettingsObjectReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsIdRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsIdRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsObjectReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsObjectReply,
  },
  get_settings_by_email: {
    path: '/emailsettings_v1.EmailSettingsx/get_settings_by_email',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsEmailRequest,
    responseType: emailsettings_v1_pb.EmailSettingsObjectReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsEmailRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsEmailRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsObjectReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsObjectReply,
  },
  set_settings: {
    path: '/emailsettings_v1.EmailSettingsx/set_settings',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsObjectRequest,
    responseType: emailsettings_v1_pb.EmailSettingsObjectReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsObjectRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsObjectRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsObjectReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsObjectReply,
  },
  set_verified_settings: {
    path: '/emailsettings_v1.EmailSettingsx/set_verified_settings',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsObjectRequest,
    responseType: emailsettings_v1_pb.EmailSettingsObjectReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsObjectRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsObjectRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsObjectReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsObjectReply,
  },
  set_recipient: {
    path: '/emailsettings_v1.EmailSettingsx/set_recipient',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsRecipientRequest,
    responseType: emailsettings_v1_pb.EmailSettingsObjectReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsRecipientRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsRecipientRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsObjectReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsObjectReply,
  },
  set_subscriptions: {
    path: '/emailsettings_v1.EmailSettingsx/set_subscriptions',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsSubscriptionsRequest,
    responseType: emailsettings_v1_pb.EmailSettingsObjectReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsSubscriptionsRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsSubscriptionsRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsObjectReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsObjectReply,
  },
  delete_settings_by_id: {
    path: '/emailsettings_v1.EmailSettingsx/delete_settings_by_id',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsIdRequest,
    responseType: emailsettings_v1_pb.EmailSettingsEmptyReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsIdRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsIdRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsEmptyReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsEmptyReply,
  },
  resend_verification: {
    path: '/emailsettings_v1.EmailSettingsx/resend_verification',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsIdRequest,
    responseType: emailsettings_v1_pb.EmailSettingsEmptyReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsIdRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsIdRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsEmptyReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsEmptyReply,
  },
  verify_email: {
    path: '/emailsettings_v1.EmailSettingsx/verify_email',
    requestStream: false,
    responseStream: false,
    requestType: emailsettings_v1_pb.EmailSettingsCodeRequest,
    responseType: emailsettings_v1_pb.EmailSettingsEmptyReply,
    requestSerialize: serialize_emailsettings_v1_EmailSettingsCodeRequest,
    requestDeserialize: deserialize_emailsettings_v1_EmailSettingsCodeRequest,
    responseSerialize: serialize_emailsettings_v1_EmailSettingsEmptyReply,
    responseDeserialize: deserialize_emailsettings_v1_EmailSettingsEmptyReply,
  },
};

exports.EmailSettingsxClient = grpc.makeGenericClientConstructor(EmailSettingsxService);
