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
import { useViewMasterDataQuery } from "../../store/services/api";
import Loader from "../../Loader";

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

  const UEN = localStorage.getItem("selectedUEN");
  let selectedUEN: any;
  if (UEN) {
    selectedUEN = UEN;
  }
  const version = localStorage.getItem("selectedVersionNo");
  let versionNo: any;
  if (version) {
    versionNo = version;
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setSelectedTab(newValue));
  };

  const { data, isLoading } = useViewMasterDataQuery({
    ueNumber: selectedUEN,
    versionNo: versionNo,
  });

  useEffect(() => {
    if (data) {
      dispatch(setViewMasterDataDetails(data?.data.masterDataDetails));
      dispatch(setPrintingMachineSettingsData(data?.data.masterDataPrinting.printingDetails));
      dispatch(setPrintingSubstrate(data?.data.masterDataPrinting.printingSubstrateSettings));
      dispatch(setPrintingInkStationData(data?.data.masterDataPrinting.stationWiseMetrics));
      dispatch(setDyeCuttingSettings(data?.data.masterDataDyeCutting));
      dispatch(setLaminationSettings(data?.data.masterDataLamination.laminationConditions));
      dispatch(setLaminatingSubstrate(data?.data.masterDataLamination.laminationSubstrate));
      dispatch(setLaminationAdhesiveDetails(data?.data.masterDataLamination.bondingMaterials));
    }
  }, [data, dispatch]);

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
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Loader />
        </Box>
      ) : (
        <>
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

            <Box sx={{ padding: 2 }}>
              {selectedTab === 0 && <ViewPrinting />}
              {selectedTab === 1 && <ViewLamination />}
              {selectedTab === 2 && <ViewDyeCutting />}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ViewMasterData;
