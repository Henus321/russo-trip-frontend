import Link from "next/link";
import { API_URL } from "@/constants";
import { IPost } from "@/models";
import { GetStaticProps } from "next";
import { convertDataToPosts } from "@/helpers";

import Layout from "@/components/Layout";
import Post from "@/components/Post";

export default function HomePage({ posts }: { posts: IPost[] }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Home Page</h1>
      <div className="grid grid-cols-3 gap-5">
        {posts.slice(0, 4).map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Link
        className="block text-center border border-blue-900 text-blue-800 py-4 my-5 select-none hover:text-white hover:bg-blue-900 focus:outline-none focus:shadow-outline w-full"
        href="/blog"
      >
        All Posts
      </Link>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${API_URL}/api/posts?populate=*&sort=date:desc`
  );
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};
