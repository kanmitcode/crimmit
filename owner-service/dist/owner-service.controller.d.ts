import { OwnerService } from './owner-service.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './schemas/owner.schema';
export declare class OwnerController {
    private readonly ownerService;
    constructor(ownerService: OwnerService);
    createOwner(createOwnerDto: CreateOwnerDto): Promise<Owner>;
    getOwner(id: string): Promise<Owner>;
    updateOwner(id: string, updateOwnerDto: UpdateOwnerDto): Promise<Owner>;
    getAllOwners(): Promise<Owner[]>;
}
