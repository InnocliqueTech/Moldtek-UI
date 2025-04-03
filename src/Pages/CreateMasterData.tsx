import React from "react";
import { Box } from "@mui/material";
import TabsComponent from "../Components/ReUsable/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { setSelectedTab } from "../store/slices/masterDataSlice";
import MasterDataDetails from "./MasterDataDetails";
import DyeCutting from "./DyeCuttng";

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
          {selectedTab === 1 && <Box>Printing Data</Box>}
          {selectedTab === 2 && <Box>Lamination Data</Box>}
          {selectedTab === 3 && <DyeCutting/>}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateMasterData;
