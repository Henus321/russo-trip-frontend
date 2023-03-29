import { API_URL } from "@/constants";
import { convertDataToPosts } from "@/helpers";
import { IData, IPost } from "@/models";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { RootStore } from ".";
import qs from "qs";

class searchStore {
  rootStore: RootStore;

  searchResult: IPost[] | null = null;
  isLoading: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setPosts = (posts: IPost[] | null) => {
    this.searchResult = posts;
  };

  setLoading = (status: boolean) => {
    this.isLoading = status;
  };

  fetchPosts = async (searchTerm: string) => {
    this.setLoading(true);
    try {
      const term = searchTerm.toLowerCase();

      const query = qs.stringify({
        populate: "*",
        filters: {
          $or: [
            {
              title: {
                $contains: term,
              },
            },
            {
              city: {
                $contains: term,
              },
            },
          ],
        },
        sort: ["createdAt:desc"],
      });
      const response = await fetch(`${API_URL}/api/posts?${query}`);
      const { data, message }: { data: IData[]; message: string } =
        await response.json();

      if (response.ok) {
        const posts: IPost[] = convertDataToPosts(data);
        this.setPosts(posts);
      } else {
        toast.error(message);
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
    this.setLoading(false);
  };
}

export default searchStore;
