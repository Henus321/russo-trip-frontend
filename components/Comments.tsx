import { useEffect, useState } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";

import CommentItem from "./CommentItem";
import OnUnmount from "./OnUnmount";

interface Props {
  postId: number;
  jwt: string;
}

function Comments({ postId, jwt }: Props) {
  const { authStore, commentsStore } = useStores();
  const { user, isLoading: authIsLoading } = authStore;
  const {
    comments,
    reFetch,
    isLoading: commentsIsLoading,
    fetchComments,
    addComment,
    resetComments,
  } = commentsStore;
  const [commentMessage, setCommentMessage] = useState("");

  useEffect(() => {
    fetchComments(postId);
  }, [fetchComments, postId, reFetch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addComment(commentMessage, postId, jwt);
    setCommentMessage("");
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCommentMessage(e.target.value);

  return (
    <div className="flex flex-col bg-secondary-color w-full px-4 py-6 shadow-md">
      <OnUnmount func={resetComments} />
      <div className="flex flex-col mb-6">
        <h2 className="text-3xl text-center font-bold underline mb-1">
          Комментарии
        </h2>
        {!user && !authIsLoading && (
          <span className="text-center">
            Войдите чтобы оставить комментарий
          </span>
        )}
      </div>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem
            key={`${comment.id}${comment.author}`}
            comment={comment}
          />
        ))}
      {!commentsIsLoading && comments && comments.length === 0 && (
        <div className="flex flex-col mb-10 mt-6 mx-auto">
          <span>Нет комментариев...</span>
        </div>
      )}
      {user ? (
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col w-full">
          <label className="mb-1" htmlFor="comment">
            Новый комментарий
          </label>
          <textarea
            className="bg-white shadow-sm py-1 px-2 mb-6 outline-none resize-none"
            value={commentMessage}
            onChange={(e) => onChange(e)}
            id="comment"
            rows={5}
            cols={30}
            maxLength={250}
            placeholder="Введите текст..."
          />
          <button
            disabled={commentsIsLoading}
            className="shadow-sm text-xl px-4 py-1 self-center text-white bg-primary-color hover:bg-primary-color-alt active:text-secondary-color-alt disabled:text-gray-400"
          >
            Отправить
          </button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}

export default observer(Comments);
