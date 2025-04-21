import React from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";
export interface InfoItem {
  label: string;
  value: string;
  gridSize?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  editable?: boolean; 
  keyName?: string;   
}
interface InfoContainerProps {
  infoItems: InfoItem[];
  isEditing?: boolean; // ✨ New
  setInfoItems?: (updatedItems: InfoItem[]) => void; // ✨ New
  borderColor?: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  infoItems,
  isEditing = false,
  setInfoItems,
}) => {
  const handleChange = (index: number, newValue: string) => {
    if (!setInfoItems) return;
    const updated = [...infoItems];
    updated[index] = { ...updated[index], value: newValue };
    setInfoItems(updated);
  };
  console.log(isEditing,"inside infoContainer");
  return (
    <Box className="px-4 pb-4">
      <Grid container spacing={2} pt={1}>
        {infoItems.map((item, index) => (
          <Grid
            key={index}
            size={{ xs: item.gridSize?.xs || 12, sm: item.gridSize?.sm || 6, md: item.gridSize?.md || 4, lg: item.gridSize?.lg || 3 }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {item.label}
            </Typography>
            {isEditing && item.editable ? (
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={item.value}
                onChange={(e) => handleChange(index, e.target.value)}
                sx={{ mt: 0.5 }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                {item.value || "N/A"}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfoContainer;