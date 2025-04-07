import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { LaminationFormData, setLaminationFormData } from "../../store/slices/masterDataSlice";

const Lamination: React.FC = () => {
  const { selectedTab,laminaionFormData } = useSelector((state: RootState) => state.masterData);
const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<LaminationFormData>({
    zone1Temp: "",
    zone2Temp: "",
    nipPressure: "",
    speed: "",
    lamiTension: "",
    rewinderTension: "",
    printedTension: "",
    printedWidth: "",
    printedThickness: "",
    printedGSM: "",
    printedDyne: "",
    laminateTension: "",
    laminateWidth: "",
    laminateThickness: "",
    laminateGSM: "",
    laminateDyne: "",
    adhesiveCode: "",
    adhesiveBrand: "",
    adhesiveRatio: "",
    hardenerCode: "",
    hardenerBrand: "",
    hardenerRatio: "",
    ethylCode: "",
    ethylBrand: "",
    ethylRatio: "",
    materialCode: "",
    materialBrand: "",
    materialRatio: "",
    viscocityRange: "",
    adhesiveGSM: ""
  });

    const handleSave = () => {
      dispatch(setLaminationFormData(formData));
    };
    useEffect(() => {
      if (laminaionFormData) {
        setFormData(laminaionFormData);

      }
    }, [laminaionFormData]);

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
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        border: "1px solid #ECECEC",
        borderRadius: "16px",
        p: 2,
        mt: 2,
      }}
    >
      {/* Printed Film Section */}
      <Grid size={{xs:12,md:6}}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography
                sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
              >
            Printed Film
          </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", fontSize: 20 }} />
        </Box>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <ReusableInput
              label="Tension (Primary)"
              value={formData.laminateTension}
              onChange={(e) => handleChange("laminateTension", e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Laminate Film Section */}
      <Grid size={{xs:12,md:6}}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography
                sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
              >
            Laminate Film
          </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", fontSize: 20 }} />
        </Box>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <ReusableInput
              label="Tension (Primary)"
              value={formData.laminateTension}
              onChange={(e) => handleChange("laminateTension", e.target.value)}
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
            { label: "Viscocity Range", key: "viscocityRange" },
            { label: "Adhesive GSM", key: "adhesiveGSM" },
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
        <MasterDataFooter selectedTab={selectedTab} handleSave={handleSave} />
      </Box>
    </Box>
  );
};

export default Lamination;
