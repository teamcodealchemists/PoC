import { GeneralOrder, ProductQuantity } from './GeneralOrder';
import {OrderState} from './orderState.enum';
export class ConcreteInternalOrder extends GeneralOrder {
  constructor(
    orderID : number,
    orderState : OrderState,
    creationDate : Date,
    timeToArrive : Date,
    public warehouseDestination : number,
    public warehouseDeparture : number
  ) {
      super(
      orderID,
      orderState,
      creationDate,
      timeToArrive);
  }

  public getOrderState(): OrderState {
  return this.orderState;
  }

}