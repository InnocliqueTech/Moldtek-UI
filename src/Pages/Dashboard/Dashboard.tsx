import React from "react";
import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <Box
      sx={{
        p: 4,
        height: "80vh",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <DashboardIcon sx={{ fontSize: 60, color: "#1976d2", mb: 2 }} />
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        You don’t have any data yet. Please go through the sidebar navigation.
      </Typography>
    </Box>
  );
};

export default DashboardPage;
