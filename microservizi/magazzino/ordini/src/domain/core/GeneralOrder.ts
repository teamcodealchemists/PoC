import {OrderState} from './orderState.enum';
export class GeneralOrder {
    constructor(
       protected orderID : number,
       protected orderState : OrderState,
       protected creationDate : Date,
       protected timeToArrive : Date,
       protected idProduct : number,
       protected quantity : number
    ) { }
}

