import axios from "axios";
import { type IUser } from "../types/user";

export async function getUsers(): Promise<IUser[]> {
  try {
    const response = await axios.get<IUser[]>(
      "https://jsonplaceholder.typicode.com/users",
    );
    return response.data;
  } catch (error) {
    console.error("Error loading users", error);
    return [];
  } finally {
    console.log("Search finalized.");
  }
}
