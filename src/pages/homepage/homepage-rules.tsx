import { useEffect, useState } from "react";
import { getComments } from "../../api/comment";
import { getPosts } from "../../api/post";
import { getUsers } from "../../api/user";
import { createComment } from "../../api/comment";
import { createPost } from "../../api/post";
import { webUser } from "../../constants/user";
import { type IComment } from "../../types/comment";
import { type IPost } from "../../types/post";
import { type IUser } from "../../types/user";

export function useHomepage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [userList, postList, commentList] = await Promise.all([
          getUsers(),
          getPosts(),
          getComments(),
        ]);
        setUsers([...userList, webUser]);
        setPosts(postList);
        setComments(commentList);
      } catch {
        setError("We were unable to load the data. Please try again later.");
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

  const handleAddComment = async (
    newCommentData: Pick<IComment, "postId" | "email" | "body">,
  ) => {
    try {
      const commentId = Date.now();
      const newComment = await createComment(newCommentData);
      const newIdForComment = {
        ...newComment,
        postId: newCommentData.postId,
        id: commentId,
      };
      setComments((prev) => [...prev, newIdForComment]);
    } catch {
      setError("We were unable to load the data. Please try again later.");
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const handleAddPost = async (newPostData: {
    title: string;
    body: string;
    userId: number;
  }) => {
    try {
      const newPost = await createPost(newPostData);
      const newIdForPost = {
        ...newPost,
        userId: newPostData.userId,
        id: Date.now(),
      };
      setPosts((prev) => [newIdForPost, ...prev]);
    } catch {
      setError("We were unable to load the data. Please try again later.");
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  return {
    users,
    posts,
    loading,
    error,
    getPostData,
    handleAddComment,
    handleDeleteComment,
    handleAddPost,
    handleDeletePost,
  };
}
