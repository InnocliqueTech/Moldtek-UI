import { Box } from "@mui/material";
import OrderCard from "../../Components/ReUsable/OrderCard";
import TabsComponent from "../../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSelectedTab } from "../../store/slices/viewMasterDataSlice";
import ViewMasterDataDetails from "./ViewMasterDataDetails";
import ViewPrinting from "./ViewPrinting";
import ViewLamination from "./ViewLamination";
import ViewDyePrinting from "./ViewDyePrinting";
import customerImage from "../../assets/Images/customerPicture.png";
import { useNavigate } from "react-router-dom";

const mockData = [
  { label: "Unit Effectivity Number", value: "UEN-20240801" },
  { label: "Customer Name", value: "Nestlé" },
  { label: "Customer Picture", value: customerImage, isImage: true },
  { label: "Brand Name & Pack", value: "KitKat 50g Wrapper" },
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
  "Master Data - Dye Printing",
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
        <OrderCard
          data={mockData}
          onBack={handleBack}
          button1Click={() => alert("Version history")}
          button2Click={() => navigate(`/updateMasterData/${123}`)}
          button1Text="Version History"
          button2Text="Modify Master Data"
        />
      </Box>

      {/* Tabs Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <TabsComponent
          tabs={tabs}
          value={selectedTab}
          onChange={handleTabChange}
        />
        <Box sx={{ padding: 1 }}>
          {selectedTab === 0 && <ViewPrinting />}
          {selectedTab === 1 && <ViewLamination />}
          {selectedTab === 2 && <ViewDyePrinting />}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewMasterData;
