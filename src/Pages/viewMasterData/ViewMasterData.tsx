import { Box } from "@mui/material";
import OrderCard from "../../Components/ReUsable/OrderCard";
import TabsComponent from "../../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSelectedTab } from "../../store/slices/viewMasterDataSlice";
import ViewPrinting from "./ViewPrinting";
import ViewLamination from "./ViewLamination";
import ViewDyePrinting from "./ViewDyePrinting";
import customerImage from "../../assets/Images/customerPicture.png";
import { useNavigate } from "react-router-dom";

const mockData = [
  { label: "Unit Effectivity Number", value: "UEN-20240801" },
  { label: "Customer Name", value: "Nestlé" },
  { label: "Customer Picture", value: customerImage, isImage: true },
  { label: "ITEM Code", value: "KK-50G-123" },
  {
    label: "Brand Name & Pack Description",
    value:
      "0 LTR_AP_DTS_L.WT <APEX ULTIMA PROTEK TOPCOAT> [CODE:P34779J] (IML) ASIAN PAINTS",
  },
  { label: "Jar/Cap", value: "N/A (For flexible packaging)" },
  { label: "Structure", value: "PET" },
];

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
  const navigate = useNavigate();
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setSelectedTab(newValue));
  };

  const handleBack = () => {
    navigate("/masterData");
  };

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
            : { xl:'auto',lg: "auto", md: "auto",sm:"auto",xs:'auto' },
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
        <OrderCard
          data={mockData}
          onBack={handleBack}
          button1Click={() => alert("Version history")}
          button2Click={() => navigate(`/updateMasterData/${123}`)}
          button1Text="Version History"
          button2Text="Modify Master Data"
        />
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
          {selectedTab === 2 && <ViewDyePrinting />}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewMasterData;
