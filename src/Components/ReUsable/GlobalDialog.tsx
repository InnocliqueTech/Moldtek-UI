import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeGlobalPopup } from "../../store/slices/masterDataSlice";
import dayjs from "dayjs";
import { AccessTime, CheckCircle } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GlobalDialog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { PopupState } = useSelector((state: RootState) => state.masterData);
  const handleClose = () => {
    dispatch(closeGlobalPopup());
  };

  useEffect(() => {
  if (PopupState.open) {
    handleClose();
  }
}, [location]);



const renderFileSummary = () => {
  return PopupState.data?.map((item) => {
    const date = dayjs(item.processedOn).format("DD MMM YYYY");
    const time = dayjs(item.processedOn).format("hh:mm A");
    const isSuccess = item.fileReadStatus.toLowerCase() === "success";

    return (
      <Box
        key={item.pkUploadMasterId}
        mb={3}
        p={2}
        borderRadius={2}
        boxShadow={2}
        bgcolor={isSuccess ? "#f1fdf6" : "#fff6f6"}
        border={`2px solid ${isSuccess ? "#8bc34a" : "#ef5350"}`}
      >
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <CheckCircle color={isSuccess ? "success" : "error"} fontSize="small" />
          <Typography fontWeight={600}>{item.fileName}</Typography>
        </Box>

        <Chip
          label={item.fileReadStatus}
          color={isSuccess ? "success" : "error"}
          size="small"
          sx={{ mb: 1 }}
        />

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexWrap="wrap" gap={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarIcon fontSize="small" />
            <Typography variant="body2">{date}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime fontSize="small" />
            <Typography variant="body2">{time}</Typography>
          </Box>
        </Box>
        {item.units?.length ? (
          item.units.map((unit, idx) => (
            <Box key={idx} mt={2}>
              <Typography variant="body2">
                <strong>Unit Effective Numbers:</strong> {unit.unitEffectiveNumber || "N/A"}
              </Typography>
              {unit.exceptionMessage && (
                <Typography color="error" variant="body2" mt={0.5}>
                  <strong>Error:</strong> {unit.exceptionMessage}
                </Typography>
              )}
            </Box>
          ))
        ) : (
          <Typography variant="body2" mt={2}>
           
          </Typography>
        )}
      </Box>
    );
  });
};





  return (
    <Dialog open={PopupState.open} onClose={()=>{}} maxWidth="md" fullWidth  PaperProps={{
        sx: {
          borderRadius: "16px",
          textAlign: "center",
          padding: "14px",
        },
      }}>
      <DialogTitle>
       File Processing Summary
      </DialogTitle>
      <DialogContent dividers>
       {PopupState.data?.some(
  item =>
    item.pkUploadMasterId !== 0 ||
    item.fileName !== "" ||
    item.fileReadStatus !== "" ||
    item.processedOn !== "" ||
    item.units?.some(
      unit =>
        unit.unitEffectiveNumber !== "" ||
        unit.exceptionMessage !== ""
    )
) ? (
  renderFileSummary()
) : (
  <Typography>No notifications available.</Typography>
)}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalDialog;
