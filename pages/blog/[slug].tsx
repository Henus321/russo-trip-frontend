import { API_URL } from "@/constants";
import { IData, IPost } from "@/models";
import { GetServerSideProps } from "next";
import {
  beatifyDate,
  capitalizeText,
  convertDataToPosts,
  extendKeywords,
  parseCookies,
} from "@/helpers";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import qs from "qs";

import Layout from "@/components/Layout";
import Comments from "@/components/Comments";
import Bookmark from "@/components/Bookmark";
import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";
import BackPageNavigation from "@/components/BackPageNavigation";
import Markdown from "@/components/Markdown";

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

  const keywords = extendKeywords(`${title}, ${city}`);

  const isLoading = authIsLoading || bookmarksIsLoading || commentsIsLoading;
  const formattedDate = beatifyDate(date);
  const formattedCity = capitalizeText(city, true);
  const formattedTitle = capitalizeText(title);

  return (
    <Layout title={`Russo Trip | ${formattedTitle}`} keywords={keywords}>
      {isLoading && <Loading />}
      <BackPageNavigation />
      <PageTitle>
        {formattedTitle}
        <span className="text-xl font-normal">{formattedCity}</span>
      </PageTitle>
      <div className="flex flex-col px-4 mb-6 sm:px-0 sm:mb-0">
        <div className="relative w-full mt-2 mb-4 h-[12rem] sm:h-[16rem] md:h-[20rem] lg:h-[30rem] xl:h-[38rem] 2xl:h-[46rem]">
          <Image
            className="block object-cover"
            src={image.large}
            alt={title}
            fill
            sizes="100%"
            priority
          />
        </div>
        <Bookmark jwt={jwt} post={post} />
        <Markdown markdown={markdown} />
        <div className="flex justify-between mb-2">
          <span>{formattedDate}</span>
          <span>Автор: {author}</span>
        </div>
        <Comments postId={id} jwt={jwt} />
      </div>
    </Layout>
  );
}

export default observer(PostPage);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { jwt } = parseCookies(req);

  const query = qs.stringify({
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

  const response = await fetch(`${API_URL}/api/posts?${query}`);
  const { data }: { data: IData[] } = await response.json();
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
