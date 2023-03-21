import { API_URL } from "@/constants";
import { IData, IPost } from "@/models";
import { GetServerSideProps } from "next";
import { convertDataToPosts, parseCookies } from "@/helpers";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";

import Layout from "@/components/Layout";
import Comments from "@/components/Comments";

interface Props {
  post: IPost;
  jwt: string;
}

export default function PostPage({ post, jwt }: Props) {
  const { city, image, title, description, date, author, id } = post;

  return (
    <Layout>
      <Link href="/blog">Go Back</Link>
      <h1 className="text-5xl font-bold">{title}</h1>
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
        <div className="flex flex-col w-full">
          <p className="mb-2">{description}</p>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <span>{date}</span>
        <span>Author: {author}</span>
      </div>
      <Comments postId={id} jwt={jwt} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { jwt } = parseCookies(req);

  const postsQuery = qs.stringify({
    filters: {
      slug: {
        $eq: params?.slug,
      },
    },
    populate: {
      user: "user",
      image: {
        populate: "*",
      },
    },
  });

  const postsResponse = await fetch(`${API_URL}/api/posts?${postsQuery}`);
  const { data }: { data: IData[] } = await postsResponse.json();
  const post: IPost = convertDataToPosts(data)[0];

  return {
    props: {
      post,
      jwt,
    },
  };
};
