import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { useGetLaminationReportDetailsQuery } from "../../../store/services/api";
import { transformZoneTempData , transformUnwindRewindData, transformLaminationFilmData,transformPlainFilmInfo} from "./tableTransfermationFunctions";

const zoneTempPressingColumns = [
    { id: 'particular', label: '' },
    { id: 'zone1', label: 'Zone - 1 Temp' },
    { id: 'zone2', label: 'Zone - 2 Temp' },
    { id: 'nipPressure', label: 'NIP Pressure' },
    { id: 'speed', label: 'Speed Mtr/min' },
  ];
  
  
  const unwindRewindColumns = [
    { id: 'particular', label: '' },
    { id: 'priLaminated', label: 'Pri.Laminated (Printed Film)' },
    { id: 'secUnwinder', label: 'Sec.Unwinder (Plain Film)' },
    { id: 'lamiSet', label: 'Lami-Set' },
    { id: 'rewinder', label: 'Re-Winder' },
  ];

  
  const laminationFilmColumns = [
    { id: 'spec', label: '' },
    { id: 'priLaminated', label: 'Pri.Laminated (Printed Film)' },
    { id: 'secUnwinder', label: 'Sec.Unwinder (Plain Film)' },
  ];
  

  
  const repeatColumns = [
    { id: 'label', label: '' },
    { id: 'printedFilmRepeat', label: 'Printed Film' },
    { id: 'afterLaminationRepeat', label: 'After Lamination' },
  ];
  
 
  const bondingMaterialColumns = [
    { id: 'bondingMaterial', label: 'Bonding Material' },
    { id: 'code', label: 'Code' },
    { id: 'brand', label: 'Brand' },
    { id: 'mixingRatio', label: 'Mixing Ratio' },
    { id: 'actual', label: 'Actual' },
  ];
  
  

//   {
//     "viscosityRange": "16-80",
//     "actualViscosity": "8",
//     "gsmRange": "224",
//     "gsmRangeActual": "",
//     "mixingComposition": "7",
//     "actualComposition": "3.0",
//     "rubberRollerWidth": ""
// }
// vicosity range, actual, GSM range, actual,mixing compositions, ruber roller width, composite gsm 
  const viscosityWeightColumns = [
    // { id: 'metric', label: '' },
    { id: 'viscosityRange', label: 'Viscosity Range' },
    { id: 'actualViscosity', label: 'Actual' },
    { id: 'gsmRange', label: 'GSM Range' },
    { id: 'gsmRangeActual', label: 'Actual' },
    { id: 'mixingComposition', label:"Mixing Composition"},
    { id: 'actualComposition', label: 'Actual' },
    { id: 'rubberRollerWidth', label:"Rubber Roller Width"},
    { id: 'compositeGsm', label: 'Composite gsm ' },
  ];
//   {
//     "particular": "STARTING TIME",
//     "target": "2025-04-13T05:30",
//     "actual": "2025-04-13T05:30"
// }
  const laminationProcessColumns = [
    { id: 'particular', label: '' },
    { id: 'target', label: 'Target' },
    { id: 'actual', label: 'Actual' },
  ];
  
  const qcCheckColumns = [
    { id: 'type', label: 'Type' },
    { id: 'repeat', label: 'Repeat' },
    { id: 'curling', label: 'Curling' },
    { id: 'bondStrength', label: 'Bond Strength' },
    { id: 'others', label: 'Others' },
  ];
  
  
  const plainFilmLeftColumns = [
    { id: 'meters', label: 'Meters' },
    { id: 'kgs', label: 'Kgs.' },
  ];
  
  const plainFilmLeftData = [
    { meters: '12', kgs: '--' },
  ];

  // const plainFilmInfoItems = [
  //   { label: "Plain Film Left Over Roll(meters)", value: "721" },
  //   { label: "Plain Film Left Over Roll(Kgs)", value: "72" },
  //   { label: "QC Approval", value: "--" },
  //   { label: "Incharge comments", value: "--" },
  // ]
        
interface LaminationReportProps {
    indentNumber: string
  }      


const LaminationReport: React.FC<LaminationReportProps> = ({ indentNumber }) => {
  const { data, isLoading, isError, error } = useGetLaminationReportDetailsQuery(indentNumber);
  const zoneTempPressingData = transformZoneTempData(data?.data?.zoneTemperatureAndPressing);
  const unwindRewindData = transformUnwindRewindData(data?.data?.unwindingRewindingTension);
  const laminationFilmData = transformLaminationFilmData(data?.data?.laminationFilmSpecifications);
  const repeatData = [{...data?.data?.repeat,label: 'Repeat (MM)'}];
  const bondingMaterialData = data?.data?.bondingMaterialSpecifications;
  const viscosityWeightData = [{...data?.data?.viscosityWeightMetrics}];
  const laminationProcessData = data?.data?.laminationProcessReport;
  const qcCheckData = data?.data?.qcCheckList;
  const plainFilmInfoItems = transformPlainFilmInfo(data?.data?.plainFilmLeftOverRoll);
  if (isLoading) return <div>Loading lamination report...</div>
  if (isError) return <div>Error loading report: {JSON.stringify(error)}</div>
  if (!data) return <div>No data found</div>
  return (
    <>
    <Box sx={{ borderRadius: "0px ", p: 1 }}>
      <TitledDataTable
        title="Zone Temperature & Pressing Conditions"
        columns={zoneTempPressingColumns}
        data={zoneTempPressingData}
        firstRow={true}
      />
    </Box>
    <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Unwinding & Rewinding Tension"
      columns={unwindRewindColumns}
      data={unwindRewindData}
      firstRow={true}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Lamination Film Specifications"
      columns={laminationFilmColumns}
      data={laminationFilmData}
      firstRow={true}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Repeat (MM)"
      columns={repeatColumns}
      data={repeatData}
      firstRow={false}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Bonding Material Specifications"
      columns={bondingMaterialColumns}
      data={bondingMaterialData}
      firstRow={true}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Viscosity & Weight Metrics"
      columns={viscosityWeightColumns}
      data={viscosityWeightData}
      firstRow={false}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Lamination Process Report"
      columns={laminationProcessColumns}
      data={laminationProcessData}
      firstRow={true}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="QC Check"
      columns={qcCheckColumns}
      data={qcCheckData}
      firstRow={false}
    />
  </Box>
  <Box sx={{ borderRadius: "0px ", p: 1 }}>
    <TitledDataTable
      title="Plain Film Left Over Roll"
      columns={plainFilmLeftColumns}
      data={plainFilmLeftData}
      firstRow={false}
      showTableSection={false}
      infoItems={plainFilmInfoItems}
      showInfoSection={true}
    />
  </Box>
  </>
  );
};

export default LaminationReport;
