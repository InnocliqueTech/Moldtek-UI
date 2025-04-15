import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export interface InfoItem {
  label: string;
  value: string;
  gridSize?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

interface InfoContainerProps {
  infoItems: InfoItem[];
  borderColor?: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  infoItems,
  // borderColor = "#ECECEC",
}) => {
  return (
    <Box className="px-4 pb-4"  sx={{
        // border: `1px solid ${borderColor}`,
        
      }}>
      <Box>
        <Grid container spacing={2} pt={1}>
          {infoItems.map((item, index) => (
            
            <Grid 
              key={index}
              size={{ xs: item.gridSize?.xs || 12, sm: item.gridSize?.sm || 6, md: item.gridSize?.md || 4, lg: item.gridSize?.lg || 3 }}
            >
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {item.label}
              </Typography>
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
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default InfoContainer;