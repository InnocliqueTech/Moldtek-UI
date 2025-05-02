import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  SelectChangeEvent,
  Typography,
  Tooltip,
  IconButton,
  FormHelperText,
  Box,
} from "@mui/material";
import { Done } from "@mui/icons-material";

interface DropdownProps {
  options: string[];
  value: string[] | string;
  onChange: (event: SelectChangeEvent<string[]>) => void;
  isMultiSelect: boolean;
  label: string;
  showAllOption?: boolean;
  checkbox?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  isMultiSelect,
  label,
  showAllOption = true,
  checkbox = true,
  error = false,
  helperText = "",
  required = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedOptions(value.filter((v) => v !== ""));
    } else if (value) {
      setSelectedOptions(Array.isArray(value) ? value : [value]);
    } else {
      setSelectedOptions([]);
    }
  }, [value]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    let selectedValues = event.target.value as string[];
    if (showAllOption && selectedValues.includes("All")) {
      selectedValues = options;
    }
    // If placeholder is selected, reset to empty
    if (selectedValues.includes("")) {
      selectedValues = [];
    }

    // Handle "All" selection for multi-select
    if (isMultiSelect && showAllOption && selectedValues.includes("All")) {
      selectedValues = options;
    }

    setSelectedOptions(selectedValues);
    // Directly pass the event object back to the parent
    onChange(event);
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, marginBottom: "4px" }}
          color="#656565"
        >
          {label}
        </Typography>
        {required && (
          <Typography component="span" color="error">
            *
          </Typography>
        )}
      </Box>

      <FormControl fullWidth error={error}>
        <Select
          multiple={isMultiSelect}
          value={selectedOptions}
          onChange={handleSelectChange}
          displayEmpty
          renderValue={(selected) => {
            if (
              selected.length === 0 ||
              (Array.isArray(selected) && selected.includes(""))
            ) {
              return (
                <Typography color="text.secondary" sx={{ opacity: 0.7 }}>
                  Select {label}
                </Typography>
              );
            }
            const displayText = Array.isArray(selected)
              ? selected.join(", ")
              : selected;
            return (
              <Tooltip title={displayText} arrow>
                <div
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {displayText}
                </div>
              </Tooltip>
            );
          }}
          MenuProps={{
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            transformOrigin: { vertical: "top", horizontal: "left" },
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 250,
                overflowY: "auto",
              },
            },
          }}
          sx={{
            borderRadius: "8px",
            backgroundColor: "white",
            "& .MuiSelect-select": {
              padding: "6px 12px",
              color: "black",
            },
          }}
        >
          {/* Placeholder Option */}
          <MenuItem value="">
            <em>Select {label}</em>
          </MenuItem>

          {/* "All" Option for multi-select */}
          {isMultiSelect && showAllOption && (
            <MenuItem value="All">
              <Checkbox
                checked={selectedOptions.length === options.length}
                indeterminate={
                  selectedOptions.length > 0 &&
                  selectedOptions.length < options.length
                }
              />
              <ListItemText primary="All" />
            </MenuItem>
          )}

          {/* Actual Options */}
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                backgroundColor: selectedOptions.includes(option)
                  ? "#e3f2fd"
                  : "inherit",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {checkbox && (
                <Checkbox checked={selectedOptions.includes(option)} />
              )}
              <Tooltip title={option} arrow>
                <div
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "300px",
                    flexGrow: 1,
                    color: "#2F2F2F",
                  }}
                >
                  {option}
                </div>
              </Tooltip>
              {!checkbox && selectedOptions.includes(option) && (
                <IconButton sx={{ color: "#0073B7" }}>
                  <Done />
                </IconButton>
              )}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default DropdownComponent;
