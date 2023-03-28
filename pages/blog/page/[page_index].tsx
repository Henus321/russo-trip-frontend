import { API_URL, POSTS_PER_PAGE } from "@/constants";
import { IPost } from "@/models";
import { GetStaticPaths, GetStaticProps } from "next";
import { convertDataToPosts } from "@/helpers";
import qs from "qs";

import BlogPage from "@/components/BlogPage";

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${API_URL}/api/posts`);
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  const numberOfPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numberOfPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = qs.stringify({
    populate: {
      user: "user",
      image: {
        populate: "*",
      },
      post: {
        populate: "*",
      },
    },
    sort: {
      date: "desc",
    },
  });

  const response = await fetch(`${API_URL}/api/posts?${query}`);
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  const allCities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(allCities)];
  const curCityName = null;

  const page = parseInt(
    params && params.page_index ? params.page_index + "" : "1"
  );
  const numberOfPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;

  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      cityName: curCityName,
      cities: uniqueCities,
      posts: orderedPosts,
      currentPage: page,
      numberOfPages,
    },
    revalidate: 1,
  };
};
