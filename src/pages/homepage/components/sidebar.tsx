import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { styles } from "../homepage-styles";
import { webUser } from "../../../constants/user";
import { type IUser } from "../../../types/user";

interface SidebarProps {
  onAddPost: (types: {
    title: string;
    body: string;
    userId: number;
  }) => Promise<void>;
  users: IUser[];
}

export function Sidebar({ onAddPost, users }: SidebarProps) {
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
      <Typography variant="h6" fontWeight="bold" color="#000000">
        Create a Post
      </Typography>
      <TextField
        placeholder="What are you thinking about?"
        size="small"
        value={title}
        onChange={(t) => setTitle(t.target.value)}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "13px",
            padding: "10px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#000" },
          },
        }}
      />
      <TextField
        placeholder="Share here your best thoughts"
        fullWidth
        multiline
        rows={3}
        value={body}
        onChange={(b) => setBody(b.target.value)}
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#000" },
            padding: "10px",
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        sx={{
          backgroundColor: "#000",
          "&:hover": { backgroundColor: "#333" },
        }}
      >
        {loading ? "Publishing..." : "Publish"}
      </Button>

      <Box>
        <Typography fontWeight="bold" sx={{ mb: 2, fontSize: "18px" }}>
          Following
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {users
            .filter((user) => user.id !== webUser.id)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((user) => (
              <Box
                key={user.id}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box sx={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </Box>
                <Typography sx={{ fontSize: "14px" }}>{user.name}</Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}
