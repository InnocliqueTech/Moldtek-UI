import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MasterDataFooter from "../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useState } from "react";

const Lamination: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.masterData);

  const [formData, setFormData] = useState({
    zone1Temp: "110",
    zone2Temp: "120",
    nipPressure: "3.5",
    speed: "80",
    lamiTension: "2.5 n/mm",
    rewinderTension: "--",
    printedTension: "2.5 N/mm",
    printedWidth: "1200",
    printedThickness: "12",
    printedGSM: "16.4",
    printedDyne: "42 Dynes",
    laminateTension: "2.5 N/mm",
    laminateWidth: "1200",
    laminateThickness: "12",
    laminateGSM: "16.4",
    laminateDyne: "42 Dynes",
    adhesiveCode: "53",
    adhesiveBrand: "273",
    adhesiveRatio: "246",
    hardenerCode: "53",
    hardenerBrand: "273",
    hardenerRatio: "246",
    ethylCode: "53",
    ethylBrand: "273",
    ethylRatio: "246",
    materialCode: "53",
    materialBrand: "273",
    materialRatio: "246",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}>
              Zone Temperature & Pressing Conditions
            </Typography>
            <InfoOutline sx={{ color: "#9F9F9F", width: "20px", height: "20px" }} />
          </Box>
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-1 Temp (°C)"
                value={formData.zone1Temp}
                onChange={(e) => handleChange("zone1Temp", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-2 Temp (°C)"
                value={formData.zone2Temp}
                onChange={(e) => handleChange("zone2Temp", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Nip Pressure (bar)"
                value={formData.nipPressure}
                onChange={(e) => handleChange("nipPressure", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value={formData.speed}
                onChange={(e) => handleChange("speed", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Lami Set Tension"
                value={formData.lamiTension}
                onChange={(e) => handleChange("lamiTension", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Rewinder Tension"
                value={formData.rewinderTension}
                onChange={(e) => handleChange("rewinderTension", e.target.value)}
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
          {[
            { label: "Tension (Primary)", key: "laminateTension" },
            { label: "Width (mm)", key: "laminateWidth" },
            { label: "Thickness (micrones)", key: "laminateThickness" },
            { label: "GSM", key: "laminateGSM" },
            { label: "Dyne Level", key: "laminateDyne" },
          ].map(({ label, key }) => (
            <Grid size={{xs:12,md:6}} key={key}>
              <ReusableInput
                label={label}
                value={formData[key as keyof typeof formData]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </Grid>
          ))}
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
          {[
            { label: "Tension (Primary)", key: "laminateTension" },
            { label: "Width (mm)", key: "laminateWidth" },
            { label: "Thickness (micrones)", key: "laminateThickness" },
            { label: "GSM", key: "laminateGSM" },
            { label: "Dyne Level", key: "laminateDyne" },
          ].map(({ label, key }) => (
            <Grid size={{xs:12,md:6}} key={key}>
              <ReusableInput
                label={label}
                value={formData[key as keyof typeof formData]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </Grid>
          ))}
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
          {[
            { label: "Code", key: "adhesiveCode" },
            { label: "Brand", key: "adhesiveBrand" },
            { label: "Ratio", key: "adhesiveRatio" },
          ].map(({ label, key }) => (
            <Grid size={{xs:12,md:4}} key={key}>
              <ReusableInput
                label={label}
                value={formData[key as keyof typeof formData]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </Grid>
          ))}
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
          {[
            { label: "Code", key: "adhesiveCode" },
            { label: "Brand", key: "adhesiveBrand" },
            { label: "Ratio", key: "adhesiveRatio" },
          ].map(({ label, key }) => (
            <Grid size={{xs:12,md:4}} key={key}>
              <ReusableInput
                label={label}
                value={formData[key as keyof typeof formData]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </Grid>
          ))}
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
          {[
            { label: "Code", key: "adhesiveCode" },
            { label: "Brand", key: "adhesiveBrand" },
            { label: "Ratio", key: "adhesiveRatio" },
          ].map(({ label, key }) => (
            <Grid size={{xs:12,md:4}} key={key}>
              <ReusableInput
                label={label}
                value={formData[key as keyof typeof formData]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </Grid>
          ))}
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
          {[
            { label: "Code", key: "adhesiveCode" },
            { label: "Brand", key: "adhesiveBrand" },
            { label: "Ratio", key: "adhesiveRatio" },
          ].map(({ label, key }) => (
            <Grid size={{xs:12,md:4}} key={key}>
              <ReusableInput
                label={label}
                value={formData[key as keyof typeof formData]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};

export default Lamination;
