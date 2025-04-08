import React from "react";
import { Box } from "@mui/material";
import TabsComponent from "../../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/index";
import { setSelectedTab } from "../../store/slices/masterDataSlice";
import MasterDataDetails from "./MasterDataDetails";
import DyePrinting from "./DyePrinting";
import Printing from "./Printing";
import Lamination from "./Lamination";

const tabs = [
  "Master Data Details",
  "Master Data - Printing",
  "Master Data - Lamination",
  "Master Data - Dye Printing",
];

const CreateMasterData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTab } = useSelector((state: RootState) => state.masterData);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setSelectedTab(newValue));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <TabsComponent
          tabs={tabs}
          value={selectedTab}
          onChange={handleTabChange}
        />
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: "0px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          {selectedTab === 0 && <MasterDataDetails />}
          {selectedTab === 1 && <Printing />}
          {selectedTab === 2 && <Lamination />}
          {selectedTab === 3 && <DyePrinting />}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateMasterData;
