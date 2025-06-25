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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplyOrderDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const orderState_enum_1 = require("./orderState.enum");
class SupplyOrderDto {
    orderID;
    orderState;
    creationDate;
    timeToArrive;
    idProduct;
    quantity;
    warehouseDeparture;
    externalAddress;
}
exports.SupplyOrderDto = SupplyOrderDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], SupplyOrderDto.prototype, "orderID", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(orderState_enum_1.OrderState, { message: 'Order state must be a valid OrderState enum value' }),
    __metadata("design:type", typeof (_a = typeof orderState_enum_1.OrderState !== "undefined" && orderState_enum_1.OrderState) === "function" ? _a : Object)
], SupplyOrderDto.prototype, "orderState", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: 'Creation date must be a valid date' }),
    __metadata("design:type", Date)
], SupplyOrderDto.prototype, "creationDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: 'Time to arrive must be a valid date' }),
    __metadata("design:type", Date)
], SupplyOrderDto.prototype, "timeToArrive", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], SupplyOrderDto.prototype, "idProduct", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)({ message: 'Quantity must be a positive integer' }),
    __metadata("design:type", Number)
], SupplyOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)({ message: 'Warehouse departure must be a positive integer' }),
    __metadata("design:type", Number)
], SupplyOrderDto.prototype, "warehouseDeparture", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)({ message: 'External address must be a positive integer' }),
    __metadata("design:type", Number)
], SupplyOrderDto.prototype, "externalAddress", void 0);
//# sourceMappingURL=addExternalOrder.dto.js.map