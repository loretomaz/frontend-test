import { type SxProps, type Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  avatar: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    flexShrink: 0,
    fontSize: "12px",
    fontWeight: "bold",
    height: "30px",
    justifyContent: "center",
    width: "30px",
  },

  commentBubble: {
    backgroundColor: "#f0f2f5",
    borderRadius: "8px",
    padding: "8px",
  },

  commentContainer: {
    alignItems: "flex-start",
    display: "flex",
    gap: "10px",
  },

  deleteButton: {
    color: "#aaaaaa",
    "&:hover": { color: "#d32f2f" },
  },

  loadingContainer: {
    alignItems: "center",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
  },

  mainContent: {
    flexGrow: 1,
    padding: 4,
    backgroundColor: "#f5f5f5",
    overflowY: "auto",
  },

  postAuthor: {
    color: "#000000",
    display: "flex",
    flexDirection: "column",
    fontSize: "13px",
    fontWeight: "bold",
  },

  postContainer: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    justifyContent: "center",
    marginBottom: "20px",
    padding: 4,
    position: "relative",
  },

  postHeader: {
    alignItems: "center",
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  postTitle: {
    color: "#000000",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "3px",
  },

  sidebar: {
    width: "40%",
    minWidth: "350px",
    padding: 4,
    borderRight: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    overflowY: "auto",
  },
};
