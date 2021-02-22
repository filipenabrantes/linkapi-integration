import { Document } from 'mongoose';
export declare type OrderDocument = Order & Document;
export declare class Order {
    number: number;
    orderId: string;
    clientName: string;
    orderTitle: string;
    value: number;
}
export declare const OrderSchema: import("mongoose").Schema<Document<Order>, import("mongoose").Model<Document<Order>>, undefined>;
