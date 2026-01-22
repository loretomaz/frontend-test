import { Box, Typography } from "@mui/material";
import { styles } from "../homepage-styles";
import { type IComment } from "../../../types/comment";

interface CommentProps {
  comment: IComment;
}

export function CommentItem({ comment }: CommentProps) {
  return (
    <Box sx={styles.commentContainer}>
      <Box sx={styles.avatar}>{comment.email.charAt(0).toUpperCase()}</Box>
      <Box sx={styles.commentBubble}>
        <Typography sx={{ fontSize: "15px" }}>
          <strong>{comment.email}</strong> {comment.body}
        </Typography>
      </Box>
    </Box>
  );
}
