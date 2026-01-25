import { Box, CircularProgress, Typography } from "@mui/material";
import { styles } from "../homepage/homepage-styles";
import { useHomepage } from "../homepage/homepage-rules";
import { PostItem } from "./components/post";
import { PostForm } from "../homepage/components/post-form";

export function Homepage() {
  const {
    posts,
    loading,
    error,
    getPostData,
    handleAddComment,
    handleAddPost,
    handleDeleteComment,
    handleDeletePost,
  } = useHomepage();

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress sx={{ color: "#000000" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.loadingContainer}>
        <Typography color="error" fontWeight="bold">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box sx={styles.sidebar}>
        <PostForm onAddPost={handleAddPost} />
      </Box>

      <Box sx={styles.mainContent}>
        <Box sx={{ margin: "0 auto" }}>
          {posts.map((post) => {
            const { author, postComments } = getPostData(post);
            return (
              <PostItem
                key={post.id}
                post={post}
                author={author}
                comments={postComments}
                onAddComment={handleAddComment}
                onDelete={handleDeleteComment}
                onDeletePost={handleDeletePost}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Homepage;
