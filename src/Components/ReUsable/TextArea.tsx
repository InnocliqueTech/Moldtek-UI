import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  placeholder?: string;
  rows?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  fullWidth = true,
  disabled = false,
  error = false,
  helperText = "",
  className = "",
}) => {
  return (
    <Box display="flex" flexDirection="column">
    {/* Grey Heading */}
    <Typography variant="body2" sx={{ fontWeight:500,marginBottom:'4px'}} color="#656565">
      {label}
    </Typography>
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    multiline
      rows={rows}
      fullWidth={fullWidth}
      disabled={disabled}
      error={error}
      helperText={helperText}
      className={className}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          padding: "10px",
          "& input": {
            color: "black",
          },
        },
      }}
    />
    </Box>
  );
};

export default TextArea;
