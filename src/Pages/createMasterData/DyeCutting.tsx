import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
// import { dyeCuttingSchema } from "../../Components/ZodSchemas/masterData";
import {
  DyeCuttingFormData,
  DyeCuttingFormErrors,
  setDyeCuttingDataTouched,
  setDyeCuttingFormData,
  setDyeCuttingFormErros,
  setSubmitAndPublishButtonDyeCutting,
} from "../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";

interface DyeCuttingProps {
  formData: DyeCuttingFormData;
  setFormData: React.Dispatch<React.SetStateAction<DyeCuttingFormData>>;
}

const DyeCutting: React.FC<DyeCuttingProps> = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState<DyeCuttingFormErrors>({
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: "",
  });
  const { dyeCuttingFormData, dyeCuttingErrors ,dyeCuttingDataTouched} = useSelector(
    (state: RootState) => state.masterData
  );
  const { dyeCuttingSettings } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const dispatch = useDispatch<AppDispatch>();

  function sanitizeDyeCuttingData(data: any): DyeCuttingFormData {
    return {
      machine_type: data?.machine_type || "",
      machine_name: data?.machine_name || "",
      dye_code: data?.dye_code || "",
      run_speed: Number(data?.run_speed) || 0,
    };
  }

  const { id } = useParams();

  const handleChange = (key: keyof DyeCuttingFormData, newValue: string) => {
    dispatch(setDyeCuttingDataTouched(true))
    let finalValue: string | number = newValue;
    let errorMessage = "";

    const isNumberField = key === "run_speed";
    const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/;

    if (isNumberField) {
      // Numeric validation for run_speed
      if (newValue === "0" || newValue.trim() === "") {
        finalValue = "";
        errorMessage = "Run speed cannot be 0 or empty";
      } else if (!isNaN(Number(newValue))) {
        finalValue = Number(newValue);
      } else {
        finalValue = "";
        errorMessage = "Please enter a valid number";
      }
    } else {
      // Validation for other fields: must be alphanumeric (numbers, letters, spaces allowed)
      const trimmedValue = newValue.trim();

      if (trimmedValue === "") {
        errorMessage = `${key.replace(/_/g, " ")} is required`;
      } else if (!alphaNumericRegex.test(trimmedValue)) {
        errorMessage = "Special characters are not allowed";
      } else {
        finalValue = trimmedValue;
      }
    }

    const updated = {
      ...formData,
      [key]: finalValue,
    };

    setFormData(updated);

    // Explicitly typing `updatedErrors` as `DyeCuttingFormErrors`
    const updatedErrors: DyeCuttingFormErrors = {
      ...errors,
      [key]: errorMessage, // This is now properly typed as `keyof DyeCuttingFormErrors`
    };

    setErrors(updatedErrors);
    dispatch(setDyeCuttingFormErros(updatedErrors));
    dispatch(setDyeCuttingFormData(updated));
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

  useEffect(() => {
    if (dyeCuttingFormData) {
      setFormData(dyeCuttingFormData);
    }
    if (dyeCuttingErrors) {
      setErrors(dyeCuttingErrors);
    }
  }, [dyeCuttingFormData,dyeCuttingErrors]);

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
            {[
              { label: "Dye Cut Machine Type", key: "machine_type" },
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
