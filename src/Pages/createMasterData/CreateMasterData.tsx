import React, { useEffect } from "react";
import { Box } from "@mui/material";
import TabsComponent from "../../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/index";
import { setSelectedTab } from "../../store/slices/masterDataSlice";
import MasterDataDetails from "./MasterDataDetails";
import DyeCutting from "./DyeCutting";
import Printing from "./Printing";
import Lamination from "./Lamination";
import { mockData } from "./data";
import { setDyeCuttingSettings, setLaminatingSubstrate, setLaminationAdhesiveDetails, setLaminationSettings, setPrintingInkStationData, setPrintingMachineSettingsData, setPrintingSubstrate, setViewMasterDataDetails } from "../../store/slices/viewMasterDataSlice";

const tabs = [
  "Master Data Details",
  "Master Data - Printing",
  "Master Data - Lamination",
  "Master Data - Dye Cutting",
];

const CreateMasterData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTab } = useSelector((state: RootState) => state.masterData);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setSelectedTab(newValue));
  };
    useEffect(() => {
      dispatch(setViewMasterDataDetails(mockData.masterDataDetails));
      dispatch(
        setPrintingMachineSettingsData(
          mockData.masterDataPrinting.printingDetails
        )
      );
      dispatch(
        setPrintingSubstrate(
          mockData.masterDataPrinting.printingSubstrateSettings
        )
      );
      dispatch(
        setPrintingInkStationData(mockData.masterDataPrinting.stationWiseMetrics)
      );
      dispatch(setDyeCuttingSettings(mockData.masterDataDyeCutting));
      dispatch(setLaminationSettings(mockData.masterDataLamination.laminationConditions));
      dispatch(setLaminatingSubstrate(mockData.masterDataLamination.laminationSubstrate));
      dispatch(setLaminationAdhesiveDetails(mockData.masterDataLamination.bondingMaterials))
    }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: selectedTab !== 3 ? "100vh" : "auto", // or 100% if wrapped by a parent with set height
        width: "100%",
      }}
    >
      {/* Fixed Tabs */}
      <Box
        sx={{
          position: "sticky",
          top: {
            xs: "96.5px", // for small screens and below
            sm: "52.5px",
            md: "50.9px", // for medium screens and up
          },
          zIndex: 100,
          backgroundColor: "white",
        }}
      >
        <TabsComponent
          tabs={tabs}
          value={selectedTab}
          onChange={handleTabChange}
        />
      </Box>

      {/* Scrollable content */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: "white",
          padding: 2,
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        {selectedTab === 0 && <MasterDataDetails />}
        {selectedTab === 1 && <Printing />}
        {selectedTab === 2 && <Lamination />}
        {selectedTab === 3 && <DyeCutting />}
      </Box>
    </Box>
  );
};

export default CreateMasterData;
