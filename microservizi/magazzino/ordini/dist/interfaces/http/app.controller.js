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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const supplyOrder_repository_impl_1 = require("../../infrastructure/adapters/mongo_db/supplyOrder.repository.impl");
const internalOrder_repository_impl_1 = require("../../infrastructure/adapters/mongo_db/internalOrder.repository.impl");
const externalOrder_repository_impl_1 = require("../../infrastructure/adapters/mongo_db/externalOrder.repository.impl");
const concreteSupplyOrder_1 = require("../../domain/core/concreteSupplyOrder");
const concreteInternalOrder_1 = require("../../domain/core/concreteInternalOrder");
const concreteExternalOrder_1 = require("../../domain/core/concreteExternalOrder");
let OrderController = class OrderController {
    supplyOrderRepo;
    internalOrderRepo;
    externalOrderRepo;
    constructor(supplyOrderRepo, internalOrderRepo, externalOrderRepo) {
        this.supplyOrderRepo = supplyOrderRepo;
        this.internalOrderRepo = internalOrderRepo;
        this.externalOrderRepo = externalOrderRepo;
    }
    async getAllSupplyOrders() {
        return await this.supplyOrderRepo.getAllOrders();
    }
    async getAllInternalOrders() {
        return await this.internalOrderRepo.getAllOrders();
    }
    async getAllExternalOrders() {
        return await this.externalOrderRepo.getAllOrders();
    }
    async getSupplyOrder(id) {
        return await this.supplyOrderRepo.getOrder(Number(id));
    }
    async getInternalOrder(id) {
        return await this.internalOrderRepo.getOrder(Number(id));
    }
    async getExternalOrder(id) {
        return await this.externalOrderRepo.getOrder(Number(id));
    }
    async insertSupplyOrder(order) {
        return await this.supplyOrderRepo.insertOrder(order);
    }
    async insertInternalOrder(order) {
        return await this.internalOrderRepo.insertOrder(order);
    }
    async insertExternalOrder(order) {
        return await this.externalOrderRepo.insertOrder(order);
    }
    async cancelSupplyOrder(id) {
        return await this.supplyOrderRepo.cancelOrder(Number(id));
    }
    async cancelInternalOrder(id) {
        return await this.internalOrderRepo.cancelOrder(Number(id));
    }
    async cancelExternalOrder(id) {
        return await this.externalOrderRepo.cancelOrder(Number(id));
    }
    async setSupplyOrderState(id, body) {
        return await this.supplyOrderRepo.setOrderState(Number(id), body.newState);
    }
    async setInternalOrderState(id, body) {
        return await this.internalOrderRepo.setOrderState(Number(id), body.newState);
    }
    async setExternalOrderState(id, body) {
        return await this.externalOrderRepo.setOrderState(Number(id), body.newState);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)('supply'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllSupplyOrders", null);
__decorate([
    (0, common_1.Get)('internal'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllInternalOrders", null);
__decorate([
    (0, common_1.Get)('external'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllExternalOrders", null);
__decorate([
    (0, common_1.Get)('supply/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getSupplyOrder", null);
__decorate([
    (0, common_1.Get)('internal/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getInternalOrder", null);
__decorate([
    (0, common_1.Get)('external/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getExternalOrder", null);
__decorate([
    (0, common_1.Post)('supply'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [concreteSupplyOrder_1.ConcreteSupplyOrder]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "insertSupplyOrder", null);
__decorate([
    (0, common_1.Post)('internal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [concreteInternalOrder_1.ConcreteInternalOrder]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "insertInternalOrder", null);
__decorate([
    (0, common_1.Post)('external'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [concreteExternalOrder_1.ConcreteExternalOrder]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "insertExternalOrder", null);
__decorate([
    (0, common_1.Patch)('supply/:id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelSupplyOrder", null);
__decorate([
    (0, common_1.Patch)('internal/:id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelInternalOrder", null);
__decorate([
    (0, common_1.Patch)('external/:id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelExternalOrder", null);
__decorate([
    (0, common_1.Patch)('supply/:id/state'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "setSupplyOrderState", null);
__decorate([
    (0, common_1.Patch)('internal/:id/state'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "setInternalOrderState", null);
__decorate([
    (0, common_1.Patch)('external/:id/state'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "setExternalOrderState", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [supplyOrder_repository_impl_1.SupplyOrderRepositoryMongo,
        internalOrder_repository_impl_1.InternalOrderRepositoryMongo,
        externalOrder_repository_impl_1.ExternalOrderRepositoryMongo])
], OrderController);
//# sourceMappingURL=app.controller.js.map