import { Document } from 'mongoose';
export type OwnerDocument = Owner & Document;
export declare class Owner {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    address: string | undefined;
    phone: string | undefined;
    createdAt: Date;
    updatedAt: Date;
}
export declare const OwnerSchema: import("mongoose").Schema<Owner, import("mongoose").Model<Owner, any, any, any, Document<unknown, any, Owner> & Owner & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Owner, Document<unknown, {}, import("mongoose").FlatRecord<Owner>> & import("mongoose").FlatRecord<Owner> & {
    _id: import("mongoose").Types.ObjectId;
}>;
