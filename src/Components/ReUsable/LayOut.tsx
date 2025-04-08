import { useLocation, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Box } from "@mui/material";
import { useState } from "react";
import { setOpenSlider, setSelectedTab, setUploadPopup } from "../../store/slices/masterDataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";




const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [masterDataCreatePopup,setMasterDataCreatePopup] = useState(false);
  const navigate = useNavigate();
  const pageData: Record<
    string,
    {
      title: string;
      button1Text?: string;
      button2Text?: string;
      onButton1Click?: () => void;
      onButton2Click?: () => void;
      lastUpdate?:string;
    }
  > = {
    "/dashboard": {
      title: "Dashboard",
      button1Text: "Uploaded Data",
      button2Text: "Create Maser Data",
      onButton1Click: () => alert("Add Item Clicked"),
      onButton2Click: () => setMasterDataCreatePopup(true),
    },
    "/profile": {
      title: "Profile",
      button1Text: "Edit Profile",
      button2Text: "Change Password",
      onButton1Click: () => alert("Edit Profile Clicked"),
      onButton2Click: () => alert("Change Password Clicked"),
    },
    "/masterData": {
      title:"Master Data",
      button1Text:"Filter",
      button2Text:"Create Maser Data",
      onButton1Click: () => dispatch(setOpenSlider(true)),
      onButton2Click: () =>{navigate('/createMasterData'),dispatch(setSelectedTab(0))},
    },
    "/createMasterData": {
      title:  "Create Master Data",
      button1Text:   "Created on: 15-Mar-2025",
      button2Text:   "Updated Master Data",
      onButton1Click: () => alert("Edit Profile Clicked"),
      onButton2Click: () => dispatch(setUploadPopup(true)),
    },
      "/viewMasterData": {
      title:  "UEN-20240801",
      lastUpdate:'Last Update: 2 hours ago',
    },
    "/settings": {
      title: "Settings",
      button1Text: "Save Changes",
      button2Text: "Reset",
      onButton1Click: () => alert("Save Changes Clicked"),
      onButton2Click: () => alert("Reset Clicked"),
    },
    "/": {
      title: "Home",
      button1Text: "Get Started",
      button2Text: "Learn More",
      onButton1Click: () => alert("Get Started Clicked"),
      onButton2Click: () => alert("Learn More Clicked"),
    },
  };

  const currentPath = location.pathname;
  const headerData = pageData[currentPath] || pageData["/"]; // Fallback to "/" if path is not found in pageData
  const onClosePopup = ()=> setMasterDataCreatePopup(false)

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} toggleMobileSidebar={toggleSidebar} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          overflowX: "hidden",
        }}
      >
        {/* Pass Dynamic Title & Buttons to Header */}
        <Header
          title={headerData.title}
          button1Text={headerData.button1Text}
          button2Text={headerData.button2Text}
          onButton1Click={headerData.onButton1Click}
          onButton2Click={headerData.onButton2Click}
          onMenuClick={toggleSidebar} // Toggle sidebar when menu icon is clicked
          masterDataCreatePopup= {masterDataCreatePopup}
          onClosePopup = {onClosePopup}
          lastUpdate={headerData.lastUpdate}
        />

        <Box sx={{ flex: 1, p: 2, backgroundColor: "#ECECEC" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
