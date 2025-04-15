import { Box, Grid, IconButton, Typography } from "@mui/material";
import ReusableInput from "../../Components/ReUsable/TextField";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import TextArea from "../../Components/ReUsable/TextArea";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
  MasterDataFormErrors,
  setMasterDataFormErros,
  setSaveFormData,
  setSubmitAndPublishButtonMasterData,
} from "../../store/slices/masterDataSlice";
import { MasterFormData } from "./../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";
import { listOfLables } from "./data";

interface MasterDataProps {
  formData: MasterFormData;
  setFormData: React.Dispatch<React.SetStateAction<MasterFormData>>;
}

const MasterDataDetails: React.FC<MasterDataProps> = ({
  formData,
  setFormData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();

  const { saveFormData, masterDataFormErrors } = useSelector(
    (state: RootState) => state.masterData
  );
  const { viewMasterDataDetails } = useSelector(
    (state: RootState) => state.viewMasterData
  );

  const [errors, setErrors] = useState<MasterDataFormErrors>({
    repeat_length: "",
    ups: "",
    tracks: "",
    unit_effectivity_number: "",
    customer_name: "",
    customer_logo: "",
    jar_cap: "",
    item_code: "",
    structure: "",
    brand_description: "",
    label_type: "",
  });

  const handleChange = (
    field: keyof MasterFormData,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    let newValue: string | string[] = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;
  
    let finalValue: string | number = newValue as string;  // store user input directly
    let errorMessage = "";
  
    const numericFields: (keyof MasterFormData)[] = [
      "repeat_length",
      "ups",
      "tracks",
      "unit_effectivity_number",
    ];
    const characterFields: (keyof MasterFormData)[] = ["customer_name"];
    const alphanumericFields: (keyof MasterFormData)[] = ["item_code"];
    const freeTextFields: (keyof MasterFormData)[] = ["brand_description"];
  
    if (numericFields.includes(field)) {
      if ((newValue as string).trim() === "") {
        errorMessage = "This field cannot be empty.";
      } else if (isNaN(Number(newValue))) {
        errorMessage = "Please enter a valid number.";
      } else {
        // valid numeric input
        finalValue = Number(newValue);
        errorMessage = "";
      }
  
    } else if (characterFields.includes(field)) {
      const trimmed = (newValue as string).trim();
      const onlyLettersRegex = /^[A-Za-z\s]+$/;
  
      if (trimmed === "") {
        errorMessage = "This field cannot be empty.";
      } else if (!onlyLettersRegex.test(trimmed)) {
        errorMessage = "Only characters and spaces are allowed.";
      } else {
        errorMessage = "";
      }
  
    } else if (alphanumericFields.includes(field)) {
      const trimmed = (newValue as string).trim();
      const alphanumericRegex = /^[A-Za-z0-9\s]+$/;
  
      if (trimmed === "") {
        errorMessage = "This field cannot be empty.";
      } else if (!alphanumericRegex.test(trimmed)) {
        errorMessage = "Only letters, numbers, and spaces are allowed.";
      } else {
        errorMessage = "";
      }
  
    } else if (freeTextFields.includes(field)) {
      const trimmed = (newValue as string).trim();
  
      if (trimmed === "") {
        errorMessage = "This field cannot be empty.";
      } else {
        errorMessage = "";
      }
  
    } else if (
      field === "label_type" ||
      field === "jar_cap" ||
      field === "structure"
    ) {
      if (Array.isArray(newValue)) {
        finalValue = newValue[0];
      } else {
        finalValue = newValue as string;
      }
      errorMessage = "";
    }
  
    const updatedErrors = {
      ...errors,
      [field]: errorMessage,
    };
  
    const updatedFormData = {
      ...formData,
      [field]: finalValue,  // always store the current user-typed value
    };
  
    setFormData(updatedFormData);
    dispatch(setSaveFormData(updatedFormData));
    dispatch(setMasterDataFormErros(updatedErrors));
  };
  
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;

      const updatedFormData = {
        ...formData,
        customer_logo: base64Image, // <-- Set image
      };

      setFormData(updatedFormData);
      dispatch(setSaveFormData(updatedFormData));
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (saveFormData) {
      setFormData(saveFormData);
    }
    if (masterDataFormErrors) {
      setErrors(masterDataFormErrors);
    }
  }, [saveFormData, masterDataFormErrors]);

  function sanitizeMasterData(data: any): MasterFormData {
    return {
      unit_effectivity_number: data.unit_effectivity_number || "",
      customer_name: data.customer_name || "",
      customer_logo: data.customer_logo ?? "",
      jar_cap: data.jar_cap || "",
      item_code: data.item_code ?? "",
      structure: data.structure ?? "",
      brand_description: data.brand_description || "",
      label_type: data.label_type || "",
      repeat_length: data.repeat_length || 0,
      ups: data.ups || 0,
      tracks: data.tracks || 0,
    };
  }

  useEffect(() => {
    if (id && viewMasterDataDetails) {
      setFormData(sanitizeMasterData(viewMasterDataDetails));
    }
  }, [id, viewMasterDataDetails]);
  const dropdownOptions = listOfLables.map((option) => option.labelTypeName);
  useEffect(() => {
    const importantFields = [
      "unit_effectivity_number",
      "customer_name",
      "brand_description",
      "label_type",
      "jar_cap",
      "repeat_length",
      "ups",
    ] as (keyof MasterFormData)[];

    const hasErrors = importantFields.some(
      (field) =>
        errors[field] !== "" ||
        formData[field] === "" ||
        formData[field] === null ||
        formData[field] === undefined
    );

    dispatch(setSubmitAndPublishButtonMasterData(hasErrors));
  }, [formData, errors]);

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          SKU Master Data
        </Typography>

        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Unit Effectivity Number"
              value={formData.unit_effectivity_number}
              onChange={(e) =>
                handleChange("unit_effectivity_number", e.target.value)
              }
              error={!!errors.unit_effectivity_number}
              helperText={errors.unit_effectivity_number}
              disabled={id ? true : false}
            />
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Type of Label"
                options={dropdownOptions}
                value={formData.label_type}
                onChange={(e) => handleChange("label_type", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Jar/Cap"
                options={["N/A (For flexible packaging)", "JAR", "CAP"]}
                value={formData.jar_cap}
                onChange={(e) => handleChange("jar_cap", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Customer"
              value={formData.customer_name}
              onChange={(e) => handleChange("customer_name", e.target.value)}
              error={!!errors.customer_name}
              helperText={errors.customer_name}
            />
            <Box sx={{ mt: 2 }} />
            <ReusableInput
              label="ITEM Code"
              value={formData.item_code}
              onChange={(e) => handleChange("item_code", e.target.value)}
              error={!!errors.item_code}
              helperText={errors.item_code}
            />
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Structure"
                options={["PET"]}
                value={formData.structure}
                onChange={(e) => handleChange("structure", e.target.value)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="#656565"
              >
                Customer Picture
              </Typography>

              {formData.customer_logo ? (
                <Box position="relative" width={120} height={120} mt={1}>
                  <Box
                    component="img"
                    src={formData.customer_logo}
                    alt="Customer"
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      mt: 1,
                      objectFit: "cover",
                    }}
                  />
                  <input
                    accept="image/*"
                    type="file"
                    id="reupload-customer-pic"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                  />
                  <label htmlFor="reupload-customer-pic">
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.8)",
                        },
                      }}
                      component="span"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </label>
                </Box>
              ) : (
                <Box mt={0}>
                  <input
                    accept="image/*"
                    type="file"
                    id="upload-customer-pic"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                  />
                  <label htmlFor="upload-customer-pic">
                    <Box
                      component="span"
                      sx={{
                        background: "#1976d2",
                        color: "#fff",
                        px: 2,
                        py: 0.7,
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                    >
                      Upload Image
                    </Box>
                  </label>
                </Box>
              )}
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextArea
                label="Brand Name & Pack Description"
                value={formData.brand_description}
                onChange={(e) =>
                  handleChange("brand_description", e.target.value)
                }
                placeholder="Enter your text..."
                rows={4}
                error={!!errors.brand_description}
                helperText={errors.brand_description}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Repeat & Label Metrics
        </Typography>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="Repeat"
              value={formData.repeat_length}
              onChange={(e) => handleChange("repeat_length", e.target.value)}
              error={!!errors.repeat_length}
              helperText={errors.repeat_length}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="UPs"
              value={formData.ups}
              onChange={(e) => handleChange("ups", e.target.value)}
              error={!!errors.ups}
              helperText={errors.ups}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="Tracks"
              value={formData.tracks}
              onChange={(e) => handleChange("tracks", e.target.value)}
              error={!!errors.tracks}
              helperText={errors.tracks}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MasterDataDetails;
