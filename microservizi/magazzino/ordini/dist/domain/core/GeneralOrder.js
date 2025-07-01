"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralOrder = void 0;
class GeneralOrder {
    orderID;
    orderState;
    creationDate;
    timeToArrive;
    idProduct;
    quantity;
    constructor(orderID, orderState, creationDate, timeToArrive, idProduct, quantity) {
        this.orderID = orderID;
        this.orderState = orderState;
        this.creationDate = creationDate;
        this.timeToArrive = timeToArrive;
        this.idProduct = idProduct;
        this.quantity = quantity;
    }
}
exports.GeneralOrder = GeneralOrder;
//# sourceMappingURL=GeneralOrder.js.map