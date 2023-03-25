import { API_URL } from "@/constants";
import { IData, IPost } from "@/models";
import { GetServerSideProps } from "next";
import { marked } from "marked";
import {
  beatifyDate,
  capitalizeFirstLetter,
  convertDataToPosts,
  parseCookies,
} from "@/helpers";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import qs from "qs";

import Layout from "@/components/Layout";
import Comments from "@/components/Comments";
import Bookmark from "@/components/Bookmark";
import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";

interface Props {
  post: IPost;
  jwt: string;
}

function PostPage({ post, jwt }: Props) {
  const { city, image, title, markdown, date, author, id } = post;
  const { authStore, bookmarksStore, commentsStore } = useStores();
  const { isLoading: authIsLoading } = authStore;
  const { isLoading: bookmarksIsLoading } = bookmarksStore;
  const { isLoading: commentsIsLoading } = commentsStore;

  const isLoading = authIsLoading || bookmarksIsLoading || commentsIsLoading;
  const formattedDate = beatifyDate(date);

  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <Layout>
      {isLoading && <Loading />}
      <button className="flex items-center underline" onClick={() => onClick()}>
        <FaArrowLeft className="mr-2" /> Назад
      </button>
      <PageTitle>
        {title}
        <span className="text-xl">{capitalizeFirstLetter(city)}</span>
      </PageTitle>
      <div className="relative w-full h-[40rem] my-2">
        <Image
          className="block mb-2 object-cover"
          src={image.large}
          alt={title}
          fill
          // TEMPORARY
          sizes="100%"
          priority
        />
      </div>
      <Bookmark jwt={jwt} post={post} />
      <div
        className="markdown flex flex-col w-full mb-2"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      ></div>
      <div className="flex justify-between mb-2">
        <span>{formattedDate}</span>
        <span>Автор: {capitalizeFirstLetter(author)}</span>
      </div>
      <Comments postId={id} jwt={jwt} />
    </Layout>
  );
}

export default observer(PostPage);

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
      post: {
        populate: "*",
      },
    },
  });

  const postsResponse = await fetch(`${API_URL}/api/posts?${postsQuery}`);
  const { data }: { data: IData[] } = await postsResponse.json();
  const postArr: IPost[] = convertDataToPosts(data);
  const post = postArr.length > 0 ? postArr[0] : null;

  return {
    notFound: post ? false : true,
    props: {
      post,
      jwt,
    },
  };
};
