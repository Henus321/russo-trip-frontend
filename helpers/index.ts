import { API_URL } from "@/constants";
import { IComment, IData, IPost } from "@/models";
import { IncomingMessage } from "http";
import cookie from "cookie";

export const parseCookies = (
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }
) => {
  return cookie.parse(req ? req.headers.cookie || "" : "");
};

export const convertDataToPosts = (data: IData[]): IPost[] => {
  const posts: IPost[] = data.map(({ attributes, id }: IData) => ({
    ...attributes,
    id,
    author: attributes.user?.data.attributes.username,
    image: {
      thumbnail: `${API_URL}${attributes.image?.data.attributes.formats.thumbnail.url}`,
      small: `${API_URL}${attributes.image?.data.attributes.formats.small.url}`,
      medium: `${API_URL}${attributes.image?.data.attributes.formats.medium.url}`,
      large: `${API_URL}${attributes.image?.data.attributes.formats.large.url}`,
    },
  }));

  return posts;
};

export const convertDataToComments = (data: IData[]): IComment[] => {
  const comments: IComment[] = data.map((comment: IData) => ({
    body: comment.attributes.body,
    createdAt: comment.attributes.createdAt,
    id: comment.id,
    author: comment.attributes.user?.data.attributes.username,
  }));

  return comments;
};
