import { AppBar, Toolbar, Box, Typography, Avatar } from "@mui/material";
import { styles } from "../homepage-styles";
import { webUser } from "../../../constants/user"; //

export function Header() {
  return (
    <AppBar position="sticky" sx={styles.header}>
      <Toolbar sx={styles.headerToolbar}>
        <Box sx={styles.logo}>
          <img src="/icon.png" alt="Logo" style={{ width: 35, height: 35 }} />
          <Typography variant="h6" fontWeight="bold">
            myBlog
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            {webUser.name}
          </Typography>
          <Avatar sx={styles.avatar}>
            {webUser.name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
