import { OrderState } from './OrderState.enum';
export declare class SupplyOrderDto {
    orderID: number;
    orderState: OrderState;
    creationDate: Date;
    timeToArrive: Date;
    idProduct: number;
    quantity: number;
    warehouseDestination: number;
    externalAddress: number;
}
