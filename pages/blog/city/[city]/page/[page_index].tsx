import { API_URL, POSTS_PER_PAGE } from "@/constants";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  capitalizeFirstLetter,
  convertDataToPosts,
  extendKeywords,
  getCityWithPagePaths,
} from "@/helpers";
import { IPost } from "@/models";
import qs from "qs";

import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CityNavigation from "@/components/CityNavigation";
import PageTitle from "@/components/PageTitle";
import HomePageNavigation from "@/components/HomePageNavigation";
import Pagination from "@/components/Pagination";

interface Props {
  cityName: string;
  cities: string[];
  posts: IPost[];
  currentPage: number;
  numberOfPages: number;
}

export default function CityBlogPage({
  cityName,
  cities,
  posts,
  currentPage,
  numberOfPages,
}: Props) {
  const keywords = extendKeywords(cityName);

  return (
    <Layout
      title={`Russo Trip | ${capitalizeFirstLetter(cityName)}`}
      keywords={keywords}
    >
      <HomePageNavigation />
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <PageTitle>Экскурсии / {capitalizeFirstLetter(cityName)}</PageTitle>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-6">
            {posts.map((post) => (
              <Post key={post.title} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CityNavigation cities={cities} />
        </div>
      </div>
      <Pagination
        path={`/blog/city/${cityName}`}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${API_URL}/api/posts`);
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  const paths = getCityWithPagePaths(posts);

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
