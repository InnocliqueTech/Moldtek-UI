import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabsComponent from "../../../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setSelectedTab } from "../../../store/slices/viewMasterDataSlice";
import MakeReady from "./makeReady";
import PrintingReport from "./PrintingReport";
import LaminationReport from "./LaminationReport";
import LabelCutting from "./LabelCutting";
import TravelCard from "./TravelCard";
import CommenCard from "./commonCard";
import {
  setAnaloxSpecifications,
  setDailyPlan,
  setInkCoatingSpecifications,
  setMaterialSpecification,
  setMountingTapeSpecifications,
  setPlateMountingSupervisorReport,
  setIsEditing,
  clearUpdateDailyPlanPayload,
  setHasUnsavedChanges,
  setShowTabChangeDialog,
} from "../../../store/slices/viewDailyPlanSlice";
import {
  useGetMakeReadyDetailsQuery,
  useSaveLabelCuttingDetailsMutation,
  useSaveLaminationReportDetailsMutation,
  useSaveTravelCardDetailsMutation,
  useSavePrintingReportDetailsMutation,
  useSaveMakeReadyDetailsMutation,
} from "../../../store/services/api";
import ButtonComponent from "../../../Components/ReUsable/Button";

const ViewDailyPlan: React.FC = () => {
  const { indentNo } = useParams();
  const [nextTab, setNextTab] = useState<number | null>(null);
  // const [showTabChangeDialog, setShowTabChangeDialog] = useState(false);
  const [saveLabelCuttingDetails, { isLoading: isSaving }] =
    useSaveLabelCuttingDetailsMutation();
  const [saveLaminationReportDetails] =
    useSaveLaminationReportDetailsMutation();
  const [saveTravelCardDetails] = useSaveTravelCardDetailsMutation();
  const [savePrintingReportDetails] = useSavePrintingReportDetailsMutation();
  const [saveMakeReadyDetails] = useSaveMakeReadyDetailsMutation();
  const [savingTabIndex, setSavingTabIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  let unitEffectiveNumberDaily: number | undefined;

  const uen = localStorage.getItem("unitEffectiveNumberDaily");
  if (uen !== null) {
    unitEffectiveNumberDaily = Number(uen);
  }

  const decodedIndentNo = decodeURIComponent(indentNo || "");
  const {
    data: makeReady,
    isLoading,
    isError,
    // error,
  } = useGetMakeReadyDetailsQuery(decodedIndentNo);

  const dispatch = useDispatch<AppDispatch>();
  const { selectedTab } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const { sideNavigationAllowed, backButtonNavigationAllowed } = useSelector(
    (state: RootState) => state.viewDailyPlan
  );

  const navigationItem = localStorage.getItem("navigation");
  const {
    updateDailyPlanPayload,
    updateCommonCard,
    isEditing,
    dailyPlan,
    hasUnsavedChanges,
    showTabChangeDialog,
  } = useSelector((state: RootState) => state.viewDailyPlan);

  // Initialize data when loaded
  useEffect(() => {
    if (makeReady) {
      dispatch(setDailyPlan(makeReady.data.dailyPlan));
      dispatch(setMaterialSpecification(makeReady.data.materialSpecification));
      dispatch(
        setMountingTapeSpecifications(makeReady.data.mountingTapeSpecifications)
      );
      dispatch(setAnaloxSpecifications(makeReady.data.analoxSpecifications));
      dispatch(
        setInkCoatingSpecifications(makeReady.data.inkCoatingSpecifications)
      );
      dispatch(
        setPlateMountingSupervisorReport(
          makeReady.data.plateMountingSupervisorReport
        )
      );
    }
  }, [makeReady, dispatch]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (hasUnsavedChanges) {
      setNextTab(newValue);
      dispatch(setShowTabChangeDialog(true));
    } else {
      dispatch(setSelectedTab(newValue));
      dispatch(clearUpdateDailyPlanPayload());
    }
  };

  const saveTabData = async (
    selectedTab: number,
    payload: any,
    saveLabelCuttingDetails: ReturnType<
      typeof useSaveLabelCuttingDetailsMutation
    >[0],
    saveTravelCardDetails: ReturnType<
      typeof useSaveTravelCardDetailsMutation
    >[0],
    savePrintingReportDetails: ReturnType<
      typeof useSavePrintingReportDetailsMutation
    >[0],
    setSavingTabIndex: React.Dispatch<React.SetStateAction<number | null>>,
    saveLaminationReportDetails: ReturnType<
      typeof useSaveLaminationReportDetailsMutation
    >[0],
    saveMakeReadyDetails: ReturnType<typeof useSaveMakeReadyDetailsMutation>[0]
  ) => {
    setSavingTabIndex(selectedTab); // show loader on current tab
    try {
      switch (selectedTab) {
        case 0:
          const makeReadyPayload = {
            ...updateDailyPlanPayload,
            dailyPlan: {
              unitEffectivityNumber: unitEffectiveNumberDaily?.toString() ?? "",
              indentNumber: decodedIndentNo,
              shift: updateCommonCard.shift ?? "", // adjust based on your actual structure
              workOrderNumber: updateCommonCard.workOrderNumber ?? "", // adjust as needed
            },
          };
          await saveMakeReadyDetails(makeReadyPayload).unwrap();
          toast.success("Make Ready details saved successfully!");
          break;
        case 1: {
          const printingPayload = {
            ...updateDailyPlanPayload,
            dailyPlan: {
              unitEffectivityNumber: unitEffectiveNumberDaily?.toString() ?? "",
              indentNumber: decodedIndentNo,
              shift: updateCommonCard.shift ?? "", // adjust based on your actual structure
              workOrderNumber: updateCommonCard.workOrderNumber ?? "", // adjust as needed
            },
          };
          await savePrintingReportDetails(printingPayload).unwrap();
          toast.success("Printing report saved successfully!");
          break;
        }
        case 2:
          await saveLaminationReportDetails(payload).unwrap();
          toast.success("Lamination details saved successfully!");
          break;
        case 3:
          await saveLabelCuttingDetails(payload).unwrap();
          toast.success("Label cutting details saved successfully!");
          break;

        case 4:
          await saveTravelCardDetails(payload).unwrap();
          toast.success("Travel card details saved successfully!");
          break;

        default:
          toast.info("No save action defined for this tab.");
          break;
      }
    } finally {
      setSavingTabIndex(null); // hide loader
    }
  };

  const handleSave = async () => {
    try {
      const commonPayload = {
        ...updateDailyPlanPayload,
        ...updateCommonCard,
        indentNumber: decodedIndentNo,
      };

      await saveTabData(
        selectedTab,
        commonPayload,
        saveLabelCuttingDetails,
        saveTravelCardDetails,
        savePrintingReportDetails,
        setSavingTabIndex,
        saveLaminationReportDetails,
        saveMakeReadyDetails
      );

      // if (selectedTab < tabs.length - 1) {
      //   dispatch(setSelectedTab(selectedTab + 1));
      // }

      //dispatch(setIsEditing(false));
      dispatch(setHasUnsavedChanges(false));
    } catch (error) {
      toast.error("Failed to save data. Please try again.");
      console.error("Save error:", error);
    }
  };

  const handleCancel = () => {
    dispatch(setIsEditing(false));
    dispatch(setHasUnsavedChanges(false));
  };

  const handleDataChange = () => {
    dispatch(setHasUnsavedChanges(true));
  };

  const handleDialogContinue = () => {
    dispatch(setShowTabChangeDialog(false));
    if (nextTab !== null) {
      dispatch(setSelectedTab(nextTab));
      setNextTab(null);
    }
    dispatch(setHasUnsavedChanges(false));
    if (navigationItem && sideNavigationAllowed) {
      navigate(navigationItem);
      dispatch(setIsEditing(false));
    } else if (backButtonNavigationAllowed) {
      navigate("/dailyPlan");
      dispatch(setIsEditing(false));
    }
  };

  const handleDialogCancel = () => {
    dispatch(setShowTabChangeDialog(false));
    setNextTab(null);
  };

  const tabs = [
    "Make Ready",
    "Printing Report",
    ...(dailyPlan.labelType === "THINWALL" ? [] : ["Lamination Report"]),
    "Label Cutting",
    "Travel Card",
  ].filter(Boolean);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <MakeReady
            loading={isLoading}
            isEditing={isEditing}
            onDataChange={handleDataChange}
            error={isError}
          />
        );
      case 1:
        return (
          <PrintingReport
            indentNO={decodedIndentNo}
            isEditing={isEditing}
            onDataChange={handleDataChange}
          />
        );
      case 2:
        if (dailyPlan.labelType === "THINWALL")
          return (
            <LabelCutting
              indentNumber={decodedIndentNo}
              isEditing={isEditing}
              onDataChange={handleDataChange}
            />
          );
        return (
          <LaminationReport
            indentNumber={decodedIndentNo}
            isEditing={isEditing}
            onDataChange={handleDataChange}
          />
        );

      case 3:
        if (dailyPlan.labelType === "THINWALL")
          return (
            <TravelCard
              indentNumber={decodedIndentNo}
              isEditing={isEditing}
              onDataChange={handleDataChange}
            />
          );
        return (
          <LabelCutting
            indentNumber={decodedIndentNo}
            isEditing={isEditing}
            onDataChange={handleDataChange}
          />
        );
      case 4:
        if (dailyPlan.labelType === "THINWALL") return null;
        return (
          <TravelCard
            indentNumber={decodedIndentNo}
            isEditing={isEditing}
            onDataChange={handleDataChange}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isEditing) {
      dispatch(setHasUnsavedChanges(false));
    }
  }, [isEditing]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        pb: isEditing ? "80px" : 0,
      }}
    >
      {/* Common Card */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          padding: 2,
          borderRadius: "10px",
        }}
      >
        <CommenCard
          isLoading={isLoading}
          isEditing={isEditing}
          onDataChange={handleDataChange}
        />
      </Box>

      {/* Tabs Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
          mt: 1,
          minHeight: "400px",
        }}
      >
        <TabsComponent
          tabs={tabs}
          value={selectedTab}
          onChange={handleTabChange}
        />
        <Box sx={{ padding: 1 }}>{renderTabContent()}</Box>
      </Box>

      {/* Fixed Footer for Edit Mode */}
      {isEditing && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
            padding: "16px",
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            zIndex: 1000,
          }}
        >
          {/* Cancel */}
          <ButtonComponent
            color="white"
            text="Cancel"
            variant="outlined"
            onClick={handleCancel}
            textColor="#0E0E0E"
            borderRadius="100px"
            border="1px solid #E5E5E5"
            p="14px"
            disabled={isSaving} // Disable during saving
          />

          {/* Save */}
          <ButtonComponent
            text={savingTabIndex === selectedTab ? "Saving..." : "Save"}
            variant="contained"
            onClick={handleSave}
            color="primary"
            disabled={savingTabIndex === selectedTab}
            borderRadius="100px"
            startIcon={
              savingTabIndex === selectedTab ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
            p="14px"
          />

          {/* Next */}
          {(dailyPlan.labelType === "THINWALL"
            ? selectedTab != 3
            : selectedTab != 4) && (
            <ButtonComponent
              text="Next"
              variant="contained"
              onClick={() => {
                if (hasUnsavedChanges) {
                  setNextTab(selectedTab + 1);
                  dispatch(setShowTabChangeDialog(true)); // show popup if unsaved changes
                } else {
                  dispatch(setSelectedTab(selectedTab + 1));
                }
              }}
              color="primary"
              disabled={selectedTab === tabs.length - 1}
              borderRadius="100px"
              p="14px"
            />
          )}
        </Box>
      )}

      {/* Tab Change Confirmation Dialog */}
      <Dialog
        open={showTabChangeDialog}
        onClose={handleDialogCancel}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle sx={{ pb: "6px", ml: "-12px" }}>
          Unsaved Changes
        </DialogTitle>
        <DialogContent sx={{ p: "16px", mt: "0px" }}>
          You have unsaved changes. Are you sure you want to switch tabs?
        </DialogContent>
        <DialogActions>
          <ButtonComponent
            text="Cancel"
            onClick={handleDialogCancel}
            color="white"
            textColor="#0E0E0E"
            borderRadius="100px"
            border="1px solid #E5E5E5"
            p="14px"
            disabled={isSaving} // disable cancel during saving
          />
          <ButtonComponent
            text="Continue Without Saving"
            onClick={handleDialogContinue}
            color="#0073B7"
            borderRadius="100px"
            p="14px"
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ViewDailyPlan;
