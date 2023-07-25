import { GetServerSideProps } from "next";
import { IData, IPost } from "@/models";
import { API_URL, POSTS_PER_PAGE } from "@/constants";
import { convertDataToPosts } from "@/helpers";
import qs from "qs";

import BlogPage from "@/components/BlogPage";

export default BlogPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apiQuery = qs.stringify({
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

  const response = await fetch(`${API_URL}/api/posts?${apiQuery}`);
  const { data }: { data: IData[] } = await response.json();
  const posts: IPost[] = convertDataToPosts(data);

  const numberOfPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPage = parseInt(
    query && query.page ? query.page.toString() : "1"
  );
  const pageIndex = currentPage - 1;

  const allCities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(allCities)];
  const curCityName = query && query.city ? query.city : null;

  const cityPosts = curCityName
    ? posts.filter((post) => post.city === curCityName)
    : posts;

  const orderedPosts = cityPosts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

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
