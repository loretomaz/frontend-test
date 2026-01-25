import axios from "axios";
import { type IUser } from "../types/user";

export async function getUsers(): Promise<IUser[]> {
  const response = await axios.get<IUser[]>(
    "https://jsonplaceholder.typicode.com/users",
  );
  return response.data;
}
