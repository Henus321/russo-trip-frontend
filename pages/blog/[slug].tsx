import { posts } from "@/constants";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "@/components/Layout";

export default function PostPage() {
  const {
    query: { slug },
  } = useRouter();

  return (
    <Layout>
      <Link href="/blog">Go Back</Link>
      <h1 className="text-5xl border-b-4 p-5 font-bold">{slug}</h1>
    </Layout>
  );
}
