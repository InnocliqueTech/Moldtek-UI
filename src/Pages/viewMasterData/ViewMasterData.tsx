import { Box } from "@mui/material";
import OrderCard from "../../Components/ReUsable/OrderCard";
import TabsComponent from "../../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setDyeCuttingSettings,
  setLaminatingSubstrate,
  setLaminationAdhesiveDetails,
  setLaminationSettings,
  setPrintingInkStationData,
  setPrintingMachineSettingsData,
  setPrintingSubstrate,
  setSelectedTab,
  setViewMasterDataDetails,
} from "../../store/slices/viewMasterDataSlice";
import ViewPrinting from "./ViewPrinting";
import ViewLamination from "./ViewLamination";
import ViewDyeCutting from "./ViewDyeCutting";
import { useEffect } from "react";
import { mockData } from "./data";


const tabs = [
  "Master Data - Printing",
  "Master Data - Lamination",
  "Master Data - Dye Cutting",
];

const ViewMasterData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTab } = useSelector(
    (state: RootState) => state.viewMasterData
  );
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
        height:
          selectedTab !== 2
            ? {
                xl: "136vh",
                lg: "144vh",
                md: "152vh",
                sm: "310vh",
                xs: "400vh",
              }
            : { xl: "auto", lg: "auto", md: "auto", sm: "auto", xs: "auto" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Static top section (OrderCard) */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: "10px",
          mb: 1,
        }}
      >
        <OrderCard />
      </Box>

      {/* Scrollable section */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          backgroundColor: "white",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Sticky Tabs */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <TabsComponent
            tabs={tabs}
            value={selectedTab}
            onChange={handleTabChange}
          />
        </Box>

        {/* Tab Content */}
        <Box sx={{ padding: 2 }}>
          {selectedTab === 0 && <ViewPrinting />}
          {selectedTab === 1 && <ViewLamination />}
          {selectedTab === 2 && <ViewDyeCutting />}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewMasterData;
