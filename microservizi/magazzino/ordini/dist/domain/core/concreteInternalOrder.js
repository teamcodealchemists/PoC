"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteInternalOrder = void 0;
const GeneralOrder_1 = require("./GeneralOrder");
class ConcreteInternalOrder extends GeneralOrder_1.GeneralOrder {
    warehouseDestination;
    warehouseDeparture;
    constructor(orderID, orderState, creationDate, timeToArrive, idProduct, quantity, warehouseDestination, warehouseDeparture) {
        super(orderID, orderState, creationDate, timeToArrive, idProduct, quantity);
        this.warehouseDestination = warehouseDestination;
        this.warehouseDeparture = warehouseDeparture;
    }
}
exports.ConcreteInternalOrder = ConcreteInternalOrder;
//# sourceMappingURL=concreteInternalOrder.js.map