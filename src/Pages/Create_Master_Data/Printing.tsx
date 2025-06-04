import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import { useEffect, useState } from "react";
import {
  setPrintingDropDownValues,
  setPrintingDataTouched,
  setPrintingSave,
  setPrintngFormErros,
  setSavePrintingFormData,
  setSubmitAndPublishButtonPrinting,
  setMountinTapeDropDownValues,
  setSupplierPrintingDropDownValues,
} from "../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";
import {
  PrintingFormErrors,
  PrintingFormValues,
  PrintingTableRow,
} from "../../store/slices/masterDataInterface";
import DropdownTextComponent from "../../Components/ReUsable/DropdownText";
import {
  useGetMachinesByTypeQuery,
  useMountingTapesDropdownMutation,
  useSubStrateDropDownMutation,
  useSupplierDropdownMutation,
} from "../../store/apis/genericApis";

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
  const dispatch = useDispatch<AppDispatch>();

  const [subStrateDropDown] = useSubStrateDropDownMutation();
  const { data: machineNameData } = useGetMachinesByTypeQuery("printing");
  const [formInitialized, setFormInitialized] = useState(false);
  const [supplierDropdown] = useSupplierDropdownMutation();

  useEffect(() => {
    const fetchDropdownValues = async () => {
      const response = await subStrateDropDown({
        substrate: "",
        substrateType: "printing",
      }).unwrap();
      const substrateList = response?.data?.map((item: any) => item.substrate);
      dispatch(setPrintingDropDownValues(substrateList));
    };

    fetchDropdownValues();
  }, [subStrateDropDown, dispatch]);

  useEffect(() => {
    const fetchDropdownValues = async () => {
      const response = await supplierDropdown({
        supplier: "",
        supplier_type: "printing",
      }).unwrap();
      const supplierList = response?.data?.map((item: any) => item.supplier);
      dispatch(setSupplierPrintingDropDownValues(supplierList));
    };

    fetchDropdownValues();
  }, [supplierDropdown, dispatch]);

  const machineNames =
    machineNameData?.statusCode === 200
      ? machineNameData?.data?.map((item: any) => item.machineName)
      : [];

  const {
    printingSaveFormData,
    printingFormErrors,
    printingDataTouched,
    printingDetails,
    printingTableValueVaidation,
    saveButtonPrintingData,
    savePrintingData,
    dropDownValuesPrinting,
    dropDownValuesMountingTape,
    dropDownValuesSupplierPrinting,
  } = useSelector((state: RootState) => state.masterData);

   const updateButtonAction = localStorage.getItem("updateButton");

  const machineFields = [
    {
      id: "printing_machine_name",
      label: "Printinting Machine Name",
      options: machineNames,
    },
    { id: "cylinder_teeth", label: "Cylinder Teeth" },
    { id: "tension", label: "Tension" },
    { id: "unwinder", label: "Unwinder", options: ["110", "6"] },
    { id: "infeed", label: "Infeed", options: ["110", "5"] },
    { id: "outfeed", label: "Outfeed", options: ["120", "8"] },
    { id: "rewinder", label: "Rewinder", options: ["50%", "7.5"] },
    { id: "static_charge", label: "Static Charge" },
    { id: "format_correct", label: "Format Correct" },
  ];

  const substrateFields = [
    {
      id: "substrate_type",
      label: "Substrate Type",
      options: dropDownValuesPrinting,
      allowTextFiled: true,
    },
    {
      id: "supplier",
      label: "Supplier",
      options: dropDownValuesSupplierPrinting,
      allowTextFiled: true,
    },
    { id: "dyne_level", label: "Dyne Level" },
    { id: "width", label: "Width (mm)" },
    { id: "thickness", label: "Thickness" },
    { id: "density", label: "Density (g/cm³)" },
  ];

  const {
    printingInkStatinData,
    printingMachineSettings,
    printingSubstrateSettings,
  } = useSelector((state: RootState) => state.viewMasterData);

  const [mountingTapesDropdown] = useMountingTapesDropdownMutation();

  useEffect(() => {
    const fetchDropdownValues = async () => {
      const response = await mountingTapesDropdown({
        mounting_tape: "",
      }).unwrap();
      const mountingTapeList = response?.data?.map(
        (item: any) => item.mounting_tape
      );
      dispatch(setMountinTapeDropDownValues(mountingTapeList));
    };

    fetchDropdownValues();
  }, [mountingTapesDropdown, dispatch]);

  const columns = [
    { id: "station_no", label: "Station No" },
    { id: "color_pantone", label: "Color Pantone Code", edit: true },
    { id: "lf_value", label: "LF Value", edit: true },
    {
      id: "ink_supplier",
      label: "Ink Supplier",
      editSelect: true,
      options: dropDownValuesSupplierPrinting,
      onNewOptionAdd: true,
      field: "ink_supplier",
    },
    { id: "lpcm", label: "LPCM", edit: true },
    { id: "volume", label: "Volume", edit: true },
    { id: "uv_led", label: "UV/LED", isDropdown: true, options: ["LED", "UV"] },
    { id: "uv_led_intensity", label: "UV/LED Intensity", edit: true },
    { id: "mixing_on_gec", label: "Mixing On GEC", edit: true },
    { id: "mptl_code", label: "MPTL Code", edit: true },
    {
      id: "mounting_tape",
      label: "Mounting Tape",
      editSelect: true,
      options: dropDownValuesMountingTape,
      onNewOptionAdd: true,
      field: "mounting_tape",
    },
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
    mixing_on_gec: "",
    mptl_code: "",
    mounting_tape: "",
  });

  function sanitizeMasterData(data: any): PrintingFormValues {
    return {
      printingDetails: {
        machine_settings_id: data?.machine_settings_id || 0,
        job_master_id: data?.job_master_id || 0,
        printing_machine_name: data?.printing_machine_name || "",
        cylinder_teeth:
          data?.cylinder_teeth !== undefined ? String(data.cylinder_teeth) : "",
        tension: data?.tension !== undefined ? String(data.tension) : "",
        unwinder: data?.unwinder !== undefined ? String(data.unwinder) : "",
        infeed: data?.infeed !== undefined ? String(data.infeed) : "",
        outfeed: data?.outfeed !== undefined ? String(data.outfeed) : "",
        rewinder: data?.rewinder !== undefined ? String(data.rewinder) : "",
        static_charge:
          data?.static_charge !== undefined ? String(data.static_charge) : "",
        format_correct:
          data?.format_correct !== undefined ? String(data.format_correct) : "",
      },
      printingSubstrateSettings: {
        print_substrate_id: data?.print_substrate_id || "",
        machine_settings_id: data?.machine_settings_id || "",
        substrate_type: data?.substrate_type || "",
        supplier: data?.supplier || "",
        dyne_level: data?.dyne_level || "",
        width: data?.width !== undefined ? String(data.width) : "",
        thickness: data?.thickness !== undefined ? String(data.thickness) : "",
        density: data?.density !== undefined ? String(data.density) : "",
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
            mixing_on_gec: "",
            mptl_code: "",
            mounting_tape: "",
          })),
    };
  }

  const { id } = useParams();

  const handleChange = (
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    if (id) {
      dispatch(setPrintingDataTouched(true));
    }

    let newValue = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;
    if (field === "supplier" || field === "substrate_type") {
      if (Array.isArray(newValue)) {
        // Remove empty strings, trim, then join if needed
        newValue = newValue
          .filter(Boolean)
          .map((v) => v.trim())
          .join(" ");
      }
    }

    const isNumberField = [
      "width",
      "density",
      "unwinder",
      "infeed",
      "outfeed",
      "dyne_level",
      "tension",
      "lf_value",
    ].includes(field);

    const isMachineField = machineFields.some((f) => f.id === field);
    const isSubstrateField = substrateFields.some((f) => f.id === field);
    const onlyLettersRegex = /^[a-zA-Z\s]+$/; // only letters, spaces

    let errorMsg = "";
    let finalValue: string | number | string[] = newValue;

    // Validate number fields
    if (isNumberField) {
      const stringValue = newValue.toString().trim();

      // Allow "0" or "0.0" or other decimal values
      if (stringValue === "0" || stringValue === "0.0" || stringValue === "") {
        finalValue = stringValue; // Allow 0 and empty
        errorMsg = ""; // No error
      }
      if (isNumberField) {
  if (newValue === "" || newValue === null || isNaN(Number(newValue))) {
    errorMsg = `${field.replace(/_/g, " ")} is required`;
  }
}
      else {
        // Regex to validate decimal or percentage with optional "%"
        const regex = /^(\d+(\.\d+)?)(%)?$/;
        const match = stringValue.match(regex);

        if (match) {
          finalValue = stringValue; // Keep the value as a string with or without percentage
          errorMsg = ""; // Valid number or percentage
        } else {
          errorMsg = "Invalid number or percentage";
        }
      }
    }

    // Validate thickness field (alphanumeric check)
    else if (field === "thickness") {
      const trimmed = (newValue as string).trim();

      if (trimmed === "") {
        errorMsg = "Thickness cannot be empty.";
        finalValue = "";
      } else if (!/^[a-zA-Z0-9.\- ]+$/.test(trimmed)) {
        errorMsg = "Thickness must be alphanumeric.";
      } else {
        errorMsg = "";
        finalValue = trimmed;
      }
    }
    // For other string-based fields
    else if (typeof newValue === "string") {
       const trimmed = newValue.trim();
  const skipRequiredFields = ["static_charge", "format_correct"];
console.log(trimmed,field,"TRIMMEDVALUE")
  if (trimmed === "" && !skipRequiredFields.includes(field)) {
    errorMsg = `${field.replace(/_/g, " ")} is required`;
  }  else if (
        !onlyLettersRegex.test(trimmed) &&
        field !== "cylinder_teeth" &&
        field !== "tension" &&
        field !== "format_correct" &&
        field !== "static_charge" &&
        field !== "printing_machine_name" &&
        field !== "rewinder" &&
        field !== "substrate_type"
      ) {
        errorMsg =
          "Only alphabets are allowed — no numbers or special characters";
      }
    }

    // Update errors
    const updatedErrors = { ...errors };

    if (field !== "printing_machine_name") {
      updatedErrors[field] = errorMsg;
    } else {
      delete updatedErrors[field]; // Remove error if no issues
    }

    if (field !== "supplier") {
      updatedErrors[field] = errorMsg;
    } else {
      delete updatedErrors[field]; // Remove error if no issues
    }

    setErrors(updatedErrors);
    dispatch(setPrintngFormErros(updatedErrors));

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
  const hasVisited = localStorage.getItem("hasVisitedPrintingDetails");

  useEffect(() => {
    localStorage.setItem("hasVisitedPrintingDetails", "false");
    if (!hasVisited && id && updateButtonAction==='false') {
      dispatch(setPrintingDataTouched(false));
      localStorage.setItem("hasVisitedPrintingDetails", "true");
    } else if (hasVisited && !id) {
      dispatch(setPrintingDataTouched(false));
    } else if (updateButtonAction==='true' && !hasVisited && id) {
      dispatch(setPrintingDataTouched(false));
      localStorage.setItem("hasVisitedPrintingDetails", "true");
    }
  }, [id]);

  const renderField = (field: {
    id: string;
    label: string;
    options?: string[];
    allowTextFiled?: boolean;
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

    if (field.options && !field.allowTextFiled) {
      return (
        <DropdownComponent
          key={field.id}
          label={field.label}
          value={String(value)} // force to string
          onChange={(val) => handleChange(field.id, val)}
          options={field.options}
          isMultiSelect={false}
          checkbox={false}
          required={field.label === "Supplier" ? false : true}
        />
      );
    }
    if (field.allowTextFiled) {
      return (
        <DropdownTextComponent
          key={field.id}
          label={field.label}
          value={String(value)} // force to string
          onChange={(val) => handleChange(field.id, val)}
          options={field.options ? field.options : []}
          isMultiSelect={false}
          checkbox={false}
          allowNewOption
          dropdown={field.label === "Supplier" ? "supplier" : ""}
          required={field.label === "Supplier" ? false : true}
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
        required={
          field.label === "Static Charge" || field.label === "Format Correct"
            ? false
            : true
        }
      />
    );
  };
  useEffect(() => {
    if (formInitialized) return;
    if (
      id &&
      location.pathname.includes("/updateMasterData") &&
      !printingDataTouched
    ) {
      setFormValues(printingDetails);
      setTableData(printingDetails.stationWiseMetrics);
      setFormInitialized(true);
    }
  }, [id, printingDetails, formInitialized]);

  useEffect(() => {
    if (formInitialized) return;
    if (!id && printingSaveFormData) {
      setFormValues(printingSaveFormData);
      setFormInitialized(true);
      if (!id && printingSaveFormData.stationWiseMetrics) {
        setTableData(printingSaveFormData.stationWiseMetrics);
        setFormInitialized(true);
      }
    }
    if (printingFormErrors) {
      setErrors(printingFormErrors);
      setFormInitialized(true);
    }
    if (!id && saveButtonPrintingData && savePrintingData) {
      setFormValues(savePrintingData);
      setFormInitialized(true);
    }
  }, [
    printingSaveFormData,
    printingFormErrors,
    id,
    savePrintingData,
    saveButtonPrintingData,
    formInitialized,
  ]);

  useEffect(() => {
    if (id && !printingDataTouched) {
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
      "printing_machine_name",
      "cylinder_teeth",
      "tension",
      "unwinder",
      "rewinder",
      "infeed",
      "outfeed",
      "dyne_level",
      "width",
      "thickness",
      "density",
    ] as (
      | keyof PrintingFormValues["printingDetails"]
      | keyof PrintingFormValues["printingSubstrateSettings"]
      | keyof PrintingFormValues["stationWiseMetrics"][number]
    )[];
    const isAllFieldFilled = importantFields.every((field) => {
      if (field in formValues.printingDetails) {
        const value =
          formValues.printingDetails[
            field as keyof PrintingFormValues["printingDetails"]
          ];

        if (typeof value === "string") return value.trim() !== "";
        return value !== null && value !== undefined;
      }

      if (field in formValues.printingSubstrateSettings) {
        const value =
          formValues.printingSubstrateSettings[
            field as keyof PrintingFormValues["printingSubstrateSettings"]
          ];

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
    const shouldDisableButton =
      !isAllFieldFilled || hasErrors || printingTableValueVaidation;
    dispatch(setSubmitAndPublishButtonPrinting(shouldDisableButton));
     dispatch(setPrintingSave(shouldDisableButton));
  }, [formValues, errors, printingTableValueVaidation]);

  // useEffect(() => {
  //   const importantFields = [
  //     "static_charge",
  //     "format_correct",
  //     "substrate_type",
  //     "supplier",
  //     "printing_machine_name",
  //     "cylinder_teeth",
  //     "tension",
  //     "unwinder",
  //     "infeed",
  //     "outfeed",
  //     "rewinder",
  //     "dyne_level",
  //     "width",
  //     "thickness",
  //     "density",
  //     "color_pantone",
  //     "lpcm",
  //     "lf_value",
  //     "ink_supplier",
  //     "volume",
  //     "uv_led",
  //     "uv_led_intensity",
  //     "mixing_on_gec",
  //     "mptl_code",
  //     "mounting_tape",
  //   ] as (
  //     | keyof PrintingFormValues["printingDetails"]
  //     | keyof PrintingFormValues["printingSubstrateSettings"]
  //     | keyof PrintingFormValues["stationWiseMetrics"][number]
  //   )[];

  //   const isAnyFieldFilled = importantFields.some((field) => {
  //     if (field in formValues.printingDetails) {
  //       const value =
  //         formValues.printingDetails[
  //           field as keyof PrintingFormValues["printingDetails"]
  //         ];

  //       if (typeof value === "string") return value.trim() !== "";
  //       return value !== null && value !== undefined;
  //     }

  //     if (field in formValues.printingSubstrateSettings) {
  //       const value =
  //         formValues.printingSubstrateSettings[
  //           field as keyof PrintingFormValues["printingSubstrateSettings"]
  //         ];

  //       if (typeof value === "string") return value.trim() !== "";
  //       return value !== null && value !== undefined;
  //     }

  //     const stationResult = formValues.stationWiseMetrics.some((station) => {
  //       if (field in station) {
  //         const value = station[field as keyof typeof station];

  //         if (typeof value === "string") return value.trim() !== "";
  //         return value !== null && value !== undefined;
  //       }
  //       return false;
  //     });

  //     return stationResult;
  //   });

  //   const hasErrors = Object.values(errors).some((error) => error);

  //   const isSaveEnabled =
  //     !isAnyFieldFilled || hasErrors || printingTableValueVaidation;
  //   dispatch(setPrintingSave(isSaveEnabled));
  // }, [formValues, errors, dispatch]);

  return (
    <Box sx={{ borderRadius: "0px" }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
     <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <Typography sx={{ color: "#2F2F2F", fontWeight: 600, fontSize: "16px" }}>
    Machine Settings
  </Typography>

  <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
    KLD:{" "}
    <Box
      component="span"
      sx={{
        backgroundColor: "#E3F2FD", 
        color: "#1976d2",          
        px: 1,
        py: 0.3,
        borderRadius: "4px",
        fontWeight: 600,
        fontSize: "14px",
        ml: 0.5,
      }}
    >
      12345
    </Box>
  </Typography>
</Box>


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
            setFormData={setFormValues}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Printing;
