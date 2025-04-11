import { Box, Grid, IconButton, Typography } from "@mui/material";
import ReusableInput from "../../Components/ReUsable/TextField";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import TextArea from "../../Components/ReUsable/TextArea";
import { Edit} from "@mui/icons-material";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { setIsMasterDetailsDataSave, setSaveFormData } from "../../store/slices/masterDataSlice";
import { MasterFormData } from "./../../store/slices/masterDataSlice";
import { useParams } from "react-router-dom";

const MasterDataDetails: React.FC = () => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      console.log("EDITEDDATA");
    }
  }, []);
  const { selectedTab, saveFormData } = useSelector(
    (state: RootState) => state.masterData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<MasterFormData>({
    unitEffectivityNumber: "",
    typeOfLabel: "",
    jarCap: "",
    customer: "",
    itemCode: "",
    structure: "",
    brandDescription: "",
    repeat: "",
    ups: "",
    tracks: "",
    labelsPerMeter: "",
    substrateType: "",
    supplier: "",
    dyneLevel: "",
    width: "",
    thickness: "",
    density: "",
    gsm: "",
    customerPicture: "",
  });

  const handleSave = () => {
    dispatch(setSaveFormData(formData));
     dispatch(setIsMasterDetailsDataSave(true));
  };

  const handleChange = (
     field: string,
     value: string | string[] | SelectChangeEvent<string | string[]>
   ) => {
     const newValue = Array.isArray(value)
       ? value
       : typeof value === "string"
       ? value
       : value.target.value;
   
     const updatedFormData = {
       ...formData,
       [field]: newValue,
     };
   
     setFormData(updatedFormData);
     dispatch(setSaveFormData(updatedFormData)); 
   };
   

  useEffect(() => {
    if (saveFormData) {
      setFormData(saveFormData);
    }
  }, [saveFormData]);

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
              value={formData.unitEffectivityNumber}
              onChange={(e) =>
                handleChange("unitEffectivityNumber", e.target.value)
              }
            />
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Type of Label"
                options={["KitKat 50g Wrapper"]}
                value={formData.typeOfLabel}
                onChange={(e) => handleChange("typeOfLabel", e)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <DropdownComponent
                label="Jar/Cap"
                options={["N/A (For flexible packaging)", "JAR", "CAP"]}
                value={formData.jarCap}
                onChange={(value: any) => handleChange("jarCap", value)}
                isMultiSelect={false}
                checkbox={false}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ReusableInput
              label="Customer"
              value={formData.customer}
              onChange={(e) => handleChange("customer", e.target.value)}
            />
            <Box sx={{ mt: 2 }} />
            <ReusableInput
              label="ITEM Code"
              value={formData.itemCode}
              onChange={(e) => handleChange("itemCode", e.target.value)}
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

              {formData.customerPicture ? (
                 <Box position="relative" width={120} height={120} mt={1}>
                 <Box
                  component="img"
                  src={formData.customerPicture}
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
                         handleChange("customerPicture", reader.result as string);
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
                            "customerPicture",
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
                value={formData.brandDescription}
                onChange={(e) =>
                  handleChange("brandDescription", e.target.value)
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
              value={formData.repeat}
              onChange={(e) => handleChange("repeat", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="UPs"
              value={formData.ups}
              onChange={(e) => handleChange("ups", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ReusableInput
              label="Tracks"
              value={formData.tracks}
              onChange={(e) => handleChange("tracks", e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} handleSave={handleSave} />
      </Box>
    </Box>
  );
};

export default MasterDataDetails;
