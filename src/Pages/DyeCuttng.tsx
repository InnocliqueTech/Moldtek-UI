import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MasterDataFooter from "../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../Components/ReUsable/TextField";
import TextArea from "../Components/ReUsable/TextArea";
import DropdownComponent from "../Components/ReUsable/Dropdown";
import { InfoOutline } from "@mui/icons-material";

const DyeCutting: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.masterData);
  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
      <Grid size={{ xs: 12, md: 6 }} >
         <Box sx={{ display: "flex", gap: 1 }}>
                {" "}
                <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Printing Substrate
            </Typography>
            <InfoOutline sx={{ color: "#9F9F9F", width: "20px", height: "20px" }} />
            </Box>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Dye Cut Machine Type"
              value="20240401"
              onChange={() => {}}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Machine"
              value="Nestlé"
              onChange={() => {}}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Dye Code"
              value="KitKat 50g Wrapper"
              onChange={() => {}}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Run Speed (m/min)"
              value="KK-50G-123"
              onChange={() => {}}
            />
          </Grid>
        </Grid>
        </Grid>
      </Box>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};
export default DyeCutting;
