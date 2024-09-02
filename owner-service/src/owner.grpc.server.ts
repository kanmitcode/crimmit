import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OwnerService } from './owner-service.service';
import {
  GetOwnerRequest,
  GetOwnerResponse,
  UpdateOwnerRequest,
  UpdateOwnerResponse,
  Owner,
} from './interfaces/owner.interface';

@Controller()
export class OwnerGrpcController {
  constructor(private readonly ownerService: OwnerService) {}

  @GrpcMethod('OwnerService', 'GetOwner')
  async getOwner(data: GetOwnerRequest): Promise<GetOwnerResponse> {
    const owner: Owner = (await this.ownerService.getOwner(data.id)) as Owner;
    return {
      id: owner.id,
      firstName: owner.firstName,
      lastName: owner.lastName,
      email: owner.email,
      address: owner.address,
      phone: owner.phone,
    };
  }

  @GrpcMethod('OwnerService', 'UpdateOwner')
  async updateOwner(data: UpdateOwnerRequest): Promise<UpdateOwnerResponse> {
    const updatedOwner: Owner = (await this.ownerService.updateOwner(data.id, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      phone: data.phone,
    })) as Owner;
    return {
      id: updatedOwner.id,
      firstName: updatedOwner.firstName,
      lastName: updatedOwner.lastName,
      email: updatedOwner.email,
      address: updatedOwner.address,
      phone: updatedOwner.phone,
    };
  }
}
