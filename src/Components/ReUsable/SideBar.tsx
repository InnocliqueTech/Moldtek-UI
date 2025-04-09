import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Images/Logo.svg";
import profileImage from "../../assets/Images/profile.svg";
import HomeIcon from "../../assets/Images/home.svg";
import HomeSelectedIcon from "../../assets/Images/homeSelected.png";
import MasterDataIcon from "../../assets/Images/masterData.png";
import MasterDataSelectedIcon from "../../assets/Images/masterDataSelected.png";
import ProductionOperatorsIcon from "../../assets/Images/prouctionOperators.png";
import ReportsIcon from "../../assets/Images/reports.png";
import SettingsIcon from "../../assets/Images/settings.png";
import HelpCenterIcon from "../../assets/Images/helpCenter.png";
import DailyPlanIcon from "../../assets/Images/dailyPlanIcon.svg";
import DailyPlanSelectedIcon from "../../assets/Images/dailyPlanSelectedIcon.svg";
import { useState } from "react";

interface SidebarProps {
  open: boolean;
  toggleMobileSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleMobileSidebar }) => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [preferenceHoveredIndex, setPreferenceHoveredIndex] = useState<
    number | null
  >(null);
  // const [dropdownAnchor, setDropdownAnchor] = useState<null | HTMLElement>(
  //   null
  // );

  const dynamicTexts = ["Kristin Watson", "Text Two"];
  const currentText = dynamicTexts[0];

  const navigate = useNavigate();

  // const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) =>
  //   setDropdownAnchor(event.currentTarget);
  // const handleDropdownClose = () => setDropdownAnchor(null);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <img src={HomeIcon} alt="Dashboard" width="20" height="20" />,
      selectedIcon: (
        <img src={HomeSelectedIcon} alt="Selected" width="20" height="20" />
      ),
      path: "/dashboard",
    },
    {
      text: "Master Data",
      icon: <img src={MasterDataIcon} alt="Dashboard" width="20" height="20" />,
      selectedIcon: (
        <img
          src={MasterDataSelectedIcon}
          alt="Selected"
          width="20"
          height="20"
        />
      ),
      path: "/masterData",
    },
    {
      text: "Daily Plan",
      icon: (
        <img src={DailyPlanIcon} alt="daily plan icon" width="20" height="20" />
      ),
      selectedIcon: (
        <img
          src={DailyPlanSelectedIcon}
          alt="Selected"
          width="20"
          height="20"
        />
      ),
      path: "/dailyPlan",
    },
    {
      text: "Production Operators",
      icon: (
        <img
          src={ProductionOperatorsIcon}
          alt="Dashboard"
          width="20"
          height="20"
        />
      ),
      selectedIcon: (
        <img src={HomeSelectedIcon} alt="Selected" width="20" height="20" />
      ),
      path: "/invoices",
    },
    {
      text: "Reports",
      icon: <img src={ReportsIcon} alt="Dashboard" width="20" height="20" />,
      selectedIcon: (
        <img src={HomeSelectedIcon} alt="Selected" width="20" height="20" />
      ),
      path: "/reports",
    },
  ];

  const preferenceItems = [
    {
      text: "Settings",
      icon: <img src={SettingsIcon} alt="Dashboard" width="20" height="20" />,
      selectedIcon: (
        <img src={HomeSelectedIcon} alt="Selected" width="20" height="20" />
      ),
      path: "/settings",
    },
    {
      text: "Help Center",
      icon: <img src={HelpCenterIcon} alt="Dashboard" width="20" height="20" />,
      selectedIcon: (
        <img src={HomeSelectedIcon} alt="Selected" width="20" height="20" />
      ),
      path: "/help",
    },
  ];

  const handleLogOut = () => {
    navigate("/");
    localStorage.setItem("auth", "false");
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: "none", md: "block" },
          width: 220,
          "& .MuiDrawer-paper": {
            width: 220,
            boxSizing: "border-box",
            padding: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
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
            <Avatar
              alt="User Avatar"
              src={profileImage}
              sx={{ width: 40, height: 40 }}
            />

            <Box sx={{ flexGrow: 1, p: 1 }}>
              <Typography sx={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                {currentText}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                creator
              </Typography>
            </Box>

            {/* <IconButton onClick={handleDropdownOpen} sx={{ marginLeft: "-15px" }}>
            <ExpandMore />
          </IconButton>

          <Menu
            anchorEl={dropdownAnchor}
            open={isDropdownOpen}
            onClose={handleDropdownClose}
          >
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
          </Menu> */}
          </Box>

          <Typography
            variant="subtitle2"
            sx={{ mt: 1, mb: 0.5, px: 1, fontWeight: "500", color: "#A3A3A3" }}
          >
            Main Menu
          </Typography>
          <List sx={{ py: 0 }}>
            {menuItems.map((item, index) => {
              const isSelected = location.pathname === item.path;
              return (
                <ListItem
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  component={Link}
                  to={item.path}
                  sx={{
                    py: 0.5,
                    bgcolor: isSelected ? "white" : "transparent",
                    boxShadow: isSelected ? 3 : 0,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "transparent",
                      "& .MuiListItemText-primary": {
                        color: "#0073B7",
                      },
                    },
                    pl: "8px",
                    pr: 0,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {isSelected || hoveredIndex === index
                      ? item.selectedIcon
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: 400, 
                    }}
                    sx={{
                      color: isSelected ? "#0073B7" : "#737373",
                      whiteSpace: "nowrap",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>

          <Typography
            variant="subtitle2"
            sx={{ mt: 1, mb: 0.5, px: 1, fontWeight: "500", color: "#A3A3A3" }}
          >
            Preferences
          </Typography>
          <List sx={{ py: 0 }}>
            {preferenceItems.map((item, index) => {
              const isSelected = location.pathname === item.path;
              return (
                <ListItem
                  key={index}
                  component={Link}
                  onMouseEnter={() => setPreferenceHoveredIndex(index)}
                  onMouseLeave={() => setPreferenceHoveredIndex(null)}
                  to={item.path}
                  sx={{
                    py: 0.5,
                    bgcolor: isSelected ? "white" : "transparent",
                    boxShadow: isSelected ? 3 : 0,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "transparent",
                      "& .MuiListItemText-primary": {
                        color: "#0073B7",
                      },
                    },
                    pl: "8px",
                    pr: 0,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {isSelected || preferenceHoveredIndex === index
                      ? item.selectedIcon
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: 400, 
                    }}
                    sx={{
                      color: isSelected ? "#0073B7" : "#737373",
                      whiteSpace: "nowrap",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Bottom logout section */}
        <Box sx={{ borderTop: "1px solid #ECECEC" }}>
          <ListItem
            sx={{
              color: "#C82333",
              cursor: "pointer",
            }}
            onClick={handleLogOut}
          >
            <ListItemIcon
              sx={{
                color: "#C82333",
                minWidth: 32,
              }}
            >
              <ExitToApp />
            </ListItemIcon>
            <ListItemText
              primary="Logout Account"
              sx={{ whiteSpace: "nowrap" }}
            />
          </ListItem>
        </Box>
      </Drawer>

      {/* Sidebar for Mobile & Tablet */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleMobileSidebar}
        sx={{
          display: { xs: "block", md: "none", lg: "none" },
          width: 220,
          "& .MuiDrawer-paper": {
            width: 220,
            boxSizing: "border-box",
            padding: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
         <Box>
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
            <Avatar
              alt="User Avatar"
              src={profileImage}
              sx={{ width: 40, height: 40 }}
            />

            <Box sx={{ flexGrow: 1, p: 1 }}>
              <Typography sx={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                {currentText}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                creator
              </Typography>
            </Box>

            {/* <IconButton onClick={handleDropdownOpen} sx={{ marginLeft: "-15px" }}>
            <ExpandMore />
          </IconButton>

          <Menu
            anchorEl={dropdownAnchor}
            open={isDropdownOpen}
            onClose={handleDropdownClose}
          >
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
          </Menu> */}
          </Box>
        <Typography
            variant="subtitle2"
            sx={{ mt: 1, mb: 0.5, px: 1, fontWeight: "500", color: "#A3A3A3" }}
          >
            Main Menu
          </Typography>
          <List sx={{ py: 0 }}>
            {menuItems.map((item, index) => {
              const isSelected = location.pathname === item.path;
              return (
                <ListItem
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  component={Link}
                  to={item.path}
                  sx={{
                    py: 0.5,
                    bgcolor: isSelected ? "white" : "transparent",
                    boxShadow: isSelected ? 3 : 0,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "transparent",
                      "& .MuiListItemText-primary": {
                        color: "#0073B7",
                      },
                    },
                    pl: "8px",
                    pr: 0,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {isSelected || hoveredIndex === index
                      ? item.selectedIcon
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: 400, 
                    }}
                    sx={{
                      fontSize:'16px',
                      color: isSelected ? "#0073B7" : "#737373",
                      whiteSpace: "nowrap",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>

          <Typography
            variant="subtitle2"
            sx={{ mt: 1, mb: 0.5, px: 1, fontWeight: "500", color: "#A3A3A3" }}
          >
            Preferences
          </Typography>
          <List sx={{ py: 0 }}>
            {preferenceItems.map((item, index) => {
              const isSelected = location.pathname === item.path;
              return (
                <ListItem
                  key={index}
                  component={Link}
                  onMouseEnter={() => setPreferenceHoveredIndex(index)}
                  onMouseLeave={() => setPreferenceHoveredIndex(null)}
                  to={item.path}
                  sx={{
                    py: 0.5,
                    bgcolor: isSelected ? "white" : "transparent",
                    boxShadow: isSelected ? 3 : 0,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "transparent",
                      "& .MuiListItemText-primary": {
                        color: "#0073B7",
                      },
                    },
                    pl: "8px",
                    pr: 0,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {isSelected || preferenceHoveredIndex === index
                      ? item.selectedIcon
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: 400, 
                    }}
                    sx={{
                      color: isSelected ? "#0073B7" : "#737373",
                      whiteSpace: "nowrap",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
          </Box>
        <Box sx={{ borderTop: "1px solid #ECECEC" }}>
          <ListItem
            sx={{
              color: "#C82333",
              cursor: "pointer",
            }}
            onClick={handleLogOut}
          >
            <ListItemIcon
              sx={{
                color: "#C82333",
                minWidth: 32,
              }}
            >
              <ExitToApp />
            </ListItemIcon>
            <ListItemText
              primary="Logout Account"
              sx={{ whiteSpace: "nowrap" }}
            />
          </ListItem>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
