import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import { useEffect, useState } from "react";
import {
  PrintingFormValues,
  PrintingTableRow,
  setIsPrintingDataSave,
  setSavePrintingFormData,
} from "../../store/slices/masterDataSlice";

const machineFields = [
  {
    id: "mountingType",
    label: "Mounting Type",
    options: ["Standard", "Actual"],
  },
  { id: "cylinderTeeth", label: "Cylinder Teeth" },
  { id: "tension", label: "Tension" },
  { id: "unwinder", label: "Unwinder" },
  { id: "infeed", label: "Infeed" },
  { id: "outfeed", label: "Outfeed" },
  { id: "rewinder", label: "Rewinder" },
  { id: "staticCharge", label: "Static Charge" },
  { id: "formatCorrect", label: "Format Correct" },
];

const substrateFields = [
  { id: "substrateType", label: "Substrate Type", options: ["PET"] },
  {
    id: "supplier",
    label: "Supplier",
    options: ["U-Flex Ltd.", "Huhtamaki", "Gulf Pack Supplier"],
  },
  { id: "dyneLevel", label: "Dyne Level" },
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
    { id: "stationNo", label: "Station No" },
    { id: "colorPantone", label: "Color Pantone", edit: true },
    { id: "lfValue", label: "LF Value", edit: true },
    {
      id: "inkSupplier",
      label: "Ink Supplier",
      editSelect: true,
      options: ["Siegwerk", "Flint Group"],
    },
    { id: "lpcm", label: "LPCM", edit: true },
    { id: "volume", label: "Volume", edit: true },
    { id: "uvLed", label: "UV/LED", isDropdown: true, options: ["LED", "UV"] },
    { id: "uvledintensity", label: "UV/LED Intensity", edit: true },
  ];

  const [tableData, setTableData] = useState<PrintingTableRow[]>([]);
  const [formValues, setFormValues] = useState<PrintingFormValues>({
    mountingType: "",
    cylinderTeeth: "",
    tension: "",
    unwinder: "",
    infeed: "",
    outfeed: "",
    rewinder: "",
    staticCharge: "",
    formatCorrect: "",
    substrateType: "",
    supplier: "",
    dyneLevel: "",
    width: "",
    thickness: "",
    density: "",
    printingTableData: Array.from({ length: 10 }, (_, i) => ({
      stationNo: i + 1,
      colorPantone: "",
      lfValue: 0,
      inkSupplier: "",
      lpcm: 0,
      volume: "",
      uvLed: "",
      uvledintensity: "",
    })),
  });

 const handleChange = (
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    const newValue = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;
  
    const updatedFormData = {
      ...formValues,
      [field]: newValue,
    };
  
    setFormValues(updatedFormData);
    dispatch(setSavePrintingFormData(updatedFormData)); 
  };
  

  const renderField = (field: {
    id: string;
    label: string;
    options?: string[];
  }) => {
    const value = formValues[field.id as keyof PrintingFormValues] as string;

    if (field.options) {
      return (
        <DropdownComponent
          key={field.id}
          label={field.label}
          value={value}
          onChange={(value) => handleChange(field.id, value)}
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
        value={value}
        onChange={(e) => handleChange(field.id, e.target.value)}
      />
    );
  };

  const handleSave = () => {
    const finalSaveData = {
      ...formValues,
      printingTableData: tableData,
    };
    dispatch(setSavePrintingFormData(finalSaveData));
     dispatch(setIsPrintingDataSave(true));
  };

  useEffect(() => {
    if (printingSaveFormData) {
      setFormValues(printingSaveFormData);
      if (printingSaveFormData.printingTableData) {
        setTableData(printingSaveFormData.printingTableData);
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
          />
        </Box>
      </Box>

      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} handleSave={handleSave} />
      </Box>
    </Box>
  );
};

export default Printing;
