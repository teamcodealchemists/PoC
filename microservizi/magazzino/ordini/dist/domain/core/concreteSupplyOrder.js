"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteSupplyOrder = void 0;
const GeneralOrder_1 = require("./GeneralOrder");
class ConcreteSupplyOrder extends GeneralOrder_1.GeneralOrder {
    warehouseDestination;
    externalAddress;
    constructor(orderID, orderState, creationDate, timeToArrive, idProduct, quantity, warehouseDestination, externalAddress) {
        super(orderID, orderState, creationDate, timeToArrive, idProduct, quantity);
        this.warehouseDestination = warehouseDestination;
        this.externalAddress = externalAddress;
    }
}
exports.ConcreteSupplyOrder = ConcreteSupplyOrder;
//# sourceMappingURL=concreteSupplyOrder.js.map