import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonComponent from "./Button";
import ReusablePopup from "./PopUp";
import Filter from "../../Pages/createMasterData/Filter";
import FilterDailyPlan from "../../Pages/DailyPlan/createPlan/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setSubmitAndPublishPopup,
  setSubmitTrue,
  setUploadPopup,
} from "../../store/slices/masterDataSlice";
import { ReplayOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VersinDetails from "../../Pages/viewMasterData/versionDetails";
import ConfirmPopup from "./ConfirmPopup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import excelFile from "../../assets/Master_Data_Upload_template.xlsx";
import { useUpdateStatusJobMutation } from "../../store/services/api";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';

interface HeaderProps {
  title: string;
  button1Text?: string;
  button2Text?: string;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
  onMenuClick: () => void;
  masterDataCreatePopup: boolean;
  onClosePopup: () => void;
  lastUpdate?: string;
  headerButton?: boolean;
  onBack?: () => void;
  filterTitle?: string;
  uploadTitle?: string;
  uploadSubTitle?: string;
  headerButtonColor?: boolean;
  dropDown?: boolean;
  dropDownOptions?: string[];
  editButton?:boolean;
  editClick?: () => void;
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
  lastUpdate,
  headerButton,
  onBack,
  filterTitle,
  uploadTitle,
  uploadSubTitle,
  headerButtonColor = false,
  dropDown = false,
  dropDownOptions = [],
  editButton = false,
  editClick
}) => {
  const structureOptions = ["PET", "PVC", "HDPE", "Glass", "Aluminum"];
  const { updatePopup, submitAndPublish } = useSelector(
    (store: RootState) => store.masterData
  );
  const { isEditing } = useSelector(
    (store: RootState) => store.viewDailyPlan
  );
  const [submitPopup, setSubmitPopup] = useState<boolean>(false);
  const [submitPopupConfirm, setSubmitPopupConfirm] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>(() => {
    return localStorage.getItem("status") || "";
  });
  

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const storedStatus = localStorage.getItem("status");
  useEffect(() => {
        if (storedStatus) {
      setSelectedStatus(storedStatus);
    }
  }, [storedStatus]);
  const { indentNo } = useParams();
  const decodedIndentNo = decodeURIComponent(indentNo || "");
  const [updateStatusJob] = useUpdateStatusJobMutation();
  const handleDropdownChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    const previousStatus = selectedStatus; // Store the previous status value

    setSelectedStatus(newStatus); // Temporarily update the state to the new value

    try {
      const response = await updateStatusJob({
        indentNumber: decodedIndentNo,
        status: newStatus,
      }).unwrap();

      if (response?.statusCode === 200) {
        localStorage.setItem("status", newStatus);
        if (response?.message !== "Status Updated") {
          toast.error(response?.message);
        } else {
          toast.success("Status Updated Succesfully!");
        }
      } else {
        // If the status update fails, revert the status to the previous one
        setSelectedStatus(previousStatus);
        localStorage.setItem("status", previousStatus); // Retain the previous status in localStorage
        toast.error(response?.message);
      }
    } catch (error) {
      // If an error occurs, revert the status to the previous one
      setSelectedStatus(previousStatus);
      localStorage.setItem("status", previousStatus); // Retain the previous status in localStorage
      toast.error("Something Went Wrong!");
    }
  };

  const handleClosePopUp = () => {
    dispatch(setUploadPopup(false));
  };

  const handleSubmitAndPublishPopupOpen = () => {
    dispatch(setSubmitTrue(true));
    dispatch(setUploadPopup(false));
    if (
      location.pathname === "/viewDailyPlan" ||
      location.pathname === "/createPlan"
    ) {
      setSubmitPopup(true);
    } else {
      dispatch(setSubmitAndPublishPopup(true));
    }
  };

  const handleSubmitPopupClose = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopup(false);
  };

  const handleSubmitPopupConfirmOpen = () => {
    setSubmitPopupConfirm(true);
  };

  const handleSubmitPopupConfirmClose = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopup(false);
    setSubmitPopupConfirm(false);
  };

  const handleSubmitPopupConfirmClick = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopup(false);
    setSubmitPopupConfirm(false);
    navigate("/dailyPlan");
  };

  const handleDownloadSampleFileMasterData = (filePath: string) => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch the file");
        return response.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filePath.split("/").pop() || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading the file:", error));
  };

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
          padding: ".25rem 1rem",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            px: 0,
            minHeight: "50px !important",
          }}
        >
          <IconButton
            sx={{ display: { xs: "block", md: "none", lg: "none" } }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={0.5}
            paddingTop="0px"
            paddingBottom="0px"
            width="100%"
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
              {headerButton && (
                <IconButton
                  onClick={onBack}
                  sx={{
                    mr: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <ArrowBackIcon sx={{ width: 20, height: 20 }} />
                </IconButton>
              )}
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {title}
              </Typography>
              {editButton && !isEditing && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    onClick={editClick}
                    color="primary"
                    aria-label="edit"
                    sx={{
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Box display="flex" gap={2}>
              {dropDown && (
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 500, color: "#1976D2" }}
                  >
                    Status:
                  </Typography>
                  <Box
                    component="select"
                    value={selectedStatus}
                    onChange={handleDropdownChange}
                    sx={{
                      borderRadius: "20px",
                      padding: "10px 16px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      fontSize: "14px",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    {dropDownOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Box>
                </Box>
              )}
              {button1Text && (
                <ButtonComponent
                {...(onButton1Click && { onClick: onButton1Click })}
                  color="white"
                  text={button1Text}
                  textColor="#0E0E0E"
                  borderRadius="100px"
                  border="1px solid #E5E5E5"
                  p={"14px"}
                />
              )}
              {lastUpdate && (
                <Chip
                  icon={<ReplayOutlined />}
                  label={lastUpdate}
                  sx={{
                    backgroundColor: "#F6F6F6",
                    color: "#2F2F2F",
                    fontWeight: 500,
                    border: "1px solid #2F2F2F",
                    "& .MuiChip-icon": { color: "#2F2F2F" },
                  }}
                />
              )}
              {button2Text && (
                <ButtonComponent
                  onClick={onButton2Click}
                  color={
                    headerButton && !headerButtonColor ? "white" : "#0073B7"
                  }
                  text={button2Text}
                  textColor={
                    headerButton && !headerButtonColor ? "#0E0E0E" : "#FFFFFF"
                  }
                  borderRadius="100px"
                  border={
                    headerButton && !headerButtonColor
                      ? "1px solid #E5E5E5"
                      : "none"
                  }
                  p={"4px"}
                  width={"200px"}
                />
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Popups and Filter Components */}
      <ReusablePopup
        open={masterDataCreatePopup}
        onClose={onClosePopup}
        title="Create a new masterdata"
        confirmText="Continue"
        onConfirm={() => {}}
        text="Upload Picture"
        dropdownOptions={structureOptions}
        upload={true}
        textField={true}
        dropdown={true}
      />
      <ReusablePopup
        open={updatePopup}
        upload={true}
        onConfirm={handleSubmitAndPublishPopupOpen}
        confirmText="Submit"
        title={uploadTitle || ""}
        onClose={handleClosePopUp}
        subText={uploadSubTitle || ""}
        sampleFile={true}
        handleDownloadSampleFile={() =>
          handleDownloadSampleFileMasterData(excelFile)
        }
      />
      <ConfirmPopup
        open={
          (location.pathname === "/createPlan" && submitAndPublish) ||
          submitPopup
        }
        title="Are you sure you want submit ? Daily Plan"
        message=""
        buttonText="No"
        buttonText2="Yes,Save it!"
        gifSrc=""
        onClose={handleSubmitPopupClose}
        onClick={handleSubmitPopupConfirmOpen}
      />
      <ConfirmPopup
        open={submitPopupConfirm}
        title="You have successfully add a daily job"
        message=""
        buttonText2="Go back to Daily Plan"
        gifSrc=""
        onClose={handleSubmitPopupConfirmClose}
        onClick={handleSubmitPopupConfirmClick}
      />
      <Filter filterTitle={filterTitle || ""} />
      <FilterDailyPlan filterTitle="Daily Plan Filter" />
      <VersinDetails />
    </>
  );
};

export default Header;
