import { IPost } from "@/models";
import Image from "next/image";
import Link from "next/link";
import { FaVk } from "react-icons/fa";

interface Props {
  post: IPost;
}

export default function Post({ post }: Props) {
  const { title, city, date, description, image, author, slug } = post;

  return (
    <div className="flex flex-col w-full p-4 bg-slate-300 shadow-md mt-6">
      <div className="relative h-72 w-full">
        <Image
          className="mb-2 contain object-cover"
          src={image.medium}
          alt={title}
          fill
          // TEMPORARY
          sizes="100%"
          priority
        />
      </div>
      <div className="flex justify-between">
        <span>{date}</span>
        <span>{city.toUpperCase()}</span>
      </div>
      <Link href={`/blog/${slug}`}>
        <h3 className="text-2xl font-bold">{title}</h3>
      </Link>
      <p className="mb-2">{description}</p>
      <div className="flex justify-between mt-auto">
        <span>Read more</span>
        <div className="flex items-center">
          <FaVk className="mr-2" />
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
}
