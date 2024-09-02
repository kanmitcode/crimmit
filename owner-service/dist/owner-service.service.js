"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OwnerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const owner_schema_1 = require("./schemas/owner.schema");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
let OwnerService = OwnerService_1 = class OwnerService {
    constructor(ownerModel, amqpConnection) {
        this.ownerModel = ownerModel;
        this.amqpConnection = amqpConnection;
        this.logger = new common_1.Logger(OwnerService_1.name);
        this.connectToRabbitMQ();
    }
    async connectToRabbitMQ() {
        const maxRetries = 5;
        let retries = 0;
        while (retries < maxRetries) {
            try {
                await this.amqpConnection.channel.assertExchange('owner-exchange', 'topic', { durable: true });
                this.logger.log('Successfully connected to RabbitMQ');
                return;
            }
            catch (error) {
                retries++;
                this.logger.error(`Failed to connect to RabbitMQ. Attempt ${retries}/${maxRetries}`, error);
                if (retries >= maxRetries) {
                    throw new Error('Unable to connect to RabbitMQ after multiple attempts');
                }
                await this.delay(5000);
            }
        }
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async createOwner(createOwnerDto) {
        const newOwner = new this.ownerModel(createOwnerDto);
        return newOwner.save();
    }
    async updateOwner(id, updateOwnerDto) {
        const updatedOwner = await this.ownerModel.findByIdAndUpdate(id, updateOwnerDto, { new: true });
        if (!updatedOwner) {
            throw new common_1.NotFoundException(`Owner with ID ${id} not found`);
        }
        this.amqpConnection.publish('owner-exchange', 'owner.update', Object.assign({ ownerId: id }, updateOwnerDto));
        return updatedOwner;
    }
    async getOwner(id) {
        const owner = await this.ownerModel.findById(id).exec();
        if (!owner) {
            throw new common_1.NotFoundException(`Owner with ID ${id} not found`);
        }
        return owner;
    }
    async getAllOwners() {
        return this.ownerModel.find().exec();
    }
};
exports.OwnerService = OwnerService;
exports.OwnerService = OwnerService = OwnerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(owner_schema_1.Owner.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nestjs_rabbitmq_1.AmqpConnection])
], OwnerService);
//# sourceMappingURL=owner-service.service.js.map