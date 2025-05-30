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
  List,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeGlobalPopup } from "../../store/slices/masterDataSlice";
import dayjs from "dayjs";
import { AccessTime, CheckCircle, Description, ErrorOutline } from "@mui/icons-material";
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



  const SummaryTile = ({ count, label, color, icon }: { count: number; label: string; color: string; icon: React.ReactNode }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    width={100}
    height={100}
    bgcolor={color}
    borderRadius={2}
    color="#fff"
    textAlign="center"
    boxShadow={3}
  >
    <Box fontSize="1.5rem" mb={0.5}>
      {icon}
    </Box>
    <Typography fontWeight={700} fontSize="1.2rem">
      {count}
    </Typography>
    <Typography fontSize="0.875rem">{label}</Typography>
  </Box>
);


const renderFileSummary = () => {
  const totalFiles = PopupState.data?.length || 0;
  const successful = PopupState.data?.filter(item => item.fileReadStatus === "Success").length || 0;
  const failed = totalFiles - successful;

  return (
    <Box>
      <Typography align="center" fontWeight={600} variant="h6" color="primary" mb={3}>
        We've finished processing your files
      </Typography>

      {/* Summary Tiles */}
      <Box display="flex" justifyContent="center" gap={2} mb={4} flexWrap="wrap">
        <SummaryTile count={successful} label="Successful" color="#4caf50" icon={<CheckCircle />} />
        <SummaryTile count={failed} label="Failed" color="#f44336" icon={<ErrorOutline />} />
        <SummaryTile count={totalFiles} label="Total Files" color="#2196f3" icon={<Description />} />
      </Box>

      {/* File Cards */}
      {PopupState.data?.map((item) => {
        const date = dayjs(item.processedOn).format("DD MMM YYYY");
        const time = dayjs(item.processedOn).format("hh:mm A");
        const isSuccess = item.fileReadStatus === "Success";

        return (
          <Box
            key={item.id}
            mb={3}
            p={2}
            borderRadius={2}
            boxShadow={2}
            bgcolor={isSuccess ? "#f1fdf6" : "#fff6f6"}
            border={`2px solid ${isSuccess ? '#8bc34a' : '#ef5350'}`}
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
              <Box display="flex" alignItems="center" gap={1}>
                <List/>
                <Typography variant="body2">
                  Unit Effective Numbers: {item.unitEffectiveNumbers?.toLocaleString() || "N/A"}
                </Typography>
              </Box>
            </Box>

            {item.exceptionMessage && (
              <Typography color="error" variant="body2" mt={1.5}>
                <strong>Error:</strong> {item.exceptionMessage}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
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
        {PopupState.data?.length ? renderFileSummary() : (
          <Typography>{PopupState.message}</Typography>
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
