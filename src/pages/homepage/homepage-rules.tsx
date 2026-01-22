import { useEffect, useState } from "react";
import { getComments } from "../../api/comment";
import { getPosts } from "../../api/post";
import { getUsers } from "../../api/user";
import { type IComment } from "../../types/comment";
import { type IPost } from "../../types/post";
import { type IUser } from "../../types/user";

export function useHomepage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [userList, postList, commentList] = await Promise.all([
          getUsers(),
          getPosts(),
          getComments(),
        ]);
        setUsers(userList);
        setPosts(postList);
        setComments(commentList);
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getPostData = (post: IPost) => {
    return {
      author: users.find((u) => u.id === post.userId),
      postComments: comments.filter((c) => c.postId === post.id),
    };
  };

  return { posts, loading, getPostData };
}
