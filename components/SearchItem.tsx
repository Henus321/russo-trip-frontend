import { capitalizeText } from "@/helpers";
import { IPost } from "@/models";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Props {
  post: IPost;
  onClearSearch: () => void;
}

export default function SearchItem({ post, onClearSearch }: Props) {
  const { title, city, author, slug, image } = post;

  const formattedTitle = capitalizeText(title);

  return (
    <div className="flex flex-col bg-secondary-color-alt p-3 border-solid border-slate-800/20 border-b-2 z-20">
      <div className="flex">
        <div className="relative h-40 w-1/3">
          <Image
            className="contain object-cover"
            src={image.medium}
            alt={title}
            fill
            sizes="100%"
            priority
          />
        </div>
        <div className="flex flex-col px-4 py-2 w-2/3">
          <Link onClick={() => onClearSearch()} href={`/blog/${slug}`}>
            <h3 className="text-2xl font-bold">{formattedTitle}</h3>
          </Link>
          <span className="">{capitalizeText(city, true)}</span>
          <div className="flex justify-between mt-auto">
            <Link
              onClick={() => onClearSearch()}
              className="underline"
              href={`/blog/${slug}`}
            >
              Подробнее
            </Link>
            <div className="flex items-center">
              <FaUserCircle className="text-xl mr-1" />
              <span>{author}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
