import axios from "axios";
import { type IPost } from "../types/post";

export async function getPosts(): Promise<IPost[]> {
  const response = await axios.get<IPost[]>(
    "https://jsonplaceholder.typicode.com/posts",
  );
  return response.data;
}

export const createPost = async (
  data: Pick<IPost, "body" | "title" | "userId">,
) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    data,
  );
  return response.data;
};
