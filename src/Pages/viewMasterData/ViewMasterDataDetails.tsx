import { Box, Typography } from "@mui/material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { InfoOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import {
  setSubstrateTableData,
} from "../../store/slices/viewMasterDataSlice";



const data = [
  {
    repeat: 53,
    ups: 2783,
    tracks: 246,
    labels: 121,
  },
];

const substrateColumns = [
  { id: "field", label: "Field" },
  { id: "printing", label: "Printing Substrate" },
  { id: "lamination", label: "Lamination Substrate" },
];

const substrateData = [
  { field: "Substrate Type", printing: "PET", lamination: "ALU Foil" },
  { field: "Supplier", printing: "UFlex Ltd.", lamination: "Huhtamaki" },
  { field: "Dyne Level", printing: "42 Dynes", lamination: "38 Dynes" },
  { field: "Width (mm)", printing: "1200", lamination: "1200" },
  { field: "Thickness (microns)", printing: "12", lamination: "7" },
  { field: "Density (g/cm³)", printing: "1.37", lamination: "1.37" },
  { field: "GSM", printing: "16.4", lamination: "16.4" },
];

const ViewMasterDataDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { substrateTableData } = useSelector(
    (state: RootState) => state.viewMasterData
  );

  useEffect(() => {
    if (data.length >= 0) {
      // dispatch(setRepeatTableData(data));
    }
    if (substrateData.length >= 0) {
      dispatch(setSubstrateTableData(substrateData));
    }
  }, [dispatch, data, substrateData]);



  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Repeat & Label Metrics
        </Typography>
        {/* <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} /> */}
      </Box>
      {/* <DataTable columns={columns} data={repeatTableData} /> */}
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 1, mt: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Substrate
          </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>
        <DataTable columns={substrateColumns} data={substrateTableData} firstRow={true} />
      </Box>
    </Box>
  );
};

export default ViewMasterDataDetails;
