import React, { useState } from "react";
import { TextField, Typography, Box, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AutoTooltipText from "./AutoTooltipText";

interface ReusableInputProps {
  label: string;
  placeholder?: string;
  value: string | string[] | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: boolean;
  helperText?: string;
  icon?: React.ReactNode; // Left-side icon
  disabled?:boolean
}

const ReusableInput: React.FC<ReusableInputProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  error = false,
  helperText = "",
  icon,
  disabled
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box display="flex" flexDirection="column">
      {/* Grey Heading */}
      <AutoTooltipText
         content= {label}
         maxLength={30}
         variant= "body2" 
         sx={{ color: "#656565" }}
         tooltipPlacement="bottom"
         TooltipProps={{ arrow: false }}
      />
      {/* <Typography variant="body2" sx={{ fontWeight:500,marginBottom:'4px'}} color="#656565">
        {label}
      </Typography> */}

      {/* Input Field */}
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type === "password" && !showPassword ? "password" : type}
        fullWidth
        variant="outlined"
        error={error}
        helperText={helperText}
        disabled={disabled}
        InputProps={{
          startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
          endAdornment: type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end"
                disableRipple
                disableFocusRipple
                sx={{
                  pointerEvents: "auto", // Allows clicking without focusing the input
                  "&:focus": { outline: "none" }, // Removes any focus outline
                }} >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& input": {
              padding: "6px 12px",
              color: "black",
            },
          },
        }}
      />
    </Box>
  );
};

export default ReusableInput;
