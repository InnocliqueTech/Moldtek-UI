import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import AutoTooltipText from "./AutoTooltipText";

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  placeholder?: string;
  rows?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
  required?: boolean;
  multiline?:boolean;
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
  required = false,
  multiline=true
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" gap={0.5}>
        <AutoTooltipText
          content={label ?? ""}
          maxLength={25}
          variant="body2"
          sx={{ color: "#656565" }}
          tooltipPlacement="bottom"
        TooltipProps={{ arrow: false }}
        />
        {required && (
          <Typography component="span" color="error">
            *
          </Typography>
        )}
      </Box>
      <TextField
  value={value}
  onChange={onChange}
  placeholder={placeholder}
  multiline={multiline}
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
      "& input": {
        padding: "6px 12px",
        color: "black",
        "&::-ms-reveal": {
          display: "none",
        },
        "&::-ms-clear": {
          display: "none",
        },
      },
    }
  }}
  inputProps={{
    style: {
      overflow: "auto",
      whiteSpace: "pre", // Prevent line wrapping
    },
  }}
/>

    </Box>
  );
};

export default TextArea;
