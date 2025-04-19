import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { useGetLaminationReportDetailsQuery } from "../../../store/services/api";
import { transformZoneTempData } from "./tableTransfermationFunctions";

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
  
  const unwindRewindData = [
    { particular: 'STD', priLaminated: '23', secUnwinder: '23', lamiSet: '23', rewinder: '23' },
    { particular: 'Actual', priLaminated: '23', secUnwinder: '23', lamiSet: '23', rewinder: '23' },
  ];
  
  const laminationFilmColumns = [
    { id: 'spec', label: '' },
    { id: 'priLaminated', label: 'Pri.Laminated (Printed Film)' },
    { id: 'secUnwinder', label: 'Sec.Unwinder (Plain Film)' },
  ];
  
  const laminationFilmData = [
    { spec: 'Width', priLaminated: '23', secUnwinder: '23' },
    { spec: 'Thickness (Microns)', priLaminated: '23', secUnwinder: '23' },
    { spec: 'GSM', priLaminated: '23', secUnwinder: '23' },
    { spec: 'DYNE', priLaminated: '--', secUnwinder: '--' },
  ];
  
  const repeatColumns = [
    { id: 'label', label: '' },
    { id: 'printedFilm', label: 'Printed Film' },
    { id: 'afterLamination', label: 'After Lamination' },
  ];
  
  const repeatData = [
    { label: 'Repeat (MM)', printedFilm: '12', afterLamination: '--' },
  ];
  
  const bondingMaterialColumns = [
    { id: 'material', label: 'Bonding Material' },
    { id: 'code', label: 'Code' },
    { id: 'brand', label: 'Brand' },
    { id: 'mixingRatio', label: 'Mixing Ratio' },
    { id: 'actual', label: 'Actual' },
  ];
  
  const bondingMaterialData = [
    { material: 'Adhesive', code: 'ADH232', brand: 'Henkel', mixingRatio: '1.2/6', actual: '21' },
    { material: 'Hardener', code: 'ADH235', brand: 'Henkel', mixingRatio: '1.2/6', actual: '12' },
    { material: 'Ethyl Acetate', code: 'ADH323', brand: 'Henkel', mixingRatio: '1.2/6', actual: '43' },
  ];
  
  const viscosityWeightColumns = [
    // { id: 'metric', label: '' },
    { id: 'viscosityRange', label: 'Viscosity Range' },
    { id: 'viscosityActual', label: 'Actual' },
    { id: 'gsmRange', label: 'GSM Range' },
    { id: 'mixingComposition', label:"Mixing Composition"},
    { id: 'gsmActual', label: 'Actual' },
  ];
  
  const viscosityWeightData = [
    { viscosityRange: '16 - 17', viscosityActual: '16 - 17', gsmRange: '16 - 17',mixingComposition:"24" ,gsmActual: '16 - 17' },
  ];
  const laminationProcessColumns = [
    { id: 'stage', label: '' },
    { id: 'target', label: 'Target' },
    { id: 'actual', label: 'Actual' },
  ];
  
  const laminationProcessData = [
    { stage: 'Starting Time', target: '12.00', actual: '21' },
    { stage: 'Completion Time', target: '12.00', actual: '21' },
    { stage: 'Total Time', target: '12.00', actual: '21' },
    { stage: 'Accepted Printed Film Mtrs', target: '12.00', actual: '21' },
    { stage: 'Input Plain Film Mtrs', target: '12.00', actual: '21' },
    { stage: 'Set-Up Wastage', target: '12.00', actual: '12' },
    { stage: 'In-Process Wastage', target: '12.00', actual: '12' },
    { stage: 'Doctoring Wastage Mtrs', target: '12.00', actual: '43' },
    { stage: 'Lamination Wastage Mtrs', target: '12.00', actual: '43' },
    { stage: 'Laminated Film Issued For Next Process', target: '12.00', actual: '43' },
  ];
  const qcCheckColumns = [
    { id: 'repeat', label: 'Repeat' },
    { id: 'curling', label: 'Curling' },
    { id: 'bondStrength', label: 'Bond Strength' },
    { id: 'others', label: 'Others' },
  ];
  
  const qcCheckData = [
    { repeat: '12', curling: '--', bondStrength: '--', others: '--' },
  ];
  const plainFilmLeftColumns = [
    { id: 'meters', label: 'Meters' },
    { id: 'kgs', label: 'Kgs.' },
  ];
  
  const plainFilmLeftData = [
    { meters: '12', kgs: '--' },
  ];

  const plainFilmInfoItems = [
    { label: "Plain Film Left Over Roll(meters)", value: "721" },
    { label: "Plain Film Left Over Roll(Kgs)", value: "72" },
    { label: "QC Approval", value: "--" },
    { label: "Incharge comments", value: "--" },
  ]
        
interface LaminationReportProps {
    indentNumber: string
  }      


const LaminationReport: React.FC<LaminationReportProps> = ({ indentNumber }) => {
  const { data, isLoading, isError, error } = useGetLaminationReportDetailsQuery(indentNumber);
  const zoneTempPressingData = transformZoneTempData(data?.data?.zoneTemperatureAndPressing)
  console.log(data,"inside laminationReport");
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
