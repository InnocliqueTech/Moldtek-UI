import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import ButtonComponent from "./Button";
import { HelpOutline } from "@mui/icons-material";

interface ConfirmPopupProps {
  open: boolean;
  title: string;
  message: string;
  buttonText?: string;
  gifSrc?: string;
  onClose: () => void;
  onConfirm?: () => void;
  buttonText2?: string;
  onClick?:()=> void;
  isLoading?:boolean;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  open,
  title,
  message,
  buttonText,
  onClose,
  buttonText2,
  onClick,
  isLoading
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
      <HelpOutline sx={{color:"#0073B7", width:40,height:40,mb:1}}/>
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
            // loading={isLoading}
          />
        )}
        {buttonText2 && (
          <ButtonComponent
            text={buttonText2}
            borderRadius="100px"
            color="#0073B7"
            textColor="white"
            onClick={onClick }
            p={2}
            loading={isLoading}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPopup;
