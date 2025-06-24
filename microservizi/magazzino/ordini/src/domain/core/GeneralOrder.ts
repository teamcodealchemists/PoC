import {OrderState} from './OrderState.enum';
export class supplyOrder {
    constructor(
       protected orderID : number,
       protected orderState : OrderState,
       protected dataCreation : Date,
       protected timetoArrive : Date,
       protected codiceBarreProdotto : String,
       protected quantità : number
    ) { }
}

