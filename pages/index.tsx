import Link from "next/link";
import { posts } from "@/constants";

import Layout from "@/components/Layout";
import Post from "@/components/Post";

export default function HomePage() {
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
