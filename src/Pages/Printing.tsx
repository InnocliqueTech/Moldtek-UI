import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MasterDataFooter from "../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import DataTable from "../Components/ReUsable/MasterDataTable";
import DropdownComponent from "../Components/ReUsable/Dropdown";
import { useState } from "react";

const Printing: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.masterData);

  const columns = [
    { id: "stationNo", label: "Station No" },
    { id: "colorPantone", label: "Color Pantone" },
    { id: "lfValue", label: "LF Value" },
    {
      id: "inkSupplier",
      label: "Ink Supplier",
      isDropdown: true,
      options: ["Siegwerk", "Flint Group"],
    },
    { id: "lpcm", label: "LPCM" },
    { id: "volume", label: "Volume" },
    { id: "uvLed", label: "UV/LED", isDropdown: true, options: ["LED", "UV"] },
  ];

  const data = [
    {
      stationNo: 1,
      colorPantone: "Pantone Red 032C",
      lfValue: 65,
      inkSupplier: "Siegwerk",
      lpcm: 65,
      volume: "480ml",
      uvLed: "LED",
    },
    {
      stationNo: 2,
      colorPantone: "Pantone Black C",
      lfValue: 65,
      inkSupplier: "Flint Group",
      lpcm: 65,
      volume: "550ml",
      uvLed: "UV",
    },
    {
      stationNo: 3,
      colorPantone: "Pantone Yellow 012C",
      lfValue: 60,
      inkSupplier: "Flint Group",
      lpcm: 60,
      volume: "480ml",
      uvLed: "LED",
    },
    {
      stationNo: 1,
      colorPantone: "Pantone Red 032C",
      lfValue: 65,
      inkSupplier: "Siegwerk",
      lpcm: 65,
      volume: "480ml",
      uvLed: "LED",
    },
    {
      stationNo: 1,
      colorPantone: "Pantone Red 032C",
      lfValue: 65,
      inkSupplier: "Siegwerk",
      lpcm: 65,
      volume: "480ml",
      uvLed: "LED",
    },
    {
      stationNo: 1,
      colorPantone: "Pantone Red 032C",
      lfValue: 65,
      inkSupplier: "Siegwerk",
      lpcm: 65,
      volume: "480ml",
      uvLed: "LED",
    },
    {
      stationNo: 1,
      colorPantone: "Pantone Red 032C",
      lfValue: 65,
      inkSupplier: "Siegwerk",
      lpcm: 65,
      volume: "480ml",
      uvLed: "LED",
    },
    {
      stationNo: 1,
      colorPantone: "Pantone Red 032C",
      lfValue: 65,
      inkSupplier: "Siegwerk",
      lpcm: 65,
      volume: "480ml",
      uvLed: "LED",
    },
    {
      stationNo: 1,
      colorPantone: "Pantone Red 032C",
      lfValue: 65,
      inkSupplier: "Siegwerk",
      lpcm: 65,
      volume: "480ml",
      uvLed: "LED",
    },
    {
      stationNo: 1,
      colorPantone: "Pantone Red 032C",
      lfValue: 65,
      inkSupplier: "Siegwerk",
      lpcm: 65,
      volume: "480ml",
      uvLed: "LED",
    },
    {
      stationNo: 1,
      colorPantone: "Pantone Red 032C",
      lfValue: 65,
      inkSupplier: "Siegwerk",
      lpcm: 65,
      volume: "480ml",
      uvLed: "LED",
    },
  ];

  const [formValues, setFormValues] = useState({
    mountingType: "20240401",
    cylinderTeeth: "500",
    tension: "31",
    unwinder: "457",
    infeed: "54",
    outfeed: "54",
    rewinder: "456",
    staticCharge: "54",
    formatCorrect: "54",
  });

  const handleChange = (
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    setFormValues((prev) => ({
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
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Machine Settings
            </Typography>
            <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            />
          </Box>
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <DropdownComponent
                label="Mounting Type"
                value={formValues.mountingType}
                onChange={(value) =>  handleChange("mountingType", value)}
                options={["Standard", "Actual"]}
                isMultiSelect={false}
                checkbox={false}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Cylinder Teeth"
                value={formValues.cylinderTeeth}
                onChange={(e) => handleChange("cylinderTeeth", e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Tension"
                value={formValues.tension}
                onChange={(e) => handleChange("tension", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Unwinder"
                value={formValues.unwinder}
                onChange={(e) => handleChange("unwinder", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Infeed"
                value={formValues.infeed}
                onChange={(e) => handleChange("infeed", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Outfeed"
                value={formValues.outfeed}
                onChange={(e) => handleChange("outfeed", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Rewinder"
                value={formValues.rewinder}
                onChange={(e) => handleChange("rewinder", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Static Charge"
                value={formValues.staticCharge}
                onChange={(e) => handleChange("staticCharge", e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Format Correct"
                value={formValues.formatCorrect}
                onChange={(e) => handleChange("formatCorrect", e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Station-wise Metric
            </Typography>
            <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
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
