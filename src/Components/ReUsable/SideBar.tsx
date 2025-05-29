import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import {
  ArticleOutlined,
  BarChartOutlined,
  East,
  ExitToApp,
  GridViewOutlined,
  ManageAccountsOutlined,
  Settings,
  TaskOutlined,
  West,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Images/Logo.svg";
import LogoIcon from "../../assets/Images/logo.png";
import { useState } from "react";
import {
  clearDyeCuttingFormData,
  clearDyeCuttingFormErrors,
  clearLaminatingFormData,
  clearLaminationFormErrors,
  clearMasterDataFormErrors,
  clearMasterDetaisData,
  clearPrintingFormData,
  clearPrintingFormErrors,
  clearSaveLaminatingFormData,
  clearSaveMasterDetailsData,
  clearSavePrintingFormData,
} from "../../store/slices/masterDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setBackButtonNavigationAllowed,
  setIsEditing,
  setShowTabChangeDialog,
  setSideNavigationAllowed,
} from "../../store/slices/viewDailyPlanSlice";

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

  // const dynamicTexts = ["Kristin Watson", "Text Two"];
  // const currentText = dynamicTexts[0];
  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();
  const {
    isDyeCuttingDataSave,
    isMasterDetaisDataSave,
    isLaminationDataSave,
    isPrintingDataSave,
  } = useSelector((state: RootState) => state.masterData);
  const { hasUnsavedChanges } = useSelector(
    (state: RootState) => state.viewDailyPlan
  );

  // const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) =>
  //   setDropdownAnchor(event.currentTarget);
  // const handleDropdownClose = () => setDropdownAnchor(null);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <GridViewOutlined />,
      selectedIcon: <GridViewOutlined />,
      path: "/dashboard",
    },
    {
      text: "Master Data",
      icon: <ArticleOutlined />,
      selectedIcon: <ArticleOutlined />,
      path: "/masterData",
    },
    {
      text: "Daily Plan",
      icon: <TaskOutlined />,
      selectedIcon: <TaskOutlined />,
      path: "/dailyPlan",
    },
    {
      text: "Production Operators",
      icon: <ManageAccountsOutlined />,
      selectedIcon: <ManageAccountsOutlined />,
      path: "/productionOperators",
    },
    {
      text: "Reports",
      icon: <BarChartOutlined />,
      selectedIcon: <BarChartOutlined />,
      path: "/reports",
    },
  ];

  const preferenceItems = [
    {
      text: "Settings",
      icon: <Settings />,
      selectedIcon: <Settings />,
      path: "/settings",
    },
    // {
    //   text: "Help Center",
    //   icon: <img src={HelpCenterIcon} alt="Dashboard" width="20" height="20" />,
    //   selectedIcon: (
    //     <img src={HomeSelectedIcon} alt="Selected" width="20" height="20" />
    //   ),
    //   path: "/help",
    // },
  ];

  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.setItem("auth", "false");
    localStorage.setItem("masterDataPage", (0).toString());
    localStorage.setItem("masterData-page", (0).toString());
    localStorage.setItem("dailyPlan-page", (0).toString());
    localStorage.setItem("dailyPlanDataPage", (0).toString());
    localStorage.setItem("dailyPlanDataRowsPerPage", (10).toString());
    localStorage.setItem("jobsDataRowsPerPage", (10).toString());
    localStorage.setItem("masterDataRowsPerPage", (10).toString());
    dispatch(clearSaveLaminatingFormData());
    dispatch(clearSaveMasterDetailsData());
    dispatch(clearSavePrintingFormData());
    if (!isDyeCuttingDataSave) {
      dispatch(clearDyeCuttingFormData());
      dispatch(clearDyeCuttingFormErrors());
    }
    if (!isLaminationDataSave) {
      dispatch(clearLaminatingFormData());
      dispatch(clearLaminationFormErrors());
    }
    if (!isPrintingDataSave) {
      dispatch(clearPrintingFormData());
      dispatch(clearPrintingFormErrors());
    }
    if (!isMasterDetaisDataSave) {
      dispatch(clearMasterDetaisData());
      dispatch(clearMasterDataFormErrors());
    }
  };
  const dispatch = useDispatch<AppDispatch>();

  const itemClick = () => {
    toggleMobileSidebar();
    if (!isDyeCuttingDataSave) {
      dispatch(clearDyeCuttingFormData());
      dispatch(clearDyeCuttingFormErrors());
    }
    if (!isLaminationDataSave) {
      dispatch(clearLaminatingFormData());
      dispatch(clearLaminationFormErrors());
    }
    if (!isPrintingDataSave) {
      dispatch(clearPrintingFormData());
      dispatch(clearPrintingFormErrors());
    }
    if (!isMasterDetaisDataSave) {
      dispatch(clearMasterDetaisData());
      dispatch(clearMasterDataFormErrors());
    }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "#0073B7",
      boxShadow: theme.shadows[4],
    },
  }));

  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  console.log(collapsed,"COLLAPSED")

  return (
    <>
    <Drawer
      variant="permanent"
      open
      sx={{
        display: { xs: "none", md: "block" },
        width: collapsed ? 50 : 220,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 50 : 220,
          transition: "width 0.3s",
          boxSizing: "border-box",
          padding: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: collapsed ? "center" : "flex-start",
          overflowX: "hidden", // prevent horizontal scroll
          overflowY: collapsed ? "hidden" : "auto", // disable vertical scroll when collapsed
          height: "100vh",
        },
      }}
    >
      {/* Top Section with Logo and User Info */}
      <Box>
        {!collapsed ? (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img src={Logo} alt="Logo" />
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }} >
            <img src={LogoIcon} alt="Logo" style={{width:'50px',marginBottom:'2px',marginLeft:'0.32px'}} />
          </Box>
        )}

        <LightTooltip
          title={
            collapsed ? (
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{userName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {role}
                </Typography>
              </Box>
            ) : (
              ""
            )
          }
          placement="right"
          arrow={false}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
          sx={{
            ".MuiTooltip-tooltip": {
              fontSize: "0.875rem",
              padding: "8px 12px",
              borderRadius: "8px",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: collapsed ? "transparent" : "white",
              boxShadow: collapsed ? 0 : 3,
              px: 1,
              py: 0,
              borderRadius: collapsed ? 0 : 2,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: collapsed ? "center" : "flex-start",
              cursor: collapsed ? "pointer" : "default",
            }}
          >
            <Avatar
              alt="User Avatar"
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#0073B7",
                color: "white",
                fontWeight: 600,
              }}
            >
              {userName?.charAt(0)?.toUpperCase()}
            </Avatar>

            {!collapsed && (
              <Box sx={{ flexGrow: 1, p: 1 }}>
                <Typography sx={{ whiteSpace: "nowrap", fontSize: "14px" }}>{userName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {role}
                </Typography>
              </Box>
            )}
          </Box>
        </LightTooltip>

        {/* Main Menu */}
        {!collapsed && (
          <Typography
            variant="subtitle2"
            sx={{
              mt: 1,
              mb: 0.5,
              px: 1,
              fontWeight: "500",
              color: "#A3A3A3",
            }}
          >
            Main Menu
          </Typography>
        )}
        <List sx={{ py: 0 }}>
          {menuItems.map((item, index) => {
            const isSelected = location.pathname === item.path;

            return (
              <LightTooltip
                title={collapsed ? item.text : ""}
                placement="right"
                arrow={false}
                key={index}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                }}
                sx={{
                  ".MuiTooltip-tooltip": {
                    fontSize: "0.875rem",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  },
                }}
              >
                <ListItem
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    py: !collapsed ? 0.5 : 1.3,
                    bgcolor:
                      isSelected && !collapsed
                        ? "white"
                        : collapsed && isSelected
                        ? "transparent"
                        : "transparent",
                    boxShadow:
                      isSelected && !collapsed
                        ? 3
                        : collapsed && isSelected
                        ? 0
                        : 0,
                    borderRadius: collapsed && isSelected ? 0 : 2,
                    "&:hover": {
                      bgcolor: "transparent",
                      "& .MuiListItemText-primary": {
                        color: "#0073B7",
                      },
                    },
                    pl: "8px",
                    pr: 0,
                    justifyContent: collapsed ? "center" : "flex-start",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (hasUnsavedChanges) {
                      dispatch(setShowTabChangeDialog(true));
                      localStorage.setItem("navigation", item.path);
                      dispatch(setSideNavigationAllowed(true));
                      dispatch(setBackButtonNavigationAllowed(false));
                    } else {
                      itemClick();
                      navigate(item.path);
                      dispatch(setIsEditing(false));
                      dispatch(setSideNavigationAllowed(false));
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 30,
                      color: isSelected || hoveredIndex === index ? "#0073B7" : "",
                    }}
                  >
                    {isSelected || hoveredIndex === index ? item.selectedIcon : item.icon}
                  </ListItemIcon>

                  {!collapsed && (
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
                  )}
                </ListItem>
              </LightTooltip>
            );
          })}
        </List>

        {/* Preferences */}
        {!collapsed && (
          <Typography
            variant="subtitle2"
            sx={{
              mt: 1,
              mb: 0.5,
              px: 1,
              fontWeight: "500",
              color: "#A3A3A3",
            }}
          >
            Preferences
          </Typography>
        )}
        <List sx={{ py: 0 }}>
          {preferenceItems.map((item, index) => {
            const isSelected = location.pathname === item.path;

            return (
              <LightTooltip
                title={collapsed ? item.text : ""}
                placement="right"
                arrow={false}
                key={index}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                }}
                sx={{
                  ".MuiTooltip-tooltip": {
                    fontSize: "0.875rem",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  },
                }}
              >
                <ListItem
                  onMouseEnter={() => setHoveredIndex(menuItems.length + index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    py: !collapsed ? 0.5 : 1.3,
                    bgcolor:
                      isSelected && !collapsed
                        ? "white"
                        : collapsed && isSelected
                        ? "transparent"
                        : "transparent",
                    cursor: "pointer",
                    boxShadow:
                      isSelected && !collapsed
                        ? 3
                        : collapsed && isSelected
                        ? 0
                        : 0,
                    borderRadius: collapsed && isSelected ? 0 : 2,
                    "&:hover": {
                      bgcolor: "transparent",
                      "& .MuiListItemText-primary": {
                        color: "#0073B7",
                      },
                    },
                    pl: "8px",
                    pr: 0,
                    justifyContent: collapsed ? "center" : "flex-start",
                  }}
                  onClick={() => {
                    if (hasUnsavedChanges) {
                      dispatch(setShowTabChangeDialog(true));
                      localStorage.setItem("navigation", item.path);
                      dispatch(setSideNavigationAllowed(true));
                      dispatch(setBackButtonNavigationAllowed(false));
                    } else {
                      itemClick();
                      navigate(item.path);
                      dispatch(setIsEditing(false));
                      dispatch(setSideNavigationAllowed(false));
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 30,
                      color: isSelected || hoveredIndex === menuItems.length + index ? "#0073B7" : "",
                    }}
                  >
                    {isSelected || hoveredIndex === menuItems.length + index ? item.selectedIcon : item.icon}
                  </ListItemIcon>

                  {!collapsed && (
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
                  )}
                </ListItem>
              </LightTooltip>
            );
          })}
        </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: collapsed ? "center" : "flex-end",
              px: 1,
              mb: 1,
              pr: collapsed ? 1 : 0,
            }}
          >
            <IconButton onClick={toggleSidebar}>
              {collapsed ? <East /> : <West />}
            </IconButton>
          </Box>
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
              <LightTooltip
                title={"LogOut"}
                placement="right"
                arrow={false}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -7],
                        },
                      },
                    ],
                  },
                }}
                sx={{
                  ".MuiTooltip-tooltip": {
                    fontSize: "0.875rem",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    color: "#c82333",
                  },
                }}
              >
                  <ExitToApp />
              </LightTooltip>
                </ListItemIcon>
                {!collapsed && (
              <ListItemText
                primary="Logout Account"
                sx={{ whiteSpace: "nowrap" }}
              />
                )}
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
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#0073B7",
                color: "white",
                fontWeight: 600,
              }}
            >
              {userName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Box sx={{ flexGrow: 1, p: 1 }}>
              <Typography sx={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                {userName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {role}
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
                  // component={Link}
                  // to={hasUnsavedChanges ? undefined :item.path}
                  sx={{
                    py: 0.5,
                    bgcolor: isSelected ? "white" : "transparent",
                    boxShadow: isSelected ? 3 : 0,
                    borderRadius: 2,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "transparent",
                      "& .MuiListItemText-primary": {
                        color: "#0073B7",
                      },
                    },
                    pl: "8px",
                    pr: 0,
                  }}
                  onClick={() => {
                    if (hasUnsavedChanges) {
                      dispatch(setShowTabChangeDialog(true));
                      localStorage.setItem("navigation", item.path);
                      dispatch(setSideNavigationAllowed(true));
                      dispatch(setBackButtonNavigationAllowed(false));
                    } else {
                      itemClick();
                      navigate(item.path);
                      dispatch(setIsEditing(false));
                      dispatch(setSideNavigationAllowed(false));
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 30,
                      color:
                        isSelected || hoveredIndex === index ? "#0073B7" : "",
                    }}
                  >
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
                      fontSize: "16px",
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
                  // component={Link}
                  onMouseEnter={() => setPreferenceHoveredIndex(index)}
                  onMouseLeave={() => setPreferenceHoveredIndex(null)}
                  // to={item.path}
                  sx={{
                    py: 0.5,
                    cursor: "pointer",
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
                  onClick={() => {
                    if (hasUnsavedChanges) {
                      dispatch(setShowTabChangeDialog(true));
                      localStorage.setItem("navigation", item.path);
                      dispatch(setSideNavigationAllowed(true));
                      dispatch(setBackButtonNavigationAllowed(false));
                    } else {
                      itemClick();
                      navigate(item.path);
                      dispatch(setIsEditing(false));
                      dispatch(setSideNavigationAllowed(false));
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 30,
                      color:
                        isSelected || preferenceHoveredIndex === index
                          ? "#0073B7"
                          : "",
                    }}
                  >
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
                      cursor: "pointer",
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
