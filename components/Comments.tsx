import { useEffect, useRef } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";
import Comment from "./Comment";

interface Props {
  postId: number;
  jwt: string;
}

function Comments({ postId, jwt }: Props) {
  const { authStore, commentsStore } = useStores();
  const { user } = authStore;
  const {
    comments,
    reFetch,
    commentMessage,
    isLoading,
    setCommentMessage,
    fetchComments,
    addComment,
    resetComments,
  } = commentsStore;

  useEffect(() => {
    fetchComments(postId);
  }, [fetchComments, postId, reFetch]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    return () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      resetComments();
    };
  }, [resetComments]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addComment(commentMessage, postId, jwt);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCommentMessage(e.target.value);

  return (
    <div className="flex flex-col bg-slate-100 w-full px-4 py-6 shadow-md">
      <h2 className="text-3xl text-center font-bold underline mb-6">
        Комментарии
      </h2>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <Comment key={`${comment.id}${comment.author}`} comment={comment} />
        ))}
      {!isLoading && comments && comments.length === 0 && (
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
            disabled={isLoading}
            className="bg-slate-800 text-white shadow-sm text-xl px-4 py-1 self-center disabled:text-gray-400 hover:bg-slate-900 active:text-slate-200"
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
