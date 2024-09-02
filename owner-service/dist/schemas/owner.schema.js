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
exports.OwnerSchema = exports.Owner = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Owner = class Owner {
};
exports.Owner = Owner;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", Object)
], Owner.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", Object)
], Owner.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", Object)
], Owner.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", Object)
], Owner.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", Object)
], Owner.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Owner.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Owner.prototype, "updatedAt", void 0);
exports.Owner = Owner = __decorate([
    (0, mongoose_1.Schema)()
], Owner);
exports.OwnerSchema = mongoose_1.SchemaFactory.createForClass(Owner);
exports.OwnerSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
exports.OwnerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
exports.OwnerSchema.set('toJSON', {
    virtuals: true,
});
//# sourceMappingURL=owner.schema.js.map