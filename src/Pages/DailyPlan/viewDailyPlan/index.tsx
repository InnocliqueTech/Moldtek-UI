import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button,IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
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
import { setAnaloxSpecifications, setDailyPlan, setInkCoatingSpecifications, setMaterialSpecification, setMountingTapeSpecifications, setPlateMountingSupervisorReport,
setIsEditing
 } from "../../../store/slices/viewDailyPlanSlice";
import { useGetMakeReadyDetailsQuery } from "../../../store/services/api";
import { useSaveLabelCuttingDetailsMutation } from "../../../store/services/api";




const tabs = [
  "Make Ready",
  "Printing Report",
  "Lamination Report",
  "Label Cutting",
  " Travel Card",
];

const ViewDailyPlan: React.FC = () => {
  const { indentNo } = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [nextTab, setNextTab] = useState<number | null>(null);
  const [showTabChangeDialog, setShowTabChangeDialog] = useState(false);
  const [saveLabelCuttingDetails, { isLoading:submitDailyPlanLoading, isSuccess, isError }] =
    useSaveLabelCuttingDetailsMutation();
  let unitEffectiveNumberDaily: number | undefined;

  const uen = localStorage.getItem('unitEffectiveNumberDaily');
  if (uen !== null) {
    unitEffectiveNumberDaily = Number(uen);
  }
  
  const decodedIndentNo = decodeURIComponent(indentNo || "");
  const {
    data: makeReady,
    isLoading,
    // isError,
    // error,
  } = useGetMakeReadyDetailsQuery(decodedIndentNo);


  const dispatch = useDispatch<AppDispatch>();
  const { selectedTab } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const {updateDailyPlanPayload,updateCommonCard,isEditing} = useSelector((state:RootState)=>state.viewDailyPlan)

  // Initialize data when loaded
  useEffect(() => {
    if (makeReady) {
      dispatch(setDailyPlan(makeReady.data.dailyPlan));
      dispatch(setMaterialSpecification(makeReady.data.materialSpecification));
      dispatch(setMountingTapeSpecifications(makeReady.data.mountingTapeSpecifications));
      dispatch(setAnaloxSpecifications(makeReady.data.analoxSpecifications));
      dispatch(setInkCoatingSpecifications(makeReady.data.inkCoatingSpecifications));
      dispatch(setPlateMountingSupervisorReport(makeReady.data.plateMountingSupervisorReport));
    }
  }, [makeReady, dispatch]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (hasUnsavedChanges) {
      setNextTab(newValue);
      setShowTabChangeDialog(true);
    } else {
      dispatch(setSelectedTab(newValue));
    }
  };


  const handleSave = async() => {
    await saveLabelCuttingDetails({indentNumber:decodedIndentNo,...updateDailyPlanPayload,...updateCommonCard}).unwrap();
    // Here you would implement your save logic
    // For now, we'll just exit edit mode
    dispatch(setIsEditing(false));
    setHasUnsavedChanges(false);
  };

  const handleCancel = () => {
    dispatch(setIsEditing(false));
    setHasUnsavedChanges(false);
    // Here you would also reset any unsaved changes
  };

  const handleDataChange = () => {
    setHasUnsavedChanges(true);
  };

  const handleDialogContinue = () => {
    setShowTabChangeDialog(false);
    if (nextTab !== null) {
      dispatch(setSelectedTab(nextTab));
      setNextTab(null);
    }
    setHasUnsavedChanges(false);
  };

  const handleDialogCancel = () => {
    setShowTabChangeDialog(false);
    setNextTab(null);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <MakeReady loading={isLoading} isEditing={isEditing} onDataChange={handleDataChange} />;
      case 1:
        return <PrintingReport indentNO={decodedIndentNo} isEditing={isEditing} onDataChange={handleDataChange} />;
      case 2:
        return <LaminationReport indentNumber={decodedIndentNo} isEditing={isEditing} onDataChange={handleDataChange} />;
      case 3:
        return <LabelCutting indentNumber={decodedIndentNo} isEditing={isEditing} onDataChange={handleDataChange} />;
      case 4:
        return <TravelCard indentNumber={decodedIndentNo} isEditing={isEditing} onDataChange={handleDataChange} />;
      default:
        return null;
    }
  };

  useEffect(()=>{
    if(isEditing){
      setHasUnsavedChanges(false)
    }
  },[isEditing])

  return (
    <Box sx={{ 
      width: "100%", 
      display: "flex", 
      flexDirection: "column", 
      gap: 1,
      pb: isEditing ? '80px' : 0 // Add padding for fixed footer
    }}>

      {/* Common Card */}
      <Box sx={{
        width: "100%",
        backgroundColor: "white",
        padding: 2,
        borderRadius: "10px",
      }}>
        <CommenCard 
          isLoading={isLoading} 
          isEditing={isEditing}
          onDataChange={handleDataChange}
        />
      </Box>

      {/* Tabs Section */}
      <Box sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
        overflow: "hidden",
        mt: 1,
        minHeight: "400px"
      }}>
        <TabsComponent
          tabs={tabs}
          value={selectedTab}
          onChange={handleTabChange}
          // disabled={isEditing && hasUnsavedChanges}
        />
        <Box sx={{ padding: 1 }}>
          {renderTabContent()}
        </Box>
      </Box>

      {/* Fixed Footer for Edit Mode */}
      {isEditing && (
        <Box sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
          padding: '16px',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 1000
        }}>
          <Button 
            variant="outlined" 
            onClick={handleCancel}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSave}
            color="primary"
          >
            Save & Next
          </Button>
        </Box>
      )}

      {/* Tab Change Confirmation Dialog */}
      <Dialog
        open={showTabChangeDialog}
        onClose={handleDialogCancel}
      >
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          You have unsaved changes. Are you sure you want to switch tabs?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCancel}>Cancel</Button>
          <Button onClick={handleDialogContinue} color="primary">
            Continue Without Saving
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ViewDailyPlan;