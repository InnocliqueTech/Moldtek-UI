import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeGlobalPopup } from "../../store/slices/masterDataSlice";
import dayjs from "dayjs";

const GlobalDialog = () => {
  const dispatch = useDispatch();
  const { PopupState } = useSelector((state: RootState) => state.masterData);

  const handleClose = () => {
    dispatch(closeGlobalPopup());
  };

  const renderFileSummary = () => {
    return (
      <>
        <Typography
          align="center"
          fontWeight={600}
          variant="h6"
          color="primary"
          mb={3}
        >
          We've finished processing your files
        </Typography>

        {PopupState.data?.map((item) => {
          const date = dayjs(item.processedOn).format("DD MMM YYYY");
          const time = dayjs(item.processedOn).format("hh:mm A");

          return (
            <Box
              key={item.id}
              mb={2}
              p={2}
              border="1px solid #ddd"
              borderRadius={2}
              bgcolor={item.fileReadStatus === "Success" ? "#f1fdf6" : "#fff6f6"}
            >
              <Typography fontWeight={600} gutterBottom>
                {item.fileName}
              </Typography>

              <Box display="flex" gap={2} flexWrap="wrap" mb={1}>
                <Chip
                  label={item.fileReadStatus}
                  color={item.fileReadStatus === "Success" ? "success" : "error"}
                  size="small"
                />
                <Typography variant="body2">Date: {date}</Typography>
                <Typography variant="body2">Time: {time}</Typography>
              </Box>

              <Typography variant="body2" mt={0.5}>
                <strong>Unit Effective Numbers:</strong>{" "}
                {item.unitEffectiveNumbers || "N/A"}
              </Typography>

              {item.exceptionMessage && (
                <Typography color="error" variant="body2" mt={1}>
                  <strong>Errors:</strong> {item.exceptionMessage}
                </Typography>
              )}
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <Dialog open={PopupState.open} onClose={handleClose} maxWidth="md" fullWidth  PaperProps={{
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
