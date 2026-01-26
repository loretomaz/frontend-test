import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { webUser } from "../../../constants/user";
import { type IComment } from "../../../types/comment";

interface CommentInputProps {
  postId: number;
  onClick: (
    types: Pick<IComment, "postId" | "email" | "body">,
  ) => Promise<void>;
  placeholder?: string;
}

export function CommentInput({
  postId,
  onClick,
  placeholder,
}: CommentInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return;

    await onClick({
      postId,
      email: webUser.email,
      body: text,
    });
    setText("");
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder || "Write a comment..."}
        value={text}
        onChange={(c) => setText(c.target.value)}
        sx={{
          "& input::placeholder": {
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#000" },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ backgroundColor: "#000", "&:hover": { backgroundColor: "#333" } }}
      >
        Send
      </Button>
    </Box>
  );
}
