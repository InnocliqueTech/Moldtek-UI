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
  TextField,
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
  allowNewOption?: boolean;
}

const DropdownTextComponent: React.FC<DropdownProps> = ({
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
  allowNewOption = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedOptions(value.filter((v) => v !== ""));
    } else if (value) {
      setSelectedOptions([value]);
    } else {
      setSelectedOptions([]);
    }
  }, [value]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    let selectedValues = event.target.value as string[];

    if (!isMultiSelect) {
      selectedValues = selectedValues.slice(-1); // Single select
    }

    setSelectedOptions(selectedValues);
    onChange(event);
  };

  const handleNewOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewOption(event.target.value);
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
            disablePortal: true,
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            transformOrigin: { vertical: "top", horizontal: "left" },
            PaperProps: {
              style: {
                maxHeight: 250,
                width: 250,
                overflowY: "auto",
                paddingTop: allowNewOption ? 0 : undefined,
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
          <MenuItem value="">
            <em>Select {label}</em>
          </MenuItem>

          {allowNewOption && (
            <Box px={1} pt={1} pb={0.5}>
              <TextField
                label="Type and press Enter to add"
                variant="outlined"
                value={newOption}
                onChange={handleNewOptionChange}
                autoFocus
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter" && newOption.trim() !== "") {
                    e.preventDefault();
                    const trimmedOption = newOption.trim();
                    if (!options.includes(trimmedOption)) {
                      options.push(trimmedOption);
                    }
              
                    const newSelected = isMultiSelect
                      ? [...selectedOptions, trimmedOption]
                      : [trimmedOption];
              
                    setSelectedOptions(newSelected);
                    setNewOption("");
                    onChange({
                      target: { value: newSelected },
                    } as SelectChangeEvent<string[]>);
              
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                fullWidth
                size="small"
                helperText="Press Enter to add the new option."
              />
            </Box>
          )}

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
              <Tooltip title={option} arrow placement="right">
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

export default DropdownTextComponent;
