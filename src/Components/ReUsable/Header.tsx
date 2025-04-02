import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  TextField,
  InputAdornment,
  Divider,
  Typography,
  Badge,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ButtonComponent from "./Button";
import ReusablePopup from "./PopUp";

interface HeaderProps {
  title: string;
  button1Text: string;
  button2Text: string;
  onButton1Click: () => void;
  onButton2Click: () => void;
  onMenuClick: () => void;
  masterDataCreatePopup: boolean;
  onClosePopup: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  button1Text,
  button2Text,
  onButton1Click,
  onButton2Click,
  onMenuClick,
  masterDataCreatePopup,
  onClosePopup,
}) => {

  const structureOptions = ["PET", "PVC", "HDPE", "Glass", "Aluminum"];


  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          color: "black",
          boxShadow: 1,
          width: "100%",
          maxWidth: "6000px",
          left: "250px",
          top: 0,
          zIndex: 100,
          overflowY: "auto",
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
        >
          <IconButton
            sx={{ display: { xs: "block", md: "none", lg: "none" } }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>

          {/* <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{
              borderRadius: "100px",
              width: { xs: "50%", sm: "40%", md: "30%" },
              mr: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
              mt: "10px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Badge
            overlap="circular"
            variant="dot"
            color="error"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{
              "& .MuiBadge-dot": {
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "2px solid white",
              },
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "2px solid #E5E5E5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NotificationsIcon sx={{ fontSize: 20 }} />
            </Box>
          </Badge> */}

{/* 
        <Box sx={{ height: 10 }} />
        <Divider />
        <Box sx={{ height: 10 }} /> */}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          paddingTop="0px"
          paddingBottom="8px"
          width="100%"
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>

          <Box display="flex" gap={2}>
            <ButtonComponent
              onClick={onButton1Click}
              color="white"
              text={button1Text}
              textColor="#0E0E0E"
              borderRadius="100px"
              border="1px solid #E5E5E5"
              p={"14px"}
            />
            <ButtonComponent
              onClick={onButton2Click}
              color="#0073B7"
              text={button2Text}
              textColor="#FFFFFF"
              borderRadius="100px"
              p={"4px"}
              width={"200px"}
            />
          </Box>
        </Box>
        </Toolbar>
      </AppBar>

      {/* Master Data Popup */}
      <ReusablePopup
        open={masterDataCreatePopup}
        onClose={onClosePopup}
        title="Create a new masterdata"
        confirmText="Continue"
        onConfirm={() => console.log("Masterdata Created!")}
        text="Upload Picture"
        dropdownOptions={structureOptions}  // Dynamic dropdown options
        upload={true}
        textField={true}
        dropdown={true}
      />
    </>
  );
};

export default Header;
