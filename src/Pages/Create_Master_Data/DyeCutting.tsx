import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ReusableInput from "../../Components/ReUsable/TextField";
import { useEffect, useState } from "react";
import {
  setDyeCuttingDataTouched,
  setDyeCuttingFormData,
  // setDyeCuttingFormErros,
  // setSubmitAndPublishButtonDyeCutting,
} from "../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";
// import DropdownComponent from "../../Components/ReUsable/Dropdown";
import {
  DyeCuttingFormData,
  DyeCuttingFormErrors,
} from "../../store/Interfaces/masterDataTypes";

interface DyeCuttingProps {
  formData: DyeCuttingFormData;
  setFormData: React.Dispatch<React.SetStateAction<DyeCuttingFormData>>;
}

const DyeCutting: React.FC<DyeCuttingProps> = ({ formData, setFormData }) => {
  // const [errors, setErrors] = useState<DyeCuttingFormErrors>({
  //   job_master_id: "",
  //   dye_cutting_id: "",
  //   machine_type: "",
  //   machine_name: "",
  //   dye_code: "",
  //   run_speed: "",
  // });
  const [formInitialized, setFormInitialized] = useState(false);

  const {
    dyeCuttingFormData,
    dyeCuttingErrors,
    dyeCuttingDataTouched,
    dyeCuttingDetails,
  } = useSelector((state: RootState) => state.masterData);
  const { dyeCuttingSettings } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

   const updateButtonAction = localStorage.getItem("updateButton");

  function sanitizeDyeCuttingData(data: any): DyeCuttingFormData {
    return {
      job_master_id: data?.job_master_id || 0,
      dye_cutting_id: data?.dye_cutting_id || 0,
      machine_type: data?.machine_type || "",
      machine_name: data?.machine_name || "",
      dye_code: data?.dye_code || "",
      run_speed: data?.run_speed !== undefined ? String(data.run_speed) : "",
    };
  }

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
    if (id) {
      dispatch(setDyeCuttingDataTouched(true));
    }

    const newValue = extractValue(rawValue);
    let finalValue: string | string[] | number = "";
    let errorMessage = "";

    const numberFields = ["run_speed"];
    const isNumberField = numberFields.includes(key);
    const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/;

    if (isNumberField) {
      if (typeof newValue === "string") {
        const trimmed = newValue.trim().replace("%", ""); // Remove any percentage sign
        finalValue = newValue; // Default final value is the original value

        // If the field is empty, set the final value to an empty string and clear the error message
        if (trimmed === "") {
          errorMessage = "";
        }
        // If the value is invalid (non-numeric and not a valid percentage), show an error
        else if (!/^\d+(\.\d+)?$/.test(trimmed)) {
          errorMessage = "Please enter a valid number or percentage";
        } else {
          // If the value contains a percentage, keep it as a string with the percentage sign
          finalValue = newValue.includes("%")
            ? `${parseFloat(trimmed)}%`
            : Number(trimmed); // Otherwise, keep it as a number

          errorMessage = ""; // Clear the error message for valid input
        }
      } else {
        finalValue = "";
        errorMessage = "Invalid input"; // Error for non-string values
      }
    } else {
      if (typeof newValue === "string") {
        const trimmedValue = newValue.trim();
        finalValue = newValue;

        if (trimmedValue === "") {
          errorMessage = "";
        } else if (!alphaNumericRegex.test(trimmedValue)) {
          errorMessage = "Special characters are not allowed";
        }
      } else if (Array.isArray(newValue)) {
        finalValue = newValue;
      } else {
        finalValue = "";
        errorMessage = "Invalid input";
      }
    }
    console.log(errorMessage,"DyeCutting errorMessage");
    const updated = {
      ...formData,
      [key]: finalValue,
    };

    setFormData(updated);

    // const updatedErrors: DyeCuttingFormErrors = {
    //   ...errors,
    //   [key]: errorMessage,
    // };

    // setErrors(updatedErrors);
    // dispatch(setDyeCuttingFormErros(updatedErrors));
    dispatch(setDyeCuttingFormData(updated));
  };

  const hasVisited = localStorage.getItem("hasVisitedDyeCuttingDetails");

  useEffect(() => {
    localStorage.setItem("hasVisitedDyeCuttingDetails", "false");
    if (!hasVisited && id && updateButtonAction==='false') {
      dispatch(setDyeCuttingDataTouched(false));
      localStorage.setItem("hasVisitedDyeCuttingDetails", "true");
    } else if (hasVisited && !id) {
      dispatch(setDyeCuttingDataTouched(false));
    } else if (updateButtonAction==='true' && !hasVisited && id) {
      dispatch(setDyeCuttingDataTouched(false));
      localStorage.setItem("hasVisitedDyeCuttingDetails", "true");
    }
  }, [id]);

  // useEffect(() => {
  //   const hasAnyErrors = Object.values(errors).some((e) => e !== "");
  //   dispatch(setSubmitAndPublishButtonDyeCutting(hasAnyErrors));
  // }, [errors]);

  useEffect(() => {
    if (formInitialized) return;
    if (
      id &&
      location.pathname.includes("/updateMasterData") &&
      !dyeCuttingDataTouched
    ) {
      setFormData(dyeCuttingDetails);
      setFormInitialized(true);
    }
  }, [id, dyeCuttingDetails, formInitialized]);

  useEffect(() => {
    if (formInitialized) return;
    if (!id && dyeCuttingFormData) {
      setFormData(dyeCuttingFormData);
      setFormInitialized(true);
    }
    // if (dyeCuttingErrors) {
    //   setErrors(dyeCuttingErrors);
    //   setFormInitialized(true);
    // }
  }, [dyeCuttingFormData, dyeCuttingErrors, id, formInitialized]);

  useEffect(() => {
    if (id && dyeCuttingSettings && !dyeCuttingDataTouched) {
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
            {/* <InfoOutline
              sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
            /> */}
          </Box>

          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ReusableInput
                             label="Dye Cutting Machine Type"
                           value={formData?.machine_type}
                onChange={(value) => handleChange("machine_type", value)}
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
                  value={formData[key as keyof DyeCuttingFormData] || ""}
                  onChange={(e) =>
                    handleChange(
                      key as keyof DyeCuttingFormErrors,
                      e.target.value
                    )
                  }
                  // error={!!errors[key as keyof DyeCuttingFormErrors]}
                  // helperText={errors[key as keyof DyeCuttingFormErrors]}
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
