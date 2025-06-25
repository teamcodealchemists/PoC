"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteExternalOrder = void 0;
const GeneralOrder_1 = require("./GeneralOrder");
class ConcreteExternalOrder extends GeneralOrder_1.GeneralOrder {
    warehouseDeparture;
    externalAddress;
    constructor(orderID, orderState, creationDate, timeToArrive, idProduct, quantity, warehouseDeparture, externalAddress) {
        super(orderID, orderState, creationDate, timeToArrive, idProduct, quantity);
        this.warehouseDeparture = warehouseDeparture;
        this.externalAddress = externalAddress;
    }
}
exports.ConcreteExternalOrder = ConcreteExternalOrder;
//# sourceMappingURL=concreteExternalOrder.js.map