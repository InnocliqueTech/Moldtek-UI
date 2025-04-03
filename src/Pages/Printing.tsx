import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MasterDataFooter from "../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import DataTable from "../Components/ReUsable/MasterDataTable";

const Printing: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.masterData);

  const columns = [
    { id: "stationNo", label: "Station No" },
    { id: "colorPantone", label: "Color Pantone" },
    { id: "lfValue", label: "LF Value" },
    { id: "inkSupplier", label: "Ink Supplier", isDropdown: true, options: ["Siegwerk", "Flint Group"] },
    { id: "lpcm", label: "LPCM" },
    { id: "volume", label: "Volume" },
    { id: "uvLed", label: "UV/LED", isDropdown: true, options: ["LED", "UV"] },
  ];
  
  const data = [
    { stationNo: 1, colorPantone: "Pantone Red 032C", lfValue: 65, inkSupplier: "Siegwerk", lpcm: 65, volume: "480ml", uvLed: "LED" },
    { stationNo: 2, colorPantone: "Pantone Black C", lfValue: 65, inkSupplier: "Flint Group", lpcm: 65, volume: "550ml", uvLed: "UV" },
    { stationNo: 3, colorPantone: "Pantone Yellow 012C", lfValue: 60, inkSupplier: "Flint Group", lpcm: 60, volume: "480ml", uvLed: "LED" },
  ];

  return (
    <Box sx={{ borderRadius: "0px " }}>
       <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {" "}
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Lamination Production Entry
            </Typography>
            <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            />
          </Box>
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-1 Temp(c)"
                value="20240401"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-2 Temp(c)"
                value="Nestlé"
                onChange={() => {}}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Nip Pressure (bar)"
                value="KitKat 50g Wrapper"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value="KK-50G-123"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value="KK-50G-123"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value="KK-50G-123"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value="KK-50G-123"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value="KK-50G-123"
                onChange={() => {}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2,mt:2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
  <Typography sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}>
    Lamination Production Entry
  </Typography>
  <InfoOutline sx={{ color: "#9F9F9F", width: "20px", height: "20px" }} />
</Box>
<Box sx={{mt:2}}>
<DataTable columns={columns} data={data} />
</Box>
        </Grid>
      </Box>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};
export default Printing;
