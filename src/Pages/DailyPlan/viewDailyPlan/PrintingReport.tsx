import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import {useGetPrintingReportDetailsQuery } from "../../../store/services/api";
import { transformTensionData,transformPrintingProcessDataList,transformPrintingMCData,transformInkCoatingData } from "./tableTransfermationFunctions";

  const printRepeatColumns = [
    { id: 'repeatInMM', label: 'Repeat in MM' },
    { id: 'ups', label: 'UPS' },
    { id: 'jarCap', label: 'JAR/CAP' },
    { id: 'labelsPerMtrs', label: 'Labels Per Mtrs' },
  ]

  const materialSpecsColumns = [
    { id: 'widthMm', label: 'Width mm' },
    { id: 'thicknessMicrons', label: 'Thickness Microns' },
    { id: 'gsm', label: 'GSM' },
    { id: 'dyne', label: 'DYNE' },
    { id: 'staticCharge', label: 'Static Charge' },
    { id: 'formatCorrection', label: 'Format Correction' },
  ];
 
  const foilConsumptionColumns = [
    { id: 'foilInputRoll', label: 'Foil Input Roll' },
    { id: 'foilReturnRoll', label: 'Foil Return Roll' },
    { id: 'consumption', label: 'Consumption' },
    { id: 'foilWidth', label: 'Foil Width' },
  ];
 
  const printingProcessColumns = [
    { id: 'particular', label: 'Particular' },
    { id: 'target', label: 'Target' },
    { id: 'roll1', label: 'Roll-1' },
    { id: 'roll2', label: 'Roll-2' },
  ];
      
  const printingRunMetricsColumns = [
    { id: 'particular', label: '' },
    { id: 'roll1', label: 'Roll-1' },
    { id: 'roll2', label: 'Roll-2' },
  ];
  
  interface PrintingReportsProps{
    indentNO: string
  }
  

const PrintingReport: React.FC <PrintingReportsProps> = ({
  indentNO
}) => {
  const {
    data: printingReportsData,
    // isLoading: printingReportsLoading,
    // isError: printingReportsIsError,
    // error: printingReportError,
  } = useGetPrintingReportDetailsQuery(indentNO);
  const { rows, columns } = transformInkCoatingData(printingReportsData?.data?.inkCoatingSpecifications);
  const { columns: Tensioncolumns, rows: TensionData } = transformTensionData(printingReportsData?.data?.tensionControl);
  const printRepeatData = [{...printingReportsData?.data?.printRepeatLabellingDetails}];
  const materialSpecsData =  [{...printingReportsData?.data?.materialSpecifications}];
  const foilConsumptionData = [{...printingReportsData?.data?.foilRollConsumptionDetails}];
  const printingProcessData = transformPrintingProcessDataList(printingReportsData?.data?.printingProcessReport);
  const printingRunMetricsRows = transformPrintingProcessDataList(printingReportsData?.data?.printingRunMetrics);
  const printingMCData = transformPrintingMCData(printingReportsData?.data?.materialUsageShiftDetails);

  return (
    <>
    <Box sx={{ borderRadius: "0px ", p: 1 }}>
      <TitledDataTable
        title="Ink & Coating Specifications"
        columns={columns}
        data={rows}
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
      title="Printing Run Metrics"
      columns={printingRunMetricsColumns}
      data={printingRunMetricsRows}
      firstRow={true}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Material Usage and Shift details"
      showInfoSection={true}
      showTableSection={false}
      infoItems={printingMCData}
    />
  </Box>
  </>
  );
};

export default PrintingReport;
