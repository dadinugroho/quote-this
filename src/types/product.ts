import { StringKeys } from "@/types/utils";

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
}

export const NEW_PRODUCT_IDX: number = 0;

export type Product = {
  id: number;
  code: string;
  name: string;
  description: string;
  short_description: string;
  min_length: number;
  max_length: number;
  status: ProductStatus;
  created_at?: string;
  updated_at?: string | null;
}

export const NEW_PRODUCT: Product = {
  id: NEW_PRODUCT_IDX,
  code: '',
  name: '',
  description: '',
  short_description: '',
  min_length: 0,
  max_length: 0,
  status: ProductStatus.DRAFT
}

export type StringKeysOfProduct = NonNullable<StringKeys<Product>>;
