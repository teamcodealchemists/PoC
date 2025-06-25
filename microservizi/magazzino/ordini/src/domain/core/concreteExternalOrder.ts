import {GeneralOrder } from './GeneralOrder';
import {OrderState} from './orderState.enum';
export class ConcreteExternalOrder extends GeneralOrder {
  constructor(
    orderID : number,
    orderState : OrderState,
    creationDate : Date,
    timeToArrive : Date,
    idProduct : number,
    quantity : number,
    public warehouseDeparture : number,
    public externalAddress : number
  ) {
      super(
      orderID,
      orderState,
      creationDate,
      timeToArrive,
      idProduct,
      quantity);
  }
}