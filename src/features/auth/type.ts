export interface IAuthProps {
  identifier?: string;
  username?: string;
  password: string;
  email?: string;
}

export interface ILoginResponse {
  jwt: string;
  user: User;
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

export interface IProfileProps {
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
