import { Box, Typography } from "@mui/material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { InfoOutline } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


const machineSettingColumns = [
  { id: "mounting_tape", label: "Mounting Type" },
  { id: "cylinder_teeth", label: "Cylinder Teeth" },
  { id: "tension", label: "Tension" },
  { id: "unwinder", label: "Unwinder" },
  { id: "infeed", label: "Infeed" },
  { id: "outfeed", label: "Outfeed" },
  { id: "rewinder", label: "Rewinder" },
  { id: "static_charge", label: "Static Charge" },
  { id: "format_correct", label: "Format Correct" },
];
const printingSubstarteColumns = [
  { id: "substrate_type", label: "Substrate Type" },
  { id: "supplier", label: "Supplier" },
  { id: "dyne_level", label: "Dyne Level" },
  { id: "width", label: "Width (mm)" },
  { id: "thickness", label: "Thickness (microns)" },
  { id: "density", label: "Density (g/cm³)" },
  { id: "gsm", label: "GSM" },
];



const inkStationColumns = [
  { id: "station_no", label: "Station No" },
  { id: "color_pantone", label: "Color Pantone" },
  { id: "lf_value", label: "LF Value" },
  { id: "ink_supplier", label: "Ink Supplier" },
  { id: "lpcm", label: "LPCM" },
  { id: "volume", label: "Volume" },
  { id: "uv_led", label: "UV/LED" },
  { id: "uv_led_intensity", label: "UV/LED Intensity" },
];


const ViewPrinting: React.FC = () => {
  const { printingInkStatinData, printingMachineSettings,printingSubstrateSettings } = useSelector(
    (state: RootState) => state.viewMasterData
  );

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Machine Settings & Ink Configuration
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      <DataTable
        columns={machineSettingColumns}
        data={printingMachineSettings ? [printingMachineSettings] : []}
      />

      <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Printing Substrate
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      <DataTable
        columns={printingSubstarteColumns}
        data={printingSubstrateSettings?[printingSubstrateSettings]:[]}
      />

      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", pY: 1, mt: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Ink Station-wise Configuration{" "}
          </Typography>
          <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>
        <DataTable
          columns={inkStationColumns}
          data={printingInkStatinData}
          tableTitle={true}
        />
      </Box>
    </Box>
  );
};

export default ViewPrinting;
