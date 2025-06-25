import { GeneralOrder } from './GeneralOrder';
import {OrderState} from './orderState.enum';
export class ConcreteInternalOrder extends GeneralOrder {
  constructor(
    orderID : number,
    orderState : OrderState,
    creationDate : Date,
    timeToArrive : Date,
    idProduct : number,
    quantity : number,
    public warehouseDestination : number,
    public warehouseDeparture : number
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