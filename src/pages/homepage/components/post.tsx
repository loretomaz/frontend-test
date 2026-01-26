import { useState } from "react";
import { CommentItem } from "./comment";
import { CommentInput } from "./comment-input";
import { webUser } from "../../../constants/user";
import { styles } from "../homepage-styles";
import { type IComment } from "../../../types/comment";
import { type IPost } from "../../../types/post";
import { type IUser } from "../../../types/user";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  IconButton,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";

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
  const imageUrl = `https://picsum.photos/seed/${post.id}blog/800/400`;
  const [imageLoaded, setImageLoaded] = useState(false);

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleDelete = () => {
    onDeletePost(post.id);
    handleClose();
  };

  return (
    <Box sx={styles.postContainer}>
      <Box sx={styles.postHeader}>
        <Box sx={styles.avatar}>{author?.name.charAt(0).toUpperCase()}</Box>
        <Box sx={styles.postAuthor}>
          <strong>{author ? author.name : "User unknown..."}</strong>
          <Typography sx={{ fontSize: "15px" }}>{author?.email}</Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        {Number(post?.userId) === Number(webUser.id) ? (
          <>
            <IconButton size="small" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchor}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={handleDelete}
                sx={{
                  color: "#d32f2f",
                  fontSize: "14px",
                  gap: 1,
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <DeleteIcon fontSize="small" />
                Delete
              </MenuItem>
            </Menu>
          </>
        ) : null}
      </Box>

      <Typography sx={styles.postTitle}>{post.title}</Typography>
      <Typography sx={{ marginBottom: "12px", fontSize: "17px" }}>
        {post.body}
      </Typography>

      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ borderRadius: "5px", mb: 2 }}
        />
      )}

      <Box sx={{ width: "100%", mb: 2 }}>
        <Box
          component="img"
          src={imageUrl}
          alt={post.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          sx={{
            ...styles.images,
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            height: imageLoaded ? "auto" : 0,
          }}
        />

        {imageLoaded && (
          <>
            <Divider
              textAlign="left"
              sx={{
                padding: 2,
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#666" }}>
                {comments.length === 0 ? "No comments yet..." : "Comments"}
              </Typography>
            </Divider>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onDelete={onDelete}
                />
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
          </>
        )}
      </Box>
    </Box>
  );
}
