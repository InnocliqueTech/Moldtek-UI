import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import { useEffect,  useState } from "react";
import {
  PrintingFormValues,
  PrintingTableRow,
  setIsPrintingDataSave,
  setSavePrintingFormData,
} from "../../store/slices/masterDataSlice";

const machineFields= [
  { id: "mounting_tape", label: "Mounting Tape", options: ["Standard", "Actual"] },
  { id: "cylinder_teeth", label: "Cylinder Teeth" },
  { id: "tension", label: "Tension" },
  { id: "unwinder", label: "Unwinder" },
  { id: "infeed", label: "Infeed" },
  { id: "outfeed", label: "Outfeed" },
  { id: "rewinder", label: "Rewinder" },
  { id: "static_charge", label: "Static Charge" },
  { id: "format_correct", label: "Format Correct" },
];

const substrateFields = [
  { id: "substrate_type", label: "Substrate Type", options: ["PET"] },
  {
    id: "supplier",
    label: "Supplier",
    options: ["U-Flex Ltd.", "Huhtamaki", "Gulf Pack Supplier"],
  },
  { id: "dyne_level", label: "Dyne Level" },
  { id: "width", label: "Width (mm)" },
  { id: "thickness", label: "Thickness" },
  { id: "density", label: "Density (g/cm³)" },
];

const Printing: React.FC = () => {
  const { selectedTab, printingSaveFormData } = useSelector(
    (state: RootState) => state.masterData
  );
  const dispatch = useDispatch<AppDispatch>();

  const columns = [
    { id: "station_no", label: "Station No" },
    { id: "color_pantone", label: "Color Pantone", edit: true },
    { id: "lf_value", label: "LF Value", edit: true },
    {
      id: "ink_supplier",
      label: "Ink Supplier",
      editSelect: true,
      options: ["Siegwerk", "Flint Group"],
    },
    { id: "lpcm", label: "LPCM", edit: true },
    { id: "volume", label: "Volume", edit: true },
    { id: "uv_led", label: "UV/LED", isDropdown: true, options: ["LED", "UV"] },
    { id: "uv_led_intensity", label: "UV/LED Intensity", edit: true },
  ];

  const [tableData, setTableData] = useState<PrintingTableRow[]>([]);
  const [formValues, setFormValues] = useState<PrintingFormValues>({
    printingDetails: {
    mounting_tape: "",
    cylinder_teeth: 0,
    tension: 0,
    unwinder: 0,
    infeed: 0,
    outfeed: 0,
    rewinder: 0,
    static_charge: 0,
    format_correct: 0,
    },
    printingSubstrateSettings: {

  substrate_type: "",
    supplier: "",
    dyne_level: "",
    width: 0,
    thickness: 0,
    density: 0,
  },
  stationWiseMetrics:Array.from({ length: 10 }, (_, i) => ({
    station_no: i + 1,
    color_pantone: "",
    lf_value: 0,
    ink_supplier: "",
      lpcm: 0,
      volume: "",
      uv_led: "",
      uv_led_intensity: "",
    })),
  }
  );

  const handleChange = (
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    const newValue = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;
  
    // Check if the field should be a number and convert if necessary
    const isNumberField = ['tension', 'width', 'thickness', 'density', 'cylinder_teeth','unwinder','infeed','outfeed','static_charge','format_correct'].includes(field);
    const finalValue = isNumberField ? Number(newValue) : newValue;
  
    const isMachineField = machineFields.some(f => f.id === field);
    const isSubstrateField = substrateFields.some(f => f.id === field);
  
    const updatedFormData = {
      ...formValues,
      printingDetails: isMachineField
        ? { ...formValues.printingDetails, [field]: finalValue }
        : formValues.printingDetails,
      printingSubstrateSettings: isSubstrateField
        ? { ...formValues.printingSubstrateSettings, [field]: finalValue }
        : formValues.printingSubstrateSettings,
    };
  
    setFormValues(updatedFormData);
    dispatch(setSavePrintingFormData(updatedFormData));
  };
  


  const renderField = (field: {
    id: string;
    label: string;
    options?: string[];
  }) => {
    const isMachineField = machineFields.some(f => f.id === field.id);
    const isSubstrateField = substrateFields.some(f => f.id === field.id);
  
    const value = isMachineField
      ? formValues.printingDetails[field.id as keyof typeof formValues.printingDetails]
      : isSubstrateField
      ? formValues.printingSubstrateSettings[field.id as keyof typeof formValues.printingSubstrateSettings]
      : "";
  
    if (field.options) {
      return (
        <DropdownComponent
        key={field.id}
        label={field.label}
        value={String(value)} // force to string
        onChange={(val) => handleChange(field.id, val)}
        options={field.options}
        isMultiSelect={false}
        checkbox={false}
      />
      
      );
    }
  
    return (
      <ReusableInput
        key={field.id}
        label={field.label}
        value={value as string | number}
        onChange={(val) => handleChange(field.id, val)}
      />
    );
  };
  
  

  const handleSave = () => {
    const finalSaveData = {
      ...formValues,
      stationWiseMetrics: tableData,
    };
    dispatch(setSavePrintingFormData(finalSaveData));
     dispatch(setIsPrintingDataSave(true));
  };

  useEffect(() => {
    if (printingSaveFormData) {
      setFormValues(printingSaveFormData);
      if (printingSaveFormData.stationWiseMetrics) {
        setTableData(printingSaveFormData.stationWiseMetrics);
      }
    }
  }, [printingSaveFormData]);

  return (
    <Box sx={{ borderRadius: "0px" }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Typography
          sx={{ color: "#2F2F2F", fontWeight: 600, fontSize: "16px" }}
        >
          Machine Settings
        </Typography>
        <Grid container spacing={2} pt={1}>
          {machineFields.map((field) => (
            <Grid size={{ xs: 12, md: 4 }} id={field.id}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Typography
          sx={{ color: "#2F2F2F", fontWeight: 600, fontSize: "16px" }}
        >
          Printing Substrate
        </Typography>
        <Grid container spacing={2} pt={1}>
          {substrateFields.map((field) => (
            <Grid size={{ xs: 12, md: 4 }} id={field.id}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", mt: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            p: 1,
          }}
        >
          <Typography
            sx={{ color: "#2F2F2F", fontWeight: 600, fontSize: "16px" }}
          >
            Station-wise Metric
          </Typography>
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>
        <Box>
          <DataTable
            columns={columns}
            data={tableData}
            setData={setTableData}
            tableTitle={true}
            id={'printing'}
          />
        </Box>
      </Box>

      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} handleSave={handleSave}  />
      </Box>
    </Box>
  );
};

export default Printing;
