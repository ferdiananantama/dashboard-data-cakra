export interface IArticles {
  data: IArticlesProps[];
  meta: Meta;
}

export interface IArticleDetailProps {
  data: IArticlesProps;
  meta: Meta;
}

export interface IArticlesProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
  user: User;
  category: Category;
  comments: Comment[];
  localizations: any[];
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
}

export interface Comment {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: any;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IFilterArticleProps {
  "pagination[page]"?: number;
  "pagination[pageSize]"?: number;
  "populate[comments][populate][user]"?: string;
  "populate[user]"?: string;
  "populate[category]"?: string;
  "filters[title][$eqi]"?: string;
  "filters[category][name][$eqi]"?: string;
  populate?: string;
}

export interface ICreateArticleProps {
  title: string;
  description: string;
  cover_image_url: string;
  category: number;
}

export interface ICreateComment {
  content: string;
  article: number;
}
