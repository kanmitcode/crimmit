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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerGrpcController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const owner_service_service_1 = require("./owner-service.service");
let OwnerGrpcController = class OwnerGrpcController {
    constructor(ownerService) {
        this.ownerService = ownerService;
    }
    async getOwner(data) {
        const owner = (await this.ownerService.getOwner(data.id));
        return {
            id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName,
            email: owner.email,
            address: owner.address,
            phone: owner.phone,
        };
    }
    async updateOwner(data) {
        const updatedOwner = (await this.ownerService.updateOwner(data.id, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            address: data.address,
            phone: data.phone,
        }));
        return {
            id: updatedOwner.id,
            firstName: updatedOwner.firstName,
            lastName: updatedOwner.lastName,
            email: updatedOwner.email,
            address: updatedOwner.address,
            phone: updatedOwner.phone,
        };
    }
};
exports.OwnerGrpcController = OwnerGrpcController;
__decorate([
    (0, microservices_1.GrpcMethod)('OwnerService', 'GetOwner'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OwnerGrpcController.prototype, "getOwner", null);
__decorate([
    (0, microservices_1.GrpcMethod)('OwnerService', 'UpdateOwner'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OwnerGrpcController.prototype, "updateOwner", null);
exports.OwnerGrpcController = OwnerGrpcController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [owner_service_service_1.OwnerService])
], OwnerGrpcController);
//# sourceMappingURL=owner.grpc.server.js.map