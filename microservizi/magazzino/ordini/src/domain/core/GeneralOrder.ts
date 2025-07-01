import {OrderState} from './orderState.enum';

export class ProductQuantity {
  constructor(
    public idProduct: number,
    public quantity: number
  ) {}
}

export class GeneralOrder {
    constructor(
       protected orderID : number,
       protected orderState : OrderState,
       protected creationDate : Date,
       protected timeToArrive : Date,
    ) { }
}

