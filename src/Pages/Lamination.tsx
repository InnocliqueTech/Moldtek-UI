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
              Zone Temperature & Pressing Conditions
            </Typography>
            <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            />
          </Box>
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-1 Temp (°C)"
                value="110"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-2 Temp (°C)"
                value="120"
                onChange={() => {}}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Nip Pressure (bar)"
                value="3.5"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value="80"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Lami Set Tension"
                value="2.5 n/mm"
                onChange={() => {}}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Rewinder Tension"
                value="--"
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
         Lamination Specifications
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
                Printed Film
              </Typography>
              <InfoOutline
                sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
              />
            </Box>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Tension (Primary)"
                  value="2.5 N/mm"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Width (mm)"
                  value="1200"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Thickness (micrones)"
                  value="12"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput label="GSM" value="16.4" onChange={() => {}} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Dyne Level"
                  value="42 Dynes"
                  onChange={() => {}}
                />
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
               Laminate Film
              </Typography>
              <InfoOutline
                sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
              />
            </Box>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Tension (Primary)"
                  value="2.5 N/mm"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Width (mm)"
                  value="1200"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Thickness (micrones)"
                  value="12"
                  onChange={() => {}}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput label="GSM" value="16.4" onChange={() => {}} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Dyne Level"
                  value="42 Dynes"
                  onChange={() => {}}
                />
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
          Bonding Material Specifications
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
            Adhesive
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Code" value="53" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Brand" value="273" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Ratio" value="246" onChange={() => {}} />
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
           Hardener
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Code" value="53" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Brand" value="273" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Ratio" value="246" onChange={() => {}} />
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
            Ethyl Acetate
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Code" value="53" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Brand" value="273" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Ratio" value="246" onChange={() => {}} />
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
           Material Details
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Code" value="53" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Brand" value="273" onChange={() => {}} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput label="Ratio" value="246" onChange={() => {}} />
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
