import { OrderState } from './orderState.enum';
export declare class SupplyOrderDto {
    orderID: number;
    orderState: OrderState;
    creationDate: Date;
    timeToArrive: Date;
    idProduct: number;
    quantity: number;
    warehouseDeparture: number;
    externalAddress: number;
}
