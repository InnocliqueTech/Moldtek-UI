import { Box, Typography } from "@mui/material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { InfoOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import {
  setPrintingInkStationData,
  setPrintingMachineSettingsData,
} from "../../store/slices/viewMasterDataSlice";

const machineSettingColumns = [
  { id: "mountingType", label: "Mounting Type" },
  { id: "cylinderTeeth", label: "Cylinder Teeth" },
  { id: "tension", label: "Tension" },
  { id: "unwinder", label: "Unwinder" },
  { id: "infeed", label: "Infeed" },
  { id: "outfeed", label: "Outfeed" },
  { id: "rewinder", label: "Rewinder" },
  { id: "staticCharge", label: "Static Charge" },
  { id: "formatCorrect", label: "Format Correct" },
];

const printingSubstarteColumns= [
    { id: "substrateType", label: "Substrate Type" },
    { id: "supplier", label: "Supplier" },
    { id: "dyneLevel", label: "Dyne Level" },
    { id: "width", label: "Width (mm)" },
    { id: "thickness", label: "Thickness (microns)" },
    { id: "density", label: "Density (g/cm³)" },
    { id: "gsm", label: "RGSM" },
  ];


  const printingSubstrateData = [
    {
      substrateType: "PET",
      supplier: "UFlex Ltd.",
      dyneLevel: "42 Dynes",
      width: 1200,
      thickness: 12,
      density: 1.37,
      gsm: 16.4,
    },
  ];
const machineSettingData = [
  {
    mountingType: "Standard",
    cylinderTeeth: "500",
    tension: 31,
    unwinder: 65,
    infeed: "460ml",
    outfeed: "50%",
    rewinder: 54,
    staticCharge: 56,
    formatCorrect: 545,
  },
];

const inkStationColumns = [
  { id: "stationNo", label: "Station No" },
  { id: "colorPantone", label: "Color Pantone" },
  { id: "lfValue", label: "LF Value" },
  { id: "inkSupplier", label: "Ink Supplier" },
  { id: "lpcm", label: "LPCM" },
  { id: "volume", label: "Volume" },
  { id: "uvLed", label: "UV/LED" },
];

const inkStationData = [
  {
    stationNo: 1,
    colorPantone: "Pantone Red 032C",
    lfValue: 65,
    inkSupplier: "Siegwerk",
    lpcm: 65,
    volume: "460ml",
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
    stationNo: 4,
    colorPantone: "Pantone Yellow 012C",
    lfValue: 60,
    inkSupplier: "Flint Group",
    lpcm: 60,
    volume: "480ml",
    uvLed: "UV",
  },
  {
    stationNo: 5,
    colorPantone: "Pantone Yellow 012C",
    lfValue: 60,
    inkSupplier: "Flint Group",
    lpcm: 60,
    volume: "480ml",
    uvLed: "LED",
  },
  {
    stationNo: 6,
    colorPantone: "Pantone Yellow 012C",
    lfValue: 60,
    inkSupplier: "Flint Group",
    lpcm: 60,
    volume: "480ml",
    uvLed: "UV",
  },
  {
    stationNo: 7,
    colorPantone: "Pantone Yellow 012C",
    lfValue: 60,
    inkSupplier: "Flint Group",
    lpcm: 60,
    volume: "480ml",
    uvLed: "LED",
  },
  {
    stationNo: 8,
    colorPantone: "Pantone Yellow 012C",
    lfValue: 60,
    inkSupplier: "Flint Group",
    lpcm: 60,
    volume: "480ml",
    uvLed: "UV",
  },
  {
    stationNo: 9,
    colorPantone: "Pantone Yellow 012C",
    lfValue: 60,
    inkSupplier: "Flint Group",
    lpcm: 60,
    volume: "480ml",
    uvLed: "LED",
  },
  {
    stationNo: 10,
    colorPantone: "Pantone Yellow 012C",
    lfValue: 60,
    inkSupplier: "Flint Group",
    lpcm: 60,
    volume: "480ml",
    uvLed: "UV",
  },
];

const ViewPrinting: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { printingInkStatinData, printingMachineSettings } = useSelector(
    (state: RootState) => state.viewMasterData
  );

  useEffect(() => {
    if (inkStationData.length >= 0) {
      dispatch(setPrintingInkStationData(inkStationData));
    }
    if (machineSettingData.length >= 0) {
      dispatch(setPrintingMachineSettingsData(machineSettingData));
    }
  }, [dispatch, inkStationData, machineSettingData]);

  return (
    <Box sx={{ borderRadius: "0px ",p:1 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Machine Settings & Ink Configuration
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      <DataTable
        columns={machineSettingColumns}
        data={printingMachineSettings}
      />

<Box sx={{ display: "flex", gap: 1,mt:1.5 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Printing Substrate
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      <DataTable
        columns={printingSubstarteColumns}
        data={printingSubstrateData}
      />

      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 1, mt: 2 }}
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
            Ink Station-wise Entry{" "}
          </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>
        <DataTable columns={inkStationColumns} data={printingInkStatinData} />
      </Box>
    </Box>
  );
};

export default ViewPrinting;
