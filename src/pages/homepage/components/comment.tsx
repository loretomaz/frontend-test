import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styles } from "../homepage-styles";
import { webUser } from "../../../constants/user";
import { type IComment } from "../../../types/comment";

interface CommentProps {
  comment: IComment;
  onDelete: (id: number) => void;
}

export function CommentItem({ comment, onDelete }: CommentProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={styles.commentContainer}>
        <Box sx={styles.avatar}>{comment.email.charAt(0).toUpperCase()}</Box>
        <Box sx={styles.commentBubble}>
          <Typography sx={{ fontSize: "13px" }}>
            <strong>{comment.email}</strong> {comment.body}
          </Typography>
        </Box>
      </Box>

      {comment?.email === webUser.email ? (
        <IconButton
          size="small"
          onClick={() => onDelete(comment.id)}
          sx={{ color: "#aaaaaa" }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ) : null}
    </Box>
  );
}
