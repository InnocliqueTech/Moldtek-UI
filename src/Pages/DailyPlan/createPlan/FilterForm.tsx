import React, { useState,  useEffect, useRef } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  InputAdornment,
  IconButton,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowForward,
  CalendarToday,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { RootState } from "../../../store";
import {
  setFiltersPayload,
  setSelectedCustomers,
  setSelectedLabelTypeIds,
} from "../../../store/slices/viewDailyPlanSlice";
import LabelTypeSelector from "./LabelTypes";
import CustomerSelect from "./CustomersData";
import SearchIcon from "@mui/icons-material/Search";
import { LocalDatePayload } from "./Filter";

interface FilterFormProps {
  setLocalDates: React.Dispatch<React.SetStateAction<LocalDatePayload>>;
  localDates: LocalDatePayload;
  searchField: string;
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  selectedStatuses: string[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterForm: React.FC<FilterFormProps> = ({
  setLocalDates,
  localDates,
  searchField,
  setSearchField,
  searchType,
  setSearchType,
  selectedStatuses,
  setSelectedStatuses,
}) => {
  const dispatch = useDispatch();
  const { openSliderDaily, isSearchTriggered } = useSelector(
    (state: RootState) => state.viewDailyPlan
  );

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const statusOptions = [
    { label: "Active", value: "Active", color: "#FFA500" },
    { label: "Inprogress", value: "Inprogress", color: "#0073B7" },
    { label: "Completed", value: "Completed", color: "#4CAF50" },
    { label: "Inactive", value: "Inactive", color: "#f44336" },
  ];

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (openSliderDaily && !hasInitialized.current) {
      hasInitialized.current = true;

      if (!isSearchTriggered) {
        dispatch(
          setFiltersPayload({
            customerName: [],
            fromDate: "",
            toDate: "",
            labelType: [],
            searchField: "",
            searchType: "",
            status: [],
          })
        );
        dispatch(setSelectedCustomers([]));
        dispatch(setSelectedLabelTypeIds([]));
        setLocalDates({ fromDate: null, toDate: null });
        setSearchField("");
        setSearchType("");
      }
    }
  }, [openSliderDaily, dispatch, isSearchTriggered]);

  const handleDateChange = (
    date: Date | null,
    field: keyof LocalDatePayload
  ) => {
    setLocalDates((prev) => ({ ...prev, [field]: date }));
  };

  const handleClearStatuses = () => {
    setSelectedStatuses([]);
  };

  const toggleStatus = (value: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: "2px",
              flexDirection: { md: "row", sm: "column" },
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              flex="1"
              maxWidth="170px"
            >
              <DatePicker
                label="From Date"
                open={openFrom}
                onOpen={() => setOpenFrom(true)}
                onClose={() => setOpenFrom(false)}
                value={localDates.fromDate}
                onChange={(newValue) => handleDateChange(newValue, "fromDate")}
                format="dd/MM/yyyy"
                slotProps={{
                  textField: {
                    placeholder: "dd/MM/yyyy",
                    onClick: () => setOpenFrom(true),
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        borderWidth: "2px",
                        border: "#f0f0f0",
                        "& fieldset": { borderWidth: "2px" },
                        "&:hover fieldset": { borderWidth: "2px" },
                        "&.Mui-focused fieldset": {
                          borderWidth: "2px",
                          border: "#f0f0f0",
                        },
                      },
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {localDates.fromDate ? (
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocalDates((prev) => ({
                                  ...prev,
                                  fromDate: null,
                                }));
                              }}
                            >
                              <ClearIcon />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => setOpenFrom(true)}>
                              <CalendarToday />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Box>

            <ArrowForward sx={{ alignSelf: "center" }} />

            <Box
              display="flex"
              flexDirection="column"
              flex="1"
              maxWidth="170px"
            >
              <DatePicker
                label="To Date"
                open={openTo}
                onOpen={() => setOpenTo(true)}
                onClose={() => setOpenTo(false)}
                value={localDates.toDate}
                onChange={(newValue) => handleDateChange(newValue, "toDate")}
                format="dd/MM/yyyy"
                shouldDisableDate={(date) => {
                  if (!localDates.fromDate) return false;
                  return (
                    new Date(date).setHours(0, 0, 0, 0) <
                    new Date(localDates.fromDate).setHours(0, 0, 0, 0)
                  );
                }}
                minDate={localDates.fromDate || undefined}
                slotProps={{
                  textField: {
                    placeholder: "dd/MM/yyyy",
                    onClick: () => setOpenTo(true),
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        borderWidth: "2px",
                        border: "#f0f0f0",
                        "& fieldset": { borderWidth: "2px" },
                        "&:hover fieldset": { borderWidth: "2px" },
                        "&.Mui-focused fieldset": {
                          borderWidth: "2px",
                          border: "#f0f0f0",
                        },
                      },
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {localDates.toDate ? (
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocalDates((prev) => ({
                                  ...prev,
                                  toDate: null,
                                }));
                              }}
                            >
                              <ClearIcon />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => setOpenTo(true)}>
                              <CalendarToday />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </LocalizationProvider>

      <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
        <CustomerSelect />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <LabelTypeSelector />
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2, mb: 2 }}>
        <Grid
          size={{ xs: 12 }}
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          <Typography variant="subtitle1">
            Status({selectedStatuses.length})
          </Typography>
          <IconButton size="small" onClick={handleClearStatuses}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Grid>

        {statusOptions.map((status) => {
          const isSelected = selectedStatuses.includes(status.value);
          return (
            <Grid key={status.value}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  py: 0,
                  border: "2px solid",
                  borderColor: isSelected ? status.color : "#ccc",
                  borderRadius: "20px",
                  cursor: "pointer",
                  backgroundColor: isSelected
                    ? `${status.color}20`
                    : "transparent",
                }}
                onClick={() => toggleStatus(status.value)}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  style={{
                    accentColor: status.color,
                    width: "14px",
                    height: "14px",
                    marginRight: "8px",
                    borderRadius: "0px",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 400,
                    color: status.color,
                    fontSize: "16px",
                  }}
                >
                  {status.label}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={0} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Search
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 9 }}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <TextField
              select
              size="small"
              variant="outlined"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              SelectProps={{ native: true }}
              sx={{
                width: "280px",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px 0 0 50px",
                  height: "40px",
                  fontSize: "0.875rem",
                },
              }}
            >
              <option value="">Select Type</option>
              <option value="UEN">UEN</option>
              <option value="Indent">Indent No</option>
            </TextField>

            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="UEN or Indent No"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 0.5 }}>
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                sx: {
                  minWidth: { xs: "100%", sm: "100%", md: "230px" },
                  borderRadius: "0 50px 50px 0",
                  height: "40px",
                  pl: 1.2,
                  pr: 1,
                  fontSize: "0.875rem",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0 50px 50px 0",
                  px: 1,
                  height: "40px",
                },
                "& .MuiInputBase-input": {
                  padding: "4px 0",
                  fontSize: "0.875rem",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FilterForm;
