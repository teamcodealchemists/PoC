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
exports.SupplyOrderSchema = exports.SupplyOrderMongo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const orderState_enum_1 = require("../../domain/core/orderState.enum");
let SupplyOrderMongo = class SupplyOrderMongo {
    orderID;
    orderState;
    creationDate;
    timeToArrive;
    idProduct;
    quantity;
    warehouseDestination;
    externalAddress;
};
exports.SupplyOrderMongo = SupplyOrderMongo;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SupplyOrderMongo.prototype, "orderID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SupplyOrderMongo.prototype, "orderState", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], SupplyOrderMongo.prototype, "creationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], SupplyOrderMongo.prototype, "timeToArrive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SupplyOrderMongo.prototype, "idProduct", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SupplyOrderMongo.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SupplyOrderMongo.prototype, "warehouseDestination", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SupplyOrderMongo.prototype, "externalAddress", void 0);
exports.SupplyOrderMongo = SupplyOrderMongo = __decorate([
    (0, mongoose_1.Schema)({ collection: 'supply_orders' })
], SupplyOrderMongo);
exports.SupplyOrderSchema = mongoose_1.SchemaFactory.createForClass(SupplyOrderMongo);
//# sourceMappingURL=supplyOrder.schema.js.map