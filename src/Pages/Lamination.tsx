import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MasterDataFooter from "../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";

const Lamination: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.masterData);
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
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }} mt={2} p={1}>
        {" "}
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Substrate
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: "20px", height: "20px" }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              {" "}
              <Typography
                sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
              >
                Printing Substrate
              </Typography>
              <InfoOutline
                sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
              />
            </Box>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Dyne Level"
                  value="1200"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Width (mm)"
                  value="12"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Thickness (micrones)"
                  value="16.4"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value="16.4"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput label="GSM" value="16.4" onChange={() => {}} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              {" "}
              <Typography
                sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
              >
                Lamination Substrate
              </Typography>
              <InfoOutline
                sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
              />
            </Box>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Dyne Level"
                  value="1200"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Width (mm)"
                  value="12"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Thickness (micrones)"
                  value="16.4"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value="16.4"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput label="GSM" value="16.4" onChange={() => {}} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }} mt={2} p={1}>
        {" "}
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Substrate
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: "20px", height: "20px" }} />
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {" "}
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Additional Information
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Repeat" value="53" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="UPs" value="273" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Tracks" value="246" onChange={() => {}} />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {" "}
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Additional Information
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Repeat" value="53" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="UPs" value="273" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Tracks" value="246" onChange={() => {}} />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {" "}
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Additional Information
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Repeat" value="53" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="UPs" value="273" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Tracks" value="246" onChange={() => {}} />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {" "}
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Additional Information
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Repeat" value="53" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="UPs" value="273" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Tracks" value="246" onChange={() => {}} />
          </Grid>
        </Grid>
      </Box>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};
export default Lamination;
