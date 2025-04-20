import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  DyeCuttingFormData,
  DyeCuttingFormErrors,
  setDyeCuttingDataTouched,
  setDyeCuttingFormData,
  setDyeCuttingFormErros,
  setSubmitAndPublishButtonDyeCutting,
} from "../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";
import DropdownComponent from "../../Components/ReUsable/Dropdown";

interface DyeCuttingProps {
  formData: DyeCuttingFormData;
  setFormData: React.Dispatch<React.SetStateAction<DyeCuttingFormData>>;
}

const DyeCutting: React.FC<DyeCuttingProps> = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState<DyeCuttingFormErrors>({
    job_master_id:"",
    dye_cutting_id:"",
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: "",
  });
  const { dyeCuttingFormData, dyeCuttingErrors ,dyeCuttingDataTouched,dyeCuttingDetails} = useSelector(
    (state: RootState) => state.masterData
  );
  const { dyeCuttingSettings } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const dispatch = useDispatch<AppDispatch>();

  function sanitizeDyeCuttingData(data: any): DyeCuttingFormData {
    return {
      job_master_id:data?.job_master_id||0,
      dye_cutting_id:data?.dye_cutting_id||0,
      machine_type: data?.machine_type || "",
      machine_name: data?.machine_name || "",
      dye_code: data?.dye_code || "",
      run_speed: data?.run_speed!==undefined ? String(data.run_speed) : "",
    };
  }

  const { id } = useParams();

  function extractValue(
    value: string | string[] | SelectChangeEvent<string | string[]>
  ): string | string[] {
    if (typeof value === "object" && "target" in value) {
      return value.target.value;
    }
    return value;
  }
  
  const handleChange = (
    key: keyof DyeCuttingFormData,
    rawValue: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    dispatch(setDyeCuttingDataTouched(true));
  
    const newValue = extractValue(rawValue);
    let finalValue: string | string[] | number = "";
    let errorMessage = "";
  
    const numberFields = ["run_speed", "dye_code"];
    const isNumberField = numberFields.includes(key);
    const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/;
  
    if (isNumberField) {
      if (typeof newValue === "string") {
        finalValue = newValue; // always store the user input as string first for display
  
        const trimmed = newValue.trim();
        if (trimmed === "" || trimmed === "0") {
          errorMessage = `${key.replace(/_/g, " ")} cannot be empty or 0`;
        } else if (!/^\d+(\.\d+)?$/.test(trimmed)) {
          errorMessage = "Please enter a valid number";
        } else {
          // Valid number -> convert & store as number
          finalValue = Number(trimmed);
        }
      } else {
        finalValue = "";
        errorMessage = "Invalid input type";
      }
    } else {
      if (typeof newValue === "string") {
        const trimmedValue = newValue.trim();
  
        if (trimmedValue === "") {
          errorMessage = `${key.replace(/_/g, " ")} is required`;
        } else if (!alphaNumericRegex.test(trimmedValue)) {
          errorMessage = "Special characters are not allowed";
        } else {
          finalValue = trimmedValue;
        }
      } else if (Array.isArray(newValue)) {
        finalValue = newValue;
      } else {
        finalValue = "";
        errorMessage = "Invalid input";
      }
    }
  
    // Always store the current user input for display
    const updated = {
      ...formData,
      [key]: isNumberField ? newValue : finalValue,  // if number field, store as string until valid
    };
  
    setFormData(updated);
  
    const updatedErrors: DyeCuttingFormErrors = {
      ...errors,
      [key]: errorMessage,
    };
  
    setErrors(updatedErrors);
    dispatch(setDyeCuttingFormErros(updatedErrors));
  
    // Save number only if valid, else save raw user input
    const toSave = {
      ...formData,
      [key]:
        isNumberField && errorMessage === ""
          ? Number(newValue) // valid: save number
          : newValue,        // invalid: save raw input
    };
  
    dispatch(setDyeCuttingFormData(toSave));
  };
  
  
  
  

  useEffect(() => {
    const importantFields = [
      "machine_type",
      "machine_name",
      "dye_code",
      "run_speed",
    ] as (keyof DyeCuttingFormData)[];

    const hasErrors = importantFields.some(
      (field) =>
        errors[field] !== "" ||
        formData[field] === "" ||
        formData[field] === null ||
        formData[field] === undefined
    );

    dispatch(setSubmitAndPublishButtonDyeCutting(hasErrors));
  }, [formData, errors]);
     useEffect(()=>{
        if(id&&location.pathname.includes('/updateMasterData')){
          setFormData(dyeCuttingDetails)
        }},[]);

  useEffect(() => {
    if (!id && dyeCuttingFormData) {
      setFormData(dyeCuttingFormData);
    }
    if ( dyeCuttingErrors) {
      setErrors(dyeCuttingErrors);
    }
  }, [dyeCuttingFormData,dyeCuttingErrors,id]);

  useEffect(() => {
    if (id && dyeCuttingSettings&&!dyeCuttingDataTouched) {
      const sanitized = sanitizeDyeCuttingData(dyeCuttingSettings);
      setFormData(sanitized);
    }
  }, [id, dyeCuttingSettings]);

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography
              sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            >
              Dye Cutting Data Entry
            </Typography>
            <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            />
          </Box>

          <Grid container spacing={2} pt={1}>
             <Grid size={{ xs: 12, md: 4 }}>
               <DropdownComponent
                              label="Dye Cutting Machine Type"
                              options={["Packers","Poly" ,"Rhyguan","Scober","Sysco"]}
                              value={formData.machine_type}
                              onChange={(value) =>
                                handleChange("machine_type", value)
                              }
                              isMultiSelect={false}
                              checkbox={false}
                            />
                            </Grid>
            {[
              { label: "Machine", key: "machine_name" },
              { label: "Dye Code", key: "dye_code" },
              { label: "Run Speed (m/min)", key: "run_speed" },
            ].map(({ label, key }) => (
              <Grid size={{ xs: 12, md: 4 }} key={key}>
                <ReusableInput
                  label={label}
                  value={formData[key as keyof DyeCuttingFormData]}
                  onChange={(e) =>
                    handleChange(
                      key as keyof DyeCuttingFormErrors,
                      e.target.value
                    )
                  }
                  error={!!errors[key as keyof DyeCuttingFormErrors]}
                  helperText={errors[key as keyof DyeCuttingFormErrors]}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DyeCutting;
