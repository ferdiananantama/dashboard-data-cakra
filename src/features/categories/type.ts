import { Meta } from "../articles/type";

export interface ICategoryProps {
  data: ICategory[];
  meta: Meta;
}

export interface ICategoryDetail {
  data: ICategory;
  meta: Meta;
}

export interface ICategory {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
}

export interface IFilterCategory {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ICreateCategory {
  name: string;
}
