import { Document } from 'mongoose';
import { OrderState } from '../../domain/core/orderState.enum';
export type ExternalOrderDocument = ExternalOrderMongo & Document;
export declare class ExternalOrderMongo {
    orderID: number;
    orderState: OrderState;
    creationDate: Date;
    timeToArrive: Date;
    idProduct: number;
    quantity: number;
    warehouseDeparture: number;
    externalAddress: number;
}
export declare const ExternalOrderSchema: import("mongoose").Schema<ExternalOrderMongo, import("mongoose").Model<ExternalOrderMongo, any, any, any, Document<unknown, any, ExternalOrderMongo, any> & ExternalOrderMongo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ExternalOrderMongo, Document<unknown, {}, import("mongoose").FlatRecord<ExternalOrderMongo>, {}> & import("mongoose").FlatRecord<ExternalOrderMongo> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
