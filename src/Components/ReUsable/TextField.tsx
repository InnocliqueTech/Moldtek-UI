import React, { useState } from "react";
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
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
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
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
  disabled,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" gap={0.5}>
        <AutoTooltipText
          content={label}
          maxLength={30}
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
          startAdornment: icon ? (
            <InputAdornment position="start">{icon}</InputAdornment>
          ) : null,
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  disableRipple
                  disableFocusRipple
                  sx={{
                    pointerEvents: "auto",
                    "&:focus": { outline: "none" },
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
            appearance: "none",
            MozAppearance: "textfield",
            WebkitAppearance: "none",
          },
        }}
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
          },
        }}
      />
    </Box>
  );
};

export default ReusableInput;
