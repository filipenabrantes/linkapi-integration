import { Model } from 'mongoose';
import { IOrder } from './interfaces/order.interface';
import { OrderDocument } from './schema/order.schema';
export declare class ManagerService {
    private readonly orderModel;
    constructor(orderModel: Model<OrderDocument>);
    create(order: IOrder): Promise<OrderDocument>;
    findAll(): Promise<any[]>;
}
