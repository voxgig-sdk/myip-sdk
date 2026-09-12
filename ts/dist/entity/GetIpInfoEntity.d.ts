import { MyipEntityBase } from '../MyipEntityBase';
import type { MyipSDK } from '../MyipSDK';
import type { Control } from '../types';
import type { GetIpInfo, GetIpInfoLoadMatch } from '../MyipTypes';
declare class GetIpInfoEntity extends MyipEntityBase<GetIpInfo> {
    constructor(client: MyipSDK, entopts: any);
    make(this: GetIpInfoEntity): GetIpInfoEntity;
    load(this: any, reqmatch?: GetIpInfoLoadMatch, ctrl?: Control): Promise<GetIpInfoEntity>;
}
export { GetIpInfoEntity };
