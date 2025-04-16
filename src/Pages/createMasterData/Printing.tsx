import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import { useEffect, useState } from "react";
import {
  PrintingFormErrors,
  PrintingFormValues,
  PrintingTableRow,
  setPrintingDataTouched,
  setPrintngFormErros,
  setSavePrintingFormData,
  setSubmitAndPublishButtonPrinting,
} from "../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";

const machineFields = [
  {
    id: "mounting_tape",
    label: "Mounting Tape",
    options: ["Standard", "Actual"],
  },
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

interface PrintingProps {
  tableData: PrintingTableRow[];
  formValues: PrintingFormValues;
  setTableData: React.Dispatch<React.SetStateAction<PrintingTableRow[]>>;
  setFormValues: React.Dispatch<React.SetStateAction<PrintingFormValues>>;
}

const Printing: React.FC<PrintingProps> = ({
  tableData,
  formValues,
  setTableData,
  setFormValues,
}) => {
  const { printingSaveFormData,printingFormErrors,printingDataTouched } = useSelector(
    (state: RootState) => state.masterData
  );
  const {
    printingInkStatinData,
    printingMachineSettings,
    printingSubstrateSettings,
  } = useSelector((state: RootState) => state.viewMasterData);
  const dispatch = useDispatch<AppDispatch>();

  const columns = [
    { id: "station_no", label: "Station No" },
    { id: "color_pantone", label: "Color Pantone Code", edit: true },
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

  const [errors, setErrors] = useState<PrintingFormErrors>({
    mounting_tape: "",
    cylinder_teeth: "",
    tension: "",
    unwinder: "",
    infeed: "",
    outfeed: "",
    rewinder: "",
    static_charge: "",
    format_correct: "",
    substrate_type: "",
    supplier: "",
    dyne_level: "",
    width: "",
    thickness: "",
    density: "",
  });

  function sanitizeMasterData(data: any): PrintingFormValues {
    return {
      printingDetails: {
        mounting_tape: data?.mounting_tape || "",
        cylinder_teeth: Number(data?.cylinder_teeth) || 0,
        tension: Number(data?.tension) || 0,
        unwinder: Number(data?.unwinder) || 0,
        infeed: Number(data?.infeed) || 0,
        outfeed: Number(data?.outfeed) || 0,
        rewinder: Number(data?.rewinder) || 0,
        static_charge: Number(data?.static_charge) || 0,
        format_correct: Number(data?.format_correct) || 0,
      },
      printingSubstrateSettings: {
        print_substrate_id: data?.print_substrate_id || 1,
        machine_settings_id: data?.machine_settings_id || 1,
        substrate_type: data?.substrate_type || "",
        supplier: data?.supplier || "",
        dyne_level: data?.dyne_level || "",
        width: Number(data?.width) || 0,
        thickness: Number(data?.thickness) || 0,
        density: Number(data?.density) || 0,
      },
      stationWiseMetrics: Array.isArray(data)
        ? data
        : Array.from({ length: 10 }, (_, i) => ({
            station_no: i + 1,
            color_pantone: "",
            lf_value: 0,
            ink_supplier: "",
            lpcm: 0,
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
          })),
    };
  }

  const { id } = useParams();

  const handleChange = (
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    dispatch(setPrintingDataTouched(true))
    const newValue = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;

    const isNumberField = [
      "tension",
      "width",
      "density",
      "cylinder_teeth",
      "unwinder",
      "infeed",
      "outfeed",
      "static_charge",
      "format_correct",
      "dyne_level",
    ].includes(field);

    const isMachineField = machineFields.some((f) => f.id === field);
    const isSubstrateField = substrateFields.some((f) => f.id === field);

    const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/; // letters, numbers, spaces
    const onlyLettersRegex = /^[a-zA-Z\s]+$/; // only letters, spaces

    let errorMsg = "";

    if (isNumberField) {
      if (newValue === "0" || newValue === "") {
        errorMsg = "Value cannot be 0 or empty";
      } else if (!isNaN(Number(newValue))) {
        errorMsg = ""; // valid number
      } else {
        errorMsg = `Invalid number: "${newValue}"`;
      }
    } else if (field === "thickness") {
      if (typeof newValue === "string") {
        const trimmed = newValue.trim();
        if (trimmed === "") {
          errorMsg = "Thickness is required";
        } else if (!alphaNumericRegex.test(trimmed)) {
          errorMsg = "Thickness cannot contain special characters";
        }
      }
    } else if (typeof newValue === "string") {
      const trimmed = newValue.trim();
      if (trimmed === "") {
        errorMsg = `${field.replace(/_/g, " ")} is required`;
      } else if (!onlyLettersRegex.test(trimmed)) {
        errorMsg =
          "Only alphabets are allowed — no numbers or special characters";
      }
    }
const updatedErros = {
  ...errors,
  [field]: errorMsg
}
    setErrors(updatedErros);
    dispatch(setPrintngFormErros(updatedErros))

    const updatedFormData = {
      ...formValues,
      printingDetails: isMachineField
        ? { ...formValues.printingDetails, [field]: newValue }
        : formValues.printingDetails,
      printingSubstrateSettings: isSubstrateField
        ? { ...formValues.printingSubstrateSettings, [field]: newValue }
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
    const isMachineField = machineFields.some((f) => f.id === field.id);
    const isSubstrateField = substrateFields.some((f) => f.id === field.id);

    const value = isMachineField
      ? formValues.printingDetails[
          field.id as keyof typeof formValues.printingDetails
        ]
      : isSubstrateField
      ? formValues.printingSubstrateSettings[
          field.id as keyof typeof formValues.printingSubstrateSettings
        ]
      : "";

    const error = errors[field.id] || "";

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
        error={!!error}
        helperText={error}
      />
    );
  };


  useEffect(() => {
    if (printingSaveFormData) {
      setFormValues(printingSaveFormData);
      if (printingSaveFormData.stationWiseMetrics) {
        setTableData(printingSaveFormData.stationWiseMetrics);
      }
    }
    if(printingFormErrors){
      setErrors(printingFormErrors)
    }
  }, [printingSaveFormData,printingFormErrors]);

  useEffect(() => {
    if (id&&!printingDataTouched) {
      const machineValues = sanitizeMasterData(printingMachineSettings);
      const substrateValues = sanitizeMasterData(printingSubstrateSettings);
      const combinedValues: PrintingFormValues = {
        ...machineValues,
        printingSubstrateSettings: substrateValues.printingSubstrateSettings,
      };
      setFormValues(combinedValues);
      const sanitizedInkStationData = sanitizeMasterData(printingInkStatinData);
      const stationWiseMetrics: PrintingTableRow[] =
        sanitizedInkStationData.stationWiseMetrics;
      setTableData(stationWiseMetrics);
    }
  }, [
    id,
    printingInkStatinData,
    printingMachineSettings,
    printingSubstrateSettings,
  ]);

  useEffect(() => {
    const importantFields = [
      "static_charge",
      "format_correct",
      "substrate_type",
      "supplier",
    ] as (
      | keyof PrintingFormValues["printingDetails"]
      | keyof PrintingFormValues["printingSubstrateSettings"]
    )[];

    const hasErrors = importantFields.some((field) => {
      const isInPrintingDetails = field in formValues.printingDetails;
      const isInPrintingSubstrateSettings =
        field in formValues.printingSubstrateSettings;
    
      if (isInPrintingDetails) {
        const value = formValues.printingDetails[field as keyof PrintingFormValues["printingDetails"]];
        return (
          errors[field] !== "" ||
          value === "" ||
          value === null ||
          value === undefined
        );
      }
    
      if (isInPrintingSubstrateSettings) {
        const value = formValues.printingSubstrateSettings[field as keyof PrintingFormValues["printingSubstrateSettings"]];
        return (
          errors[field] !== "" ||
          value === "" ||
          value === null ||
          value === undefined
        );
      }
    
      return false;
    });
    dispatch(setSubmitAndPublishButtonPrinting(hasErrors));
    
  }, [formValues, errors]);

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
            id={"printing"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Printing;
