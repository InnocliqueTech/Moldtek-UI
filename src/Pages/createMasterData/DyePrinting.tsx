import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MasterDataFooter from "../../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  setDyePrintingFormData,
  setIsDyeCuttingSave, 
} from "../../store/slices/masterDataSlice";

const DyePrinting: React.FC = () => {
  const { selectedTab, DyePrintingFormData } = useSelector(
    (state: RootState) => state.masterData
  );
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    dyeCutMachineType: "",
    machine: "",
    dyeCode: "",
    runSpeed: "",
  });

 

  const handleChange = (key: string, value: string) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);    
    dispatch(setDyePrintingFormData(updated)); 
  };
  
  const handleSave = () => {
    dispatch(setDyePrintingFormData(formData));
    dispatch(setIsDyeCuttingSave(true)); // <--- mark as saved
  };

  useEffect(() => {
    if (DyePrintingFormData) {
      setFormData(DyePrintingFormData);
    }
  }, [DyePrintingFormData]); 

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
              { label: "Dye Cut Machine Type", key: "dyeCutMachineType" },
              { label: "Machine", key: "machine" },
              { label: "Dye Code", key: "dyeCode" },
              { label: "Run Speed (m/min)", key: "runSpeed" },
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

export default DyePrinting;
