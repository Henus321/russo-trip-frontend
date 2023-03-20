import { API_URL } from "@/constants";
import { IPost } from "@/models";
import { GetStaticPaths, GetStaticProps } from "next";
import { convertDataToPosts } from "@/helpers";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";

import Layout from "@/components/Layout";

export default function PostPage({ post }: { post: IPost }) {
  const { slug, city, image, title, description, date, author } = post;

  return (
    <Layout>
      <Link href="/blog">Go Back</Link>
      <h1 className="text-5xl font-bold">{slug}</h1>
      <span className="text-2xl">{city}</span>
      <div className="relative h-96 w-full my-2">
        <Image
          className="mb-2 contain object-cover"
          src={image.large}
          alt={title}
          fill
          // TEMPORARY
          sizes="100%"
          priority
        />
      </div>
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <p className="mb-2">{description}</p>
        </div>
        <div className="flex flex-col justify-center items-center h-96 bg-slate-100 w-1/2">
          <h2>Map?</h2>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <span>{date}</span>
        <span>{author}</span>
      </div>
      <div className="flex flex-col justify-center items-center h-96 bg-slate-100 w-full">
        <h2>Comments Section</h2>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${API_URL}/api/posts`);
  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  const paths = posts.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: params?.slug,
      },
    },
  });
  const response = await fetch(`${API_URL}/api/posts?populate=*&${query}`);

  const { data } = await response.json();

  const posts: IPost[] = convertDataToPosts(data);

  return {
    props: {
      post: posts[0],
    },
    revalidate: 1,
  };
};
