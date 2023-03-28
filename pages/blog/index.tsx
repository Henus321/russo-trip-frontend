import { GetStaticProps } from "next";
import { IData, IPost } from "@/models";
import { API_URL, POSTS_PER_PAGE } from "@/constants";
import { convertDataToPosts } from "@/helpers";
import qs from "qs";

import BlogPage from "@/components/BlogPage";

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  const query = qs.stringify({
    sort: {
      date: "desc",
    },
    populate: {
      user: "user",
      image: {
        populate: "*",
      },
      post: {
        populate: "*",
      },
    },
  });

  const response = await fetch(`${API_URL}/api/posts?${query}`);
  const { data }: { data: IData[] } = await response.json();
  const posts: IPost[] = convertDataToPosts(data);

  const allCities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(allCities)];
  const curCityName = null;

  const numberOfPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPage = 1;

  const orderedPosts = posts.slice(0, POSTS_PER_PAGE);

  return {
    props: {
      cityName: curCityName,
      cities: uniqueCities,
      posts: orderedPosts,
      currentPage,
      numberOfPages,
    },
  };
};
