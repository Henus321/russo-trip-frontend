import { API_URL } from "@/constants";
import { IPost } from "@/models";
import { GetStaticProps } from "next";
import { convertDataToPosts } from "@/helpers";
import Link from "next/link";

import Layout from "@/components/Layout";
import Post from "@/components/Post";

export default function BlogPage({ posts }: { posts: IPost[] }) {
  const cities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(cities)];

  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog Page</h1>
          <div className="grid grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col w-full p-4 text-white text-xl bg-cyan-900">
            <Link href="/blog">no-filter</Link>
            {uniqueCities.map((city) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${API_URL}/api/posts?populate=*`);
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};
