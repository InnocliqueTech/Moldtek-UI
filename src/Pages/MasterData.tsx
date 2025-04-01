import React from "react";
import { Box, Typography } from "@mui/material";

const MasterData: React.FC = () => {
  return (
    <Box
      sx={{
        p: 4, // Padding on all sides
        bgcolor: "white", // Background color
        borderRadius: 4, // Rounded corners
        boxShadow: 2, // Optional: Adds a slight shadow
        height:'35vw'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the MasterData Dashboard!
      </Typography>
    </Box>
  );
};

export default MasterData;
