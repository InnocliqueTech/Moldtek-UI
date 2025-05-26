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
import {
  useStructureDropdownMutation,
  useSubStrateDropDownMutation,
  useSupplierDropdownMutation,
} from "../../store/apis/genericApis";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setlaminationDropDownValues,
  setPrintingDropDownValues,
  setStructureDropDownValues,
  setSupplieraminationDropDownValues,
  setSupplierPrintingDropDownValues,
} from "../../store/slices/masterDataSlice";

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
  dropdown?: string;
}

const DropdownTextComponent: React.FC<DropdownProps> = ({
  options: initialOptions,
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
  dropdown = "",
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const [options, setOptions] = useState<string[]>(initialOptions);
  const [open, setOpen] = useState(false);

  const { selectedTab } = useSelector((state: RootState) => state.masterData);
  const [subStrateDropDown] = useSubStrateDropDownMutation();
   const [supplierDropdown] = useSupplierDropdownMutation();
  const [structureDropdown] =useStructureDropdownMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedOptions(value.filter((v) => v !== ""));
    } else if (value) {
      setSelectedOptions([value]);
    } else {
      setSelectedOptions([]);
    }
  }, [value]);
  useEffect(() => {
    if (initialOptions && initialOptions.length > 0) {
      setOptions(initialOptions);
    }
  }, [initialOptions]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    let selectedValues = event.target.value as string[];

    if (!isMultiSelect) {
      selectedValues = selectedValues.slice(-1); // only last value
    }

      setSelectedOptions(selectedValues);
      onChange(event);
  };

  const handleNewOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewOption(event.target.value);
  };

  const handleAddNewOption = async () => {
    const trimmedOption = newOption.trim();
    if (trimmedOption === "") return;

    const addToOptions = () => {
        if (!options.includes(trimmedOption)) {
          setOptions((prev) => [...prev, trimmedOption]);
        }
        const newSelected = isMultiSelect
          ? [...selectedOptions, trimmedOption]
          : [trimmedOption];

        setSelectedOptions(newSelected);
        onChange({
          target: { value: newSelected },
        } as SelectChangeEvent<string[]>);

        setNewOption("");
        setOpen(false);
    };

    try {
      switch (dropdown) {
        case "structure": {
          const response = await structureDropdown({ structure: trimmedOption }).unwrap();
          const structureList = response?.data?.map((item: any) => item.structure);
        dispatch(setStructureDropDownValues(structureList));
          addToOptions();
          break;
      } 
  
        case "supplier": {
        const response = await supplierDropdown({
        supplier: trimmedOption,
        supplier_type: selectedTab === 1 ? "printing" : "lamination",
        }).unwrap();
          const supplierList = response?.data?.map((item: any) => item.supplier);
        if (selectedTab === 1) {
          dispatch(setSupplierPrintingDropDownValues(supplierList));
        } else {
          dispatch(setSupplieraminationDropDownValues(supplierList));
        }
          addToOptions();
          break;
      }
      case "printingDailyPlan":{
        const response = await subStrateDropDown({
          substrate: trimmedOption,
          substrateType: "printing" ,
        }).unwrap();
          const substrateList = response?.data?.map((item: any) => item.substrate);
          dispatch(setPrintingDropDownValues(substrateList));
          addToOptions();
          break;
        }
  
        default: {
        const response = await subStrateDropDown({
          substrate: trimmedOption,
          substrateType: selectedTab === 1 ? "printing" : "lamination",
        }).unwrap();
          const substrateList = response?.data?.map((item: any) => item.substrate);
        if (selectedTab === 1) {
          dispatch(setPrintingDropDownValues(substrateList));
        } else {
          dispatch(setlaminationDropDownValues(substrateList));
          }
          addToOptions();
          break;
        }
      }
    } catch (error) {
      console.error("Error adding new option:", error);
    }
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
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
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
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddNewOption();
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
