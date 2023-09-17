import { StringKeys } from "@/types/utils";

export enum ItemStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
}

export const NEW_ITEM_IDX: number = 0;

export type Item = {
  id: number;
  code: string;
  name: string;
  base_unit: string;
  price: number;
  status: ItemStatus;
  created_at?: string;
  updated_at?: string | null;
}

export const NEW_ITEM: Item = {
  id: NEW_ITEM_IDX,
  code: '',
  name: '',
  base_unit: '',
  price: 0,
  status: ItemStatus.DRAFT
}

export type StringKeysOfItem = NonNullable<StringKeys<Item>>;
