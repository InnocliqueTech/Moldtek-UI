import React from "react";
import { TextField, Typography, Box } from "@mui/material";

interface ReusableInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: boolean;
  helperText?: string;
}

const ReusableInput: React.FC<ReusableInputProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  error = false,
  helperText = "",
}) => {
  return (
    <Box display="flex" flexDirection="column">
      {/* Grey Heading */}
      <Typography variant="body2" sx={{ fontWeight:500,marginBottom:'4px'}} color="#656565">
        {label}
      </Typography>

      {/* Input Field */}
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        fullWidth
        variant="outlined"
        error={error}
        helperText={helperText}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", //  Rounded corners
            "& input": {
              padding: "8px 10px", //  Adjust padding
              color: "black", // Display input text in black
            },
          },
        }}
      />
    </Box>
  );
};

export default ReusableInput;
