import { capitalizeText, extendKeywords } from "@/helpers";
import { IPost } from "@/models";

import Layout from "@/components/Layout";
import PostItem from "@/components/PostItem";
import CityNavigation from "@/components/CityNavigation";
import PageTitle from "@/components/PageTitle";
import BackPageNavigation from "@/components/BackPageNavigation";
import Pagination from "@/components/Pagination";

interface Props {
  cityName: string;
  cities: string[];
  posts: IPost[];
  currentPage: number;
  numberOfPages: number;
}

export default function BlogPage({
  cityName,
  cities,
  posts,
  currentPage,
  numberOfPages,
}: Props) {
  const options = {
    title: cityName
      ? `Russo Trip | ${capitalizeText(cityName, true)}`
      : "Russo Trip | Экскурсии",
    keywords: cityName
      ? extendKeywords(cityName)
      : extendKeywords(cities.join(", ")),
    pageTitle: cityName
      ? `Экскурсии / ${capitalizeText(cityName, true)}`
      : "Экскурсии",
    path: cityName ? `/blog/city/${cityName}` : "/blog",
  };

  return (
    <Layout title={options.title} keywords={options.keywords}>
      <BackPageNavigation />
      <div className="flex flex-col-reverse justify-between lg:flex-row">
        <div className="w-full mr-10 lg:w-3/4">
          <PageTitle>{options.pageTitle}</PageTitle>
          <div className="grid gap-x-8 gap-y-10 mb-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostItem key={post.title} post={post} />
            ))}
          </div>
        </div>
        <div className="w-full mt-2 lg:w-1/4 lg:mt-0">
          <CityNavigation cities={cities} />
        </div>
      </div>
      <Pagination
        className="mt-0 mb-6 sm:mt-2 sm:mb-0"
        path={options.path}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Layout>
  );
}
