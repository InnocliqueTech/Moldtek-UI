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
  setRequestPayload,
  setSelectedTab,
  setUploadPopup,
} from "../../store/slices/masterDataSlice";
import { useDispatch} from "react-redux";
import { AppDispatch} from "../../store";
import { setVersionPopup } from "../../store/slices/viewMasterDataSlice";
import { setOpenSliderDaily } from "../../store/slices/viewDailyPlanSlice";
import { toast } from "react-toastify";
import { BASE_API_URL } from './../../api.config';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [masterDataCreatePopup, setMasterDataCreatePopup] = useState(false);
  const navigate = useNavigate();
  const UEN = localStorage.getItem("selectedUEN");
   let selectedUEN :any;
   if(UEN){
     selectedUEN =  UEN;
  }
  const UENAction= localStorage.getItem("actionSelectedUEN")
  let selectedUENList :any;
  if(UENAction){
    selectedUENList =  UENAction;
 }
  const { id, version } = useParams();
const clearRequestPayoad ={    masterDataDetails: {
  unit_effectivity_number: "",
  customer_name: "",
  customer_logo: "",
  item_code: "",
  brand_description: "",
  jar_cap: "",
  structure: "",
  label_type: "",
  repeat_length: 0,
  ups: 0,
  tracks: 0,
},
masterDataPrinting: {
  printingDetails: {
    printing_machine_name: "",
    cylinder_teeth: 0,
    tension: 0,
    unwinder: 0,
    rewinder: 0,
    infeed: 0,
    outfeed: 0,
    static_charge: 0,
    format_correct: 0,
  },
  printingSubstrateSettings: {
    substrate_type: "",
    supplier: "",
    dyne_level: "",
    width: 0,
    thickness: 0,
    density: 0,
  },
  stationWiseMetrics: [
    {
      station_no: 0,
      color_pantone: "",
      lf_value: 0,
      ink_supplier: "",
      lpcm: 0,
      volume: "",
      uv_led: "",
      uv_led_intensity: "",
    },
  ],
},
masterDataLamination: {
  laminationConditions: {
    zone1_temp: 0,
    zone2_temp: 0,
    nip_pressure_bar: 0,
    speed: 0,
    lami_set_tension: "",
    rewinder_tension: "",
    printed_film_tension: "",
    laminate_film_tension: "",
    viscosity_range: "",
    adhesive_gsm: "",
  },
  laminationSubstrate: {
    substrate_type: "",
    supplier: "",
    dyne_level: "",
    width: 0,
    thickness: 0,
    density: 0,
  },
  bondingMaterials: [
    {
      type: "",
      code: "",
      brand: "",
      ratio: 0,
    },
  ],
},
masterDataDyeCutting: {
  machine_type: "",
  machine_name: "",
  dye_code: "",
  run_speed: 0,
},}
  const { indentNo } = useParams();
  // const decodedIndentNo = indentNo
  let unitEffectiveNumberDaily: number | undefined = undefined;

  const uen = localStorage.getItem('unitEffectiveNumberDaily');
  if (uen !== null) {
    unitEffectiveNumberDaily = Number(uen);
  }
  
  const decodedIndentNo = decodeURIComponent(indentNo || "");

  const downloadFile = async () => {
    const unitNumber = unitEffectiveNumberDaily;
    const indentNumber = decodedIndentNo;
    const url = `${BASE_API_URL}/master/downloadDailyJobTemplate?unitNumber=${unitNumber}&indentNumber=${indentNumber}`;
  
    try {
      const response = await fetch(url, { method: 'GET' });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        const errorMessage = errorData?.message || 'Error downloading the file. Please try again later.';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
  
      const blob = await response.blob();
      
      const downloadLink = document.createElement('a');
      const fileUrl = URL.createObjectURL(blob);
      downloadLink.href = fileUrl;
      downloadLink.download = 'daily_job_template.xlsx'; 
      downloadLink.click();

      URL.revokeObjectURL(fileUrl);
  
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };


const today = new Date();
const formattedDate = today
  .toLocaleDateString("en-GB")  
  .replace(/\//g, "-");         

  const role = localStorage.getItem("role");
  const pageData: Record<
    string,
    {
      title: string;
      button1Text?: string;
      button2Text?: string;
      onButton1Click?: () => void;
      onButton2Click?: () => void;
      lastUpdate?: string;
      headerButton?: boolean;
      onBack?: () => void;
      filterTitle?: string;
      uploadTitle?: string;
      uploadSubTitle?: string;
      headerButtonColor?: boolean;
    }
  > = {
    "/dashboard": {
      title: "Dashboard",
      // button1Text: "Uploaded Data",
      // button2Text: "Create Master Data",
      // onButton1Click: () => alert("Add Item Clicked"),
      // onButton2Click: () => setMasterDataCreatePopup(true),
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
        navigate("/createMasterData"), dispatch(setSelectedTab(0),dispatch(setRequestPayload(clearRequestPayoad)))
      },
      filterTitle: "Master Data Filter",
    },
    "/createMasterData": {
      title: "Create Master Data",
      button1Text: `Created on: ${formattedDate}`,
      button2Text: "Upload Master Data",
      onButton1Click: () => alert("Edit Profile Clicked"),
      onButton2Click: () => dispatch(setUploadPopup(true)),
      uploadTitle: "Create Master Data",
      uploadSubTitle: "Upload Master Data",
      headerButton: true,
      onBack: () => navigate("/masterData"),
      headerButtonColor: true,
    },
    "/updateMasterData/:id": {
      title: "Update Master Data",
      button1Text: `Updated on:${formattedDate}`,
      // button2Text: "Upload Master Data",
      onButton1Click: () => alert("Edit Profile Clicked"),
      onButton2Click: () => dispatch(setUploadPopup(true)),
      uploadTitle: "Update Master Data",
      uploadSubTitle: "Upload Master Data",
    },
    "/viewMasterData/:id": {
      title: selectedUEN,
      button1Text: "Version History",
      ...(role === "Admin" && {
        button2Text: "Modify Master Data",
        onButton2Click: () => {
          navigate(`/updateMasterData/${selectedUEN}`);
          dispatch(setSelectedTab(0));
        },
      }),
      onButton1Click: () => dispatch(setVersionPopup(true)),
      headerButton: true,
      onBack: () => navigate("/masterData"),
    },

    "/viewJobsList": {
      title: selectedUENList,
      // button1Text: "Version History",
      // ...(role === "Admin" && {
      //   button2Text: "Modify Master Data",
      //   onButton2Click: () => {
      //     navigate(`/updateMasterData/${selectedUENList}`);
      //     dispatch(setSelectedTab(0));
      //   },
      // }),
      // onButton1Click: () => dispatch(setVersionPopup(true)),
      headerButton: true,
      onBack: () => navigate("/masterData"),
    },
    "/versiondetails/:id/:version": {
      title: `${id}-${version}`,
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
      onButton1Click: () => dispatch(setOpenSliderDaily(true)),
      onButton2Click: () => navigate(`/createPlan`),
      filterTitle: "Daily Plan Filter",
    },
    "/viewDailyPlan/:indentNO": {
      title: "View Daily Plan",
      button1Text: "Download Template",
      button2Text: "Upload Job Data",
 onButton1Click: () => {
        downloadFile(); 
      },
      onButton2Click: () => dispatch(setUploadPopup(true)),
      headerButton: true,
      onBack: () => navigate("/dailyPlan"),
      uploadTitle: "Upload Job Data",
      uploadSubTitle: "",
    },
    "/createPlan": {
      title: "Create Daily Plan",
      // button1Text: "Upload Data",
      // button2Text: "Submit",
      onButton1Click: () => dispatch(setUploadPopup(true)),
      // onButton2Click: () => dispatch(setSubmitAndPublishPopup(true)),
      uploadTitle: "Create Daily Plan",
      uploadSubTitle: "Upload Daily Plan",
      headerButton: true,
      onBack: () => navigate("/dailyPlan"),
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
