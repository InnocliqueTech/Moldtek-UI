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
const Tensioncolumns = [
    { id: 'label', label: '' },
    { id: 'unwinder', label: 'Unwinder' },
    { id: 'infeed', label: 'Infeed' },
    { id: 'outfeed', label: 'Outfeed' },
    { id: 'rewinder', label: 'Rewinder' },
  ];
  const TensionData = [
    {
      label: 'STD',
      unwinder: '623',
      infeed: '--',
      outfeed: '623',
      rewinder: '623',
    },
    {
      label: 'Actuals',
      unwinder: '623',
      infeed: '--',
      outfeed: '623',
      rewinder: '623',
    },
  ];
  const printRepeatColumns = [
    { id: 'repeatInMM', label: 'Repeat in MM' },
    { id: 'ups', label: 'UPS' },
    { id: 'jarCap', label: 'JAR/CAP' },
    { id: 'labelsPerMtrs', label: 'Labels Per Mtrs' },
  ];
  const printRepeatData = [
    {
      repeatInMM: '623',
      ups: '623',
      jarCap: '--',
      labelsPerMtrs: '623',
    },
  ];
  const materialSpecsColumns = [
    { id: 'width', label: 'Width mm' },
    { id: 'thickness', label: 'Thickness Microns' },
    { id: 'gsm', label: 'GSM' },
    { id: 'dyne', label: 'DYNE' },
    { id: 'staticCharge', label: 'Static Charge' },
    { id: 'formatCorrection', label: 'Format Correction' },
  ];
  const materialSpecsData = [
    {
      width: '623',
      thickness: '623',
      gsm: '--',
      dyne: '623',
      staticCharge: '23',
      formatCorrection: '23',
    },
  ];
  const foilConsumptionColumns = [
    { id: 'foilInputRoll', label: 'Foil Input Roll' },
    { id: 'foilReturnRoll', label: 'Foil Return Roll' },
    { id: 'consumption', label: 'Consumption' },
    { id: 'foilWidth', label: 'Foil Width' },
  ];
  const foilConsumptionData = [
    {
      foilInputRoll: '23',
      foilReturnRoll: '777',
      consumption: '23',
      foilWidth: '23',
    },
  ];
  const printingProcessColumns = [
    { id: 'particular', label: 'Particular' },
    { id: 'target', label: 'Target' },
    { id: 'roll1', label: 'Roll-1' },
    { id: 'roll2', label: 'Roll-2' },
  ];
  const printingProcessData = [
    { particular: 'Repeat Length', target: '777', roll1: '23', roll2: '23' },
    { particular: 'Input Plain Film For Printing Mtrs', target: '777', roll1: '23', roll2: '23' },
    { particular: "Input Film For Printing Kg's", target: '777', roll1: '23', roll2: '23' },
    { particular: 'Impression Setting Mtrs', target: '777', roll1: '23', roll2: '23' },
    { particular: 'Registration Settings Mtrs', target: '777', roll1: '23', roll2: '23' },
    { particular: 'Shade Matching Mtrs', target: '777', roll1: '23', roll2: '23' },
    { particular: 'Process Wastage', target: '777', roll1: '23', roll2: '23' },
    { particular: 'Total Printing Process Wastage Mtrs', target: '777', roll1: '23', roll2: '23' },
    { particular: 'Un Fore Seen 100% Inspections Mtrs', target: '777', roll1: '23', roll2: '23' },
    { particular: 'Printed Film Issued For Next Process (Good Mtr) Mtrs', target: '777', roll1: '23', roll2: '23' },
  ];
         


const LaminationReport: React.FC = () => {
  return (
    <>
    <Box sx={{ borderRadius: "0px ", p: 1 }}>
      <TitledDataTable
        title="Ink & Coating Specifications"
        columns={columns}
        data={inkCoatingData}
        firstRow={true}
      />
    </Box>
    <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Tension Control"
      columns={Tensioncolumns}
      data={TensionData}
      firstRow={true}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Print Repeat & Labelling Details"
      columns={printRepeatColumns}
      data={printRepeatData}
      firstRow={false}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Material Specifications"
      columns={materialSpecsColumns}
      data={materialSpecsData}
      firstRow={false}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Foil Roll Consumption Details"
      columns={foilConsumptionColumns}
      data={foilConsumptionData}
      firstRow={false}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Printing Process Report"
      columns={printingProcessColumns}
      data={printingProcessData}
      firstRow={true}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Printing Process Report"
      columns={Tensioncolumns}
      data={TensionData}
      firstRow={true}
    />
  </Box>
  </>
  );
};

export default LaminationReport;
