import { Box, Typography } from "@mui/material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { InfoOutline } from "@mui/icons-material";

const zoneTemperatureColumns = [
    { id: "zone1Temp", label: "Zone-1 Temp (°C)" },
    { id: "zone2Temp", label: "Zone-2 Temp (°C)" },
    { id: "npPressure", label: "Np Pressure (Bar)" },
    { id: "speed", label: "Speed (m/min)" },
    { id: "lamiSetTension", label: "Lami Set Tension" },
    { id: "rewinderTension", label: "Rewinder Tension" },
  ];
  
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
  
const ViewDyePrinting: React.FC = () => {
  // const { repeatTableData, substrateTableData } = useSelector(
  //   (state: RootState) => state.viewMasterData
  // );
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(setRepeatTableData(data));
  //   dispatch(setSubstrateTableData(substrateData));
  // }, []);

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
         Dye Cutting Parameters
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      <DataTable columns={zoneTemperatureColumns} data={zoneTemperatureData} />
    </Box>
  );
};

export default ViewDyePrinting;
