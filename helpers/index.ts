import { DEFAULT_KEYWORDS } from "@/constants";
import { IBookmark, IComment, IData, IPost, IUser } from "@/models";
import { IncomingMessage } from "http";
import cookie from "cookie";

export const parseCookies = (
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }
) => {
  return cookie.parse(req ? req.headers.cookie || "" : "");
};

export const convertDataToPosts = (data: IData[]): IPost[] => {
  if (!data) return [];

  const posts: IPost[] = data.map(({ attributes, id }: IData) => ({
    ...attributes,
    id,
    author: attributes.user?.data.attributes.username,
    image: {
      thumbnail: attributes.image?.data.attributes.formats.thumbnail.url,
      small: attributes.image?.data.attributes.formats.small.url,
      medium: attributes.image?.data.attributes.formats.medium.url,
      large: attributes.image?.data.attributes.formats.large.url,
    },
  }));

  return posts;
};

export const convertDataToComments = (data: IData[]): IComment[] => {
  if (!data) return [];

  const comments: IComment[] = data.map((comment: IData) => ({
    body: comment.attributes.body,
    createdAt: comment.attributes.createdAt,
    id: comment.id,
    author: comment.attributes.user?.data.attributes.username,
  }));

  return comments;
};

export const convertDataToBookmarks = (data: IData[]): IBookmark[] => {
  if (!data) return [];

  const bookmark: IBookmark[] = data.map((book) => ({
    user: book.attributes.user.data.id,
    slug: book.attributes.slug,
    post: convertDataToPosts([book.attributes.post.data])[0],
    id: book.id,
  }));

  return bookmark;
};

export const convertMonth = (month: number) => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return months[month - 1];
};

export const beatifyDate = (date: string, dateWithTime: boolean = false) => {
  const clearDate = date.slice(0, 10).split("-");

  const year = clearDate[0];
  const month = convertMonth(+clearDate[1]);
  const day = clearDate[2];

  const beatifulDate = `${day} ${month} ${year}`;

  if (dateWithTime) {
    const time = date.split("T")[1].slice(0, 5);

    return beatifulDate + " в " + time;
  }

  return beatifulDate;
};

export const capitalizeText = (text: string, isCity = false) =>
  text
    .split(/-| /)
    .map((string) => string.slice(0, 1).toUpperCase() + string.slice(1))
    .join(isCity ? "-" : " ");

export const getBookmarkSlug = (user: IUser, post: IPost) => {
  return `${user?.id}-${post.slug}`;
};

export const extendKeywords = (keywords: string) => {
  return `${DEFAULT_KEYWORDS}, ${keywords}`;
};
