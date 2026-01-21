import axios from "axios";
import { type IPost } from "../types/post";

export async function getPosts(): Promise<IPost[]> {
  try {
    const response = await axios.get<IPost[]>(
      "https://jsonplaceholder.typicode.com/posts",
    );
    return response.data;
  } catch (error) {
    console.error("Error loading posts", error);
    return [];
  } finally {
    console.log("Search finalized.");
  }
}
