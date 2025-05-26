import { Dialog, DialogContent, DialogActions, Typography } from "@mui/material";
import ButtonComponent from "./Button";
import { TaskAlt } from "@mui/icons-material";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";

interface SuccessPopupProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  buttonText?: string;
  isLoading?: boolean;
  subMessage?:string;
  onClick?: ()=> void;
  popUpClosed?:boolean
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  open,
  title = "SUCCESS",
  message,
  onClose,
  buttonText = "Continue",
  subMessage,
  isLoading,
  onClick,
  popUpClosed
}) => {

  const location = useLocation();

useEffect(() => {
  if (open) {
    onClose()
  }
}, [location]);

  return (
    <Dialog
      open={open}
      onClose={()=>{if(popUpClosed){
        onClose()
      }}}
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
          onClick={onClick}
          p={2}
          loading={isLoading}
        />
      </DialogActions>
    </Dialog>
  );
};

export default SuccessPopup;
