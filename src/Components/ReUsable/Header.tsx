import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Chip,
  Select,
  SelectChangeEvent,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonComponent from "./Button";
import ReusablePopup from "./PopUp";
import Filter from "../../Pages/CreateMasterData/Filter";
import FilterDailyPlan from "../../Pages/DailyPlan/createPlan/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setSelectedFile,
  setSubmitAndPublishPopup,
  setSubmitTrue,
  setUploadedFile,
  setUploadPopup,
} from "../../store/slices/masterDataSlice";
import { ReplayOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VersinDetails from "../../Pages/ViewMasterData/versionDetails";
import ConfirmPopup from "./ConfirmPopup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import excelFile from "../../assets/Master_Data_Upload_template.xlsx";
import {
  useUploadCustomerFileMutation,
} from "../../store/apis/genericApis";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import SuccessPopup from "./SuccessPopup";
import { useUpdateStatusJobMutation } from "../../store/apis/dailyPlanApis";

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
  editButton?: boolean;
  editClick?: () => void;
  button1Disable?:boolean;
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
  editClick,
  button1Disable
}) => {
  const structureOptions = ["PET", "PVC", "HDPE", "Glass", "Aluminum"];
  const { updatePopup, submitAndPublish, uploadFile,submitTrue } = useSelector(
    (store: RootState) => store.masterData
  );
  const { isEditing } = useSelector((store: RootState) => store.viewDailyPlan);
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
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [statusChangeMessage, setStatusChangeMessage] =
    useState<React.ReactNode>("");
 const [uploadCustomerFile,{ isLoading:uploadLoading }] = useUploadCustomerFileMutation();
  let unitEffectiveNumberDaily: any;
  const UEN = localStorage.getItem("unitEffectiveNumberDaily");
  if (UEN) {
    unitEffectiveNumberDaily = UEN;
  }

  const [updateStatusJob] = useUpdateStatusJobMutation();
  const performStatusUpdate = async () => {
    try {
      const response = await updateStatusJob({
        indentNumber: decodedIndentNo,
        status: selectedValue,
      }).unwrap();

      if (response?.statusCode === 200) {
        localStorage.setItem("status", selectedValue);
        if (response?.message !== "Status Updated") {
          toast.error(response?.message);
        } else {
          toast.success("Status Updated Successfully!");
          setConfirmDialogOpen(false);
          if (selectedValue === "Inactive") {
            navigate("/dailyPlan");
          }
        }
      } else {
        setSelectedStatus(selectedStatus);
        localStorage.setItem("status", selectedStatus);
        toast.error(response?.message);
      }
    } catch (error) {
      setSelectedStatus(selectedStatus);
      localStorage.setItem("status", selectedStatus);
      toast.error("Something Went Wrong!");
    }
  };

  const handleDropdownChange = (e: SelectChangeEvent<string>) => {
    const newStatus = e.target.value;

    if (newStatus === "Inactive") {
      setStatusChangeMessage(
        <>
          Are you sure you want to change the status from{" "}
          <strong>{selectedStatus}</strong> to <strong>{newStatus}</strong>?
          <br />
          If you proceed,the total daily job data is deleted for this number.
        </>
      );
    } else {
      setStatusChangeMessage(
        <>
          Are you sure you want to change the status from{" "}
          <strong>{selectedStatus}</strong> to <strong>{newStatus}</strong>?
          <br />
        </>
      );
    }
    setConfirmDialogOpen(true);
    setSelectedValue(newStatus);
  };

  const handleClosePopUp = () => {
    dispatch(setUploadedFile(null));
    dispatch(setUploadPopup(false));
  };

  const handleSubmitAndPublishPopupOpen = async () => {
    dispatch(setSubmitTrue(true));
    dispatch(setUploadPopup(false));
    if (
      location.pathname.includes("/viewDailyPlan") ||
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
       dispatch(setSelectedFile(null))
  };

  const handleSubmitPopupConfirmOpen = async () => {
                if (uploadFile) {
              try {
                 await uploadCustomerFile({
                  file: uploadFile,
                  unitNumber: unitEffectiveNumberDaily?unitEffectiveNumberDaily:"", // <-- Replace with actual unit number if needed
                  type: "job",
                }).unwrap();
      
                    setSubmitPopupConfirm(true);
                dispatch(setUploadedFile(null));
                   dispatch(setSelectedFile(null))
              } catch (err) {
                console.error("Upload failed:", err);
      
                let message = "Upload failed. Please try again.";
      
                // Check for RTK Query error format
                if (err && typeof err === "object") {
                  const errData = err as {
                    data?: { message?: string };
                    message?: string;
                  };
      
                  if (errData?.data?.message) {
                    message = errData.data.message;
                  } else if (errData?.message) {
                    message = errData.message;
                  }
                }
      
                toast.error(message);
              }
            } else {
              toast.warn("No file selected to upload.");
            }

  };

  const handleSubmitPopupConfirmClose = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopup(false);
    setSubmitPopupConfirm(false);
       dispatch(setSelectedFile(null))
  };

  const handleSubmitPopupConfirmClick = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopup(false);
    setSubmitPopupConfirm(false);
    navigate("/dailyPlan");
       dispatch(setSelectedFile(null))
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
                  <Select
                    value={selectedStatus}
                    onChange={handleDropdownChange}
                    displayEmpty
                    size="small"
                    sx={{
                      borderRadius: "20px",
                      padding: "0px 0px",
                      border: "1px solid #00000000",
                      background: "#fff",
                      fontSize: "14px",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    {dropDownOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
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
                  disabled={button1Disable?true:false}
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
                  p={"14px"}
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
        disable={uploadFile ? false : true}
      />
      <ConfirmPopup
        open={
          (location.pathname === "/createPlan" && submitAndPublish) ||
          submitPopup
        }
        title="Are you sure you want submit Daily Plan ?"
        message=""
        buttonText="No"
        buttonText2="Yes,Save it!"
        gifSrc=""
        onClose={handleSubmitPopupClose}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={uploadLoading}
      />
      <SuccessPopup
        open={submitPopupConfirm}
        message={submitTrue?"We are currently processing your data. Please wait a moment":"You have successfully add a daily job"}
        buttonText="Go back to Daily Plan"
        onClose={handleSubmitPopupConfirmClose}
        onClick={handleSubmitPopupConfirmClick}
      />
      <Filter filterTitle={filterTitle || ""} />
      <FilterDailyPlan filterTitle="Daily Plan Filter" />
      <VersinDetails />
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 5,
            p: 0.5,
          },
        }}
      >
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            {statusChangeMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 10,
              color: "primary.main",
              borderColor: "primary.main",
              "&:hover": {
                // backgroundColor: 'primary.main',
                // color: 'white',
                borderColor: "primary.main",
              },
            }}
            onClick={() => setConfirmDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "white",
              borderRadius: 10,
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
            onClick={performStatusUpdate}
          >
            Yes, Change Status
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
