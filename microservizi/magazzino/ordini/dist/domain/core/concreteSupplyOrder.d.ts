import { GeneralOrder } from './GeneralOrder';
import { OrderState } from './orderState.enum';
export declare class ConcreteSupplyOrder extends GeneralOrder {
    warehouseDestination: number;
    externalAddress: number;
    constructor(orderID: number, orderState: OrderState, creationDate: Date, timeToArrive: Date, idProduct: number, quantity: number, warehouseDestination: number, externalAddress: number);
}
