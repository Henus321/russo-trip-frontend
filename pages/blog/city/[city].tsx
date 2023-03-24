import { API_URL } from "@/constants";
import { GetStaticPaths, GetStaticProps } from "next";
import { capitalizeFirstLetter, convertDataToPosts } from "@/helpers";
import { IPost } from "@/models";

import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CityNavigation from "@/components/CityNavigation";
import PageTitle from "@/components/PageTitle";
import HomePageNavigation from "@/components/HomePageNavigation";

interface Props {
  cityName: string;
  cities: string[];
  posts: IPost[];
}

export default function CityBlogPage({ cityName, cities, posts }: Props) {
  return (
    <Layout>
      <HomePageNavigation />
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <PageTitle>Экскурсии / {capitalizeFirstLetter(cityName)}</PageTitle>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {posts.map((post) => (
              <Post key={post.title} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CityNavigation cities={cities} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${API_URL}/api/posts`);
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  const paths = posts.map(({ city }) => ({
    params: { city },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await fetch(
    `${API_URL}/api/posts?populate=*&sort=date:desc`
  );

  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  const cityName = params?.city;

  const allCities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(allCities)];

  const filteredPosts: IPost[] = posts.filter(({ city }) => city === cityName);

  return {
    props: {
      cityName,
      cities: uniqueCities,
      posts: filteredPosts,
    },
    revalidate: 1,
  };
};
