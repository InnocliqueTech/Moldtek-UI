import {
  useLocation,
  Outlet,
  useNavigate,
  matchPath,
  useParams,
} from "react-router-dom";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Box } from "@mui/material";
import { useState } from "react";
import {
  setOpenSlider,
  setSelectedTab,
  setUploadPopup,
  setSubmitAndPublishPopup
} from "../../store/slices/masterDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setVersionPopup } from "../../store/slices/viewMasterDataSlice";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [masterDataCreatePopup, setMasterDataCreatePopup] = useState(false);
  const navigate = useNavigate();
  const {selectedUEN} = useSelector((state:RootState)=>state.masterData);
  const {id,version} = useParams();
  const pageData: Record<
    string,
    {
      title: string;
      button1Text?: string;
      button2Text?: string;
      onButton1Click?: () => void;
      onButton2Click?: () => void;
      lastUpdate?: string;
      headerButton?:boolean
      onBack?:()=>void;
      filterTitle?:string;
      uploadTitle?:string;
      uploadSubTitle?:string;
      headerButtonColor?:boolean
    }
  > = {
    "/dashboard": {
      title: "Dashboard",
      button1Text: "Uploaded Data",
      button2Text: "Create Master Data",
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
      title: "Master Data",
      button1Text: "Filter",
      button2Text: "Create Master Data",
      onButton1Click: () => dispatch(setOpenSlider(true)),
      onButton2Click: () => {
        navigate("/createMasterData"), dispatch(setSelectedTab(0));
      },
       filterTitle:'Master Data Filter'
    },
    "/createMasterData": {
      title: "Create Master Data",
      button1Text: "Created on: 15-Mar-2025",
      button2Text: "Upload Master Data",
      onButton1Click: () => alert("Edit Profile Clicked"),
      onButton2Click: () => dispatch(setUploadPopup(true)),
      uploadTitle:'Create Master Data',
      uploadSubTitle: 'Upload Master Data',
      headerButton:true,
      onBack:()=>navigate('/masterData'),
      headerButtonColor:true
    },
    "/updateMasterData/:id": {
      title: "Update Master Data",
      button1Text: "Updated on: 15-Mar-2025",
      // button2Text: "Upload Master Data",
      onButton1Click: () => alert("Edit Profile Clicked"),
      onButton2Click: () => dispatch(setUploadPopup(true)),
      uploadTitle:'Update Master Data',
      uploadSubTitle: 'Upload Master Data'
    },
    "/viewMasterData/:id": {
      title: selectedUEN,
      button1Text: "Version History",
      button2Text: "Modify Master Data",
      onButton1Click: () =>  dispatch(setVersionPopup(true)),
      onButton2Click: () => {navigate(`/updateMasterData/${selectedUEN}`),dispatch(setSelectedTab(0))},
      headerButton:true,
      onBack:()=>navigate('/masterData')
    },
    "/versiondetails/:id/:version": {
      title: `${id}-${version}`,
    },
    "/viewJobsList": {
      title: selectedUEN,
      button1Text: "Version History",
      button2Text: "Modify Master Data",
      onButton1Click: () => dispatch(setVersionPopup(true)),
      onButton2Click: () => {navigate(`/updateMasterData/${selectedUEN}`),dispatch(setSelectedTab(0))},
      headerButton:true,
      onBack:()=>navigate('/masterData') 
    },
    "/settings": {
      title: "Settings",
      button1Text: "Save Changes",
      button2Text: "Reset",
      onButton1Click: () => alert("Save Changes Clicked"),
      onButton2Click: () => alert("Reset Clicked"),
    },
    "/dailyPlan": {
      title: "Daily Plan",
      button1Text: "Filter",
      button2Text: "Create Daily Plan",
      onButton1Click: () => dispatch(setOpenSlider(true)),
      onButton2Click: () => navigate(`/createPlan`),
      filterTitle:'Daily Plan Filter'
    },
    "/viewDailyPlan": {
      title: "View Daily Plan",
      button1Text: "View Template",
      button2Text: "Upload Job Data",
      onButton1Click:  () => alert("View Template Clicked"),
      onButton2Click: () => dispatch(setUploadPopup(true)),
      headerButton:true,
      onBack:()=>navigate('/dailyPlan') ,
      uploadTitle:'Upload Job Data',
      uploadSubTitle:''
    },
    "/createPlan": {
      title: "Create Daily Plan",
      button1Text: "Upload Data",
      button2Text: "Submit",
      onButton1Click: () => dispatch(setUploadPopup(true)),
      onButton2Click: () => dispatch(setSubmitAndPublishPopup(true)),
      uploadTitle:'Create Daily Plan',
      uploadSubTitle: 'Upload Daily Plan',
      headerButton:true,
      onBack:()=>navigate('/dailyPlan') ,
    },
    "/": {
      title: "Home",
      button1Text: "Get Started",
      button2Text: "Learn More",
      onButton1Click: () => alert("Get Started Clicked"),
      onButton2Click: () => alert("Learn More Clicked"),
    },
  };

  let headerData = pageData["/"];

  for (const path in pageData) {
    const match = matchPath({ path, end: true }, location.pathname);
    if (match) {
      headerData = pageData[path];
      break;
    }
  }
  const onClosePopup = () => setMasterDataCreatePopup(false);

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
          masterDataCreatePopup={masterDataCreatePopup}
          onClosePopup={onClosePopup}
          lastUpdate={headerData.lastUpdate}
          headerButton={headerData.headerButton}
          onBack={headerData.onBack}
          filterTitle={headerData.filterTitle}
          uploadTitle={headerData.uploadTitle}
          uploadSubTitle={headerData.uploadSubTitle}
          headerButtonColor={headerData.headerButtonColor}
        />

        <Box sx={{ flex: 1, p: 1.5, backgroundColor: "#ECECEC" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
