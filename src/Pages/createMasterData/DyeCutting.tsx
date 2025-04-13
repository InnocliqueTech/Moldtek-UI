import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  setDyeCuttingFormData,
  setIsDyeCuttingSave,
  setRequestPayload, 
} from "../../store/slices/masterDataSlice";

const DyeCutting: React.FC = () => {
  const { selectedTab, dyeCuttingFormData,requestPayload,saveFormData,printingSaveFormData,laminaionFormData } = useSelector(
    (state: RootState) => state.masterData
  );
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    machine_type: "",
    machine_name: "",
    dye_code: "",
    run_speed: 0
  });

 

  const handleChange = (key: string, value: string) => {
    const parsedValue = key === "run_speed" ? Number(value) : value;
    const updated = { ...formData, [key]: parsedValue };
    setFormData(updated);
    dispatch(setDyeCuttingFormData(updated));
  };
  
  
  const handleSave = () => {
    dispatch(setDyeCuttingFormData(formData));
    dispatch(setIsDyeCuttingSave(true)); 
    const updatedPayload = {
      ...requestPayload, // if you're getting it from useSelector or props
      masterDataDetails: {
        ...requestPayload.masterDataDetails,
        ...saveFormData,
      
      },
      masterDataPrinting:{
        ...requestPayload.masterDataPrinting,
        ...printingSaveFormData
        },
        masterDataLamination:{
          ...requestPayload.masterDataLamination,
          ...laminaionFormData
        },
        masterDataDyeCutting:{
          ...requestPayload.masterDataDyeCutting,
          ...dyeCuttingFormData
        }
    };

  
    dispatch(setRequestPayload(updatedPayload));
  };
  console.log(requestPayload,"REQUESTPAYLOAD")

  useEffect(() => {
    if (dyeCuttingFormData) {
      setFormData(dyeCuttingFormData);
    }
  }, [dyeCuttingFormData]); 

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
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Box mt={1} display="flex" justifyContent="flex-end">
        <MasterDataFooter selectedTab={selectedTab} handleSave={handleSave} />
      </Box>
    </Box>
  );
};

export default DyeCutting;
