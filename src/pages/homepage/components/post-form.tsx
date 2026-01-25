import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { webUser } from "../../../constants/user";

interface PostFormProps {
  onAddPost: (payload: {
    title: string;
    body: string;
    userId: number;
  }) => Promise<void>;
}

export function PostForm({ onAddPost }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    setLoading(true);
    try {
      await onAddPost({ title, body, userId: webUser.id });
      setTitle("");
      setBody("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <img
          src="/icon.png"
          alt="Site Logo"
          style={{ width: 50, height: 50 }}
        />
        <Typography variant="h4" fontWeight="bold">
          myBlog
        </Typography>
      </Box>
      <Typography variant="h6" fontWeight="bold" color="#000000">
        Create a Post
      </Typography>
      <TextField
        placeholder="What are you thinking about?"
        fullWidth
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          "& input::placeholder": {
            fontSize: "13px",
          },
        }}
      />
      <TextField
        placeholder="Share here your best thoughts"
        fullWidth
        multiline
        rows={5}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        slotProps={{
          htmlInput: {
            style: { fontSize: 13 },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ backgroundColor: "#000", "&:hover": { backgroundColor: "#333" } }}
      >
        {loading ? "Publishing..." : "Publish"}
      </Button>
    </Box>
  );
}
