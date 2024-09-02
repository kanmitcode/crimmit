import { Model } from 'mongoose';
import { Owner, OwnerDocument } from './schemas/owner.schema';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
export declare class OwnerService {
    private ownerModel;
    private readonly amqpConnection;
    private readonly logger;
    constructor(ownerModel: Model<OwnerDocument>, amqpConnection: AmqpConnection);
    private connectToRabbitMQ;
    private delay;
    createOwner(createOwnerDto: CreateOwnerDto): Promise<Owner>;
    updateOwner(id: string, updateOwnerDto: UpdateOwnerDto): Promise<Owner>;
    getOwner(id: string): Promise<Owner>;
    getAllOwners(): Promise<Owner[]>;
}
