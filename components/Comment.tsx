import { beatifyDate, capitalizeFirstLetter } from "@/helpers";
import { IComment } from "@/models";
import { toJS } from "mobx";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  comment: IComment;
}

export default function Comment({ comment }: Props) {
  return (
    <div className="flex items-center mb-4 bg-white py-4 px-6">
      <span>
        <FaUserCircle className="text-4xl mr-4 mt-1 h-full" />
      </span>
      <div className="flex flex-col">
        <div className="flex mb-2">
          <span className="underline">
            {capitalizeFirstLetter(comment.author)}
          </span>
          <span className="mx-2">-</span>
          <span>{beatifyDate(comment.createdAt, true)}</span>
        </div>
        <p className="mb-2">{comment.body}</p>
      </div>
    </div>
  );
}
