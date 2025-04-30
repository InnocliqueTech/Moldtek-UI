import React, { useState, useMemo, useEffect, useRef } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  InputAdornment,
  IconButton,
  Grid,
  Typography,
  TextField
} from "@mui/material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { ArrowForward, CalendarToday, Clear as ClearIcon } from "@mui/icons-material";
import { RootState } from "../../../store";
import {
  FiltersPayload,
  setFiltersPayload,
  setIsSearchTriggered,
  setOpenSliderDaily,
  setSelectedCustomers,
  setSelectedLabelTypeIds
} from "../../../store/slices/viewDailyPlanSlice";
import LabelTypeSelector from "./LabelTypes";
import CustomerSelect from "./CustomersData";
import ButtonComponent from "../../../Components/ReUsable/Button";
import SearchIcon from "@mui/icons-material/Search";

interface LocalDatePayload {
  fromDate: Date | null;
  toDate: Date | null;
}

const FilterForm: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCustomers, selectedLabelTypeIds, filtersPayload, openSliderDaily, isSearchTriggered } = useSelector(
    (state: RootState) => state.viewDailyPlan
  );

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [searchTerm, setSearchTerm] = useState(filtersPayload.searchTerm || '');
  const [searchType, setSearchType] = useState(filtersPayload.searchType || '');

  const [localDates, setLocalDates] = useState<LocalDatePayload>({
    fromDate: filtersPayload.fromDate ? new Date(filtersPayload.fromDate.split("-").reverse().join("-")) : null,
    toDate: filtersPayload.toDate ? new Date(filtersPayload.toDate.split("-").reverse().join("-")) : null,
  });

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (openSliderDaily && !hasInitialized.current) {
      hasInitialized.current = true;

      if (!isSearchTriggered) {
        dispatch(setFiltersPayload({
          customerName: [],
          fromDate: '',
          toDate: '',
          labelType: [],
          searchTerm: '',
          searchType: ''
        }));
        dispatch(setSelectedCustomers([]));
        dispatch(setSelectedLabelTypeIds([]));
        setLocalDates({ fromDate: null, toDate: null });
        setSearchTerm('');
        setSearchType('');
      }
    }
  }, [openSliderDaily, dispatch, isSearchTriggered]);

  const handleDateChange = (date: Date | null, field: keyof LocalDatePayload) => {
    setLocalDates((prev) => ({ ...prev, [field]: date }));
  };

  const isSearchEnabled = useMemo(() => {
    const hasCustomer = selectedCustomers.length > 0;
    const hasLabelTypes = selectedLabelTypeIds.length > 0;
    const hasValidDates = localDates.fromDate !== null && localDates.toDate !== null;
    return hasCustomer || hasValidDates || hasLabelTypes || searchTerm.trim() !== '' || searchType !== '';
  }, [selectedCustomers, localDates, selectedLabelTypeIds, searchTerm, searchType]);

  const onSubmit = () => {
    if (!isSearchEnabled) {
      toast.error("Please select a Customer or both From and To dates!");
      return;
    }

    const customerName = selectedCustomers.map((customer: any) => customer.fullName);
    const labelType = selectedLabelTypeIds.map((label: any) => label.labelTypeName);

    const finalSearchPayload: FiltersPayload = {
      customerName,
      fromDate: localDates.fromDate && localDates.toDate ? format(localDates.fromDate, "yyyy-MM-dd") : '',
      toDate: localDates.fromDate && localDates.toDate ? format(localDates.toDate, "yyyy-MM-dd") : '',
      labelType,
      searchTerm: searchTerm.trim(),
      searchType
    };

    dispatch(setFiltersPayload(finalSearchPayload));
    dispatch(setIsSearchTriggered(true));
    dispatch(setOpenSliderDaily(false));
    toast.success("Search submitted successfully!");
  };

  const handleClear = () => {
    setLocalDates({ fromDate: null, toDate: null });
    setSearchTerm('');
    setSearchType('');

    dispatch(setFiltersPayload({
      customerName: [],
      fromDate: '',
      toDate: '',
      labelType: [],
      searchTerm: '',
      searchType: ''
    }));

    dispatch(setSelectedCustomers([]));
    dispatch(setSelectedLabelTypeIds([]));
    dispatch(setIsSearchTriggered(true));
    dispatch(setOpenSliderDaily(false));
    toast.success("Filters cleared!");
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Box sx={{ display: 'flex', gap: '2px', flexDirection: { md: 'row', sm: 'column' } }}>
            <Box display="flex" flexDirection="column" flex="1" maxWidth="170px">
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
                        "&.Mui-focused fieldset": { borderWidth: "2px", border: "#f0f0f0" }
                      }
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {localDates.fromDate ? (
                            <IconButton onClick={(e) => { e.stopPropagation(); setLocalDates(prev => ({ ...prev, fromDate: null })); }}>
                              <ClearIcon />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => setOpenFrom(true)}>
                              <CalendarToday />
                            </IconButton>
                          )}
                        </InputAdornment>
                      )
                    }
                  }
                }}
              />
            </Box>

            <ArrowForward sx={{ alignSelf: "center" }} />

            <Box display="flex" flexDirection="column" flex="1" maxWidth="170px">
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
                  return new Date(date).setHours(0, 0, 0, 0) < new Date(localDates.fromDate).setHours(0, 0, 0, 0);
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
                        "&.Mui-focused fieldset": { borderWidth: "2px", border: "#f0f0f0" }
                      }
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {localDates.toDate ? (
                            <IconButton onClick={(e) => { e.stopPropagation(); setLocalDates(prev => ({ ...prev, toDate: null })); }}>
                              <ClearIcon />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => setOpenTo(true)}>
                              <CalendarToday />
                            </IconButton>
                          )}
                        </InputAdornment>
                      )
                    }
                  }
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

      <Grid container spacing={4} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Search Type</Typography>
          <TextField
            select
            size="small"
            fullWidth
            variant="outlined"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="">Select Type</option>
            <option value="UEN">UEN</option>
            <option value="Indent No">Indent No</option>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Search Term</Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="UEN or Indent No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ ml: 0.5 }}>
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "50px",
                pl: 1.2,
                pr: 1,
                py: 0.5,
                fontSize: "0.875rem"
              }
            }}
            sx={{
              minWidth: { xs: "100%", sm: "100%", md: "200px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                px: 1
              },
              "& .MuiInputBase-input": {
                padding: "4px 0",
                fontSize: "0.875rem",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
              },
              "& input": {
                padding: "6px 8px",
                fontSize: "0.875rem"
              }
            }}
          />
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <ButtonComponent
            text="Search"
            borderRadius="100px"
            onClick={onSubmit}
            color="#0073B7"
            textColor="white"
            p={2}
            disabled={!isSearchEnabled}
          />
          <ButtonComponent
            text="Clear"
            borderRadius="100px"
            onClick={handleClear}
            color="#f44336"
            textColor="white"
            p={2}
          />
        </Box>
      </Grid>
    </>
  );
};

export default FilterForm;
