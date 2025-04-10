import { Box, Typography } from "@mui/material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { InfoOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { setDyePrintingSettings } from "../../store/slices/viewMasterDataSlice";

const dyePriningColumns = [
  { id: "dyeCutMachineType", label: "Dye Cut Machine Type" },
  { id: "machine", label: "Machine" },
  { id: "dyeCode", label: "Dye Code" },
  { id: "runSpeed", label: "Run Speed" },
];

const dyePrintingData = [
  {
    dyeCutMachineType: "Rotary",
    machine: "DC-500",
    dyeCode: "DYE-XYZ",
    runSpeed: "120 m/min",
  },
];

const ViewDyePrinting: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dyePrintingSettings } = useSelector(
    (state: RootState) => state.viewMasterData
  );

  useEffect(() => {
    if (dyePrintingData.length >= 0) {
      dispatch(setDyePrintingSettings(dyePrintingData));
    }
  }, [dispatch, dyePrintingData]);

  return (
    <Box sx={{ borderRadius: "0px "}}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Dye Cutting Parameters
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      <DataTable columns={dyePriningColumns} data={dyePrintingSettings} />
    </Box>
  );
};

export default ViewDyePrinting;
