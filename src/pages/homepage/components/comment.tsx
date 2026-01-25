import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styles } from "../homepage-styles";
import { webUser } from "../../../constants/user";
import { type IComment } from "../../../types/comment";
import { useState } from "react";

interface CommentProps {
  comment: IComment;
  onDelete: (id: number) => void;
}

export function CommentItem({ comment, onDelete }: CommentProps) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box sx={styles.commentContainer}>
        <Box sx={styles.avatar}>{comment.email.charAt(0).toUpperCase()}</Box>
        <Box sx={styles.commentBubble}>
          <Typography sx={{ fontSize: "14px" }}>
            <strong>{comment.email}</strong> {comment.body}
          </Typography>
        </Box>
      </Box>

      {comment?.email === webUser.email && isHovering ? (
        <IconButton
          size="small"
          onClick={() => onDelete(comment.id)}
          sx={styles.deleteButton}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ) : null}
    </Box>
  );
}
