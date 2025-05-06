import { Box, Typography } from "@mui/material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { InfoOutline } from "@mui/icons-material";
import {  useSelector } from "react-redux";
import {  RootState } from "../../store";

const dyePriningColumns = [
  { id: "machine_type", label: "Dye Cutting Machine Type" },
  { id: "machine_name", label: "Machine" },
  { id: "dye_code", label: "Dye Code" },
  { id: "run_speed", label: "Run Speed" },
];



const ViewDyeCutting: React.FC = () => {
  const { dyeCuttingSettings } = useSelector(
    (state: RootState) => state.viewMasterData
  );



  return (
    <Box sx={{ borderRadius: "0px "}}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Dye Cutting Parameters
        </Typography>
        {/* <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} /> */}
      </Box>
      <DataTable columns={dyePriningColumns} data={dyeCuttingSettings?[dyeCuttingSettings]:[]} />
    </Box>
  );
};

export default ViewDyeCutting;
