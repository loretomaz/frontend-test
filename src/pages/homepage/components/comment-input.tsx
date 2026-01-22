import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { type IComment } from "../../../types/comment";

interface CommentInputProps {
  postId: number;
  onClick: (
    types: Pick<IComment, "postId" | "email" | "body">,
  ) => Promise<void>;
}

export function CommentInput({ postId, onClick }: CommentInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return;

    await onClick({
      postId,
      email: "Loresnoaus@airli.de",
      body: text,
    });
    setText("");
  };

  return (
    <Box sx={{ marginTop: 2, display: "flex", gap: 1 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Write a comment..."
        value={text}
        onChange={(c) => setText(c.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ backgroundColor: "#000" }}
      >
        Send
      </Button>
    </Box>
  );
}
