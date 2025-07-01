import { Document } from 'mongoose';
import { OrderState } from '../../domain/core/orderState.enum';
export type InternalOrderDocument = InternalOrderMongo & Document;
export declare class InternalOrderMongo {
    orderID: number;
    orderState: OrderState;
    creationDate: Date;
    timeToArrive: Date;
    idProduct: number;
    quantity: number;
    warehouseDeparture: number;
    warehouseDestination: number;
}
export declare const InternalOrderSchema: import("mongoose").Schema<InternalOrderMongo, import("mongoose").Model<InternalOrderMongo, any, any, any, Document<unknown, any, InternalOrderMongo, any> & InternalOrderMongo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InternalOrderMongo, Document<unknown, {}, import("mongoose").FlatRecord<InternalOrderMongo>, {}> & import("mongoose").FlatRecord<InternalOrderMongo> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
