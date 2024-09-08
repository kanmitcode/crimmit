import { Document } from 'mongoose';
import { Observable } from 'rxjs';

export interface GetProductRequest {
  id: string;
}

export interface GetProductResponse {
  id: string;
  name: string;
  description: string;
  price: string;
  ownerId: string;
}

export interface UpdateProductRequest {
  id: string;
  name: string;
  description: string;
  price: string;
  ownerId: string;
}

export interface UpdateProductResponse {
  id: string;
  name: string;
  description: string;
  price: string;
  ownerId: string;
}

export interface Product extends Document {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly ownerId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface ProductDetail {
  id: string;
  price: number;
}

export interface ProductServiceClient {
  GetProduct(request: GetProductRequest): Observable<GetProductResponse>;
}

// import { Document } from 'mongoose';

// export interface GetProductRequest {
//   id: string;
// }

// export interface GetProductResponse {
//   id: string;
//   name: string;
//   description: string;
//   price: string;
//   ownerId: string;
// }

// export interface UpdateProductRequest {
//   id: string;
//   name: string;
//   description: string;
//   price: string;
//   ownerId: string;
// }

// export interface UpdateProductResponse {
//   id: string;
//   name: string;
//   description: string;
//   price: string;
//   ownerId: string;
// }

// export interface Product extends Document {
//   readonly id: string;
//   readonly name: string;
//   readonly description: string;
//   readonly price: string;
//   readonly ownerId: string;
//   readonly createdAt: Date;
//   readonly updatedAt: Date;
// }
