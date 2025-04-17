import { Dialog, DialogContent, DialogActions, Typography, Box } from "@mui/material";
import ButtonComponent from "./Button";
import { TaskAlt } from "@mui/icons-material";

interface SuccessPopupProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  buttonText?: string;
  isLoading?: boolean;
  subMessage?:string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  open,
  title = "SUCCESS",
  message,
  onClose,
  buttonText = "Continue",
  subMessage,
  isLoading
}) => {
  return (
    <Dialog
      open={open}
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
       <TaskAlt sx={{color:"#0073B7", width:30,height:30,mb:1}}/>
        <Typography variant="h6" fontWeight="bold" color="#0073B7" mb={1}>
          {title}
        </Typography>
        <Typography variant="h6" fontWeight="bold">{message}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {subMessage}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <ButtonComponent
          text={buttonText}
          borderRadius="100px"
          color="#0073B7"
          textColor="white"
          onClick={onClose}
          p={2}
          loading={isLoading}
        />
      </DialogActions>
    </Dialog>
  );
};

export default SuccessPopup;
