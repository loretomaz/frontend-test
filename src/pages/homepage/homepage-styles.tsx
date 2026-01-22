export const styles: Record<string, React.CSSProperties> = {
  avatar: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    flexShrink: 0,
    fontWeight: "bold",
    height: "35px",
    justifyContent: "center",
    width: "35px",
  },

  commentBubble: {
    backgroundColor: "#f0f2f5",
    borderRadius: "12px",
    padding: "12px",
  },

  commentContainer: {
    alignItems: "flex-start",
    display: "flex",
    gap: "10px",
  },

  loadingContainer: {
    alignItems: "center",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
  },

  postAuthor: {
    color: "#000000",
    display: "flex",
    flexDirection: "column",
    fontSize: "15px",
    fontWeight: "bold",
  },

  postContainer: {
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    justifyContent: "center",
    marginBottom: "20px",
    padding: "20px",
  },

  postHeader: {
    alignItems: "center",
    display: "flex",
    gap: "10px",
    marginBottom: "12px",
  },

  postTitle: {
    color: "#000000",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "6px",
  },
};
