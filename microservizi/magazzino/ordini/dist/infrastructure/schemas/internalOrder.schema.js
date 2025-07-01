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
exports.InternalOrderSchema = exports.InternalOrderMongo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const orderState_enum_1 = require("../../domain/core/orderState.enum");
let InternalOrderMongo = class InternalOrderMongo {
    orderID;
    orderState;
    creationDate;
    timeToArrive;
    idProduct;
    quantity;
    warehouseDeparture;
    warehouseDestination;
};
exports.InternalOrderMongo = InternalOrderMongo;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InternalOrderMongo.prototype, "orderID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InternalOrderMongo.prototype, "orderState", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], InternalOrderMongo.prototype, "creationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], InternalOrderMongo.prototype, "timeToArrive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InternalOrderMongo.prototype, "idProduct", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InternalOrderMongo.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InternalOrderMongo.prototype, "warehouseDeparture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InternalOrderMongo.prototype, "warehouseDestination", void 0);
exports.InternalOrderMongo = InternalOrderMongo = __decorate([
    (0, mongoose_1.Schema)({ collection: 'internal_orders' })
], InternalOrderMongo);
exports.InternalOrderSchema = mongoose_1.SchemaFactory.createForClass(InternalOrderMongo);
//# sourceMappingURL=internalOrder.schema.js.map