import { Box, Typography } from "@mui/material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { InfoOutline } from "@mui/icons-material";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setLaminationAdhesiveDetails,
  setLaminationDetails,
  setLaminationSettings,
} from "../../store/slices/viewMasterDataSlice";

const zoneTemperatureColumns = [
  { id: "zone1Temp", label: "Zone-1 Temp (°C)" },
  { id: "zone2Temp", label: "Zone-2 Temp (°C)" },
  { id: "npPressure", label: "Np Pressure (Bar)" },
  { id: "speed", label: "Speed (m/min)" },
  // { id: "lamiSetTension", label: "Lami Set Tension" },
  // { id: "rewinderTension", label: "Rewinder Tension" },
];
const materialDetailsColumns = [
  { id: "viscocityRange", label: "Visco City Range" },
  { id: "adhesiveGsm", label: "Adhesive GSM" },
  { id: "compositeGsm", label: "Composite GSM" },
];
const materialDetailsData = [
  {
    viscocityRange: 110,
    adhesiveGsm: 120,
    gsm: 3.5,
    compositeGsm: 65,
  },
]

const zoneTemperatureData = [
  {
    zone1Temp: 110,
    zone2Temp: 120,
    npPressure: 3.5,
    speed: 65,
    lamiSetTension: "2.5 n/mm",
    rewinderTension: "--",
  },
];

const laminatingSubstarteColumns= [
  { id: "substrateType", label: "Substrate Type" },
  { id: "supplier", label: "Supplier" },
  { id: "dyneLevel", label: "Dyne Level" },
  { id: "width", label: "Width (mm)" },
  { id: "thickness", label: "Thickness (microns)" },
  { id: "density", label: "Density (g/cm³)" },
  { id: "gsm", label: "GSM" },
];


const laminatingSubstrateData = [
  {
    substrateType: "ALU Foil",
    supplier: "Huhtamaki",
    dyneLevel: "38 Dynes",
    width: 1200,
    thickness: 7,
    density: 1.37,
    gsm: 16.4,
  },
];

// const unwindingRewindingColumns = [
//   { id: "field", label: "Field" },
//   { id: "printedFilm", label: "Printed Film" },
//   { id: "laminateFilm", label: "Laminate Film" },
// ];

const tensionColumns = [
  { id: "rewinderTension", label: "Rewinder Tension" },
  { id: "printedFilmTension", label: "Printed Film Tension" },
  { id: "laminatedFilmTension", label: "Laminated Film Tension" },
]
const tensionData = [
  {
    lamiSetTension: "2.5 n/mm",
    rewinderTension: "--",
    printedFilmTension:"12",
    laminatedFilmTension:"12"
  },
]

const unwindingRewindingData = [
  { field: "Tension (Primary)", printedFilm: "2.5 N/mm", laminateFilm: "--" },
  { field: "Width (mm)", printedFilm: "1200", laminateFilm: "1200" },
  { field: "Thickness (microns)", printedFilm: "12", laminateFilm: "12" },
  { field: "GSM", printedFilm: "16.4", laminateFilm: "16.8" },
  { field: "Dyne Level", printedFilm: "42 Dynes", laminateFilm: "42 Dynes" },
];
const bondingMaterialColumns = [
  { id: "field", label: "Field" },
  { id: "code", label: "Code" },
  { id: "brand", label: "Brand" },
  { id: "ratio", label: "Ratio" },
];

const bondingMaterialData = [
  { field: "Adhesive", code: "ADH123", brand: "Henkel", ratio: "1.2" },
  { field: "Hardener", code: "ADH123", brand: "Henkel", ratio: "1.2" },
  { field: "Ethyl Acetate", code: "ADH123", brand: "Henkel", ratio: "1.2" },
];

const ViewLamination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { laminationAdhesive, laminationSettings } =
    useSelector((state: RootState) => state.viewMasterData);

  useEffect(() => {
    if (bondingMaterialData.length >= 0) {
      dispatch(setLaminationAdhesiveDetails(bondingMaterialData));
    }
    if (unwindingRewindingData.length >= 0) {
      dispatch(setLaminationDetails(unwindingRewindingData));
    }
    if (zoneTemperatureData.length >= 0) {
      dispatch(setLaminationSettings(zoneTemperatureData));
    }
  }, [
    dispatch,
    bondingMaterialData,
    zoneTemperatureData,
    unwindingRewindingData,
  ]);

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
      <DataTable columns={zoneTemperatureColumns} data={laminationSettings} />
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
              data={laminatingSubstrateData}
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
      <DataTable columns={tensionColumns} data={tensionData} />
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
        <DataTable columns={bondingMaterialColumns} data={laminationAdhesive} tableTitle={true} firstRow={true} />
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
        <DataTable columns={materialDetailsColumns} data={materialDetailsData} />
    </Box>
  );
};

export default ViewLamination;
