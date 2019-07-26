// package: emailsettings_v1
// file: emailsettings_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class EmailSettings extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  getSubscriptions(): string;
  setSubscriptions(value: string): void;

  getVerified(): boolean;
  setVerified(value: boolean): void;

  getVerCode(): string;
  setVerCode(value: string): void;

  getVerExpireTime(): string;
  setVerExpireTime(value: string): void;

  getCustomHdr(): string;
  setCustomHdr(value: string): void;

  getCustomDat(): string;
  setCustomDat(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettings.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettings): EmailSettings.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettings;
  static deserializeBinaryFromReader(message: EmailSettings, reader: jspb.BinaryReader): EmailSettings;
}

export namespace EmailSettings {
  export type AsObject = {
    id: string,
    name: string,
    email: string,
    language: string,
    subscriptions: string,
    verified: boolean,
    verCode: string,
    verExpireTime: string,
    customHdr: string,
    customDat: string,
  }
}

export class EmailSettingsPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<EmailSettings>;
  setDataList(value: Array<EmailSettings>): void;
  addData(value?: EmailSettings, index?: number): EmailSettings;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsPage.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsPage): EmailSettingsPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsPage;
  static deserializeBinaryFromReader(message: EmailSettingsPage, reader: jspb.BinaryReader): EmailSettingsPage;
}

export namespace EmailSettingsPage {
  export type AsObject = {
    total: number,
    dataList: Array<EmailSettings.AsObject>,
  }
}

export class EmailSettingsIdsRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  clearRecipientIdsList(): void;
  getRecipientIdsList(): Array<string>;
  setRecipientIdsList(value: Array<string>): void;
  addRecipientIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsIdsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsIdsRequest): EmailSettingsIdsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsIdsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsIdsRequest;
  static deserializeBinaryFromReader(message: EmailSettingsIdsRequest, reader: jspb.BinaryReader): EmailSettingsIdsRequest;
}

export namespace EmailSettingsIdsRequest {
  export type AsObject = {
    correlationId: string,
    recipientIdsList: Array<string>,
  }
}

export class EmailSettingsListReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  clearSettingsList(): void;
  getSettingsList(): Array<EmailSettings>;
  setSettingsList(value: Array<EmailSettings>): void;
  addSettings(value?: EmailSettings, index?: number): EmailSettings;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsListReply.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsListReply): EmailSettingsListReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsListReply;
  static deserializeBinaryFromReader(message: EmailSettingsListReply, reader: jspb.BinaryReader): EmailSettingsListReply;
}

export namespace EmailSettingsListReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    settingsList: Array<EmailSettings.AsObject>,
  }
}

export class EmailSettingsIdRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getRecipientId(): string;
  setRecipientId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsIdRequest): EmailSettingsIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsIdRequest;
  static deserializeBinaryFromReader(message: EmailSettingsIdRequest, reader: jspb.BinaryReader): EmailSettingsIdRequest;
}

export namespace EmailSettingsIdRequest {
  export type AsObject = {
    correlationId: string,
    recipientId: string,
  }
}

export class EmailSettingsEmailRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsEmailRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsEmailRequest): EmailSettingsEmailRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsEmailRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsEmailRequest;
  static deserializeBinaryFromReader(message: EmailSettingsEmailRequest, reader: jspb.BinaryReader): EmailSettingsEmailRequest;
}

export namespace EmailSettingsEmailRequest {
  export type AsObject = {
    correlationId: string,
    email: string,
  }
}

export class EmailSettingsObjectRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasSettings(): boolean;
  clearSettings(): void;
  getSettings(): EmailSettings | undefined;
  setSettings(value?: EmailSettings): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsObjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsObjectRequest): EmailSettingsObjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsObjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsObjectRequest;
  static deserializeBinaryFromReader(message: EmailSettingsObjectRequest, reader: jspb.BinaryReader): EmailSettingsObjectRequest;
}

export namespace EmailSettingsObjectRequest {
  export type AsObject = {
    correlationId: string,
    settings?: EmailSettings.AsObject,
  }
}

export class EmailSettingsObjectReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasSettings(): boolean;
  clearSettings(): void;
  getSettings(): EmailSettings | undefined;
  setSettings(value?: EmailSettings): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsObjectReply.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsObjectReply): EmailSettingsObjectReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsObjectReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsObjectReply;
  static deserializeBinaryFromReader(message: EmailSettingsObjectReply, reader: jspb.BinaryReader): EmailSettingsObjectReply;
}

export namespace EmailSettingsObjectReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    settings?: EmailSettings.AsObject,
  }
}

export class EmailSettingsRecipientRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getRecipientId(): string;
  setRecipientId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsRecipientRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsRecipientRequest): EmailSettingsRecipientRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsRecipientRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsRecipientRequest;
  static deserializeBinaryFromReader(message: EmailSettingsRecipientRequest, reader: jspb.BinaryReader): EmailSettingsRecipientRequest;
}

export namespace EmailSettingsRecipientRequest {
  export type AsObject = {
    correlationId: string,
    recipientId: string,
    name: string,
    email: string,
    language: string,
  }
}

export class EmailSettingsSubscriptionsRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getRecipientId(): string;
  setRecipientId(value: string): void;

  getSubscriptions(): string;
  setSubscriptions(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsSubscriptionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsSubscriptionsRequest): EmailSettingsSubscriptionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsSubscriptionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsSubscriptionsRequest;
  static deserializeBinaryFromReader(message: EmailSettingsSubscriptionsRequest, reader: jspb.BinaryReader): EmailSettingsSubscriptionsRequest;
}

export namespace EmailSettingsSubscriptionsRequest {
  export type AsObject = {
    correlationId: string,
    recipientId: string,
    subscriptions: string,
  }
}

export class EmailSettingsCodeRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getRecipientId(): string;
  setRecipientId(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsCodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsCodeRequest): EmailSettingsCodeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsCodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsCodeRequest;
  static deserializeBinaryFromReader(message: EmailSettingsCodeRequest, reader: jspb.BinaryReader): EmailSettingsCodeRequest;
}

export namespace EmailSettingsCodeRequest {
  export type AsObject = {
    correlationId: string,
    recipientId: string,
    code: string,
  }
}

export class EmailSettingsEmptyReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailSettingsEmptyReply.AsObject;
  static toObject(includeInstance: boolean, msg: EmailSettingsEmptyReply): EmailSettingsEmptyReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailSettingsEmptyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailSettingsEmptyReply;
  static deserializeBinaryFromReader(message: EmailSettingsEmptyReply, reader: jspb.BinaryReader): EmailSettingsEmptyReply;
}

export namespace EmailSettingsEmptyReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
  }
}

