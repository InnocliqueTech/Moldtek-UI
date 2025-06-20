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
  setSelectedTabView,
  setViewMasterDataDetails,
} from "../../store/slices/viewMasterDataSlice";
import ViewPrinting from "./ViewPrinting";
import ViewLamination from "./ViewLamination";
import ViewDyeCutting from "./ViewDyeCutting";
import { useEffect, useRef } from "react";
import { useViewMasterDataQuery } from "../../store/apis/masterDataApis";
import Loader from "../../Loader";

const ViewMasterData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTabView } = useSelector(
    (state: RootState) => state.viewMasterData
  );

  const contentRef = useRef<HTMLDivElement>(null);
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
    dispatch(setSelectedTabView(newValue));

    // Also scroll internal content (like the tab content area)
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const UnitEffectiveNumber = localStorage.getItem("UEN");
  const VersionNumber = localStorage.getItem("VersionNumber");
  const selectedJar = localStorage.getItem("JARCAP");
      const jar = localStorage.getItem("selectedJar");
  let jarValue: any;
  if (jar) {
    jarValue = jar;
  }
  const versionNumber = VersionNumber
    ? VersionNumber.replace(/[^\d]/g, "")
    : undefined;
  const path = location.pathname.includes("/versionDetails");
  const { data, isLoading } = useViewMasterDataQuery({
    ueNumber: path ? UnitEffectiveNumber : selectedUEN,
    versionNo: path ? versionNumber : versionNo,
 jarCap: path ?selectedJar:jarValue,

  });

  const tabs = [
    "Master Data - Printing",
    ...(data?.data?.masterDataDetails &&
    data.data.masterDataDetails?.label_type !== "THINWALL" &&
    data.data.masterDataDetails?.segment !== "TW"
      ? ["Master Data - Lamination"]
      : []),
    "Master Data - Dye Cutting",
  ];

  useEffect(() => {
    if (data) {
      dispatch(setViewMasterDataDetails(data?.data.masterDataDetails));
      dispatch(
        setPrintingMachineSettingsData(
          data?.data.masterDataPrinting.printingDetails
        )
      );
      dispatch(
        setPrintingSubstrate(
          data?.data.masterDataPrinting.printingSubstrateSettings
        )
      );
      dispatch(
        setPrintingInkStationData(
          data?.data.masterDataPrinting.stationWiseMetrics
        )
      );
      dispatch(setDyeCuttingSettings(data?.data.masterDataDyeCutting));
      dispatch(
        setLaminationSettings(
          data?.data.masterDataLamination.laminationConditions
        )
      );
      dispatch(
        setLaminatingSubstrate(
          data?.data.masterDataLamination.laminationSubstrate
        )
      );
      dispatch(
        setLaminationAdhesiveDetails(
          data?.data.masterDataLamination.bondingMaterials
        )
      );
    }
  }, [data, dispatch]);

  return (
    <Box
      sx={{
        height:
          (data?.data.masterDataDetails.label_type !== "THINWALL" &&
            data?.data.masterDataDetails.label_type !== "TW" &&
            selectedTabView !== 2) ||
          ((data?.data.masterDataDetails.label_type === "THINWALL" ||
            data?.data.masterDataDetails.label_type === "TW") &&
            selectedTabView !== 1)
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
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
            ref={contentRef}
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
                value={selectedTabView}
                onChange={handleTabChange}
              />
            </Box>

            <Box sx={{ padding: 2 }}>
              {selectedTabView === 0 && <ViewPrinting />}
              {selectedTabView === 1 &&
              !(
                data?.data.masterDataDetails.label_type === "THINWALL" ||
                data?.data.masterDataDetails.segment === "TW"
              ) ? (
                <ViewLamination />
              ) : (
                selectedTabView !== 0 && <ViewDyeCutting />
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ViewMasterData;
