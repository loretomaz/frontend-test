import { Box, CircularProgress } from "@mui/material";
import { styles } from "../homepage/homepage-styles";
import { useHomepage } from "../homepage/homepage-rules";
import { PostItem } from "../homepage/components/post";

export function Homepage() {
  const { posts, loading, getPostData } = useHomepage();

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress sx={{ color: "#000000" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 5, maxWidth: "900px", margin: "0 auto" }}>
      {posts.map((post) => {
        const { author, postComments } = getPostData(post);
        return (
          <PostItem
            key={post.id}
            post={post}
            author={author}
            comments={postComments}
          />
        );
      })}
    </Box>
  );
}

export default Homepage;
