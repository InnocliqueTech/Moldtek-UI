import React from "react";
import { Typography, Grid, Box } from "@mui/material";

const CommenCard: React.FC = () => {
  return (
    <Box>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{xs:12,md:3}}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Effectivity Unit Number
            </Typography>
            <Typography variant="body1" mt={0.5}>UEN-20240801</Typography>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                PPC Indent Qty
              </Typography>
              <Typography variant="body1" mt={0.5}>6123512</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                JAR/CAP
              </Typography>
              <Typography variant="body1" mt={0.5}>JAR</Typography>
            </Box>
          </Grid>

          <Grid size={{xs:12,md:3}}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Indent Number
            </Typography>
            <Typography variant="body1" mt={0.5}>21426152</Typography>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Target Labels Qty
              </Typography>
              <Typography variant="body1" mt={0.5}>6123512</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Date
              </Typography>
              <Typography variant="body1" mt={0.5}>8-Sep-2025</Typography>
            </Box>
          </Grid>

          <Grid size={{xs:12,md:3}}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Customer Name
            </Typography>
            <Typography variant="body1" mt={0.5}>Nestlé</Typography>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Target Film Mtrs
              </Typography>
              <Typography variant="body1" mt={0.5}>5234</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Shift
              </Typography>
              <Typography variant="body1" mt={0.5}>Morning</Typography>
            </Box>
          </Grid>

          <Grid size={{xs:12,md:3}}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Brand Name & Pack
            </Typography>
            <Typography variant="body1" mt={0.5}>KitKat 50g Wrapper</Typography>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Film Required For Printing
              </Typography>
              <Typography variant="body1" mt={0.5}>3267</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Work Order Number
              </Typography>
              <Typography variant="body1" mt={0.5}>233443</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CommenCard;
