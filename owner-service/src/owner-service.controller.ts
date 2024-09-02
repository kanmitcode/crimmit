import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { OwnerService } from './owner-service.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './schemas/owner.schema';

@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  async createOwner(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownerService.createOwner(createOwnerDto);
  }

  @Get(':id')
  async getOwner(@Param('id') id: string): Promise<Owner> {
    return this.ownerService.getOwner(id);
  }

  @Put(':id')
  async updateOwner(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ): Promise<Owner> {
    return this.ownerService.updateOwner(id, updateOwnerDto);
  }

  @Get()
  async getAllOwners(): Promise<Owner[]> {
    return this.ownerService.getAllOwners();
  }
}
