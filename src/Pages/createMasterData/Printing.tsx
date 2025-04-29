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
  setPrintingSave,
  setPrintngFormErros,
  setSavePrintingFormData,
  setSubmitAndPublishButtonPrinting,
} from "../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";

const machineFields = [
  {
    id: "printing_machine_name",
    label: "Printinting Machine Name",
    options: ["UVG-1","UVG-2","UVG-3","OMET","430","530"],
  },
  { id: "cylinder_teeth", label: "Cylinder Teeth" },
  { id: "tension", label: "Tension" },
  { id: "unwinder", label: "Unwinder",options:["1","2"] },
  { id: "infeed", label: "Infeed",options:["1","2"] },
  { id: "outfeed", label: "Outfeed" ,options:["1","2"]},
  { id: "rewinder", label: "Rewinder",options:["1","2"] },
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
  const { printingSaveFormData,printingFormErrors,printingDataTouched,printingDetails,printingTableValueVaidation,saveButtonPrintingData,savePrintingData } = useSelector(
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
    { id: "color_pantone", label: "Color Pantone Code", edit: true,required:true },
    { id: "lf_value", label: "LF Value", edit: true,required:true },
    {
      id: "ink_supplier",
      label: "Ink Supplier",
      editSelect: true,
      options: ["Siegwerk", "Flint Group"],
    },
    { id: "lpcm", label: "LPCM", edit: true,required:true },
    { id: "volume", label: "Volume", edit: true },
    { id: "uv_led", label: "UV/LED", isDropdown: true, options: ["LED", "UV"] },
    { id: "uv_led_intensity", label: "UV/LED Intensity", edit: true },
    { id: "mixing_on_gec", label: "Mixing On GEC", edit: true },
    { id: "mptl_code", label: "MPTL Code", edit: true },
    { id: "mounting_tape", label: "Mounting Tape", editSelect: true, options: ["Soft", "Medium","Hard"] },
  ];

  const [errors, setErrors] = useState<PrintingFormErrors>({
    cylinder_teeth: "",
    tension: "",
    static_charge: "",
    format_correct: "",
    dyne_level: "",
    width: "",
    thickness: "",
    density: "",
    color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mixing_on_gec:"",
            mptl_code:"",
            mounting_tape:""
  });

  function sanitizeMasterData(data: any): PrintingFormValues {
    return {
      printingDetails: {
        machine_settings_id:data?.machine_settings_id||0, job_master_id:data?.job_master_id||0,
        printing_machine_name: data?.printing_machine_name || "",
        cylinder_teeth: data?.cylinder_teeth !== undefined ? String(data.cylinder_teeth) : "",
        tension: data?.tension !== undefined ? String(data.tension) : "",
        unwinder: data?.unwinder !== undefined ? String(data.unwinder) : "",
        infeed: data?.infeed !== undefined ? String(data.infeed) : "",
        outfeed: data?.outfeed !== undefined ? String(data.outfeed) : "",
        rewinder: data?.rewinder !== undefined ? String(data.rewinder) : "",
        static_charge: data?.static_charge !== undefined ? String(data.static_charge) : "",
        format_correct: data?.format_correct !== undefined ? String(data.format_correct) : "",
      },      
      printingSubstrateSettings: {
        print_substrate_id: data?.print_substrate_id || "",
        machine_settings_id: data?.machine_settings_id || "",
        substrate_type: data?.substrate_type || "",
        supplier: data?.supplier || "",
        dyne_level: data?.dyne_level || "",
        width:data?.width !==undefined ? String(data.width) : "",
        thickness: data?.thickness!==undefined ? String(data.thickness) : "",
        density: data?.density!==undefined ? String(data.density) : "",
      },
      stationWiseMetrics: Array.isArray(data)
        ? data
        : Array.from({ length: 10 }, (_, i) => ({
            station_no: i + 1,
            color_pantone: "",
            lf_value: "",
            ink_supplier: "",
            lpcm: "",
            volume: "",
            uv_led: "",
            uv_led_intensity: "",
            mixing_on_gec:"",
            mptl_code:"",
            mounting_tape:""
          })),
    };
  }

  const { id } = useParams();

  const handleChange = (
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    if(id){
    dispatch(setPrintingDataTouched(true));
    }
    const newValue = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;
  
    // Fields that should be saved as numbers
    const isNumberField = [
      "thickness",
      "width",
      "density",
      "tension",
      "unwinder",
      "infeed",
      "outfeed",
      "rewinder",
      "static_charge",
      "format_correct",
      "cylinder_teeth",
      "dyne_level"

    ].includes(field);
  
    // Machine and substrate field checks
    const isMachineField = machineFields.some((f) => f.id === field);
    const isSubstrateField = substrateFields.some((f) => f.id === field);
  
    // Regex for validation
    const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/; // letters, numbers, spaces
    const onlyLettersRegex = /^[a-zA-Z\s]+$/; // only letters, spaces
  
    let errorMsg = "";
    let finalValue: string | number | string[] = newValue;
    // Validate number fields
    if (isNumberField) {
      // Check for empty or zero value
      if (newValue === "0" || newValue === "") {
        errorMsg = "Value cannot be 0 or empty";
      }
      // Ensure newValue is a string before calling match
      else if (typeof newValue === 'string') {
        const regex = /^(\d+(\.\d+)?)(%)?$/;
        const match = newValue.match(regex);
    
        if (match) {
          // No conversion to decimal, just keep the value as-is
          finalValue = newValue; // Keep it as a string with or without percentage
    
          errorMsg = ""; // Valid number or percentage
        } else {
          errorMsg = "Invalid number or percentage";
        }
      } else {
        errorMsg = "Invalid input: Expected a string, but got an array.";
      }
    }
    
    
     else if (field === "thickness") {
      // Validate thickness field (assumed to be string with no special characters)
      if (typeof newValue === "string") {
        const trimmed = newValue.trim();
        if (trimmed === "") {
          errorMsg = "Thickness is required";
        } else if (!alphaNumericRegex.test(trimmed)) {
          errorMsg = "Thickness cannot contain special characters";
        }
      }
    } else if (typeof newValue === "string") {
      // For other string-based fields
      const trimmed = newValue.trim();
      if (trimmed === "") {
        errorMsg = `${field.replace(/_/g, " ")} is required`;
      } else if (!onlyLettersRegex.test(trimmed)) {
        errorMsg =
          "Only alphabets are allowed — no numbers or special characters";
      }
    }
  
    // Set the error message for the field
    const updatedErros = {
      ...errors,
      [field]: errorMsg,
    };
  
    setErrors(updatedErros);
    dispatch(setPrintngFormErros(updatedErros));
  
    // Update form data with new value (whether number or string)
    const updatedFormData = {
      ...formValues,
      printingDetails: isMachineField
        ? { ...formValues.printingDetails, [field]: finalValue }
        : formValues.printingDetails,
      printingSubstrateSettings: isSubstrateField
        ? { ...formValues.printingSubstrateSettings, [field]: finalValue }
        : formValues.printingSubstrateSettings,
    };
  
    // Save the updated form data
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
          required={field.label==='Supplier'?false:true}
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
        required={field.label==='Static Charge' ||field.label==='Format Correct' ?false:true}
      />
    );
  };
  useEffect(()=>{
    if(id&&location.pathname.includes('/updateMasterData')){
      setFormValues(printingDetails)
    }},[])

  useEffect(() => {
    if (!id && printingSaveFormData) {
      setFormValues(printingSaveFormData);
      if (!id && printingSaveFormData.stationWiseMetrics) {
        setTableData(printingSaveFormData.stationWiseMetrics);
      }
    }
    if( printingFormErrors){
      setErrors(printingFormErrors)
    }
    if(!id && saveButtonPrintingData && savePrintingData ){
      setFormValues(savePrintingData)
    }
  }, [printingSaveFormData,printingFormErrors,id,savePrintingData,saveButtonPrintingData]);

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


  const importantFields = [
    "printing_machine_name",
    "cylinder_teeth",
    "tension",
    "unwinder",
    "rewinder",
    "infeed",
    "outfeed",
    "substrate_type",
    "dyne_level",
    "width",
    "thickness",
    "density",
    "color_pantone",
    "lf_value",
    "lpcm",
  ];
  
  
  useEffect(() => {
    let isInvalid = false;
  
    // 1️⃣ Loop through importantFields only for empty or missing values
    for (const field of importantFields) {
  
      if (["static_charge", "format_correct", "cylinder_teeth"].includes(field)) {
        const value = formValues.printingDetails[field as keyof typeof formValues.printingDetails];
  
        if (value === "" || value === null || value === undefined) {
          isInvalid = true;
          break;
        }
  
      } else if (["substrate_type", "supplier"].includes(field)) {
        const value = formValues.printingSubstrateSettings[field as keyof typeof formValues.printingSubstrateSettings];
  
        if (value === "" || value === null || value === undefined) {
          isInvalid = true;
          break;
        }
  
      } 
      else if (["color_pantone", "lpcm", "lf_value"].includes(field)) {
        const hasEmpty = formValues.stationWiseMetrics.some((station: any) => {
          const value = station?.[field];
          return value === "" || value === null || value === undefined;
        });
  
        if (hasEmpty) {
          isInvalid = true;
          break;
        }
      }

    }
    
  
    // 2️⃣ Check if any field inside errors has any value (deep check)
    const hasErrors =
    Object.values(errors).some(error => error) ;

    // 3️⃣ Set button state
    if (isInvalid && hasErrors && printingTableValueVaidation) {
      dispatch(setSubmitAndPublishButtonPrinting(true));
    } else {
      dispatch(setSubmitAndPublishButtonPrinting(false));  
    }
  }, [formValues, errors]);
  
  
  
  useEffect(() => {
    const importantFields = [
      "static_charge",
      "format_correct",
      "substrate_type",
      "supplier",
      "printing_machine_name",
      "cylinder_teeth",
      "tension",
      "unwinder",
      "infeed",
      "outfeed",
      "rewinder",
      "dyne_level",
      "width",
      "thickness",
      "density",
      "color_pantone",
      "lpcm",
      "lf_value",
      "ink_supplier",
      "volume",
      "uv_led",
      "uv_led_intensity",
      "mixing_on_gec",
      "mptl_code",
      "mounting_tape",
    ] as (
      | keyof PrintingFormValues["printingDetails"]
      | keyof PrintingFormValues["printingSubstrateSettings"]
      | keyof PrintingFormValues["stationWiseMetrics"][number]
    )[];
  
    const isAnyFieldFilled = importantFields.some((field) => {
      if (field in formValues.printingDetails) {
        const value = formValues.printingDetails[field as keyof PrintingFormValues["printingDetails"]];

        if (typeof value === "string") return value.trim() !== "";
        return value !== null && value !== undefined;
      }
  
      if (field in formValues.printingSubstrateSettings) {
        const value = formValues.printingSubstrateSettings[field as keyof PrintingFormValues["printingSubstrateSettings"]];

        if (typeof value === "string") return value.trim() !== "";
        return value !== null && value !== undefined;
      }
  
      const stationResult = formValues.stationWiseMetrics.some((station) => {
        if (field in station) {
          const value = station[field as keyof typeof station];

          if (typeof value === "string") return value.trim() !== "";
          return value !== null && value !== undefined;
        }
        return false;
      });
  
      return stationResult;
    });
  
    const hasErrors = Object.values(errors).some((error) => error);
  
    const isSaveEnabled = !(isAnyFieldFilled || hasErrors )|| printingTableValueVaidation;
    
    dispatch(setPrintingSave(isSaveEnabled));
    
  }, [formValues, errors, dispatch]);
  
  

  
  
  
  console.log(tableData,"TABLEDATA")
  
  
  
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
