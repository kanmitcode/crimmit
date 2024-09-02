import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  name: string | undefined;

  @Prop({ type: String, required: true, unique: true })
  description: string | undefined;

  @Prop({ type: Number, required: true })
  price: string | undefined;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Owner', required: true })
  ownerId: MongooseSchema.Types.ObjectId | undefined;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre<ProductDocument>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

ProductSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ProductSchema.set('toJSON', {
  virtuals: true,
});
