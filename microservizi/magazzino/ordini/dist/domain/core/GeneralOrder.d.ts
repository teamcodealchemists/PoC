import { OrderState } from './orderState.enum';
export declare class GeneralOrder {
    protected orderID: number;
    protected orderState: OrderState;
    protected creationDate: Date;
    protected timeToArrive: Date;
    protected idProduct: number;
    protected quantity: number;
    constructor(orderID: number, orderState: OrderState, creationDate: Date, timeToArrive: Date, idProduct: number, quantity: number);
}
