import React, { useState } from "react";
import { TextField, Typography, Box, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ReusableInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: boolean;
  helperText?: string;
  icon?: React.ReactNode; // Left-side icon
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
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
        type={type === "password" && !showPassword ? "password" : "text"}
        fullWidth
        variant="outlined"
        error={error}
        helperText={helperText}
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
