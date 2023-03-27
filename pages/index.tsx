import Link from "next/link";
import { API_URL } from "@/constants";
import { IPost } from "@/models";
import { GetStaticProps } from "next";
import { convertDataToPosts } from "@/helpers";
import qs from "qs";

import Layout from "@/components/Layout";
import Post from "@/components/Post";
import PageTitle from "@/components/PageTitle";

interface Props {
  posts: IPost[];
}

export default function HomePage({ posts }: Props) {
  return (
    <Layout title="Russo Trip | Главная">
      <PageTitle>Последние экскурсии</PageTitle>
      <div className="grid grid-cols-3 gap-x-5 gap-y-6 mb-6">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Link
        className="block text-center py-4 mb-6 text-xl w-full text-white bg-primary-color hover:bg-primary-color-alt active:text-secondary-color-alt disabled:text-gray-400"
        href="/blog"
      >
        Показать все
      </Link>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = qs.stringify({
    populate: "*",
    sort: {
      date: "desc",
    },
    pagination: {
      start: 0,
      limit: 6,
    },
  });

  const response = await fetch(`${API_URL}/api/posts?${query}`);

  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};
