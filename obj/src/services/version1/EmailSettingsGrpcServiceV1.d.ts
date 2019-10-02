import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class EmailSettingsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getSettingsByIds;
    private getSettingsById;
    private getSettingsByEmail;
    private setSettings;
    private setVerifiedSettings;
    private setRecipient;
    private setSubscriptions;
    private deleteSettingsById;
    private resendVerification;
    private verifyEmail;
    register(): void;
}
