import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  LaminatingTableRow,
  LaminationFormData,
  LaminationFormErrors,
  setLaminationDataTouched,
  setLaminationFormData,
  setLaminationFormErros,
  setLaminationSave,
  setSubmitAndPublishButtonMasterLamination,
} from "../../store/slices/masterDataSlice";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import DataTable from "../../Components/ReUsable/MasterDataTable";
import { useParams } from "react-router-dom";

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
  const { laminaionFormData, laminationFormErrors,laminationDataTouched,laminatingDetails } = useSelector(
    (state: RootState) => state.masterData
  );
  const {
    laminatingSubstrateSettings,
    laminationAdhesive,
    laminationSettings,
  } = useSelector((state: RootState) => state.viewMasterData);
  const dispatch = useDispatch<AppDispatch>();
  const bondingMaterialColumns = [
    { id: "type", label: "Field" },
    {
      id: "code", 
      label: "Code", 
      editable: true, // Enable editing
      isDropdown: true,
      options: ["A:1009N"]
    },
    {
      id: "brand", 
      label: "Brand", 
      editable: true, // Enable editing
      isDropdown: true,
      options: ["BOISTIK"]
    },
    {
      id: "ratio", 
      label: "Ratio", 
      editable: true, // Enable editing
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
        lamination_id:data?.lamination_id||0, job_master_id:data?.job_master_id||0,
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
        substrate_id:data?.substrate_id, lamination_id:data?.lamination_id||0,
        substrate_type: data?.substrate_type || "",
        supplier: data?.supplier || "",
        dyne_level: data?.dyne_level || "",
        width: data?.width || 0,
        thickness: data?.thickness || 0,
        density: data?.density || 0,
      },
      bondingMaterials: data || [
        { type: "Adhesive", code: "", brand: "", ratio: 0 },
        { type: "Hardener", code: "", brand: "", ratio: 0 },
        { type: "Ethyl Acetate", code: "", brand: "", ratio: 0 },
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
    "dyne_level",
    "adhesive_gsm"
  ]);

  const characterFields = new Set([
    "viscosity_range",
    "substrate_type",
    "supplier",
    "type",
    "code",
    "brand",
  ]);

  const handleChange = (
    section: string,
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    dispatch(setLaminationDataTouched(true));
  
    const newValue = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;
  
    let finalValue: string | string[] | number = newValue;
    let errorMessage = "";
  
    const onlyAlphanumericRegex = /^[A-Za-z0-9\s]+$/;
  
    // Handle specific fields
    if (field === "thickness") {
      const trimmed = (newValue as string).trim();
  
      if (trimmed === "") {
        errorMessage = "Thickness cannot be empty.";
      } else if (!/^\d+(\.\d+)?$/.test(trimmed)) {
        errorMessage = "Thickness must be a valid number.";
      } else {
        errorMessage = "";
      }
  
      finalValue = trimmed !== "" && errorMessage === "" ? Number(trimmed) : finalValue;
  
    }
    else if (
      ["lami_set_tension", "rewinder_tension", "printed_film_tension", "laminate_film_tension", "dyne_level", "adhesive_gsm"].includes(field)
    ) {
      const trimmed = (newValue as string).trim();
    
      if (trimmed === "") {
        errorMessage = `${field.replace(/_/g, ' ')} cannot be empty.`;
      } else if (!/^\d+(\.\d+)?$/.test(trimmed)) {
        errorMessage = `${field.replace(/_/g, ' ')} must be a valid number.`;
      } else {
        finalValue = Number(trimmed);  // Save as number
        errorMessage = "";
      }
    }
     else if (numericFields.has(field)) {
      if (!isNaN(Number(newValue)) && newValue !== "") {
        finalValue = Number(newValue); // Save valid numbers
        errorMessage = "";
      } else {
        finalValue = newValue;
        errorMessage = "Please enter a valid number.";
      }
    } else if (characterFields.has(field)) {
      const trimmed = (newValue as string).trim();
  
      if (trimmed === "") {
        errorMessage = "This field cannot be empty.";
      } else if (!onlyAlphanumericRegex.test(trimmed)) {
        errorMessage = "Only letters, numbers, and spaces are allowed.";
      } else {
        errorMessage = "";
      }
  
      finalValue = newValue;
    }
  
    // Dispatch the errors to Redux
    const updatedErrors = {
      ...errors,
      [field]: errorMessage,
    };
    setErrors(updatedErrors);
    dispatch(setLaminationFormErros(updatedErrors));
  
    // Save to the form data and dispatch to Redux with strings for the tension fields
    const updatedFormData = {
      ...formData,
      [section]: {
        ...(formData as any)[section],
        [field]:
          field === "thickness" && errorMessage === ""
            ? Number((newValue as string).trim()) // Ensure thickness is saved as a number // Save these fields as strings
            :  numericFields.has(field) // Ensure numeric fields are saved as numbers
            ? Number(newValue)
            : finalValue,
      },
    };
  
    setFormData(updatedFormData);
    dispatch(setLaminationFormData(updatedFormData));
  };
  
  

  useEffect(() => {
    const errorValues = Object.values(errors);
    const hasAnyError = errorValues.some((err) => err !== "");
  
    let isAnyFieldFilled = false;
    let areAllFieldsFilled = true;
  
    for (const sectionKey in formData) {
      const section = (formData as any)[sectionKey];
      if (section && typeof section === "object") {
        for (const fieldKey in section) {
          const field = section[fieldKey];
          const value = typeof field === "object" && field !== null && 'value' in field
            ? field.value
            : field;
  
          const isEmpty =
            value === "" ||
            value === null ||
            value === undefined ||
            (Array.isArray(value) && value.length === 0);
  
          if (!isEmpty) {
            isAnyFieldFilled = true;
          } else {
            areAllFieldsFilled = false;
          }
        }
      }
    }
  
    const shouldEnableSave = isAnyFieldFilled && !hasAnyError;
    const shouldEnableSubmitAndPublish = areAllFieldsFilled && !hasAnyError;
  
    dispatch(setSubmitAndPublishButtonMasterLamination(!shouldEnableSubmitAndPublish));
    dispatch(setLaminationSave(!shouldEnableSave));
  }, [errors, formData]);
  
  
  
   useEffect(()=>{
      if(id&&location.pathname.includes('/updateMasterData')){
        setFormData(laminatingDetails)
      }},[id]);
  
  useEffect(() => {
    if (!id && laminaionFormData) {
      setFormData(laminaionFormData);
      if (!id && laminaionFormData?.bondingMaterials) {
        setTableData(laminaionFormData?.bondingMaterials);
      }
    }
    if (laminationFormErrors) {
      setErrors(laminationFormErrors);
    }
  }, [laminaionFormData, laminationFormErrors,id]);
  

  useEffect(() => {
    if (id && !laminationDataTouched) {
      const sanitizedLaminationData = sanitizeMasterData(laminationSettings);
      const sanitizedSubstrateData = sanitizeMasterData(laminatingSubstrateSettings);
  
      const combinedValues: LaminationFormData = {
        ...sanitizedLaminationData,
        laminationSubstrate: sanitizedSubstrateData?.laminationSubstrate,
      };
      setFormData(combinedValues);  
      dispatch(setLaminationFormData(combinedValues));
  
      const sanitizedBondingMaterials = sanitizeMasterData(laminationAdhesive);
      const adhesiveDetails: LaminatingTableRow[] = sanitizedBondingMaterials?.bondingMaterials;
      setTableData(adhesiveDetails);
  

    }
  }, [id, laminationSettings, laminatingSubstrateSettings, laminationAdhesive]);
  const fields = [
    { label: "Viscocity Range", key: "viscosity_range" },
    { label: "Adhesive GSM", key: "adhesive_gsm" },
  ];
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
            <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            />
          </Box>
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-1 Temp (°C)"
                value={formData?.laminationConditions?.zone1_temp?formData?.laminationConditions?.zone1_temp:''}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "zone1_temp",
                    e.target.value
                  )
                }
                error={!!errors.zone1_temp}
                helperText={errors.zone1_temp}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Zone-2 Temp (°C)"
                value={formData.laminationConditions?.zone2_temp?formData.laminationConditions.zone2_temp:''}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "zone2_temp",
                    e.target.value
                  )
                }
                error={!!errors.zone2_temp}
                helperText={errors.zone2_temp}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Nip Pressure (bar)"
                value={formData.laminationConditions?.nip_pressure_bar?formData.laminationConditions.nip_pressure_bar:''}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "nip_pressure_bar",
                    e.target.value
                  )
                }
                error={!!errors.nip_pressure_bar}
                helperText={errors.nip_pressure_bar}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Speed (m/min)"
                value={formData.laminationConditions?.speed?formData.laminationConditions.speed:''}
                onChange={(e) =>
                  handleChange("laminationConditions", "speed", e.target.value)
                }
                error={!!errors.speed}
                helperText={errors.speed}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Lami Set Tension"
                value={formData?.laminationConditions?.lami_set_tension?formData.laminationConditions.lami_set_tension:''}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "lami_set_tension",
                    e.target.value
                  )
                }
                error={!!errors.lami_set_tension}
                helperText={errors.lami_set_tension}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Rewinder Tension"
                value={formData.laminationConditions?.rewinder_tension?formData.laminationConditions.rewinder_tension:''}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "rewinder_tension",
                    e.target.value
                  )
                }
                error={!!errors.rewinder_tension}
                helperText={errors.rewinder_tension}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                label="Printed Film Tension"
                value={formData.laminationConditions?.printed_film_tension?formData.laminationConditions.printed_film_tension:''}
                onChange={(e) =>
                  handleChange(
                    "laminationConditions",
                    "printed_film_tension",
                    e.target.value
                  )
                }
                error={!!errors.printed_film_tension}
                helperText={errors.printed_film_tension}
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
                <DropdownComponent
                  label="Substrate Type"
                  options={["PET"]}
                  value={formData.laminationSubstrate?.substrate_type}
                  onChange={(value) =>
                    handleChange("laminationSubstrate", "substrate_type", value)
                  }
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DropdownComponent
                  label="Supplier"
                  options={[
                    "U-Flex Ltd.",
                    "Huhtamaki",
                    "Gulf Pack Supplier",
                  ]}
                  value={formData.laminationSubstrate?.supplier}
                  onChange={(value) =>
                    handleChange("laminationSubstrate", "supplier", value)
                  }
                  isMultiSelect={false}
                  checkbox={false}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Dyne Level"
                  value={formData.laminationSubstrate?.dyne_level}
                  onChange={(e) =>
                    handleChange(
                      "laminationSubstrate",
                      "dyne_level",
                      e.target.value
                    )
                  }
                  error={!!errors.dyne_level}
                  helperText={errors.dyne_level}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Width (mm)"
                  value={formData.laminationSubstrate?.width?formData.laminationSubstrate.width:''}
                  onChange={(e) =>
                    handleChange("laminationSubstrate", "width", e.target.value)
                  }
                  error={!!errors.width}
                  helperText={errors.width}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Thickness"
                  value={formData.laminationSubstrate?.thickness?formData.laminationSubstrate.thickness:''}
                  onChange={(e) =>
                    handleChange(
                      "laminationSubstrate",
                      "thickness",
                      e.target.value
                    )
                  }
                  error={!!errors.thickness}
                  helperText={errors.thickness}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <ReusableInput
                  label="Density (g/cm)"
                  value={formData.laminationSubstrate?.density?formData.laminationSubstrate.density:''}
                  onChange={(e) =>
                    handleChange(
                      "laminationSubstrate",
                      "density",
                      e.target.value
                    )
                  }
                  error={!!errors.density}
                  helperText={errors.density}
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
          <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>
        <DataTable
          columns={bondingMaterialColumns}
          data={tableData}
          tableTitle={true}
          setData={setTableData}
          firstRow={true}
          id={"lamination"}
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
          <InfoOutline
            sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
          />
        </Box>


<Grid container spacing={2} pt={1}>
  {fields.map(({ label, key }) => (
    <Grid key={key} size={{xs:12,md:6}}>
      <ReusableInput
        label={label}
        value={
          formData.laminationConditions && key in formData.laminationConditions
            ? String((formData.laminationConditions as Record<string, unknown>)[key] ?? "")
            : ""
        }
        onChange={(e) =>
          handleChange("laminationConditions", key, e.target.value)
        }
        error={!!errors[key]}
        helperText={errors[key]}
      />
    </Grid>
  ))}
</Grid>


      </Box>
    </Box>
  );
};

export default Lamination;
