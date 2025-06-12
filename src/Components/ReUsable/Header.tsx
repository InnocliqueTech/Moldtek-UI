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
  // Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonComponent from "./Button";
import ReusablePopup from "./PopUp";
import Filter from "../../Pages/Create_Master_Data/Filter";
import FilterDailyPlan from "../../Pages/DailyPlan/createPlan/Filter";
import FilterKld from "../../Pages/Production_Operators/Filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setGlobalPopup,
  setMasterDataNotifications,
  setPopOver,
  setSelectedFile,
  setSubmitAndPublishPopup,
  setSubmitTrue,
  setUploadedFile,
  setUploadPopup,
} from "../../store/slices/masterDataSlice";
import { ReplayOutlined } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VersinDetails from "../../Pages/View_Master_Data/versionDetails";
import ConfirmPopup from "./ConfirmPopup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUploadCustomerFileMutation } from "../../store/apis/genericApis";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import SuccessPopup from "./SuccessPopup";
import {
  useLazyDailyPlanNotificationsQuery,
  useUpdateStatusJobMutation,
} from "../../store/apis/dailyPlanApis";
import NotificationPopover from "./NotificationPopOver";
import {
  setDailyPlamConfirmPopup,
  setDailyPlanDataNotifications,
  setDailyPlanHeaderUpload,
  setDailyPlanHeaderUploadButton,
  setDailyPlanSuccessPopup,
  setPopOverDailyPlan,
} from "../../store/slices/viewDailyPlanSlice";
import KLDSlider from "../../Pages/Production_Operators/createKLD";
import {
  setCreateSlider,
  setKLDConfirmPopup,
  setKLDHeaderUpload,
  setKLDHeaderUploadButton,
  setKLDSuccessPopup,
} from "../../store/slices/kldSlice";
import {
  useKldUploadMutation,
  useLazyKldMasterDataNotificationsQuery,
} from "../../store/apis/kldApis";
import FilterUsers from "../../Pages/Users/Filter";



interface HeaderProps {
  title: string;
  button1Text?: string;
  button2Text?: string;
  button3Text?: string;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
  onButton3Click?: () => void;
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
  button1Disable?: boolean;
  notificationIcon?: boolean;
  notificationIconOnClick?: () => void;
  dailyPlanSampleFile?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  button1Text,
  button2Text,
  onButton1Click,
  onButton2Click,
  button3Text,
  onButton3Click,
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
  button1Disable,
  notificationIcon,
  notificationIconOnClick,
  dailyPlanSampleFile,
}) => {
  const structureOptions = ["PET", "PVC", "HDPE", "Glass", "Aluminum"];
  const {
    updatePopup,
    submitAndPublish,
    uploadFile,
    submitTrue,
    popOver,
    masterDataNotifications,
  } = useSelector((store: RootState) => store.masterData);
  const {
    popOverDailyPlan,
    dailyPlanDataNotifications,
    isEditing,
    dailyPlanHeaderUpload,
    dailyPlanSuccessPopup,
    dailyPlanConfirmPopup,
    dailyPlanHeaderUploadButton,
  } = useSelector((store: RootState) => store.viewDailyPlan);
  const {
    createSlider,
    kldConfirmPopup,
    kldSuccessPopup,
    kldHeaderUpload,
    kldHeaderUploadButton,
  } = useSelector((store: RootState) => store.kld);
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

  const [uploadCustomerFile, { isLoading: uploadLoading }] =
    useUploadCustomerFileMutation();

  const [kldUpload, { isLoading: kldUploadLoading }] = useKldUploadMutation();

  let unitEffectiveNumberDaily: any;
  const UEN = localStorage.getItem("unitEffectiveNumberDaily");
  if (UEN) {
    unitEffectiveNumberDaily = UEN;
  }
  const role = localStorage.getItem("role") || "";
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

  const handleHeaderClosePopUp = () => {
    dispatch(setUploadedFile(null));
    dispatch(setDailyPlanHeaderUpload(false));
  };
  const handleHeaderClosePopUpKLD = () => {
    dispatch(setUploadedFile(null));
    dispatch(setKLDHeaderUpload(false));
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
  const handleSubmitAndPublishPopupHeader = async () => {
    dispatch(setSubmitTrue(true));
    dispatch(setDailyPlanHeaderUpload(false));
    dispatch(setDailyPlamConfirmPopup(true));
  };
  const handleSubmitAndPublishPopupKLD = async () => {
    dispatch(setSubmitTrue(true));
    dispatch(setKLDHeaderUpload(false));
    dispatch(setKLDConfirmPopup(true));
  };

  const handleSubmitPopupClose = () => {
    if (submitTrue) {
      dispatch(setUploadPopup(true));
    }
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopup(false);
  };
  const handleSubmitPopupCloseHeader = () => {
    if (submitTrue) {
      dispatch(setDailyPlanHeaderUpload(true));
    }
    dispatch(setDailyPlamConfirmPopup(false));
    // setSubmitPopup(false);
  };
  const handleSubmitPopupCloseKLD = () => {
    if (submitTrue) {
      dispatch(setKLDHeaderUpload(true));
    }
    dispatch(setKLDConfirmPopup(false));
    // setSubmitPopup(false);
  };

  const [dailyPlanNotifications] = useLazyDailyPlanNotificationsQuery();
  const [kldMasterDataNotifications] = useLazyKldMasterDataNotificationsQuery();

  // useEffect(() => {
  //   if (data?.data) {
  //     dispatch(setDailyPlanDataNotifications( data?.data));
  //   }
  // }, [data, dispatch]);

  const handleSubmitPopupConfirmOpen = async () => {
    if (uploadFile) {
      try {
        if (kldHeaderUploadButton) {
          await kldUpload({
            file: uploadFile,
          }).unwrap();
          dispatch(setKLDSuccessPopup(true));
          localStorage.setItem("showKldNotificationPopup", "true");
          setTimeout(async () => {
            const shouldShowKLD = localStorage.getItem(
              "showKldNotificationPopup"
            );
            if (shouldShowKLD === "true" && kldHeaderUploadButton) {
              try {
                const response = await kldMasterDataNotifications(
                  uploadFile?.name ?? ""
                ).unwrap();
                dispatch(
                  setGlobalPopup({
                    open: true,
                    data: response && response?.notifications,
                  })
                );
                localStorage.removeItem("showKldNotificationPopup");
              } catch (err) {
                toast.error("Failed to fetch notifications.");
              }
            }
          }, 500);
        } else {
          await uploadCustomerFile({
            file: uploadFile,
            unitNumber:
              unitEffectiveNumberDaily && !dailyPlanHeaderUploadButton
                ? unitEffectiveNumberDaily
                : "",
            type: "job",
          }).unwrap();
          if (!dailyPlanHeaderUploadButton && !kldHeaderUploadButton) {
            setSubmitPopupConfirm(true);
          } else if (dailyPlanHeaderUploadButton) {
            dispatch(setDailyPlanSuccessPopup(true));
          }
          localStorage.setItem("showDailyNotificationPopup", "true");
          setTimeout(async () => {
            const shouldShow = localStorage.getItem(
              "showDailyNotificationPopup"
            );
            if (shouldShow === "true") {
              try {
                const response = await dailyPlanNotifications(
                  uploadFile?.name ?? ""
                ).unwrap();
                dispatch(
                  setGlobalPopup({
                    open: true,
                    data: response && response?.notifications,
                  })
                );
                localStorage.removeItem("showDailyNotificationPopup");
              } catch (err) {
                toast.error("Failed to fetch notifications.");
              }
            }
          }, 5 * 60 * 1000);
        }

        dispatch(setUploadedFile(null));
      } catch (err) {
        console.error("Upload failed:", err);
        let message = "Upload failed. Please try again.";

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
    dispatch(setSelectedFile(null));
  };
  const handleSubmitPopupConfirmCloseHeader = () => {
    dispatch(setDailyPlanSuccessPopup(false));
    setSubmitPopup(false);
    dispatch(setDailyPlamConfirmPopup(false));
    dispatch(setSelectedFile(null));
  };
  const handleSubmitPopupConfirmCloseKLD = () => {
    dispatch(setKLDSuccessPopup(false));
    setSubmitPopup(false);
    dispatch(setKLDConfirmPopup(false));
    dispatch(setSelectedFile(null));
  };

  const handleSubmitPopupConfirmClick = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopup(false);
    setSubmitPopupConfirm(false);
    navigate("/dailyPlan");
    dispatch(setSelectedFile(null));
  };
  const handleSubmitPopupConfirmClickHeader = () => {
    dispatch(setDailyPlamConfirmPopup(false));
    setSubmitPopup(false);
    dispatch(setDailyPlanSuccessPopup(false));
    dispatch(setSelectedFile(null));
    dispatch(setDailyPlanHeaderUploadButton(false));
  };
  const handleSubmitPopupConfirmClickKLD = () => {
    dispatch(setKLDConfirmPopup(false));
    setSubmitPopup(false);
    dispatch(setKLDSuccessPopup(false));
    dispatch(setSelectedFile(null));
    dispatch(setKLDHeaderUploadButton(false));
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

  useEffect(() => {
    if (confirmDialogOpen) {
      setConfirmDialogOpen(false);
    }
  }, [location]);

  const handleMasterDataPopoverClose = () => {
    dispatch(setPopOver(false));
  };
  const handleDailyPlanDataPopoverClose = () => {
    dispatch(setPopOverDailyPlan(false));
  };

  const handleMasterDataNotificationItemClick = (index: number) => {
    const newNotifs = [...masterDataNotifications];
    newNotifs.splice(index, 1);
    dispatch(setMasterDataNotifications(newNotifs));
  };

  const handleDailyPlanNotificationItemClick = (index: number) => {
    const newNotifs = [...dailyPlanDataNotifications];
    newNotifs.splice(index, 1);
    dispatch(setDailyPlanDataNotifications(newNotifs));
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
              {editButton &&
                !isEditing &&
                ((selectedStatus || "").toLowerCase() !== "completed" ||
                  role.toLowerCase() === "admin") && (
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
              {dropDown &&
                ((selectedStatus || "").toLowerCase() === "completed" &&
                  role.toLowerCase() !== "admin" ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 500, color: "#1976D2" }}
                    >
                      Status:
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 500,
                        color: "#388E3C",
                        textTransform: "capitalize",
                      }}
                    >
                      Completed
                    </Typography>
                  </Box>
                ) : (
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
                ))}
              {notificationIcon && (
                <IconButton
                  onClick={notificationIconOnClick}
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid #E0E0E0",
                    padding: "8px",
                    "&:hover": {
                      backgroundColor: "transparent",
                      border: "1px solid #E0E0E0",
                    },
                  }}
                >
                  {/* <Badge
                    badgeContent={
                      isMasterDataPage
                        ? unreadCountMasterData
                        : unreadCountDailyPlan
                    }
                    color="error"
                  >
                    <Notifications />
                  </Badge> */}
                </IconButton>
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
                  disabled={button1Disable ? true : false}
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
              {button3Text && (
                <ButtonComponent
                  onClick={onButton3Click}
                  color={
                    headerButton && !headerButtonColor ? "white" : "#0073B7"
                  }
                  text={button3Text}
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
        onConfirm={() => { }}
        text="Upload Picture"
        dropdownOptions={structureOptions}
        upload={true}
        textField={true}
        dropdown={true}
        popUpClosed={false}
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
          handleDownloadSampleFileMasterData(
            "/Master_Data_Upload_template.xlsx"
          )
        }
        disable={uploadFile ? false : true}
        popUpClosed={false}
        dailyPlanSampleFile={dailyPlanSampleFile}
        handleDownloadSampleFileDaiyPlan={() =>
          handleDownloadSampleFileMasterData("/Upload_template_after_job.xlsx")
        }
      />
      <ReusablePopup
        open={dailyPlanHeaderUpload}
        upload={true}
        onConfirm={handleSubmitAndPublishPopupHeader}
        confirmText="Submit"
        title={"Daily Plan Data"}
        onClose={handleHeaderClosePopUp}
        subText={"Upload Job Data"}
        sampleFile={true}
        handleDownloadSampleFile={() =>
          handleDownloadSampleFileMasterData("/Upload_template_after_job.xlsx")
        }
        disable={uploadFile ? false : true}
        popUpClosed={false}
      />
      <ReusablePopup
        open={kldHeaderUpload}
        upload={true}
        onConfirm={handleSubmitAndPublishPopupKLD}
        confirmText="Submit"
        title={"KLD Master Data"}
        onClose={handleHeaderClosePopUpKLD}
        subText={"Upload KLD Master Data"}
        sampleFile={true}
        handleDownloadSampleFile={() =>
          handleDownloadSampleFileMasterData("/kld_sample_data_updated.xlsx")
        }
        disable={uploadFile ? false : true}
        popUpClosed={false}
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
        popUpClosed={false}
        noButton={uploadLoading ? true : false}
      />
      <SuccessPopup
        open={submitPopupConfirm}
        message={
          submitTrue
            ? "We are currently processing your data. Please wait a moment"
            : "You have successfully add a daily job"
        }
        buttonText="Go back to Daily Plan"
        onClose={handleSubmitPopupConfirmClose}
        onClick={handleSubmitPopupConfirmClick}
        popUpClosed={false}
      />
      <ConfirmPopup
        open={dailyPlanConfirmPopup}
        title="Are you sure you want submit Daily Plan ?"
        message=""
        buttonText="No"
        buttonText2="Yes,Save it!"
        gifSrc=""
        onClose={handleSubmitPopupCloseHeader}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={uploadLoading}
        popUpClosed={false}
        noButton={uploadLoading ? true : false}
      />
      <SuccessPopup
        open={dailyPlanSuccessPopup}
        message={"We are currently processing your data. Please wait a moment"}
        buttonText="OK"
        onClose={handleSubmitPopupConfirmCloseHeader}
        onClick={handleSubmitPopupConfirmClickHeader}
        popUpClosed={false}
      />
      <ConfirmPopup
        open={kldConfirmPopup}
        title="Are you sure you want submit KLD Master Data ?"
        message=""
        buttonText="No"
        buttonText2="Yes,Save it!"
        gifSrc=""
        onClose={handleSubmitPopupCloseKLD}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={kldUploadLoading}
        popUpClosed={false}
        noButton={kldUploadLoading ? true : false}
      />
      <SuccessPopup
        open={kldSuccessPopup}
        message={"We are currently processing your data. Please wait a moment"}
        buttonText="OK"
        onClose={handleSubmitPopupConfirmCloseKLD}
        onClick={handleSubmitPopupConfirmClickKLD}
        popUpClosed={false}
      />
      <Filter filterTitle={filterTitle || ""} />
      <FilterDailyPlan filterTitle="Daily Plan Filter" />
      <FilterKld filterTitle="KLD Filter" />
      <FilterUsers filterTitle="User Filter" />

      <KLDSlider
        open={createSlider}
        onClose={() => dispatch(setCreateSlider(false))}
      />
      <VersinDetails />
      <Dialog
        open={confirmDialogOpen}
        onClose={() => { }}
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
      <NotificationPopover
        open={popOver}
        onClose={handleMasterDataPopoverClose}
        notifications={masterDataNotifications}
        popUpTitle="Master Data Upload Details"
        onClickNotification={handleMasterDataNotificationItemClick}
      />
      <NotificationPopover
        open={popOverDailyPlan}
        onClose={handleDailyPlanDataPopoverClose}
        notifications={dailyPlanDataNotifications.map(
          ({ status, ...rest }) => ({
            ...rest,
            fileReadStatus: status,
          })
        )}
        popUpTitle="DailyPlan Data Upload Details"
        onClickNotification={handleDailyPlanNotificationItemClick}
      />
    </>
  );
};

export default Header;
