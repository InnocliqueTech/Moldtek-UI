import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ReusableInput from "../../Components/ReUsable/TextField";
import { useEffect, useState } from "react";
import {
  setLaminationDataTouched,
  setLaminationFormData,
  setLaminationFormErros,
  setLaminationSave,
  setlaminationDropDownValues,
  setSubmitAndPublishButtonMasterLamination,
  setSupplieraminationDropDownValues,
} from "../../store/slices/masterDataSlice";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { useParams } from "react-router-dom";
import {
  LaminatingTableRow,
  LaminationFormData,
  LaminationFormErrors,
} from "../../store/Interfaces/masterDataTypes";
import DropdownTextComponent from "../../Components/ReUsable/DropdownText";
import {
  useSubStrateDropDownMutation,
  useSupplierDropdownMutation,
} from "../../store/apis/genericApis";

interface LaminationProps {
  tableData: LaminatingTableRow[];
  setTableData: React.Dispatch<React.SetStateAction<LaminatingTableRow[]>>;
  formData: LaminationFormData;
  setFormData: React.Dispatch<React.SetStateAction<LaminationFormData>>;
}

const Lamination: React.FC<LaminationProps> = ({
  tableData,
  setTableData,
  setFormData,
  formData,
}) => {
  const {
    laminaionFormData,
    laminationFormErrors,
    laminationDataTouched,
    laminatingDetails,
    laminationTableValueVaidation,
    saveButtonLaminatingData,
    saveLaminatingData,
    dropDownValuesLamination,
    dropDownValuesSupplierLamination,
  } = useSelector((state: RootState) => state.masterData);
  const {
    laminatingSubstrateSettings,
    laminationAdhesive,
    laminationSettings,
  } = useSelector((state: RootState) => state.viewMasterData);
  const dispatch = useDispatch<AppDispatch>();
  const [formInitialized, setFormInitialized] = useState(false);

 const updateButtonAction = localStorage.getItem("updateButton");

  const bondingMaterialColumns = [
    { id: "type", label: "Field" },
    {
      id: "code",
      label: "Code",
      editable: true,
      isDropdown: true,
      options: ["1009N"],
    },
    {
      id: "brand",
      label: "Brand",
      editable: true,
      isDropdown: true,
      options: ["BOISTIK"],
    },
    {
      id: "ratio",
      label: "Ratio",
      editable: true,
      required: true,
    },
  ];

  const [errors, setErrors] = useState<LaminationFormErrors>({
    zone1_temp: "",
    zone2_temp: "",
    nip_pressure_bar: "",
    speed: "",
    lami_set_tension: "",
    rewinder_tension: "",
    printed_film_tension: "",
    laminate_film_tension: "",
    viscosity_range: "",
    adhesive_gsm: "",
    substrate_type: "",
    supplier: "",
    dyne_level: "",
    width: "",
    thickness: "",
    density: "",
  });
  function sanitizeMasterData(data: any): LaminationFormData {
    return {
      laminationConditions: {
        lamination_id: data?.lamination_id || 0,
        job_master_id: data?.job_master_id || 0,
        zone1_temp: data?.zone1_temp || 0,
        zone2_temp: data?.zone2_temp || 0,
        nip_pressure_bar: data?.nip_pressure_bar || 0,
        speed: data?.speed || 0,
        lami_set_tension: data?.lami_set_tension || "",
        rewinder_tension: data?.rewinder_tension || "",
        printed_film_tension: data?.printed_film_tension || "",
        laminate_film_tension: data?.laminate_film_tension || "",
        viscosity_range: data?.viscosity_range || "",
        adhesive_gsm: data?.adhesive_gsm || "",
      },
      laminationSubstrate: {
        substrate_id: data?.substrate_id,
        lamination_id: data?.lamination_id || 0,
        substrate_type: data?.substrate_type || "",
        supplier: data?.supplier || "",
        dyne_level: data?.dyne_level || "",
        width: data?.width || "",
        thickness: data?.thickness || "",
        density: data?.density || "",
      },
      bondingMaterials: data || [
        { type: "Adhesive", code: "", brand: "", ratio: 0 },
        { type: "Hardner", code: "", brand: "", ratio: 0 },
        { type: "Ethyl", code: "", brand: "", ratio: 0 },
      ],
    };
  }

  const { id } = useParams();

  const numericFields = new Set([
    "zone1_temp",
    "zone2_temp",
    "nip_pressure_bar",
    "speed",
    "width",
    "density",
    "ratio",
    "printed_film_tension",
    "laminate_film_tension",
    "lami_set_tension",
    "rewinder_tension",
    "adhesive_gsm",
    "dyne_level",
  ]);

  const characterFields = new Set(["viscosity_range", "type", "code", "brand"]);

  const handleChange = (
    section: string,
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    if (id) {
      dispatch(setLaminationDataTouched(true));
    }

    // Extract value from the input
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

    let finalValue: string | string[] | number = newValue;
    let errorMessage = "";

    const onlyAlphanumericRegex = /^[A-Za-z0-9\s]+$/;

    // Handle specific fields
    if (field === "thickness") {
      const trimmed = (newValue as string).trim();

      if (trimmed === "") {
        errorMessage = "Thickness cannot be empty.";
        finalValue = "";
      } else if (!/^[a-zA-Z0-9.\- ]+$/.test(trimmed)) {
        errorMessage = "Thickness must be alphanumeric.";
      } else {
        errorMessage = "";
        finalValue = trimmed;
      }
    } else if (field === "substrate_type") {
      const trimmed = (newValue as string).trim();
      if (trimmed === "") {
        errorMessage = "Substrate type cannot be empty.";
        finalValue = "";
      } else {
        errorMessage = "";
        finalValue = trimmed;
      }
    } else if (
      [
        "lami_set_tension",
        "rewinder_tension",
        "printed_film_tension",
        "laminate_film_tension",
        "adhesive_gsm",
        "width",
        "density",
        "dyne_level",
      ].includes(field)
    ) {
      const trimmed = (newValue as string).trim();

      if (trimmed === "") {
        errorMessage = `${field.replace(/_/g, " ")} cannot be empty.`;
      } else if (!/^\d+(\.\d+)?$/.test(trimmed)) {
        errorMessage = `${field.replace(/_/g, " ")} must be a valid number.`;
      } else {
        finalValue = Number(trimmed); // Save as number
        errorMessage = "";
      }
    } else if (numericFields.has(field)) {
      const trimmed = (newValue as string).trim();

      // Match for valid number or percentage (e.g., 12, 12.5, 12%, 12.5%, 0, 0.0)
      const percentageMatch = trimmed.match(/^(\d+(\.\d+)?)(%)?$/);

      // Allow empty, zero, or "0.0" as valid entries
      if (trimmed === "" || trimmed === "0" || trimmed === "0.0") {
        finalValue = trimmed === "0" || trimmed === "0.0" ? 0 : ""; // Set to 0 or empty when cleared, zero, or 0.0
      } else if (!percentageMatch) {
        // If the value doesn't match the valid number or percentage pattern
        finalValue = trimmed; // Keep the original string value (invalid input)
        errorMessage = `${field.replace(
          /_/g,
          " "
        )} must be a valid number or percentage.`; // Invalid number error
      } else {
        const numericPart = parseFloat(percentageMatch[1]); // Get numeric part (without the % sign)

        // If the parsed number is NaN, treat it as invalid
        if (isNaN(numericPart)) {
          finalValue = trimmed; // Retain as string
          errorMessage = `${field.replace(/_/g, " ")} must be a valid number.`; // Error for invalid number
        } else {
          finalValue = numericPart; // Save as numeric value
          errorMessage = ""; // Clear the error if input is valid
        }
      }
    } else if (characterFields.has(field)) {
      const trimmed = (newValue as string).trim();

      if (trimmed === "") {
        errorMessage = "This field cannot be empty.";
        finalValue = "";
      } else if (!onlyAlphanumericRegex.test(trimmed)) {
        errorMessage =
          "Only letters, numbers, spaces, dots, hyphens, and underscores are allowed.";
      } else {
        finalValue = newValue;
        errorMessage = "";
      }
    }

    // Dispatch the errors to Redux
    const updatedErrors = {
      ...errors,
      [field]: errorMessage,
    };
    setErrors(updatedErrors);
    dispatch(setLaminationFormErros(updatedErrors));

    // Save to the form data and dispatch to Redux
    const updatedFormData = {
      ...formData,
      [section]: {
        ...(formData as any)[section],
        [field]: numericFields.has(field)
          ? newValue // Save numeric fields as numbers
          : finalValue, // Otherwise, save the string value
      },
    };

    setFormData(updatedFormData);
    dispatch(setLaminationFormData(updatedFormData));
  };

  useEffect(() => {
    const importantFields = [
      "zone1_temp",
      "zone2_temp",
      "nip_pressure_bar",
      "speed",
      "lami_set_tension",
      "rewinder_tension",
      "printed_film_tension",
      "laminate_film_tension",
      "viscosity_range",
      "adhesive_gsm",

      "substrate_type",

      "dyne_level",
      "width",
      "thickness",
      "density",
    ] as (
      | keyof LaminationFormData["laminationConditions"]
      | keyof LaminationFormData["laminationSubstrate"]
      | keyof LaminationFormData["bondingMaterials"][number]
    )[];

    const isAllFieldFilled = importantFields.every((field) => {
      if (field in formData.laminationConditions) {
        const value =
          formData.laminationConditions[
            field as keyof LaminationFormData["laminationConditions"]
          ];

        if (typeof value === "string") return value.trim() !== "";
        return value !== null && value !== undefined;
      }

      if (field in formData.laminationSubstrate) {
        const value =
          formData.laminationSubstrate[
            field as keyof LaminationFormData["laminationSubstrate"]
          ];

        if (typeof value === "string") return value.trim() !== "";
        return value !== null && value !== undefined;
      }
    });
    let allValid = false;
    const bondingMaterials = Array.isArray(formData?.bondingMaterials)
      ? formData.bondingMaterials
      : [];
    if (bondingMaterials.length > 0) {
      const hasEmptyRatio = bondingMaterials?.some(
        (item) =>
          item.ratio === "" || item.ratio === null || item.ratio === undefined
      );

      const firstTwoInvalid = bondingMaterials
        .slice(0, 1)
        .some(
          (item) =>
            !item.code ||
            !item.brand ||
            item.ratio === "" ||
            item.ratio === null ||
            item.ratio === undefined
        );

      const thirdItem = bondingMaterials[2];
      let thirdInvalid = false;
      if (thirdItem) {
        const isEthyl = thirdItem.type?.toLowerCase() === "ethyl";
        if (isEthyl) {
          thirdInvalid =
            thirdItem.ratio === "" ||
            thirdItem.ratio === null ||
            thirdItem.ratio === undefined;
        } else {
          thirdInvalid =
            !thirdItem.code ||
            !thirdItem.brand ||
            thirdItem.ratio === "" ||
            thirdItem.ratio === null ||
            thirdItem.ratio === undefined;
        }
      }

      // Correct logic: allValid means no missing required fields in bondingMaterials
      allValid = hasEmptyRatio && firstTwoInvalid && thirdInvalid;
    }

    const hasErrors = Object.values(errors).some((error) => error);
    const shouldDisableButton =
      !isAllFieldFilled ||
      hasErrors ||
      laminationTableValueVaidation ||
      allValid;
    dispatch(setSubmitAndPublishButtonMasterLamination(shouldDisableButton));
     dispatch(setLaminationSave(shouldDisableButton));
  }, [errors, formData, laminationTableValueVaidation]);

  // useEffect(() => {
  //   const importantFields = [
  //     "zone1_temp",
  //     "zone2_temp",
  //     "nip_pressure_bar",
  //     "speed",
  //     "lami_set_tension",
  //     "rewinder_tension",
  //     "printed_film_tension",
  //     "laminate_film_tension",
  //     "viscosity_range",
  //     "adhesive_gsm",

  //     "substrate_type",

  //     "dyne_level",
  //     "width",
  //     "thickness",
  //     "density",
  //   ] as (
  //     | keyof LaminationFormData["laminationConditions"]
  //     | keyof LaminationFormData["laminationSubstrate"]
  //     | keyof LaminationFormData["bondingMaterials"][number]
  //   )[];

  //   const bondingMaterials = Array.isArray(formData?.bondingMaterials)
  //     ? formData.bondingMaterials
  //     : [];

  //   const hasNonEmptyValue = bondingMaterials.some((item) =>
  //     Object.entries(item).some(
  //       ([key, value]) =>
  //         !["type", "bonding_id", "lamination_id"].includes(key) &&
  //         value !== "" &&
  //         value !== null &&
  //         value !== undefined
  //     )
  //   );

  //   const isAnyFieldFilled = importantFields.some((field) => {
  //     if (field in formData.laminationConditions) {
  //       const value =
  //         formData.laminationConditions[
  //           field as keyof LaminationFormData["laminationConditions"]
  //         ];

  //       if (typeof value === "string") return value.trim() !== "";
  //       return value !== null && value !== undefined;
  //     }

  //     if (field in formData.laminationSubstrate) {
  //       const value =
  //         formData.laminationSubstrate[
  //           field as keyof LaminationFormData["laminationSubstrate"]
  //         ];

  //       if (typeof value === "string") return value.trim() !== "";
  //       return value !== null && value !== undefined;
  //     }
  //   });

  //   const hasErrors = Object.values(errors).some((error) => error);

  //   const isSaveEnabled =
  //     !isAnyFieldFilled || hasErrors || laminationTableValueVaidation;

  //   dispatch(setLaminationSave(isSaveEnabled && !hasNonEmptyValue));
  // }, [errors, formData, laminationTableValueVaidation]);
  useEffect(() => {
    if (formInitialized) return;
    if (
      id &&
      location.pathname.includes("/updateMasterData") &&
      !laminationDataTouched
    ) {
      setFormData(laminatingDetails);
      setTableData(laminatingDetails.bondingMaterials);
      setFormInitialized(true);
    }
  }, [id, laminatingDetails, formInitialized]);

  useEffect(() => {
    if (formInitialized) return;
    if (!id && laminaionFormData) {
      setFormData(laminaionFormData);
      setFormInitialized(true);
      if (!id && laminaionFormData?.bondingMaterials) {
        setTableData(laminaionFormData?.bondingMaterials);
        setFormInitialized(true);
      }
    }
    if (!id && saveButtonLaminatingData && saveLaminatingData) {
      setFormData(saveLaminatingData);
      setFormInitialized(true);
    }
    if (laminationFormErrors) {
      setErrors(laminationFormErrors);
      setFormInitialized(true);
    }
  }, [
    laminaionFormData,
    laminationFormErrors,
    id,
    saveLaminatingData,
    saveButtonLaminatingData,
    formInitialized,
  ]);

  useEffect(() => {
    if (id && !laminationDataTouched) {
      const sanitizedLaminationData = sanitizeMasterData(laminationSettings);
      const sanitizedSubstrateData = sanitizeMasterData(
        laminatingSubstrateSettings
      );

      const combinedValues: LaminationFormData = {
        ...sanitizedLaminationData,
        laminationSubstrate: sanitizedSubstrateData?.laminationSubstrate,
      };
      setFormData(combinedValues);
      dispatch(setLaminationFormData(combinedValues));

      const sanitizedBondingMaterials = sanitizeMasterData(laminationAdhesive);
      const adhesiveDetails: LaminatingTableRow[] =
        sanitizedBondingMaterials?.bondingMaterials;
      setTableData(adhesiveDetails);
    }
  }, [id, laminationSettings, laminatingSubstrateSettings, laminationAdhesive]);
  const fields = [
    { label: "Viscocity Range", key: "viscosity_range" },
    { label: "Adhesive GSM", key: "adhesive_gsm" },
  ];

  const [subStrateDropDown] = useSubStrateDropDownMutation();
  const [supplierDropdown] = useSupplierDropdownMutation();

  useEffect(() => {
    const dropDown = async () => {
      const response = await subStrateDropDown({
        substrate: "",
        substrateType: "lamination",
      }).unwrap();
      const substrateList = response?.data?.map((item: any) => item.substrate);
      dispatch(setlaminationDropDownValues(substrateList));
    };

    dropDown();
  }, []);

  const hasVisited = localStorage.getItem("hasVisitedLaminationDetails");

  useEffect(() => {
    localStorage.setItem("hasVisitedLaminationDetails", "false");
    if (!hasVisited && id && updateButtonAction==='false') {
      dispatch(setLaminationDataTouched(false));
      localStorage.setItem("hasVisitedLaminationDetails", "true");
    } else if (hasVisited && !id) {
      dispatch(setLaminationDataTouched(false));
    } else if (updateButtonAction==='true' && !hasVisited && id) {
      dispatch(setLaminationDataTouched(false));
      localStorage.setItem("hasVisitedLaminationDetails", "true");
    }
  }, [id]);

  useEffect(() => {
    const fetchDropdownValues = async () => {
      const response = await supplierDropdown({
        supplier: "",
        supplier_type: "lamination",
      }).unwrap();
      const supplierList = response?.data?.map((item: any) => item.supplier);
      dispatch(setSupplieraminationDropDownValues(supplierList));
    };

    fetchDropdownValues();
  }, [supplierDropdown, dispatch]);

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Lamination Zone Settings
            </Typography>
            {/* <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            /> */}
          </Box>
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-1 Temp (°C)"
                value={
                  formData?.laminationConditions?.zone1_temp
                    ? formData?.laminationConditions?.zone1_temp
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "zone1_temp",
                    e.target.value
                  )
                }
                error={Boolean(errors.zone1_temp)}
                helperText={errors.zone1_temp}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-2 Temp (°C)"
                value={
                  formData.laminationConditions?.zone2_temp
                    ? formData.laminationConditions.zone2_temp
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "zone2_temp",
                    e.target.value
                  )
                }
                error={!!errors.zone2_temp}
                helperText={errors.zone2_temp}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Nip Pressure (bar)"
                value={
                  formData.laminationConditions?.nip_pressure_bar
                    ? formData.laminationConditions.nip_pressure_bar
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "nip_pressure_bar",
                    e.target.value
                  )
                }
                error={Boolean(errors.nip_pressure_bar)}
                helperText={errors.nip_pressure_bar}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value={
                  formData.laminationConditions?.speed
                    ? formData.laminationConditions.speed
                    : ""
                }
                onChange={(e) =>
                  handleChange("laminationConditions", "speed", e.target.value)
                }
                error={!!errors.speed}
                helperText={errors.speed}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Printed Film Tension"
                value={
                  formData.laminationConditions?.printed_film_tension
                    ? formData.laminationConditions.printed_film_tension
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "printed_film_tension",
                    e.target.value
                  )
                }
                error={!!errors.printed_film_tension}
                helperText={errors.printed_film_tension}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Laminated Film Tension"
                value={formData.laminationConditions?.laminate_film_tension}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "laminate_film_tension",
                    e.target.value
                  )
                }
                error={!!errors.laminate_film_tension}
                helperText={errors.laminate_film_tension}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Lami Set Tension"
                value={
                  formData?.laminationConditions?.lami_set_tension
                    ? formData.laminationConditions.lami_set_tension
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "lami_set_tension",
                    e.target.value
                  )
                }
                error={!!errors.lami_set_tension}
                helperText={errors.lami_set_tension}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Rewinder Tension"
                value={
                  formData.laminationConditions?.rewinder_tension
                    ? formData.laminationConditions.rewinder_tension
                    : ""
                }
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "rewinder_tension",
                    e.target.value
                  )
                }
                error={!!errors.rewinder_tension}
                helperText={errors.rewinder_tension}
                required
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          mt: 1.5,
        }}
      >
        <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Lamination Substrate
            </Typography>
            <Grid container spacing={2} pt={1}>
              <Grid size={{ xs: 12, md: 4 }}>
                <DropdownTextComponent
                  label="Substrate Type"
                  options={dropDownValuesLamination}
                  value={formData.laminationSubstrate?.substrate_type}
                  onChange={(value) =>
                    handleChange("laminationSubstrate", "substrate_type", value)
                  }
                  isMultiSelect={false}
                  checkbox={false}
                  required
                  allowNewOption
                  error={!!errors.substrate_type}
                  helperText={errors.substrate_type}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DropdownTextComponent
                  label="Supplier"
                  options={dropDownValuesSupplierLamination}
                  value={formData.laminationSubstrate?.supplier}
                  onChange={(value) =>
                    handleChange("laminationSubstrate", "supplier", value)
                  }
                  isMultiSelect={false}
                  checkbox={false}
                  allowNewOption
                  dropdown="supplier"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Dyne Level"
                  value={
                    formData.laminationSubstrate?.dyne_level
                      ? formData.laminationSubstrate.dyne_level
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "laminationSubstrate",
                      "dyne_level",
                      e.target.value
                    )
                  }
                  error={!!errors.dyne_level}
                  helperText={errors.dyne_level}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Width (mm)"
                  value={
                    formData.laminationSubstrate?.width
                      ? formData.laminationSubstrate.width
                      : ""
                  }
                  onChange={(e) =>
                    handleChange("laminationSubstrate", "width", e.target.value)
                  }
                  error={!!errors.width}
                  helperText={errors.width}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Thickness"
                  value={
                    formData.laminationSubstrate?.thickness
                      ? formData.laminationSubstrate.thickness
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "laminationSubstrate",
                      "thickness",
                      e.target.value
                    )
                  }
                  error={!!errors.thickness}
                  helperText={errors.thickness}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value={
                    formData.laminationSubstrate?.density
                      ? formData.laminationSubstrate.density
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "laminationSubstrate",
                      "density",
                      e.target.value
                    )
                  }
                  error={!!errors.density}
                  helperText={errors.density}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          border: "1px solid #ECECEC",
          borderRadius: "16px",
          pY: 1,
          mt: 1.5,
        }}
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
            Bonding Material Specifications
          </Typography>
          {/* <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} /> */}
        </Box>
        <DataTable
          columns={bondingMaterialColumns}
          data={tableData}
          tableTitle={true}
          setData={setTableData}
          firstRow={true}
          id={"lamination"}
          setFormDataLaminaton={setFormData}
        />
      </Box>
      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {" "}
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Material Details
          </Typography>
          {/* <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          /> */}
        </Box>

        <Grid container spacing={2} pt={1}>
          {fields.map(({ label, key }) => (
            <Grid key={key} size={{ xs: 12, md: 6 }}>
              <ReusableInput
                label={label}
                value={
                  formData.laminationConditions &&
                  key in formData.laminationConditions
                    ? String(
                        (
                          formData.laminationConditions as Record<
                            string,
                            unknown
                          >
                        )[key] ?? ""
                      )
                    : ""
                }
                onChange={(e) =>
                  handleChange("laminationConditions", key, e.target.value)
                }
                error={!!errors[key]}
                helperText={errors[key]}
                required
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Lamination;
