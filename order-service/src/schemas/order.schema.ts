import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: String, required: true })
  orderId: string | undefined;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }],
    required: true,
  })
  productIds: MongooseSchema.Types.ObjectId[] | undefined;

  @Prop({ type: [Number], required: true })
  quantities: number[] | undefined;

  @Prop({ type: String, required: true })
  totalPrice: number | undefined;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date | undefined;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date | undefined;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre<OrderDocument>('save', function (next) {
  this.updatedAt = new Date();
  next();
});
