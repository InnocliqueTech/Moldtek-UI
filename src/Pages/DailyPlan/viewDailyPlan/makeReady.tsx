import { Box, Typography } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { tapeColumns, materialColumns } from "../data";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Loader from "../../../Loader";

const inkCoatingColumns = [
  { id: "stationNo", label: "Station No" },
  { id: "colorPantone", label: "Colour Pantone Code" },
  { id: "mixingOnGec", label: "Mixing on GEC" },
  { id: "mtplCode", label: "MTPL Code" },
  { id: "lfValue", label: "LF Value" },
  { id: "supplierBatchNo", label: "Supplier Batch No" },
];


const generateAnaloxColumns = (specs: any[]) => {
  const maxStation = Math.max(...specs.map((s) => s.stationNo || 0));
  return [
    { id: "parameter", label: "Parameter" },
    ...Array.from({ length: maxStation }, (_, i) => ({
      id: `station${i + 1}`,
      label: `Station ${i + 1}`,
    })),
  ];
};

const transformAnaloxData = (specs: any[]) => {
  const parameters = ["lpcm", "vol"];
  return parameters.map((param) => {
    const row: Record<string, string | number> = { parameter: param };
    specs.forEach((station) => {
      row[`station${station.stationNo}`] = station[param];
    });
    return row;
  });
};

interface PrintingReportProps {
  loading: boolean;
  error: boolean;
  isEditing:boolean;
  onDataChange:()=>void
}

const MakeReady: React.FC<PrintingReportProps> = ({ loading = false , error=false}) => {
  const {
    inkCoatingSpecifications,
    materialSpecification,
    mountingTapeSpecifications,
    plateMountingSupervisorReport,
    analoxSpecifications = [],
  } = useSelector((state: RootState) => state.viewDailyPlan);
  const plateMountingReport = [
    { label: "Plates Inspection", value: plateMountingSupervisorReport?.platesInspection || "" },
    { label: "Mounter", value: plateMountingSupervisorReport?.mounter || "" },
    { label: "Approver", value: plateMountingSupervisorReport?.approver || "" },
    { label: "Ink Kitchen Supervisor", value: plateMountingSupervisorReport?.inkKitchenSupervisor || "" },
    { label: "Plate Mounting Supervisor Report", value: plateMountingSupervisorReport?.plateMountingSupervisor || "" },
    { label: "Shift QC Incharge", value: plateMountingSupervisorReport?.shiftQcIncharge || "" },
  ];

  const analoxCols = generateAnaloxColumns(analoxSpecifications);
  const analoxData = transformAnaloxData(analoxSpecifications);

  if (loading) return <Loader />;

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error" gutterBottom>
          Failed to load Make Ready data
        </Typography>
        <Typography variant="body1" color="text.secondary">
          An unexpected error occurred. Please try again later
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Ink & Coating Specifications"
          columns={inkCoatingColumns}
          data={inkCoatingSpecifications || []}
          firstRow={true}
        />
      </Box>

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Analox Specifications"
          columns={analoxCols}
          data={analoxData}
          firstRow={true}
        />
      </Box>

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Mounting Tape Specifications"
          columns={tapeColumns}
          data={mountingTapeSpecifications || []}
          firstRow={true}
        />
      </Box>

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Material Specifications"
          columns={materialColumns}
          data={materialSpecification ? [materialSpecification] : []}
        />
      </Box>

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Shift Supervisor Report"
          showInfoSection={true}
          showTableSection={false}
          infoItems={plateMountingReport || []}
        />
      </Box>
    </>
  );
};

export default MakeReady;
