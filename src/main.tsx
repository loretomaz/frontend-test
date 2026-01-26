import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Box, CircularProgress } from "@mui/material";
import { styles } from "../src/pages/homepage/homepage-styles.tsx";
import "./index.css";

const Homepage = lazy(() => import("./pages/homepage/homepage.tsx"));
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Suspense
      fallback={
        <Box sx={styles.loadingContainer}>
          <CircularProgress sx={{ color: "#000000" }} />
        </Box>
      }
    >
      <Homepage />
    </Suspense>
  </StrictMode>,
);
