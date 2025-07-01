import { GeneralOrder, ProductQuantity } from './GeneralOrder';
import {OrderState} from './orderState.enum';
export class ConcreteExternalOrder extends GeneralOrder {
  constructor(
    orderID : number,
    orderState : OrderState,
    creationDate : Date,
    timeToArrive : Date,
    public warehouseDeparture : number,
    public externalAddress : number
  ) {
      super(
      orderID,
      orderState,
      creationDate,
      timeToArrive);
  }
}