import { API_URL } from "@/constants";
import { IPost } from "@/models";

export const convertDataToPosts = (data: any): IPost[] => {
  return data.map(({ attributes, id }: any) => ({
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
};
