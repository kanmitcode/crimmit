import { Document } from 'mongoose';

export interface GetOwnerRequest {
  id: string;
}

export interface GetOwnerResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

export interface UpdateOwnerRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

export interface UpdateOwnerResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

// Use this interface for the `Owner` type, extending the Mongoose Document to include `_id` and virtual `id`
export interface Owner extends Document {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly address: string;
  readonly phone: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
