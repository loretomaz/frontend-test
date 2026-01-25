import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { type IComment } from "../../../types/comment";
import { type IPost } from "../../../types/post";
import { type IUser } from "../../../types/user";
import { webUser } from "../../../constants/user";
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
  onDeletePost: (id: number) => void;
}

export function PostItem({
  post,
  author,
  comments,
  onAddComment,
  onDelete,
  onDeletePost,
}: PostProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Box
      sx={styles.postContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box sx={styles.postHeader}>
        <Box sx={styles.avatar}>{author?.name.charAt(0).toUpperCase()}</Box>
        <Box sx={styles.postAuthor}>
          <strong>{author ? author.name : "User unknown..."}</strong>
          <Typography sx={{ fontSize: "13px" }}>{author?.email}</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {Number(post?.userId) === Number(webUser.id) && isHovering ? (
          <IconButton
            size="small"
            onClick={() => onDeletePost(post.id)}
            sx={styles.deleteButton}
          >
            <DeleteIcon />
          </IconButton>
        ) : null}
      </Box>

      <Typography sx={styles.postTitle}>{post.title}</Typography>
      <Typography sx={{ marginBottom: "12px", fontSize: "15px" }}>
        {post.body}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onDelete={onDelete} />
        ))}
        <CommentInput
          postId={post.id}
          onClick={onAddComment}
          placeholder={
            comments.length === 0
              ? "Be the first one to comment!"
              : "Write a comment..."
          }
        />
      </Box>
    </Box>
  );
}
