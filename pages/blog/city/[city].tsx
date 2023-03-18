import { posts } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import Post from "@/components/Post";

export default function CityBlogPage() {
  const {
    query: { city },
  } = useRouter();
  const filteredPosts = posts.filter(
    (post) => post.city.toLowerCase() === city
  );

  const cities = posts.map(({ city }) => city);
  const uniqueCities = [...new Set(cities)];

  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            All {city} trips
          </h1>
          <div className="grid grid-cols-3 gap-5">
            {filteredPosts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col w-full p-4 text-white text-xl bg-cyan-900">
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
