import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Divider,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  Dashboard,
  Description,
  Receipt,
  Settings,
  Help,
  ExpandMore,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Images/Logo.svg";
import profileImage from "../../assets/Images/profile.svg";

interface SidebarProps {
  open: boolean;
  toggleMobileSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleMobileSidebar }) => {
  const location = useLocation();
  const [dropdownAnchor, setDropdownAnchor] = useState<null | HTMLElement>(
    null
  );
  const isDropdownOpen = Boolean(dropdownAnchor);
  const dynamicTexts = ["Kristin Watson", "Text Two"];
  const [currentText, setCurrentText] = useState(dynamicTexts[0]);

  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) =>
    setDropdownAnchor(event.currentTarget);
  const handleDropdownClose = () => setDropdownAnchor(null);

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Master Data", icon: <Description />, path: "/masterdata" },
    { text: "Production Operators", icon: <Receipt />, path: "/invoices" },
    { text: "Reports", icon: <Description />, path: "/reports" },
  ];

  const preferenceItems = [
    { text: "Settings", icon: <Settings />, path: "/settings" },
    { text: "Help Center", icon: <Help />, path: "/help" },
  ];

  return (
    <>
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        display: { xs: "none", md: "block" },
        width: 250,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          padding: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <img src={Logo} alt="Logo" />
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 3,
          px: 1,
          py: 0,
          borderRadius: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar alt="User Avatar" src={profileImage} sx={{ width: 40, height: 40 }} />

        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Typography sx={{ whiteSpace: "nowrap", fontSize: "14px" }}>
            {currentText}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            creator
          </Typography>
        </Box>

        <IconButton onClick={handleDropdownOpen} sx={{ marginLeft: "-15px" }}>
          <ExpandMore />
        </IconButton>

        <Menu anchorEl={dropdownAnchor} open={isDropdownOpen} onClose={handleDropdownClose}>
          {dynamicTexts.map((text, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setCurrentText(text);
                handleDropdownClose();
              }}
            >
              {text}
            </MenuItem>
          ))}
        </Menu>
      </Box>


      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, px: 2, fontWeight: "500", color: "#A3A3A3" }}>
        Main Menu
      </Typography>
      <List>
        {menuItems.map((item, index) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
              key={index}
              component={Link}
              to={item.path}
              sx={{
                bgcolor: isSelected ? "white" : "transparent",
                boxShadow: isSelected ? 3 : 0,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "white",
                  boxShadow: 3,
                },
              }}
            >
              <ListItemIcon sx={{ color: isSelected ? "blue" : "#737373", minWidth: 32 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: isSelected ? "blue" : "#737373",
                  whiteSpace: "nowrap",
                }}
              />
            </ListItem>
          );
        })}
      </List>


      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, px: 2, fontWeight: "500", color: "#A3A3A3" }}>
        Preferences
      </Typography>
      <List>
        {preferenceItems.map((item, index) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
              key={index}
              component={Link}
              to={item.path}
              sx={{
                bgcolor: isSelected ? "white" : "transparent",
                boxShadow: isSelected ? 3 : 0,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "white",
                  boxShadow: 3,
                },
              }}
            >
              <ListItemIcon sx={{ color: isSelected ? "blue" : "#737373", minWidth: 32 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: isSelected ? "blue" : "#737373",
                  whiteSpace: "nowrap",
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
     {/* Sidebar for Mobile & Tablet */}
     <Drawer
        anchor="left"
        open={open}
        onClose={toggleMobileSidebar}
        sx={{ display: { xs: "none",md:'none', lg: "block" } }}

      >
     <Box  sx={{ width: 250, padding: 2 }}>
        <img src={Logo} alt="Logo" />
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 3,
          px: 1,
          py: 0,
          borderRadius: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "220px",
          marginLeft: "14px",
        }}
      >
        <Avatar alt="User Avatar" src={profileImage} sx={{ width: 40, height: 40 }} />

        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Typography sx={{ whiteSpace: "nowrap", fontSize: "14px" }}>
            {currentText}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            creator
          </Typography>
        </Box>

        <IconButton onClick={handleDropdownOpen} sx={{ marginLeft: "-15px" }}>
          <ExpandMore />
        </IconButton>

        <Menu anchorEl={dropdownAnchor} open={isDropdownOpen} onClose={handleDropdownClose}>
          {dynamicTexts.map((text, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setCurrentText(text);
                handleDropdownClose();
              }}
            >
              {text}
            </MenuItem>
          ))}
        </Menu>
      </Box>


      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, px: 2, fontWeight: "500", color: "#A3A3A3" }}>
        Main Menu
      </Typography>
      <List>
        {menuItems.map((item, index) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
            onClick={toggleMobileSidebar}
              key={index}
              component={Link}
              to={item.path}
              sx={{
                bgcolor: isSelected ? "white" : "transparent",
                boxShadow: isSelected ? 3 : 0,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "white",
                  boxShadow: 3,
                },
              }}
            >
              <ListItemIcon sx={{ color: isSelected ? "blue" : "#737373", minWidth: 32 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: isSelected ? "blue" : "#737373",
                  whiteSpace: "nowrap",
                }}
              />
            </ListItem>
          );
        })}
      </List>


      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, px: 2, fontWeight: "500", color: "#A3A3A3" }}>
        Preferences
      </Typography>
      <List>
        {preferenceItems.map((item, index) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
              key={index}
              component={Link}
              to={item.path}
              sx={{
                bgcolor: isSelected ? "white" : "transparent",
                boxShadow: isSelected ? 3 : 0,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "white",
                  boxShadow: 3,
                },
              }}
               onClick={toggleMobileSidebar}
            >
              <ListItemIcon sx={{ color: isSelected ? "blue" : "#737373", minWidth: 32 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: isSelected ? "blue" : "#737373",
                  whiteSpace: "nowrap",
                }}
              />
            </ListItem>
          );
        })}
      </List>
      </Drawer>
   </>
  );
};

export default Sidebar;
