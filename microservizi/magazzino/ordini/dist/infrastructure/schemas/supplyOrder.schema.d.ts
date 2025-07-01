import { Document } from 'mongoose';
import { OrderState } from '../../domain/core/orderState.enum';
export type SupplyOrderDocument = SupplyOrderMongo & Document;
export declare class SupplyOrderMongo {
    orderID: number;
    orderState: OrderState;
    creationDate: Date;
    timeToArrive: Date;
    idProduct: number;
    quantity: number;
    warehouseDestination: number;
    externalAddress: number;
}
export declare const SupplyOrderSchema: import("mongoose").Schema<SupplyOrderMongo, import("mongoose").Model<SupplyOrderMongo, any, any, any, Document<unknown, any, SupplyOrderMongo, any> & SupplyOrderMongo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SupplyOrderMongo, Document<unknown, {}, import("mongoose").FlatRecord<SupplyOrderMongo>, {}> & import("mongoose").FlatRecord<SupplyOrderMongo> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
