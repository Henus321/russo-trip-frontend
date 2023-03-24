import { API_URL } from "@/constants";
import { IBookmark, IComment, IData, IPost, IUser } from "@/models";
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

export const convertDataToBookmarks = (data: IData[]): IBookmark[] => {
  const bookmark: IBookmark[] = data.map((book) => ({
    user: book.attributes.user.data.id,
    slug: book.attributes.slug,
    post: convertDataToPosts([book.attributes.post.data])[0],
    id: book.id,
  }));

  return bookmark;
};

export const beatifyDate = (date: string, time: boolean = false) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: time ? "numeric" : undefined,
    minute: time ? "numeric" : undefined,
  };

  return new Date(date)
    .toLocaleDateString("ru-RU", options)
    .split(".")
    .join(" ")
    .slice(0, time ? undefined : -2);
};

export const capitalizeFirstLetter = (city: string) =>
  city
    .split("-")
    .map((string) => string.slice(0, 1).toUpperCase() + string.slice(1))
    .join(" ");

export const getBookmarkSlug = (user: IUser, post: IPost) => {
  return `${user?.id}-${post.slug}`;
};
