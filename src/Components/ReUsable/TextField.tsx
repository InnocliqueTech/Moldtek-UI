import React, { useState } from "react";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
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
  disabled?: boolean;
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
      <AutoTooltipText
        content={label}
        maxLength={30}
        variant="body2"
        sx={{ color: "#656565" }}
        tooltipPlacement="bottom"
        TooltipProps={{ arrow: false }}
      />

      <TextField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={showPassword && type === "password" ? "text" : type} 
        fullWidth
        variant="outlined"
        error={error}
        helperText={helperText}
        disabled={disabled}
        InputProps={{
          startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
          endAdornment: type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword
                edge="end"
                disableRipple
                disableFocusRipple
                sx={{
                  pointerEvents: "auto", // Allows clicking without focusing the input
                  "&:focus": { outline: "none" }, // Removes any focus outline
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        inputProps={{
          autoComplete: "new-password",
          style: {
            // Make sure Edge won't add its native icon
            appearance: "none",
            MozAppearance: "textfield",
            WebkitAppearance: "none",
          }
        }}
      
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& input": {
              padding: "6px 12px",
              color: "black",
              "&::-ms-reveal": {
                display: "none"
              },
              "&::-ms-clear": {
                display: "none"
              }
            },
          },
        }}
      />
    </Box>
  );
};

export default ReusableInput;
