import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styles } from "./homepage-styles";
import { getComments } from "../../api/comment";
import { getPosts } from "../../api/post";
import { getUsers } from "../../api/user";
import { type IComment } from "../../types/comment";
import { type IPost } from "../../types/post";
import { type IUser } from "../../types/user";

export function Homepage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    async function loadData() {
      const [userList, postList, commentList] = await Promise.all([
        getUsers(),
        getPosts(),
        getComments(),
      ]);
      setUsers(userList);
      setPosts(postList);
      setComments(commentList);
    }
    loadData();
  }, []);

  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "0 auto" }}>
      {posts.map((post) => {
        const postAuthor = users.find((u) => u.id === post.userId);
        const postComments = comments.filter((c) => c.postId === post.id);

        return (
          <Box key={post.id} sx={styles.postContainer}>
            <Box sx={styles.postHeader}>
              <Box sx={styles.avatar}>
                {postAuthor?.name.charAt(0).toUpperCase()}
              </Box>
              <Box sx={styles.postAuthor}>
                <strong>
                  {postAuthor ? postAuthor.name : "User unknown..."}
                </strong>
                <Typography sx={{ fontSize: "15px" }}>
                  {postAuthor?.email}
                </Typography>
              </Box>
            </Box>
            <Typography sx={styles.postTitle}>{post.title}</Typography>
            <Typography sx={{ mb: "20px" }}>{post.body}</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {postComments.length > 0 ? (
                postComments.map((comment) => (
                  <Box key={comment.id} sx={styles.commentContainer}>
                    <Box sx={styles.avatar}>
                      {comment.email.charAt(0).toUpperCase()}
                    </Box>
                    <Box sx={styles.commentBubble}>
                      <Typography sx={{ fontSize: "15px" }}>
                        <strong>{comment.email}</strong> {comment.body}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No comments for this post...</Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default Homepage;
