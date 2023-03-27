import {
  API_URL,
  COMMON_ERROR_MESSAGE,
  NOT_AUTHORIZED_MESSAGE,
  NO_TOKEN_MESSAGE,
  FAIL_FETCH_MESSAGE,
  EMPTY_MESSAGE,
} from "@/constants";
import { convertDataToComments } from "@/helpers";
import { IComment, IData, INewComment } from "@/models";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { RootStore } from ".";
import qs from "qs";

class commentsStore {
  rootStore: RootStore;

  comments: IComment[] | null = null;
  commentMessage: string = "";
  reFetch: boolean = false;
  isLoading: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setComments = (comments: IComment[]) => {
    this.comments = comments;
  };

  setCommentMessage = (message: string) => {
    this.commentMessage = message;
  };

  setFetch = (status: boolean) => {
    this.reFetch = status;
  };

  setLoading = (status: boolean) => {
    this.isLoading = status;
  };

  resetComments = () => {
    this.comments = null;
  };

  fetchComments = async (postId: number) => {
    this.setLoading(true);
    try {
      const commentsQuery = qs.stringify({
        populate: "*",
        filters: {
          post: {
            id: {
              $eq: postId,
            },
          },
        },
        sort: ["createdAt:desc"],
      });
      const response = await fetch(`${API_URL}/api/comments?${commentsQuery}`);
      const { data }: { data: IData[] } = await response.json();

      if (response.ok) {
        const comments: IComment[] = convertDataToComments(data);
        this.setComments(comments);
      } else {
        toast.error(FAIL_FETCH_MESSAGE);
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
    this.setLoading(false);
  };

  addComment = async (comment: string, postId: number, jwt: string) => {
    if (!jwt) {
      toast.error(NOT_AUTHORIZED_MESSAGE);
      return;
    }

    if (!comment) {
      toast.error(EMPTY_MESSAGE);
      return;
    }

    this.setLoading(true);
    try {
      const commentData: INewComment = {
        body: comment,
        post: postId,
      };

      const response = await fetch(`${API_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: commentData }),
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          toast.error(NO_TOKEN_MESSAGE);
        } else {
          toast.error(COMMON_ERROR_MESSAGE);
        }
      } else {
        this.setFetch(!this.reFetch);
        this.setCommentMessage("");
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
    this.setLoading(false);
  };
}

export default commentsStore;
