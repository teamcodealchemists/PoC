import { Order } from './GeneralOrder';
import {OrderState} from './OrderState.enum';
export class ConcreteOrder extends Order {
  constructor(
    orderID : number,
    orderState : OrderState,
    dataCreation : Date,
    timetoArrive : Date,
    codiceBarreProdotto : String,
    quantità : number,
    public warehouseDestination : number,
    public externalAddress : number
  ) {
      super(
      orderID,
      orderState,
      dataCreation,
      timetoArrive,
      codiceBarreProdotto,
      quantità);
  }
}