import { API_URL } from "@/constants";
import { GetStaticPaths, GetStaticProps } from "next";
import { convertDataToPosts } from "@/helpers";
import { IPost } from "@/models";
import Link from "next/link";

import Layout from "@/components/Layout";
import Post from "@/components/Post";

export default function CityBlogPage({
  cityName,
  cities,
  posts,
}: {
  cityName: string;
  cities: string[];
  posts: IPost[];
}) {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            All {cityName} trips
          </h1>
          <div className="grid grid-cols-3 gap-5">
            {posts.map((post) => (
              <Post key={post.title} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col w-full p-4 text-white text-xl bg-cyan-900">
            <Link href="/blog">no-filter</Link>
            {cities.map((city) => (
              <Link href={`/blog/city/${city.toLowerCase()}`} key={city}>
                {city}
              </Link>
            ))}
          </div>
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
  const response = await fetch(`${API_URL}/api/posts?populate=*`);

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
