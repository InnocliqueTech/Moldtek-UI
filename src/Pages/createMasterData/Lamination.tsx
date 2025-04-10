import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { LaminationFormData, setLaminationFormData } from "../../store/slices/masterDataSlice";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import DataTable from "../../Components/ReUsable/MasterDataTable";

const Lamination: React.FC = () => {
  const { selectedTab,laminaionFormData } = useSelector((state: RootState) => state.masterData);
const dispatch = useDispatch<AppDispatch>();
const bondingMaterialColumns = [
  { id: "field", label: "Field" },
  { id: "code", label: "Code",edit:true },
  { id: "brand", label: "Brand",edit:true },
  { id: "ratio", label: "Ratio",edit:true },
];

const bondingMaterialData = [
  { field: "Adhesive", code: "", brand: "", ratio: "" },
  { field: "Hardener", code: "", brand: "", ratio: "" },
  { field: "Ethyl Acetate", code: "", brand: "", ratio: "" },
];
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
    adhesiveGSM: "",
    substrateType: "",
    supplier: "",
    dyneLevel: "",
    width: "",
    thickness: "",
    density: "",
  });

    const handleSave = () => {
      dispatch(setLaminationFormData(formData));
    };
    useEffect(() => {
      if (laminaionFormData) {
        setFormData(laminaionFormData);

      }
    }, [laminaionFormData]);

  const handleChange = (
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Array.isArray(value)
        ? value
        : typeof value === "string"
        ? value
        : value.target.value,
    }));
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
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Printed Film Tension"
                value={formData.printedTension}
                onChange={(e) => handleChange("rewinderTension", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Laminated Film Tension"
                value={formData.laminateTension}
                onChange={(e) => handleChange("rewinderTension", e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { md: "row", xs: "column" },
          mt:1.5
        }}
      >

        <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Lamination Substrate
            </Typography>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DropdownComponent
                  label="Substrate Type"
                  options={["PET"]}
                  value={formData.substrateType}
                  onChange={(value) => handleChange("substrateType", value)}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DropdownComponent
                  label="Supplier"
                  options={[
                    "U-Flex Ltd.",
                    "Huhtamaki",
                    "Huhtamaki",
                    "Gulf Pack Supplier",
                  ]}
                  value={formData.supplier}
                  onChange={(value) => handleChange("supplier", value)}
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Dyne Level"
                  value={formData.dyneLevel}
                  onChange={(e) => handleChange("dyneLevel", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Width (mm)"
                  value={formData.width}
                  onChange={(e) => handleChange("width", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Thickness"
                  value={formData.thickness}
                  onChange={(e) => handleChange("thickness", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value={formData.density}
                  onChange={(e) => handleChange("density", e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", pY: 1, mt: 1.5 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p:1
          }}
        >
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Bonding Material Specifications
          </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>
        <DataTable columns={bondingMaterialColumns} data={bondingMaterialData} tableTitle={true} />
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
            <Grid size={{xs:12,md:6}} key={key}>
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
