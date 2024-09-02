import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner, OwnerDocument } from './schemas/owner.schema';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OwnerService {
  private readonly logger = new Logger(OwnerService.name);

  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
    private readonly amqpConnection: AmqpConnection,
  ) {
    this.connectToRabbitMQ();
  }

  private async connectToRabbitMQ() {
    const maxRetries = 5;
    let retries = 0;
    while (retries < maxRetries) {
      try {
        await this.amqpConnection.channel.assertExchange(
          'owner-exchange',
          'topic',
          { durable: true },
        );
        this.logger.log('Successfully connected to RabbitMQ');
        return;
      } catch (error) {
        retries++;
        this.logger.error(
          `Failed to connect to RabbitMQ. Attempt ${retries}/${maxRetries}`,
          error,
        );
        if (retries >= maxRetries) {
          throw new Error(
            'Unable to connect to RabbitMQ after multiple attempts',
          );
        }
        await this.delay(5000); // Wait before retrying
      }
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async createOwner(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const newOwner = new this.ownerModel(createOwnerDto);
    return newOwner.save();
  }

  async updateOwner(
    id: string,
    updateOwnerDto: UpdateOwnerDto,
  ): Promise<Owner> {
    const updatedOwner = await this.ownerModel.findByIdAndUpdate(
      id,
      updateOwnerDto,
      { new: true },
    );

    if (!updatedOwner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    // Emit an event to RabbitMQ when the owner profile is updated
    this.amqpConnection.publish('owner-exchange', 'owner.update', {
      ownerId: id,
      ...updateOwnerDto,
    });

    return updatedOwner;
  }

  async getOwner(id: string): Promise<Owner> {
    const owner = await this.ownerModel.findById(id).exec();
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return owner;
  }

  async getAllOwners(): Promise<Owner[]> {
    return this.ownerModel.find().exec();
  }
}
