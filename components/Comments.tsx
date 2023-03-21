import { useEffect, useRef } from "react";
import { useStores } from "@/store";
import { observer } from "mobx-react-lite";

interface Props {
  postId: number;
  jwt: string;
}

function Comments({ postId, jwt }: Props) {
  const { authStore, commentsStore } = useStores();
  const { user } = authStore;
  const {
    comments,
    fetch,
    commentMessage,
    setCommentMessage,
    fetchComments,
    addComment,
    resetComments,
  } = commentsStore;

  useEffect(() => {
    fetchComments(postId);
  }, [fetchComments, postId, fetch]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    return () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      resetComments();
    };
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addComment(commentMessage, postId, jwt);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCommentMessage(e.target.value);

  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 w-full p-4">
      <h2 className="text-2xl font-bold">Comments</h2>
      {/* + !isLoading, to avoid no comments on fetch pending */}
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <span key={`${comment.id}${comment.author}`}>
            {comment.id}
            {". "}
            {comment.body}
            {" - "}
            {comment.author}
            {" - "}
            {comment.createdAt}
          </span>
        ))
      ) : (
        <span>No comments</span>
      )}
      {user ? (
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col w-full">
          <label>Comment</label>
          <input
            value={commentMessage}
            onChange={(e) => onChange(e)}
            type="text"
          />
          <button className="bg-slate-500 px-3 py-1 self-center">post</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}

export default observer(Comments);
