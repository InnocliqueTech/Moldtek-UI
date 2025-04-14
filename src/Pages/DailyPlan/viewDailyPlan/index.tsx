import React, { useEffect } from "react";
import { Box } from "@mui/material";
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
import { setAnaloxSpecifications, setDailyPlan, setInkCoatingSpecifications, setMaterialSpecification, setMountingTapeSpecifications, setPlateMountingSupervisorReport } from "../../../store/slices/viewDailyPlanSlice";
import { makeReady } from "./data";



const tabs = [
  "Make Ready",
  "Printing Report",
  "Lamination Report",
  "Label Cutting",
  " Travel Card",
];

const ViewDailyPlan: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTab } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setSelectedTab(newValue));
  };
useEffect(()=>{
dispatch(setDailyPlan(makeReady.data.dailyPlan));
dispatch(setMaterialSpecification(makeReady.data.materialSpecification));
dispatch(setMountingTapeSpecifications(makeReady.data.mountingTapeSpecifications));
dispatch(setAnaloxSpecifications(makeReady.data.analoxSpecifications));
dispatch(setInkCoatingSpecifications(makeReady.data.inkCoatingSpecifications));
dispatch(setPlateMountingSupervisorReport(makeReady.data.plateMountingSupervisorReport));
},[])

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          padding: 2,
          borderRadius: "10px",
        }}
      >
        <CommenCard/>
      </Box>

      {/* Tabs Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
          mt: 1,
          minHeight:"400px"
        }}
      >
        <TabsComponent
          tabs={tabs}
          value={selectedTab}
          onChange={handleTabChange}
        />
        <Box sx={{ padding: 1 }}>
          {selectedTab === 0 && <MakeReady />}
          {selectedTab === 1 && <PrintingReport />}
          {selectedTab === 2 && <LaminationReport />}
          {selectedTab === 3 && <LabelCutting/>}
          {selectedTab === 4 && <TravelCard/>}
        </Box>
      </Box>
    </Box>
  );
};
export default ViewDailyPlan;
