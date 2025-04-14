import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import ButtonComponent from "./Button";
import ReusableInput from "./TextField";
import DropdownComponent from "./Dropdown";
import { CloudUpload } from "@mui/icons-material";


interface ReusablePopupProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  confirmText?: string;
  onConfirm?: () => void;
  text?: string;
  subText?: string;
  dropdownOptions?: string[]; 
  upload?: boolean;
  textField?: boolean;
  dropdown?: boolean;
  cancel?: boolean;
  sampleFile?:boolean;
  handleDownloadSampleFile?:()=> void;
}

const ReusablePopup: React.FC<ReusablePopupProps> = ({
  open,
  onClose,
  title,
  confirmText,
  onConfirm,
  text,
  subText,
  dropdownOptions = [], 
  upload,
  textField,
  cancel,
  dropdown,
  sampleFile,
  handleDownloadSampleFile
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Dialog
    open={open}
    onClose={onClose}
    maxWidth='xs' 
    fullWidth
    sx={{
      "& .MuiPaper-root": {
        borderRadius: "16px",
      },
    }}
  >
      {/* Popup Header */}
      {title&&
      <DialogTitle sx={{pb:'6px',ml:'-12px'}}>{title}</DialogTitle>
}

      {/* Popup Body */}
      <DialogContent sx={{p:"16px", mt:'0px'}}>
        <Box display="flex" flexDirection="column" gap="10px">
          {/* Optional Text */}
          {text && <Typography variant="body2">{text}</Typography>}
          {subText && (
  <Box display="flex" alignItems="center" gap={'130px'}>
    <Typography variant="body2" color="gray">
      {subText}
    </Typography>
    {sampleFile && (
      <Typography
        variant="body2"
        sx={{
          color: "#007bff",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={handleDownloadSampleFile}
      >
        Download Sample File
      </Typography>
    )}
  </Box>
)}


          {upload && (
            <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
              maxWidth: 600,
              width: "100%",
              backgroundColor: "#fff",
              flexDirection:'column'
            }}
          >
            {/* Icon inside a rounded background */}
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloudUpload sx={{ color: "#9e9e9e", fontSize: 30 }} />
            </Box>
      
            {/* Upload button */}
            <label htmlFor="file-upload" style={{ flexGrow: 1 }}>
              <Typography component="span" sx={{ fontSize: "14px" }}>
                <span
                  style={{
                    color: "#007bff",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Click to upload
                </span>{" "}
                <span style={{ color: "#9e9e9e" }}>(max. 1MB)</span>
              </Typography>
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
      
            {/* Show selected file name */}
            {selectedFile && (
              <Typography variant="body2" color="green">
                {selectedFile.name}
              </Typography>
            )}
          </Box>
          )}
          {textField && (
            <>
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                <ReusableInput
                  label="Unit Effectivity Number"
                  placeholder="Enter Customer Name"
                  value={"UEN-20240801"}
                  onChange={() => {}}
                />
                <ReusableInput
                  label="Customer / Company Name"
                  placeholder="Enter UEN"
                  value={"Nestle"}
                  onChange={() => {}}
                />
                <ReusableInput
                  label=" Brand Name & Pack"
                  placeholder="Enter Brand & Pack"
                  value={"KitKat 50g Wrapper"}
                  onChange={() => {}}
                />
                <ReusableInput
                  label="ITEM Code"
                  placeholder="Enter ITEM Code"
                  value={"KK-50G-123"}
                  onChange={() => {}}
                />
              </Box>
              <ReusableInput
                label=" Jar/Cap"
                placeholder="Enter Jar/Cap Details"
                value={"N/A (For flexible packaging)"}
                onChange={() => {}}
              />
            </>
          )}
          {/* Dynamic Dropdown */}
          {dropdown && (
            <DropdownComponent
              options={dropdownOptions}
              value={"PET"}
              onChange={() => {}}
              isMultiSelect={false}
              label="Structure"
              showAllOption={false}
              checkbox={false}
            />
          )}
        </Box>
      </DialogContent>

      {/* Popup Actions (Confirm & Close) */}
      <DialogActions sx={{ paddingBottom: "16px",mt:'-6px' }}>
        {cancel && (
          <ButtonComponent
            onClick={onClose}
            text="Cancel"
            color="white"
            textColor="#0E0E0E"
          />
        )}
        {confirmText &&
        <ButtonComponent
          onClick={onConfirm}
          text={confirmText}
          color="#0073B7"
          textColor="white"
          borderRadius="100px"
          width={cancel ? "" : "100%"}
        />
}
      </DialogActions>
    </Dialog>
  );
};

export default ReusablePopup;
