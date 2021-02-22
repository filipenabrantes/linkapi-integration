import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  clientName: string

  @Prop({ required: true })
  orderTitle: string

  @Prop({ required: true })
  value: number
}

export const OrderSchema = SchemaFactory.createForClass(Order);