import { Box, Typography } from "@mui/material";
import { type IComment } from "../../../types/comment";
import { type IPost } from "../../../types/post";
import { type IUser } from "../../../types/user";
import { styles } from "../homepage-styles";
import { CommentItem } from "./comment";
import { CommentInput } from "./comment-input";

interface PostProps {
  author?: IUser;
  comments: IComment[];
  post: IPost;

  onAddComment: (
    types: Pick<IComment, "postId" | "email" | "body">,
  ) => Promise<void>;

  onDelete: (id: number) => void;
}

export function PostItem({
  post,
  author,
  comments,
  onAddComment,
  onDelete,
}: PostProps) {
  return (
    <Box sx={styles.postContainer}>
      <Box sx={styles.postHeader}>
        <Box sx={styles.avatar}>{author?.name.charAt(0).toUpperCase()}</Box>
        <Box sx={styles.postAuthor}>
          <strong>{author ? author.name : "User unknown..."}</strong>
          <Typography sx={{ fontSize: "15px" }}>{author?.email}</Typography>
        </Box>
      </Box>

      <Typography sx={styles.postTitle}>{post.title}</Typography>
      <Typography sx={{ marginBottom: "20px" }}>{post.body}</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={onDelete}
            />
          ))
        ) : (
          <Typography>No comments for this post...</Typography>
        )}
        <CommentInput postId={post.id} onClick={onAddComment} />
      </Box>
    </Box>
  );
}
