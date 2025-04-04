import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactNode } from "react";
import ButtonComponent from "./Button";

interface ConfirmPopupProps {
  open: boolean;
  title: string;
  message: string;
  buttonText?: string;
  gifSrc?: string;
  onClose: () => void;
  onConfirm?: () => void;
  buttonText2?: string;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  open,
  title,
  message,
  buttonText,
  gifSrc,
  onClose,
  onConfirm,
  buttonText2,
}) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          textAlign: "center",
          padding: "24px",
          maxWidth: "400px",
        },
      }}
    >
      <DialogContent>
        {gifSrc && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={gifSrc}
              alt="Success"
              style={{ width: "80px", height: "80px" }}
            />
          </Box>
        )}
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        {buttonText && (
          <ButtonComponent
            text={buttonText}
            borderRadius="100px"
            color=""
            border="1px solid #E5E5E5"
            textColor="#0A0A0A"
            onClick={onClose}
            p={2}
          />
        )}
        {buttonText2 && (
          <ButtonComponent
            text={buttonText2}
            borderRadius="100px"
            color="#0073B7"
            textColor="white"
            onClick={onConfirm }
            p={2}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPopup;
