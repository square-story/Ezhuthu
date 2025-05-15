export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISnippet{
  _id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
}