import React from "react";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import searchIcon from '../../assets/Images/search.png'

const SearchComponent: React.FC = () => {
  return (
   <>
     <Box
   sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1, // Takes remaining space without affecting tabs
    textAlign: "center",
    minHeight: 0, // Helps prevent unexpected shrinking
  }}
>
  <h3 style={{ color: "#666" }}>Hey User,</h3>
  <p style={{ color: "#999" }}>What can I help with?</p>
</Box>


      {/* Search Box */}
      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  }}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      bgcolor: "white",
      borderRadius: "24px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      p: "4px",
      width: "90%",
      maxWidth: "400px",
    }}
  >
    <TextField
      fullWidth
      placeholder="Search anything..."
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "24px",
          backgroundColor: "white",
          paddingRight: "8px",
        },
        "& fieldset": { border: "none" },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="contained"
              sx={{
                borderRadius: "100px",
                px: 2,
                minWidth: "auto",
                backgroundColor: "#0073B7",
                textTransform: "none",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            >
              Search <img src={searchIcon} alt="search" style={{ marginLeft: "8px" }} />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  </Box>
</Box>


      {/* Footer Info */}
      <Box sx={{ mt: 2, fontSize: "12px", color: "#888", display: "flex",
    justifyContent: "center",
    textAlign: "center", }}>
        Mold-Tek AI can make mistakes. Check important info.
      </Box>
      </>

  );
};

export default SearchComponent;
