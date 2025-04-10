import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";

const columns = [
  { id: "stationNo", label: "Station No" },
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
  { id: "4", label: "4" },
  { id: "5", label: "5" },
  { id: "6", label: "6" },
  { id: "7", label: "7" },
  { id: "8", label: "8" },
  { id: "9", label: "9" },
  { id: "10", label: "10" },
];
const inkCoatingData = [
  {
    stationNo: "Color Pantone",
    1: 23,
    2: 23,
    3: 23,
    4: 23,
    5: 23,
    6:23,
    7:23,
    8:23,
    9:23,
    10:23
  },
  {
    stationNo: "Mixing on GEC",
    1: 36,
    2: 36,
    3: 36,
    4: 36,
    5: 36,
    6:36,
    7:36,
    8:36,
    9:36,
    10:36
  },
  {
    stationNo: "MTPL Code",
    1: "--",
    2: "--",
    3: "--",
    4: "--",
    5: "--",
    6:"--",
    7:"--",
    8:"--",
    9:"--",
    10:"--"
  },
  {
    stationNo: "LF Value",
    1: 36,
    2: 36,
    3: 36,
    4: 36,
    5: 36,
    6:36,
    7:36,
    8:36,
    9:36,
    10:36
  },
  {
    stationNo: "Supplier Batch No",
    1: 36,
    2: 36,
    3: 36,
    4: 36,
    5: 36,
    6:36,
    7:36,
    8:36,
    9:36,
    10:36
  },
];


const PrintingReport: React.FC = () => {
  return (
    <Box sx={{ borderRadius: "0px ", p: 1 }}>
      <TitledDataTable
        title="Ink & Coating Specifications"
        columns={columns}
        data={inkCoatingData}
      />
    </Box>
  );
};

export default PrintingReport;
