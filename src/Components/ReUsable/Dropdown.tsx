import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Done } from '@mui/icons-material';

interface DropdownProps {
  options: string[];
  value: string[] | string;
  onChange: (event: SelectChangeEvent<string[]>) => void;
  isMultiSelect: boolean;
  label: string;
  showAllOption?: boolean;
  checkbox?: boolean;
}

const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  isMultiSelect,
  label,
  showAllOption = true,
  checkbox = true,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedOptions(Array.isArray(value) ? value : [value]);
  }, [value]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    let selectedValues = event.target.value as string[];

    if (showAllOption && selectedValues.includes('All')) {
      selectedValues = options;
    }

    setSelectedOptions(selectedValues);
    onChange(event);
  };

  return (
    <>
      {/* Top Heading with Gray Color */}
      <Typography variant="body2" sx={{ fontWeight:500,marginBottom:'4px'}} color="#656565">
      {label}
      </Typography>

      <FormControl fullWidth>
        <Select
          multiple={isMultiSelect}
          value={selectedOptions}
          onChange={handleSelectChange}
          renderValue={(selected) => 
            Array.isArray(selected) ? selected.join(', ') : selected
          }
          
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            PaperProps: {
              style: {
                maxHeight: 200, // Enables scrolling
                width: 250,
                overflowY: 'auto', // Adds scrollbar when content overflows
              },
            },
          }}
          sx={{
            borderRadius: '8px', // Changed border-radius
            backgroundColor: 'white',
            '& .MuiSelect-select': {
              padding: '6px 12px', // Decrease padding to reduce height
              color: "black",
            },
          }}
        >
          {isMultiSelect && showAllOption && (
            <MenuItem value="All">
              <Checkbox
                checked={selectedOptions.length === options.length}
                indeterminate={selectedOptions.length > 0 && selectedOptions.length < options.length}
              />
              <ListItemText primary="All" />
            </MenuItem>
          )}

{options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                backgroundColor: selectedOptions.includes(option) ? "blue-100" : "inherit",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {checkbox ? (
                <Checkbox checked={selectedOptions.includes(option)} />
              ) : null}

              <Tooltip title={option} arrow>
                <ListItemText
                  primary={option}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "180px",
                    color:"#2F2F2F"
                  }}
                />
              </Tooltip>

              {!checkbox && selectedOptions.includes(option) && (
               <IconButton sx={{color:'#0073B7'}}><Done/></IconButton>
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </>
  );
};

export default DropdownComponent;
