import { Box, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const SettingsPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <SettingsIcon sx={{ fontSize: 64, color: "primary.main" }} />
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary">
        You don’t have any data yet. Please go through the sidebar navigation.
      </Typography>
    </Box>
  );
};

export default SettingsPage;
