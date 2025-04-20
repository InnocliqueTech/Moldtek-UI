import React, { useState } from "react";
import { Typography, Grid, Box, Tooltip, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ReusableInput from "../../../Components/ReUsable/TextField"; // Adjust the import path as needed

interface Props {
  isLoading: boolean;
  isEditing: boolean;
  onDataChange: () => void;
}

const CommenCard: React.FC<Props> = ({ isLoading, isEditing, onDataChange  }) => {
  const { dailyPlan } = useSelector((state: RootState) => state.viewDailyPlan);
  const [editValues, setEditValues] = useState({
    shift: dailyPlan?.shift || "",
    workOrderNumber: dailyPlan?.workOrderNumber || ""
  });

  const maxChars = 20;
  const isLong = dailyPlan?.brandNamePack?.length > maxChars;
  const displayText = isLong ? dailyPlan.brandNamePack.slice(0, maxChars) + "..." : dailyPlan?.brandNamePack;

  const renderValue = (value: string | undefined | null | number) => {
    return value ? value : "N/A";
  };

  const handleChange = (field: 'shift' | 'workOrderNumber') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValues(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    onDataChange();
  };
console.log(editValues, dailyPlan.shift,dailyPlan.workOrderNumber,"inside the commonCard");
  return (
    <Box>
      {isLoading ? (
        <Grid container spacing={2} pt={1}>
          {[...Array(3)].map((_, index) => (
            <Grid size={{xs:12,md:4}} key={index}>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 1 }} />
              <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 1 }} />
              <Skeleton variant="text" width="50%" height={30} sx={{ mt: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 1 }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{xs:12,md:3}}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Effectivity Unit Number
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.unitEffectivityNumber || "N/A")}</Typography>

              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  PPC Indent Qty
                </Typography>
                <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.ppcIndentQty || "N/A")}</Typography>
              </Box>

              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  JAR/CAP
                </Typography>
                <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.jarCap || "N/A")}</Typography>
              </Box>
            </Grid>

            <Grid size={{xs:12,md:3}}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Indent Number
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.indentNumber || "N/A")}</Typography>

              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Target Labels Qty
                </Typography>
                <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.targetLabelsQty || "N/A")}</Typography>
              </Box>

              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Date
                </Typography>
                <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.date || "N/A")}</Typography>
              </Box>
            </Grid>

            <Grid size={{xs:12,md:3}}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Customer Name
              </Typography>
              <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.customerName || "N/A")}</Typography>

              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Target Film Mtrs
                </Typography>
                <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.targetFilmMtrs || "N/A")}</Typography>
              </Box>

              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Shift
                </Typography>
                {isEditing ? (
                  <ReusableInput
                    label=""
                    value={editValues.shift}
                    onChange={handleChange('shift')}
                    placeholder="Enter shift"
                  />
                ) : (
                  <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.shift || "N/A")}</Typography>
                )}
              </Box>
            </Grid>

            <Grid size={{xs:12,md:3}}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Brand Name and Pack Size
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
                  {renderValue(displayText || "N/A")}
                </Typography>
              </Tooltip>

              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Film Required For Printing
                </Typography>
                <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.filmRequiredForPrinting || "N/A")}</Typography>
              </Box>

              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Work Order Number
                </Typography>
                {isEditing ? (
                  <ReusableInput
                    label=""
                    value={editValues.workOrderNumber}
                    onChange={handleChange('workOrderNumber')}
                    placeholder="Enter work order number"
                  />
                ) : (
                  <Typography variant="body1" mt={0.5}>{renderValue(dailyPlan?.workOrderNumber || "N/A")}</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CommenCard;