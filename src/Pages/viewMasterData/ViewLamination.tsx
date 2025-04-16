import { Box, Typography } from "@mui/material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { InfoOutline } from "@mui/icons-material";
import {  RootState } from "../../store";
import {useSelector } from "react-redux";


const zoneTemperatureColumns = [
  { id: "zone1_temp", label: "Zone-1 Temp (°C)" },
  { id: "zone2_temp", label: "Zone-2 Temp (°C)" },
  { id: "nip_pressure_bar", label: "NIP Pressure (Bar)" },
  { id: "speed", label: "Speed (m/min)" },
];
const materialDetailsColumns = [
  { id: "viscosity_range", label: "Visco City Range" },
  { id: "adhesive_gsm", label: "Adhesive GSM" },
  { id: "composite_gsm", label: "Composite GSM" },
];



const laminatingSubstarteColumns= [
  { id: "substrate_type", label: "Substrate Type" },
  { id: "supplier", label: "Supplier" },
  { id: "dyne_level", label: "Dyne Level" },
  { id: "width", label: "Width (mm)" },
  { id: "thickness", label: "Thickness (microns)" },
  { id: "density", label: "Density (g/cm³)" },
  { id: "gsm", label: "GSM" },
];


const tensionColumns = [
  { id: "lami_set_tension", label: "Lami-set Tension" },
  { id: "rewinder_tension", label: "Rewinder Tension" },
  { id: "printed_film_tension", label: "Printed Film Tension" },
  { id: "laminate_film_tension", label: "Laminated Film Tension" },
]



const bondingMaterialColumns = [
  { id: "type", label: "Field" },
  { id: "code", label: "Code" },
  { id: "brand", label: "Brand" },
  { id: "ratio", label: "Ratio" },
];



const ViewLamination: React.FC = () => {

  const { laminationAdhesive, laminationSettings,laminatingSubstrateSettings } =
    useSelector((state: RootState) => state.viewMasterData);
    console.log(laminationAdhesive,"LAMINATION")
  return (
    <Box sx={{ borderRadius: "0px "}}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
           Lamination Zone Settings
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      <DataTable columns={zoneTemperatureColumns} data={laminationSettings?[laminationSettings]:[]} />
      <Box sx={{ display: "flex", gap: 1,mt:1.5}}>
              <Typography
                sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
                gutterBottom
              >
               Lamination Substrate
              </Typography>
              <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
            </Box>
            <DataTable
              columns={laminatingSubstarteColumns}
              data={laminatingSubstrateSettings?[laminatingSubstrateSettings]:[]}
            />
                 <Box sx={{ display: "flex", gap: 1,mt:1.5 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Tensions Details
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      <DataTable columns={tensionColumns} data={laminationSettings?[laminationSettings]:[]} />
      {/* <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", pY: 1, mt: 1.5 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p:1
          }}
        >
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Unwinding & Rewinding Process
          </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>
        <DataTable
          columns={unwindingRewindingColumns}
          data={laminationDetails}
          tableTitle={true}
        />
      </Box> */}
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", pY: 1, mt: 1.5 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p:1
          }}
        >
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Bonding Material Specifications
          </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>
        <DataTable columns={bondingMaterialColumns} data={laminationAdhesive?laminationAdhesive:[]} tableTitle={true} firstRow={true} />
      </Box>
         <Box sx={{ display: "flex", gap: 1,mt:1.5 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Material Details
        </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>
        <DataTable columns={materialDetailsColumns} data={laminationSettings?[laminationSettings]:[]} />
    </Box>
  );
};

export default ViewLamination;
