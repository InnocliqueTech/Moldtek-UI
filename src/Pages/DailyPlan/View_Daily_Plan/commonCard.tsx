import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Tooltip, Skeleton, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import ReusableInput from "../../../Components/ReUsable/TextField";
import { setDailyPlanCancel, setDailyPlanSave, setUpdateCommonCard } from "../../../store/slices/viewDailyPlanSlice";
import theme from "../../../theme";

interface Props {
  isLoading: boolean;
  isEditing: boolean;
  onDataChange: () => void;
}

const CommenCard: React.FC<Props> = ({
  isLoading,
  isEditing,
  onDataChange,
}) => {
  const dispatch = useDispatch();
  const { dailyPlan,dailyPlanSave,dailyPlanCancel } = useSelector((state: RootState) => state.viewDailyPlan);
  const [editValues, setEditValues] = useState({
    shift: dailyPlan?.shift || "",
    workOrderNumber: dailyPlan?.workOrderNumber || "",
  });

 const isXs = useMediaQuery(theme.breakpoints.down('sm'));      
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
 let maxChars = 90;

  if (isXs) maxChars = 50;
  else if (isSm) maxChars = 50;
  else if (isMd) maxChars = 20;
  else if (isLg) maxChars = 25;
  else if (isXl) maxChars = 70;
const renderValue = (value: string | number | null | undefined,MAX_LENGTH:number) => {
   const displayValue = value !== null && value !== undefined ? String(value) : "N/A";

  // Check if truncation is needed
  const isTruncated = displayValue.length > MAX_LENGTH;
  const truncatedValue = isTruncated
    ? displayValue.slice(0, MAX_LENGTH) + "..."
    : displayValue;

  // If truncated, show tooltip on hover with full value
  return (
    <Tooltip title={isTruncated ? displayValue : ""} arrow>
      <span style={{ cursor: isTruncated ? 'pointer' : 'default' }}>
        {truncatedValue?truncatedValue:'N/A'}
      </span>
    </Tooltip>
  );
};

  const handleChange =
    (field: "shift" | "workOrderNumber") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      onDataChange();
    };
  useEffect(() => {
    dispatch(setUpdateCommonCard(editValues));
  }, [editValues]);

  useEffect(() => {
    setEditValues({
      shift: dailyPlan?.shift || "",
      workOrderNumber: dailyPlan?.workOrderNumber || "",
    });
  }, [dailyPlan]);

    useEffect(()=>{
    dispatch(setDailyPlanSave(false));
    dispatch(setDailyPlanCancel(false))
    },[])
    
  useEffect(() => {
    if (dailyPlanCancel && !dailyPlanSave) {
  
      if (dailyPlan) {
        setEditValues({
      shift: dailyPlan?.shift || "",
      workOrderNumber: dailyPlan?.workOrderNumber || "",
    });
      }
  
      // 🔁 Reset flags after handling cancel
      dispatch(setDailyPlanCancel(false));
      dispatch(setDailyPlanSave(false));
    }
  }, [dailyPlanCancel, dailyPlanSave]);


  return (
    <Box>
      {isLoading ? (
        <Grid container spacing={2} pt={1}>
          {[...Array(3)].map((_, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ mt: 1 }}
              />
              <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ mt: 1 }}
              />
              <Skeleton variant="text" width="50%" height={30} sx={{ mt: 2 }} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ mt: 1 }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Unit Effective Number{" "}
              </Typography>
              <Typography variant="body1" mt={0.5}>
                {renderValue(dailyPlan?.unitEffectivityNumber || "N/A",maxChars)}
              </Typography>

              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  PPC Indent Qty
                </Typography>
                <Typography variant="body1" mt={0.5}>
                  {renderValue(dailyPlan?.ppcIndentQtyNos || "N/A",maxChars)}
                </Typography>
              </Box>

              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  JAR/CAP
                </Typography>
                <Typography variant="body1" mt={0.5}>
                  {renderValue(dailyPlan?.jarCap || "N/A",maxChars)}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Date
                </Typography>
                <Typography variant="body1" mt={0.5}>
                  {dailyPlan?.date
                    ? new Date(dailyPlan.date).toLocaleDateString("en-GB") // dd/mm/yyyy
                    : "N/A"}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Indent Number
              </Typography>
              <Typography variant="body1" mt={0.5}>
                {renderValue(dailyPlan?.indentNumber || "N/A",maxChars)}
              </Typography>

              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Target Labels Qty
                </Typography>
                <Typography variant="body1" mt={0.5}>
                  {renderValue(dailyPlan?.targetLabelsQty || "N/A",maxChars)}
                </Typography>
              </Box>
                            <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  KLD
                </Typography>
                <Typography variant="body1" mt={0.5}>
                 {dailyPlan.kldCode ?dailyPlan.kldCode: "N/A"}
                </Typography>
              </Box>
                 <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Shift
                </Typography>
                {isEditing ? (
                  <ReusableInput
                    label=""
                    value={editValues.shift}
                    onChange={handleChange("shift")}
                    placeholder="Enter shift"
                  />
                ) : (
                  <Typography variant="body1" mt={0.5}>
                    {renderValue(dailyPlan?.shift || "N/A",maxChars)}
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Customer Name
              </Typography>
              <Typography variant="body1" mt={0.5}>
                {renderValue(dailyPlan?.customerName || "N/A",maxChars)}
              </Typography>

              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Target Film Mtrs
                </Typography>
                <Typography variant="body1" mt={0.5}>
                  {renderValue(dailyPlan?.targetFilmMtrs || "N/A",maxChars)}
                </Typography>
              </Box>

                                          <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Item Code
                </Typography>
                <Typography variant="body1" mt={0.5}>
                 {dailyPlan.itemCode ?dailyPlan.itemCode: "N/A"}
                </Typography>
              </Box>
                                             <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Mould Code
                </Typography>
                  <Typography variant="body1" mt={0.5}>
                    {renderValue(dailyPlan?.mouldCode || "N/A",maxChars)}
                  </Typography>
                {/* )} */}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Brand Name and Pack Size
              </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 0.5,
                    wordBreak: "break-word",
                    whiteSpace: "pre-line",
                  }}
                >
                  {renderValue(dailyPlan.brandName || "N/A",maxChars)}
                </Typography>

              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Film Required For Printing
                </Typography>
                <Typography variant="body1" mt={0.5}>
                  {renderValue(dailyPlan?.filmRequiredPrintingMtrs || "N/A",maxChars)}
                </Typography>
              </Box>

              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Work Order Number
                </Typography>
                {isEditing ? (
                  <ReusableInput
                    label=""
                    value={editValues.workOrderNumber}
                    onChange={handleChange("workOrderNumber")}
                    placeholder="Enter work order number"
                  />
                ) : (
                  <Typography variant="body1" mt={0.5}>
                    {renderValue(dailyPlan?.workOrderNumber || "N/A",maxChars)}
                  </Typography>
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
