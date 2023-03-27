import { API_URL, POSTS_PER_PAGE } from "@/constants";
import { IPost } from "@/models";
import { GetStaticPaths, GetStaticProps } from "next";
import { convertDataToPosts, extendKeywords } from "@/helpers";
import qs from "qs";

import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CityNavigation from "@/components/CityNavigation";
import PageTitle from "@/components/PageTitle";
import HomePageNavigation from "@/components/HomePageNavigation";
import Pagination from "@/components/Pagination";

interface Props {
  cities: string[];
  posts: IPost[];
  currentPage: number;
  numberOfPages: number;
}

export default function BlogPage({
  cities,
  posts,
  currentPage,
  numberOfPages,
}: Props) {
  const keywords = extendKeywords(cities.join(", "));

  return (
    <Layout title="Russo Trip | Экскурсии" keywords={keywords}>
      <HomePageNavigation />
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <PageTitle>Экскурсии</PageTitle>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-6">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CityNavigation cities={cities} />
        </div>
      </div>
      <Pagination
        path="/blog"
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
      cities: uniqueCities,
      posts: orderedPosts,
      currentPage: page,
      numberOfPages,
    },
    revalidate: 1,
  };
};
