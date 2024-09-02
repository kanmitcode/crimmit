import { OwnerService } from './owner-service.service';
import { GetOwnerRequest, GetOwnerResponse, UpdateOwnerRequest, UpdateOwnerResponse } from './interfaces/owner.interface';
export declare class OwnerGrpcController {
    private readonly ownerService;
    constructor(ownerService: OwnerService);
    getOwner(data: GetOwnerRequest): Promise<GetOwnerResponse>;
    updateOwner(data: UpdateOwnerRequest): Promise<UpdateOwnerResponse>;
}
