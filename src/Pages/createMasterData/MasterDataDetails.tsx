import { Box, Grid, IconButton, Typography } from "@mui/material";
import ReusableInput from "../../Components/ReUsable/TextField";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import TextArea from "../../Components/ReUsable/TextArea";
import { Edit} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import {  setSaveFormData } from "../../store/slices/masterDataSlice";
import { MasterFormData } from "./../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";
import { listOfLables } from "./data";

interface MasterDataProps {
  formData: MasterFormData,
  setFormData: React.Dispatch<React.SetStateAction<MasterFormData>>;
}

const MasterDataDetails: React.FC<MasterDataProps>= ({
  formData,setFormData
}) => {
  const dispatch = useDispatch<AppDispatch>();


  const {id} = useParams();

  const {  saveFormData } = useSelector(
    (state: RootState) => state.masterData
  );
  const { viewMasterDataDetails } = useSelector(
    (state: RootState) => state.viewMasterData
  );



  const [errors, setErrors] = useState<any>({
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
    field: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
     const newValue = Array.isArray(value)
      ? value
      : typeof value === "string"
      ? value
      : value.target.value;
  
    const numericFields = ["repeat_length", "ups", "tracks"];
    const characterFields = ["unit_effectivity_number", "customer_name", "item_code"];
  
    let finalValue: string | string[] | number = newValue;
    let errorMessage = "";
  
    if (numericFields.includes(field)) {
      if (!isNaN(Number(newValue)) && newValue !== "") {
        finalValue = Number(newValue);
        errorMessage = "";
      } else {
        finalValue = "";
        errorMessage = "Please enter a valid number.";
      }
    } 
    else if (characterFields.includes(field)) {
      const trimmed = (newValue as string).trim();
      const onlyLettersRegex = /^[A-Za-z\s]+$/;
  
      if (trimmed === "") {
        finalValue = "";
        errorMessage = "This field cannot be empty.";
      } else if (!onlyLettersRegex.test(trimmed)) {
        finalValue = "";
        errorMessage = "Only characters and spaces are allowed.";
      } else {
        errorMessage = "";
      }
    }
  
    setErrors({
      ...errors,
      [field]: errorMessage,
    });
  
    const updatedFormData = {
      ...formData,
      [field]: finalValue,
    };
  
    setFormData(updatedFormData);
    dispatch(setSaveFormData(updatedFormData));
  };
  
   

  useEffect(() => {
    if (saveFormData) {
      setFormData(saveFormData);
    }
  }, [saveFormData]);

  function sanitizeMasterData(data:any): MasterFormData {
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
  const dropdownOptions = listOfLables.map(option => option.labelTypeName);
  // const isFormInvalid =
  // Object.values(errors).some((error) => error) || // any validation error present
  // Object.entries(formData).some(
  //   ([ value]) => value === "" || value === null || value === undefined
  // );

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
              onChange={(e) => handleChange("unit_effectivity_number", e.target.value)}
              error={!!errors.unit_effectivity_number}
              helperText={errors.unit_effectivity_number}
              disabled={id ? true : false}
            />
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Type of Label"
                options={dropdownOptions}
                value={formData.label_type}
                onChange={(e) => handleChange("label_type", e)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Jar/Cap"
                options={["N/A (For flexible packaging)", "JAR", "CAP"]}
                value={formData.jar_cap}
                onChange={(value: any) => handleChange("jar_cap", value)}
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
                onChange={(value) => handleChange("structure", value)}
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
                  sx={{ width:'100%',height:'100%', borderRadius: "8px", mt: 1, objectFit: "cover", }}
                />
                 <input
                   accept="image/*"
                   type="file"
                   id="reupload-customer-pic"
                   style={{ display: "none" }}
                   onChange={(e) => {
                     const file = e.target.files?.[0];
                     if (file) {
                       const reader = new FileReader();
                       reader.onloadend = () => {
                         handleChange("customer_logo", reader.result as string);
                       };
                       reader.readAsDataURL(file);
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
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleChange(
                            "customer_logo",
                            reader.result as string
                          );
                        };
                        reader.readAsDataURL(file); // Convert to base64
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

            <Box sx={{ mt: 1 }}>
              <TextArea
                label="Brand Name & Pack Description"
                value={formData.brand_description}
                onChange={(e) =>
                  handleChange("brand_description", e.target.value)
                }
                placeholder="Enter your text..."
                rows={4}
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
              onChange={(e) =>
                handleChange("repeat_length", e.target.value)
              }
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
