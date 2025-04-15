import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useEffect } from "react";
import { dyeCuttingSchema } from "../../Components/ZodSchemas/masterData";
import {
  DyeCuttingFormData,
  setDyeCuttingFormData,
} from "../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";

interface DyeCuttingProps {
  formData: DyeCuttingFormData,
  setFormData: React.Dispatch<React.SetStateAction<DyeCuttingFormData>>,
  errors: { [key: string]: string },
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>

}

const DyeCutting: React.FC<DyeCuttingProps> = ({
  formData,
  setFormData,
  errors,
  setErrors
}) => {
  const {
    dyeCuttingFormData,
  } = useSelector((state: RootState) => state.masterData);
  const { dyeCuttingSettings } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const dispatch = useDispatch<AppDispatch>();


  function sanitizeDyeCuttingData(data: any): DyeCuttingFormData {
    return {
      machine_type: data.machine_type || "",
      machine_name: data.machine_name || "",
      dye_code: data.dye_code || "",
      run_speed: Number(data.run_speed) || 0,
    };
  }

  const { id } = useParams();

  const handleChange = (key: string, value: string) => {
    const updatedValue = key === "run_speed" ? Number(value) : value;
    const updated = { ...formData, [key]: updatedValue };
    setFormData(updated);
    const result = dyeCuttingSchema.safeParse(updated);
    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path[0] === key) {
          newErrors[error.path[0]] = error.message;
        }
      });
      setErrors(newErrors);
    } else {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[key];
        return updatedErrors;
      });
    }

    dispatch(setDyeCuttingFormData(updated));
  };


  useEffect(() => {
    if (dyeCuttingFormData) {
      setFormData(dyeCuttingFormData);
    }
  }, [dyeCuttingFormData]);

  useEffect(() => {
    if (id && dyeCuttingSettings) {
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
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  error={!!errors[key]} 
                  helperText={errors[key]} 
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
