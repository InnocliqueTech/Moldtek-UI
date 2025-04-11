import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { analoxData, analoxColumns, tapeColumns, tapeRows, materialColumns, materialData,plateMountingReport } from "../data";

const inkCoatingColumns = [
  { id: "stationNo", label: "Station No" },
  { id: "colorPantone", label: "Color Pantone" },
  { id: "mixingOnGEC", label: "Mixing on GEC" },
  { id: "mtplCode", label: "MTPL Code" },
  { id: "lfValue", label: "LF Value" },
  { id: "supplierBatchNo", label: "Supplier Batch No" },
];

const inkCoatingData = [
  {
    stationNo: 1,
    colorPantone: "Pantone Black C",
    mixingOnGEC: "--",
    mtplCode: "--",
    lfValue: 65,
    supplierBatchNo: "--",
  },
  {
    stationNo: 2,
    colorPantone: "Pantone Black C",
    mixingOnGEC: "--",
    mtplCode: "--",
    lfValue: 65,
    supplierBatchNo: "--",
  },
  {
    stationNo: 3,
    colorPantone: "Pantone Yellow 012C",
    mixingOnGEC: "--",
    mtplCode: "--",
    lfValue: 60,
    supplierBatchNo: "--",
  },
  {
    stationNo: 4,
    colorPantone: "Pantone Yellow 012C",
    mixingOnGEC: "--",
    mtplCode: "--",
    lfValue: 60,
    supplierBatchNo: "--",
  },
  {
    stationNo: 5,
    colorPantone: "Pantone Yellow 012C",
    mixingOnGEC: "--",
    mtplCode: "--",
    lfValue: 60,
    supplierBatchNo: "--",
  },
  {
    stationNo: 6,
    colorPantone: "Pantone Yellow 012C",
    mixingOnGEC: "--",
    mtplCode: "--",
    lfValue: 60,
    supplierBatchNo: "--",
  },
  {
    stationNo: 7,
    colorPantone: "Pantone Yellow 012C",
    mixingOnGEC: "--",
    mtplCode: "--",
    lfValue: 60,
    supplierBatchNo: "--",
  },
  {
    stationNo: 8,
    colorPantone: "Pantone Yellow 012C",
    mixingOnGEC: "--",
    mtplCode: "--",
    lfValue: 60,
    supplierBatchNo: "--",
  },
  {
    stationNo: 9,
    colorPantone: "Pantone Yellow 012C",
    mixingOnGEC: "--",
    mtplCode: "--",
    lfValue: 60,
    supplierBatchNo: "--",
  },
];

const MakeReady: React.FC = () => {
  return (
    <>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Ink & Coating Specifications"
          columns={inkCoatingColumns}
          data={inkCoatingData}
          firstRow={true}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Analox Specifications"
          columns={analoxColumns}
          data={analoxData}
          firstRow={true}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Mounting Tape Specifications"
          columns={tapeColumns}
          data={tapeRows}
          firstRow={true}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Material Specifications"
          columns={materialColumns}
          data={materialData}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Plate Mounting Supervisor Report"
          
          showInfoSection={true}
          showTableSection={false}
          infoItems={plateMountingReport}
        />
      </Box>
      
    </>
  );
};

export default MakeReady;
