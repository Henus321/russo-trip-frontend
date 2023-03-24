import { API_URL } from "@/constants";
import { IPost } from "@/models";
import { GetStaticProps } from "next";
import { convertDataToPosts } from "@/helpers";

import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CityNavigation from "@/components/CityNavigation";
import PageTitle from "@/components/PageTitle";
import HomePageNavigation from "@/components/HomePageNavigation";

interface Props {
  cities: string[];
  posts: IPost[];
}

export default function BlogPage({ cities, posts }: Props) {
  return (
    <Layout>
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
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${API_URL}/api/posts?populate=*&sort=date:desc`
  );
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  const cities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(cities)];

  return {
    props: {
      cities: uniqueCities,
      posts,
    },
    revalidate: 1,
  };
};
