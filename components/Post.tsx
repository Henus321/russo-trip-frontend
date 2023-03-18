import Link from "next/link";

interface Props {
  post: {
    title: string;
    description: string;
    slug: string;
  };
}

export default function Post({ post: { title, description, slug } }: Props) {
  return (
    <div className="w-full px-12 py-6 bg-slate-300 shadow-md mt-6">
      <Link href={`/blog/${slug}`}>
        <h3 className="text-2xl font-bold">{title}</h3>
      </Link>
      <p>{description}</p>
    </div>
  );
}
