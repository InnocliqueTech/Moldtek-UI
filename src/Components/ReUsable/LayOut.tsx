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
  clearDyeCuttingFormData,
  clearDyeCuttingFormErrors,
  clearLaminatingFormData,
  clearLaminationFormErrors,
  clearMasterDataFormErrors,
  clearMasterDetaisData,
  clearPrintingFormData,
  clearPrintingFormErrors,
  setDyeCuttingDataTouched,
  setKldCode,
  setLaminationDataTouched,
  setMasterDataDataTouched,
  setOpenSlider,
  setPrintingDataTouched,
  setRequestPayload,
  setSelectedFile,
  setSelectedTab,
  setUploadPopup,
} from "../../store/slices/masterDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setVersionPopup } from "../../store/slices/viewMasterDataSlice";
import {
  setOpenSliderDaily,
  setIsEditing,
  setShowTabChangeDialog,
  setBackButtonNavigationAllowed,
  setSideNavigationAllowed,
  setDailyPlanHeaderUpload,
  setDailyPlanHeaderUploadButton,
  // setPopOverDailyPlan,
  // setDailyPlanDataNotifications,
} from "../../store/slices/viewDailyPlanSlice";
import { toast } from "react-toastify";
import { BASE_API_URL } from "./../../api.config";
import {
  setCreateSlider,
  setKLDEdit,
  setKLDHeaderUpload,
  setKLDHeaderUploadButton,
  setOpenSliderKld,
} from "../../store/slices/kldSlice";
import { setUserEdit, setCreateSliders, setOpenSliderUser } from "../../store/slices/userSlice";

// import { useMasterDataNotificationsQuery } from "../../store/apis/masterDataApis";
// import { useDailyPlanNotificationsQuery } from "../../store/apis/dailyPlanApis";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [masterDataCreatePopup, setMasterDataCreatePopup] = useState(false);
  const navigate = useNavigate();
  const updateButtonAction = localStorage.getItem("updateButton");
  const { hasUnsavedChanges } = useSelector(
    (state: RootState) => state.viewDailyPlan
  );
  const UEN = localStorage.getItem("selectedUEN");
  let selectedUEN: any;
  if (UEN) {
    selectedUEN = UEN;
  }
  const UENAction = localStorage.getItem("actionSelectedUEN");
  let selectedUENList: any;
  if (UENAction) {
    selectedUENList = UENAction;
  }
  const UnitEffectiveNumber = localStorage.getItem("UEN");
  const VersionNumber = localStorage.getItem("VersionNumber");
  const clearRequestPayoad = {
    masterDataDetails: {
      job_master_id: 0,
      unit_effectivity_number: "",
      kld_code: "",
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
      segment: "",
    },
    masterDataPrinting: {
      printingDetails: {
        machine_settings_id: 0,
        job_master_id: 0,
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
        print_substrate_id: 0,
        machine_settings_id: 0,
        substrate_type: "",
        supplier: "",
        dyne_level: "",
        width: 0,
        thickness: 0,
        density: 0,
      },
      stationWiseMetrics: [
        {
          station_id: 0,
          station_no: 0,
          color_pantone: "",
          lf_value: 0,
          ink_supplier: "",
          lpcm: 0,
          volume: "",
          uv_led: "",
          uv_led_intensity: "",
          mounting_tape: "",
          mptl_code: 0,
          mixing_on_gec: 0,
        },
      ],
    },
    masterDataLamination: {
      laminationConditions: {
        lamination_id: 0,
        job_master_id: 0,
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
        substrate_id: 0,
        lamination_id: 0,
        substrate_type: "",
        supplier: "",
        dyne_level: "",
        width: 0,
        thickness: 0,
        density: 0,
      },
      bondingMaterials: [
        {
          bonding_id: 0,
          lamination_id: 0,
          type: "",
          code: "",
          brand: "",
          ratio: 0,
        },
      ],
    },
    masterDataDyeCutting: {
      dye_cutting_id: 0,
      job_master_id: 0,
      machine_type: "",
      machine_name: "",
      dye_code: "",
      run_speed: 0,
    },
  };
  const { indentNo } = useParams();
  // const decodedIndentNo = indentNo
  let unitEffectiveNumberDaily: number | undefined = undefined;

  const uen = localStorage.getItem("unitEffectiveNumberDaily");
  if (uen !== null) {
    unitEffectiveNumberDaily = Number(uen);
  }

  const decodedIndentNo = decodeURIComponent(indentNo || "");

  const downloadFile = async () => {
    const unitNumber = unitEffectiveNumberDaily;
    const indentNumber = decodedIndentNo;
    const url = `${BASE_API_URL}/master/downloadDailyJobTemplate?unitNumber=${unitNumber}&indentNumber=${indentNumber}`;
    setLoading(true);
    try {
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.message ||
          "Error downloading the file. Please try again later.";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const blob = await response.blob();

      const downloadLink = document.createElement("a");
      const fileUrl = URL.createObjectURL(blob);
      downloadLink.href = fileUrl;
      downloadLink.download = `${decodedIndentNo}.xlsx`;
      downloadLink.click();

      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateMasterData = () => {
    dispatch(setKldCode(""));
    dispatch(setSelectedTab(0));
    dispatch(setRequestPayload(clearRequestPayoad));
    dispatch(clearDyeCuttingFormData());
    dispatch(clearDyeCuttingFormErrors());
    dispatch(clearLaminatingFormData());
    dispatch(clearLaminationFormErrors());
    dispatch(clearPrintingFormData());
    dispatch(clearPrintingFormErrors());
    dispatch(clearMasterDetaisData());
    dispatch(clearMasterDataFormErrors());
    navigate("/createMasterData");
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
  const selectedStatus = localStorage.getItem("status");

  const role = localStorage.getItem("role")||'';
  const pageData: Record<
    string,
    {
      title: string;
      button1Text?: string;
      button3Text?: string;
      button2Text?: string;
      onButton1Click?: () => void;
      onButton2Click?: () => void;
      onButton3Click?: () => void;
      lastUpdate?: string;
      headerButton?: boolean;
      onBack?: () => void;
      filterTitle?: string;
      uploadTitle?: string;
      uploadSubTitle?: string;
      headerButtonColor?: boolean;
      dropDown?: boolean;
      dropDownOptions?: string[];
      editButton?: boolean;
      editClick?: () => void;
      button1Disable?: boolean;
      notificationIcon?: boolean;
      notificationIconOnClick?: () => void;
      dailyPlanSampleFile?: boolean;
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
      onButton2Click: handleCreateMasterData,
      filterTitle: "Master Data Filter",
      // notificationIcon: true,
      // notificationIconOnClick: () => {
      //   handleMasterNotification();
      // },
    },
    "/createMasterData": {
      title: "Create Master Data",
      button1Text: `Created on: ${formattedDate}`,
      button2Text: "Upload Master Data",
      // onButton1Click: () => alert("Edit Profile Clicked"),
      onButton2Click: () => {
        dispatch(setUploadPopup(true)), dispatch(setSelectedFile(null));
      },
      uploadTitle: "Create Master Data",
      uploadSubTitle: "Upload Master Data",
      headerButton: true,
      onBack: () => navigate("/masterData"),
      headerButtonColor: true,
      dailyPlanSampleFile: false,
    },
    "/updateMasterData/:id": {
      title: "Update Master Data",
      button1Text: `Updated on:${formattedDate}`,
      // button2Text: "Upload Master Data",
      // onButton1Click: () => alert("Edit Profile Clicked"),
      onButton2Click: () => dispatch(setUploadPopup(true)),
      uploadTitle: "Update Master Data",
      uploadSubTitle: "Upload Master Data",
      onBack: () => {
        if (updateButtonAction === "false") {
          navigate(`/viewMasterData/${selectedUEN}`);
        } else {
          navigate("/masterData");
        }
      },
      headerButton: true,
      dailyPlanSampleFile: false,
    },
    "/viewMasterData/:id": {
      title: selectedUEN,
      button1Text: "Version History",
      ...(role === "Admin" && {
        button2Text: "Modify Master Data",
        onButton2Click: () => {
          navigate(`/updateMasterData/${selectedUEN}`);
          dispatch(setSelectedTab(0));
          // dispatch(setUpdateButton(false));
          localStorage.setItem("updateButton", "false");
          dispatch(setMasterDataDataTouched(false));
          dispatch(setPrintingDataTouched(false));
          dispatch(setLaminationDataTouched(false));
          dispatch(setDyeCuttingDataTouched(false));
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
    "/versionDetails": {
      title: `${UnitEffectiveNumber}-${VersionNumber}`,
    },
    "/settings": {
      title: "Settings",
      // button1Text: "Save Changes",
      // button2Text: "Reset",
      // onButton1Click: () => alert("Save Changes Clicked"),
      // onButton2Click: () => alert("Reset Clicked"),
    },
    "/kld": {
      title: "KLD Master Data",
      button1Text: "Filter",
      button2Text: "Create KLD",
      onButton1Click: () => {
        dispatch(setKLDEdit(false));
        dispatch(setOpenSliderKld(true));
      },

      filterTitle: "Kld Data Filter",
      onButton2Click: () => {
        dispatch(setKLDEdit(false));
        dispatch(setCreateSlider(true));
      },
      button3Text: "Upload",
      onButton3Click: () => {
        dispatch(setKLDHeaderUpload(true));
        dispatch(setKLDHeaderUploadButton(true));
          dispatch(setDailyPlanHeaderUpload(false));
        dispatch(setDailyPlanHeaderUploadButton(false));
      },
    },
    "/reports": {
      title: "Reports",
      // button1Text: "Save Changes",
      // button2Text: "Reset",
      // onButton1Click: () => alert("Save Changes Clicked"),
      // onButton2Click: () => alert("Reset Clicked"),
    },
    "/dailyPlan": {
      title: "Daily Plan",
      button1Text: "Filter",
      button2Text: "Create Daily Plan",
      onButton1Click: () => dispatch(setOpenSliderDaily(true)),
      onButton2Click: () => navigate(`/createPlan`),
      filterTitle: "Daily Plan Filter",
      button3Text: "Upload",
      onButton3Click: () => {
        dispatch(setDailyPlanHeaderUpload(true));
        dispatch(setDailyPlanHeaderUploadButton(true));
        dispatch(setUploadPopup(false));
        dispatch(setKLDHeaderUploadButton(false));
         dispatch(setKLDHeaderUpload(false));
      },
    },
    "/viewDailyPlan/:indentNO": {
      title: "View Daily Plan",
      button1Text: loading ? "Downloading..." : "Download Template",
      ...(((selectedStatus || "").toLowerCase() !== "completed"  || role.toLowerCase() ==='admin') && {
        button2Text: "Upload Job Data",
        onButton1Click: () => {
          downloadFile();
        },
      }),
      onButton2Click: () => {
        dispatch(setUploadPopup(true));
        dispatch(setDailyPlanHeaderUploadButton(false));
        dispatch(setKLDHeaderUploadButton(false));
           dispatch(setDailyPlanHeaderUpload(false));
            dispatch(setKLDHeaderUpload(false));
      },
      headerButton: true,
      onBack: hasUnsavedChanges
        ? () => {
            dispatch(setShowTabChangeDialog(true)),
              dispatch(setBackButtonNavigationAllowed(true)),
              dispatch(setSideNavigationAllowed(false));
          }
        : () => navigate("/dailyPlan"),
      uploadTitle: "Upload Job Data",
      uploadSubTitle: "Daily Plan Data",
      dropDown: true,
      dropDownOptions: ["Completed", "Inactive", "Active", "Inprogress"],
      editButton: true,
      editClick: () => dispatch(setIsEditing(true)),
      button1Disable: loading ? true : false,
      dailyPlanSampleFile: true,
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
      "/create-user": {
      title: "Create User",
      // button1Text: "Upload Data",
      // button2Text: "Submit",
      // onButton1Click: () => dispatch(setUploadPopup(true)),
      // onButton2Click: () => dispatch(setSubmitAndPublishPopup(true)),
      uploadTitle: "Create Daily Plan",
      uploadSubTitle: "Upload Daily Plan",
      headerButton: true,
      onBack: () => navigate("/users"),
    },
     "/update-user": {
      title: "Update User",
      // button1Text: "Upload Data",
      // button2Text: "Submit",
      // onButton1Click: () => dispatch(setUploadPopup(true)),
      // onButton2Click: () => dispatch(setSubmitAndPublishPopup(true)),
      uploadTitle: "Create Daily Plan",
      uploadSubTitle: "Upload Daily Plan",
      headerButton: true,
      onBack: () => navigate("/users"),
    },
    "/users": {
      title: "Manage Users",
      button1Text: "Filter",
      button2Text: "Create User",
       onButton1Click: () => {
        // dispatch(setUserEdit(false));
        console.log("click")
        dispatch(setOpenSliderUser(true))
      },
      onButton2Click: () => { navigate("/create-user") },
      filterTitle: "User filter",
      // notificationIcon: true,
      // notificationIconOnClick: () => {
      //   handleDailyPlanNotification();
      // },
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

  const hideSideBar = location.pathname.includes("/versionDetails");

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
      {!hideSideBar && (
        <Sidebar open={sidebarOpen} toggleMobileSidebar={toggleSidebar} />
      )}

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
          button3Text={headerData.button3Text}
          onButton1Click={headerData.onButton1Click}
          onButton2Click={headerData.onButton2Click}
          onButton3Click={headerData.onButton3Click}
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
          dropDown={headerData.dropDown}
          dropDownOptions={headerData.dropDownOptions}
          editButton={headerData.editButton}
          editClick={headerData.editClick}
          button1Disable={headerData.button1Disable}
          notificationIcon={headerData.notificationIcon}
          notificationIconOnClick={headerData.notificationIconOnClick}
          dailyPlanSampleFile={headerData.dailyPlanSampleFile}
        />

        <Box sx={{ flex: 1, p: 1.5, backgroundColor: "#ECECEC" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;