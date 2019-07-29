import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class EmailSettingsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getSettingsByIds(call, callback);
    private getSettingsById(call, callback);
    private getSettingsByEmail(call, callback);
    private setSettings(call, callback);
    private setVerifiedSettings(call, callback);
    private setRecipient(call, callback);
    private setSubscriptions(call, callback);
    private deleteSettingsById(call, callback);
    private resendVerification(call, callback);
    private verifyEmail(call, callback);
    register(): void;
}
