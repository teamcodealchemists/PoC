import { GeneralOrder } from './GeneralOrder';
import { OrderState } from './orderState.enum';
export declare class ConcreteInternalOrder extends GeneralOrder {
    warehouseDestination: number;
    warehouseDeparture: number;
    constructor(orderID: number, orderState: OrderState, creationDate: Date, timeToArrive: Date, idProduct: number, quantity: number, warehouseDestination: number, warehouseDeparture: number);
}
