import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { type IComment } from "../../types/comment";
import { type IPost } from "../../types/post";
import { type IUser } from "../../types/user";
import { getComments } from "../../api/comment";
import { getPosts } from "../../api/post";
import { getUsers } from "../../api/user";

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
    <Box>
      <Box>
        {posts.map((post) => {
          const author = users.find((u) => u.id === post.userId);
          const postComments = comments.filter((c) => c.postId === post.id);

          return (
            <Box key={post.id}>
              <Typography>{post.title}</Typography>
              <Typography>
                {author ? author.name : "Loading author..."}
              </Typography>
              <Typography>{post.body}</Typography>
              <Box>
                {postComments.length > 0 ? (
                  postComments.map((comment) => (
                    <Box key={comment.id}>
                      <Typography>
                        <strong>{comment.email}:</strong> {comment.body}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No comments for this post.</Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Homepage;
