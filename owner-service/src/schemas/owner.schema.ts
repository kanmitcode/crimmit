import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OwnerDocument = Owner & Document;

@Schema()
export class Owner {
  @Prop({ type: String, required: true })
  firstName: string | undefined;

  @Prop({ type: String, required: true })
  lastName: string | undefined;

  @Prop({ type: String, required: true, unique: true })
  email: string | undefined;

  @Prop({ type: String })
  address: string | undefined;

  @Prop({ type: String })
  phone: string | undefined;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);

// Optional: Add pre-save hooks to update the `updatedAt` field
OwnerSchema.pre<OwnerDocument>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

OwnerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

OwnerSchema.set('toJSON', {
  virtuals: true,
});
