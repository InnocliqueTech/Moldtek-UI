import { Box, Typography } from "@mui/material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { InfoOutline } from "@mui/icons-material";

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
  // const { repeatTableData, substrateTableData } = useSelector(
  //   (state: RootState) => state.viewMasterData
  // );
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(setRepeatTableData(data));
  //   dispatch(setSubstrateTableData(substrateData));
  // }, []);

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Machine Settings & Ink Configuration
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      <DataTable columns={machineSettingColumns} data={machineSettingData} />
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
        <DataTable columns={inkStationColumns} data={inkStationData} />
      </Box>
    </Box>
  );
};

export default ViewPrinting;
