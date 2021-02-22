import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './interfaces/order.interface';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>
  ) { }

  async create(order: IOrder) {
    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }

  async findAll() {
    return await this.orderModel.aggregate(
      [
        {
          $group: {
            _id: {
              day: { $dayOfMonth: '$createdAt' },
              month: { $month: '$createdAt' },
              year: { $year: '$createdAt' },
            },
            totalOrdersPrice: { $sum: '$value' }
          }
        }
      ]
    );
  }
}
