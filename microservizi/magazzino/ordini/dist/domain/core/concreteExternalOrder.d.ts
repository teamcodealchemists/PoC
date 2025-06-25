import { GeneralOrder } from './GeneralOrder';
import { OrderState } from './orderState.enum';
export declare class ConcreteExternalOrder extends GeneralOrder {
    warehouseDeparture: number;
    externalAddress: number;
    constructor(orderID: number, orderState: OrderState, creationDate: Date, timeToArrive: Date, idProduct: number, quantity: number, warehouseDeparture: number, externalAddress: number);
}
