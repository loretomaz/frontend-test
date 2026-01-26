import { Box, CircularProgress, Typography } from "@mui/material";
import { styles } from "../homepage/homepage-styles";
import { useHomepage } from "../homepage/homepage-rules";
import { PostItem } from "./components/post";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";

export function Homepage() {
  const {
    users,
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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />

      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <Box sx={styles.sidebar}>
          <Sidebar onAddPost={handleAddPost} users={users} />
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
    </Box>
  );
}

export default Homepage;
