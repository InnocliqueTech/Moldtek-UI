import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MasterDataFooter from "../Components/ReUsable/MasterDataFooter";
import ReusableInput from "../Components/ReUsable/TextField";
import { InfoOutline } from "@mui/icons-material";
import { useState } from "react";

const DyeCutting: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.masterData);

  // State for form data
  const [formData, setFormData] = useState({
    dyeCutMachineType: "Rotary Dye",
    machine: "Bobst Flexo",
    dyeCode: "Dye-56789",
    runSpeed: "100",
  });

  // Handle input changes
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box sx={{ borderRadius: "0px " }}>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Grid size={{xs:12,md:6}}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}>
              Dye Cutting Data Entry
            </Typography>
            <InfoOutline sx={{ color: "#9F9F9F", width: "20px", height: "20px" }} />
          </Box>

          <Grid container spacing={2} pt={1}>
            {[
              { label: "Dye Cut Machine Type", key: "dyeCutMachineType" },
              { label: "Machine", key: "machine" },
              { label: "Dye Code", key: "dyeCode" },
              { label: "Run Speed (m/min)", key: "runSpeed" },
            ].map(({ label, key }) => (
              <Grid size={{xs:12,md:4}} key={key}>
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
        <MasterDataFooter selectedTab={selectedTab} />
      </Box>
    </Box>
  );
};

export default DyeCutting;
