import React, { useState } from "react";
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Typography,
  Tooltip
} from "@mui/material";
import { ArrowForward, Visibility, VisibilityOff } from "@mui/icons-material";
import AutoTooltipText from "./AutoTooltipText";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

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
  endIcon?: React.ReactNode;
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
  endIcon
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onEnter = () => {
    console.log("Enter");
  }

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
      {type === "date" ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={value ? new Date(value as string) : null}
            onChange={(newValue) => {
              if (newValue) {
                const syntheticEvent = {
                  target: {
                    value: format(newValue, "yyyy-MM-dd"),
                  },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(syntheticEvent);
              }
            }}
            format="dd/MM/yyyy"
            minDate={new Date()}
            shouldDisableDate={(date) => {
              const currentDate = new Date();

              // Disable all past dates, months, and years
              return (
                date.getFullYear() < currentDate.getFullYear() ||
                (date.getFullYear() === currentDate.getFullYear() &&
                  date.getMonth() < currentDate.getMonth()) ||
                (date.getFullYear() === currentDate.getFullYear() &&
                  date.getMonth() === currentDate.getMonth() &&
                  date.getDate() < currentDate.getDate())
              );
            }}
            slotProps={{
              textField: {
                placeholder,
                fullWidth: true,
                error,
                helperText,
                disabled,
                variant: "outlined",
                size: "small",
                sx: {
                  "& .MuiPickersInputBase-root": {
                    borderRadius: "8px !important",
                  },
                  "& .MuiPickersSectionList-root": {
                    padding: "6.5px 0 !important",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      ) : (
         type !== "password" ? (
          <Tooltip title={value}>
            <TextField
              placeholder={`Enter a ${label}`}
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
                endAdornment: (
                  <>
                    {endIcon && (
                      <InputAdornment position="end">
                        <IconButton onClick={onEnter} edge="end" color="primary">
                          <ArrowForward />
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                ),
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
          </Tooltip>
        ) : (
          <TextField
            placeholder={`Enter a ${label}`}
            value={value}
            onChange={onChange}
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            error={error}
            helperText={helperText}
            disabled={disabled}
            InputProps={{
              startAdornment: icon ? (
                <InputAdornment position="start">{icon}</InputAdornment>
              ) : null,
              endAdornment: (
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
              ),
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
        )

      )}
    </Box>
  );
};

export default ReusableInput;
