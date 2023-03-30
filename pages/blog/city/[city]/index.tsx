import { GetStaticPaths, GetStaticProps } from "next";
import { API_URL, POSTS_PER_PAGE } from "@/constants";
import { IPost } from "@/models";
import { convertDataToPosts } from "@/helpers";
import qs from "qs";

import BlogPage from "@/components/BlogPage";

export default BlogPage;

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = qs.stringify({
    populate: "*",
    sort: {
      date: "desc",
    },
  });

  const response = await fetch(`${API_URL}/api/posts?${query}`);

  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  const cityName = params?.city;

  const allCities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(allCities)];

  const page = 1;

  const filteredPosts: IPost[] = posts.filter(({ city }) => city === cityName);

  const numberOfPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;

  const orderedPosts = filteredPosts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      cityName,
      cities: uniqueCities,
      posts: orderedPosts,
      currentPage: page,
      numberOfPages,
    },
    revalidate: 1,
  };
};
