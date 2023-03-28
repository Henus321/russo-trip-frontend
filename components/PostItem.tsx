import { beatifyDate, capitalizeFirstLetter } from "@/helpers";
import { IPost } from "@/models";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  post: IPost;
  small?: boolean;
}

export default function PostItem({ post, small = false }: Props) {
  const { title, city, date, description, image, author, slug } = post;

  const formattedDate = beatifyDate(date);
  const formattedCity = capitalizeFirstLetter(city);
  const formattedAuthor = capitalizeFirstLetter(author);

  return (
    <div
      className={`flex flex-col w-full p-4 ${
        !small ? "shadow-xl" : "shadow-md"
      }`}
    >
      {!small && (
        <>
          <div className="relative h-72 w-full mb-1">
            <Image
              className="contain object-cover"
              src={image.medium}
              alt={title}
              fill
              sizes="100%"
              priority
            />
          </div>
          <div className="flex justify-between">
            <span>{formattedDate}</span>
            <span>{formattedCity}</span>
          </div>
        </>
      )}
      <Link className="self-start" href={`/blog/${slug}`}>
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
      </Link>
      <p className="text-justify mb-2">{description}</p>
      <div className="flex justify-between mt-auto">
        <Link className="underline" href={`/blog/${slug}`}>
          Подробнее
        </Link>
        <div className="flex items-center">
          <FaUserCircle className="text-xl mr-1" />
          <span>{formattedAuthor}</span>
        </div>
      </div>
    </div>
  );
}
