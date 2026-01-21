import axios from "axios";
import { type IComment } from "../types/comment";

export async function getComments(): Promise<IComment[]> {
  try {
    const response = await axios.get<IComment[]>(
      "https://jsonplaceholder.typicode.com/comments",
    );
    return response.data;
  } catch (error) {
    console.error("Error loading comments", error);
    return [];
  } finally {
    console.log("Search finalized.");
  }
}
