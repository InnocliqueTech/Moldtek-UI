import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { analoxColumns, tapeColumns,materialColumns } from "../data";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const inkCoatingColumns = [
  { id: "stationNo", label: "Station No" },
  { id: "colorPantone", label: "Color Pantone" },
  { id: "mixingOnGEC", label: "Mixing on GEC" },
  { id: "mtplCode", label: "MTPL Code" },
  { id: "lfValue", label: "LF Value" },
  { id: "supplierBatchNo", label: "Supplier Batch No" },
];



const {inkCoatingSpecifications,materialSpecification,mountingTapeSpecifications,plateMountingSupervisorReport,analoxSpecifications} = useSelector((state:RootState)=>state.viewDailyPlan)
const MakeReady: React.FC = () => {
  return (
    <>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Ink & Coating Specifications"
          columns={inkCoatingColumns}
          data={inkCoatingSpecifications}
          firstRow={true}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Analox Specifications"
          columns={analoxColumns}
          data={analoxSpecifications}
          firstRow={true}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Mounting Tape Specifications"
          columns={tapeColumns}
          data={mountingTapeSpecifications}
          firstRow={true}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Material Specifications"
          columns={materialColumns}
          data={materialSpecification?[materialSpecification]:[]}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Plate Mounting Supervisor Report"
          
          showInfoSection={true}
          showTableSection={false}
          infoItems={plateMountingSupervisorReport}
        />
      </Box>
      
    </>
  );
};

export default MakeReady;
