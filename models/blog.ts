import { IUser } from "./auth";
import { IData } from "./shared";

export interface IImage {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
}

export interface IPost {
  title: string;
  city: string;
  date: string;
  description: string;
  markdown: string;
  author: string;
  slug: string;
  id: number;
  image: IImage;
}

export interface IComment {
  createdAt: string;
  body: string;
  author: string;
  id: number;
}

export interface INewComment {
  body: string;
  post: number;
}

export interface IBookmark {
  id: number;
  user: number;
  post: IPost;
  slug: string;
}

export interface INewBookmark {
  jwt: string;
  post: IPost;
  user: IUser | null;
}
