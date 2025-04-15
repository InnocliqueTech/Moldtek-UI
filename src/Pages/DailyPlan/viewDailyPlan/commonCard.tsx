import React from "react";
import { Typography, Grid, Box, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";


const CommenCard: React.FC = () => {

const {dailyPlan} = useSelector((state:RootState)=>state.viewDailyPlan)
const maxChars = 20
const isLong = dailyPlan.brandNamePack.length > maxChars;
const displayText = isLong ?dailyPlan.brandNamePack.slice(0, maxChars) + "..." :dailyPlan.brandNamePack;
const renderValue = (value: string | undefined | null | number) => {
  return value ? value : "N/A";
};
  return (
    <Box>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{xs:12,md:3}}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Effectivity Unit Number
            </Typography>
            <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.unitEffectivityNumber)}</Typography>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                PPC Indent Qty
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.ppcIndentQty)}</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                JAR/CAP
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.jarCap)}</Typography>
            </Box>
          </Grid>

          <Grid size={{xs:12,md:3}}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Indent Number
            </Typography>
            <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.indentNumber)}</Typography>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Target Labels Qty
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.targetLabelsQty)}</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Date
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.date)}</Typography>
            </Box>
          </Grid>

          <Grid size={{xs:12,md:3}}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Customer Name
            </Typography>
            <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.customerName)}</Typography>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Target Film Mtrs
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.targetFilmMtrs)}</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Shift
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.shift)}</Typography>
            </Box>
          </Grid>

          <Grid size={{xs:12,md:3}}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Brand Name & Pack
            </Typography>
                         <Tooltip title={isLong ? dailyPlan.brandNamePack : ""} placement="top" arrow>
                           <Typography
                             variant="body1"
                             sx={{
                               mt: 0.5,
                               wordBreak: "break-word",
                               whiteSpace: "pre-line",
                             }}
                           >
                             {renderValue(displayText)}
                           </Typography>
                         </Tooltip>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Film Required For Printing
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.filmRequiredForPrinting)}</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Work Order Number
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan.workOrderNumber)}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CommenCard;
