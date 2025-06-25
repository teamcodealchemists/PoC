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
exports.InternalOrderRepositoryMongo = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const concreteInternalOrder_1 = require("../../../domain/core/concreteInternalOrder");
const internalOrder_schema_1 = require("../../schemas/internalOrder.schema");
const orderState_enum_1 = require("../../../domain/core/orderState.enum");
let InternalOrderRepositoryMongo = class InternalOrderRepositoryMongo {
    orderModel;
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async getOrder(orderId) {
        const doc = await this.orderModel.findOne({ orderID: orderId }).exec();
        return doc ? this.toDomain(doc) : null;
    }
    async insertOrder(order) {
        const created = new this.orderModel(order);
        const saved = await created.save();
        return this.toDomain(saved);
    }
    async cancelOrder(orderId) {
        const order = await this.orderModel.findOne({ orderID: orderId }).exec();
        if (!order)
            return false;
        if (order.orderState === orderState_enum_1.OrderState.PENDING ||
            order.orderState === orderState_enum_1.OrderState.PROCESSING) {
            order.orderState = orderState_enum_1.OrderState.CANCELLED;
            await order.save();
            return true;
        }
        return false;
    }
    async setOrderState(orderId, newState) {
        const result = await this.orderModel.updateOne({ orderID: orderId }, { orderState: newState });
        return result.modifiedCount > 0;
    }
    async getAllOrders() {
        const docs = await this.orderModel.find().exec();
        return docs.map(doc => this.toDomain(doc));
    }
    toDomain(doc) {
        return new concreteInternalOrder_1.ConcreteInternalOrder(doc.orderID, doc.orderState, doc.creationDate, doc.timeToArrive, doc.idProduct, doc.quantity, doc.warehouseDestination, doc.warehouseDeparture);
    }
};
exports.InternalOrderRepositoryMongo = InternalOrderRepositoryMongo;
exports.InternalOrderRepositoryMongo = InternalOrderRepositoryMongo = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(internalOrder_schema_1.InternalOrderMongo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InternalOrderRepositoryMongo);
//# sourceMappingURL=InternalOrder.repository.impl.js.map