"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerServiceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const owner_service_service_1 = require("./owner-service.service");
const owner_service_controller_1 = require("./owner-service.controller");
const owner_schema_1 = require("./schemas/owner.schema");
const owner_grpc_server_1 = require("./owner.grpc.server");
const rabbitmq_config_1 = require("./rabbitmq.config");
let OwnerServiceModule = class OwnerServiceModule {
};
exports.OwnerServiceModule = OwnerServiceModule;
exports.OwnerServiceModule = OwnerServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: owner_schema_1.Owner.name, schema: owner_schema_1.OwnerSchema }]),
            rabbitmq_config_1.RabbitMQConfig,
        ],
        controllers: [owner_service_controller_1.OwnerController, owner_grpc_server_1.OwnerGrpcController],
        providers: [owner_service_service_1.OwnerService],
    })
], OwnerServiceModule);
//# sourceMappingURL=owner-service.module.js.map