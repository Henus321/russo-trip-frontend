import { API_URL, POSTS_PER_PAGE } from "@/constants";
import { GetStaticPaths, GetStaticProps } from "next";
import { convertDataToPosts } from "@/helpers";
import { IPost } from "@/models";
import qs from "qs";

import BlogPage from "@/components/BlogPage";

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${API_URL}/api/posts`);
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  const allCities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(allCities)];

  const citiesDetails = uniqueCities.map((uniqueCity) => {
    const postsCountOfUniqueCity = allCities.filter(
      (allCity) => allCity === uniqueCity
    ).length;

    return {
      city: uniqueCity,
      postsCount: postsCountOfUniqueCity,
    };
  });

  const citiesPathsWithoutFirstPages = citiesDetails
    .flatMap(({ city, postsCount }) => {
      let cityParams = [];
      const numberOfPages = Math.ceil(postsCount / POSTS_PER_PAGE);

      for (let i = 0; i < numberOfPages; i++) {
        cityParams.push({ params: { city, page_index: i + 1 + "" } });
      }

      return cityParams;
    })
    .filter((details) => details.params.page_index !== "1");

  return {
    paths: citiesPathsWithoutFirstPages,
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

  const page = parseInt(
    params && params.page_index ? params.page_index + "" : "1"
  );

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
