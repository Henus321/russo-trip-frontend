import { GetStaticPaths } from "next";
import { getStaticProps } from "./page/[page_index]";
import { API_URL } from "@/constants";
import { IPost } from "@/models";
import { convertDataToPosts } from "@/helpers";

import CityBlogPage from "./page/[page_index]";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${API_URL}/api/posts`);
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);
  const allCities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(allCities)];

  const paths = uniqueCities.map((city) => ({
    params: { city },
  }));

  return {
    paths,
    fallback: false,
  };
};

export { getStaticProps };
export default CityBlogPage;
