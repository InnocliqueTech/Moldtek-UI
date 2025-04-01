import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  SelectProps,
} from '@mui/material';

interface DropdownProps {
  options: string[]; // List of options
  value: string[] | string; // Selected option(s), can be single or multiple
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void; // Change handler
  isMultiSelect: boolean; // If true, allows multi-selection
  label: string; // Label for the dropdown
  showAllOption?: boolean; // If true, show the "All" option for multi-selection
  checkbox?: boolean; // If true, show checkboxes for multi-select
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
    if (Array.isArray(value)) {
      setSelectedOptions(value);
    } else {
      setSelectedOptions([value]);
    }
  }, [value]);

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValues = event.target.value as string[];

    if (showAllOption && selectedValues.includes('All')) {
      // Remove "All" if selected
      setSelectedOptions(selectedValues.filter((item) => item !== 'All'));
      onChange({ target: { value: options } });
    } else {
      setSelectedOptions(selectedValues);
      onChange({ target: { value: selectedValues } });
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={isMultiSelect}
        value={selectedOptions}
        onChange={handleSelectChange}
        renderValue={(selected) => (selected as string[]).join(', ')}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              width: 250,
            },
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
          <MenuItem key={option} value={option}>
            {checkbox ? (
              <Checkbox checked={selectedOptions.includes(option)} />
            ) : (
              <span style={{ display: selectedOptions.includes(option) ? 'inline' : 'none' }}>✔</span>
            )}
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownComponent;
