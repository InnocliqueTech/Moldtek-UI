import React, { useState, useMemo, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  InputAdornment,
  IconButton,
  Grid
} from "@mui/material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { ArrowForward, CalendarToday, Clear as ClearIcon } from "@mui/icons-material";
import { RootState } from "../../../store";
import { FiltersPayload, setFiltersPayload, setIsSearchTriggered, setOpenSliderDaily, setSelectedCustomers, setSelectedLabelTypeIds } from "../../../store/slices/viewDailyPlanSlice";
import LabelTypeSelector from "./LabelTypes";
import CustomerSelect from "./CustomersData";
import ButtonComponent from "../../../Components/ReUsable/Button";

interface LocalDatePayload {
  fromDate: Date | null;
  toDate: Date | null;
}

const FilterForm: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCustomers, selectedLabelTypeIds, filtersPayload, openSliderDaily,isSearchTriggered } = useSelector(
    (state: RootState) => state.viewDailyPlan
  );

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [localDates, setLocalDates] = useState<LocalDatePayload>({
    fromDate: filtersPayload.fromDate ? new Date(filtersPayload.fromDate.split("-").reverse().join("-")) : null,
    toDate: filtersPayload.toDate ? new Date(filtersPayload.toDate.split("-").reverse().join("-")) : null,
  });
  

  const handleDateChange = (date: Date | null, field: keyof LocalDatePayload) => {
    setLocalDates((prev) => ({ ...prev, [field]: date }));
  };

  const isSearchEnabled = useMemo(() => {
    const hasCustomer = selectedCustomers.length > 0;
    const hasLabelTypes = selectedLabelTypeIds.length > 0;
    const hasValidDates = localDates.fromDate !== null && localDates.toDate !== null;
    return hasCustomer || hasValidDates || hasLabelTypes;
  }, [selectedCustomers, localDates, selectedLabelTypeIds]);

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
      labelType
    };

    dispatch(setFiltersPayload(finalSearchPayload));
    dispatch(setIsSearchTriggered(true));
    dispatch(setOpenSliderDaily(false));
    toast.success("Search submitted successfully!");
  };

  const handleClear = () => {
    setLocalDates({ fromDate: null, toDate: null });

    dispatch(setFiltersPayload({
      customerName: [],
      fromDate: '',
      toDate: '',
      labelType: []
    }));

    dispatch(setSelectedCustomers([]));
    dispatch(setSelectedLabelTypeIds([]));
    dispatch(setIsSearchTriggered(true));
    dispatch(setOpenSliderDaily(false));
    toast.success("Filters cleared!");
  };

  useEffect(() => {
    if (openSliderDaily) {

      if (!isSearchTriggered) {
        // If slider is closed without a search, reset all
        dispatch(setFiltersPayload({
          customerName: [],
          fromDate: '',
          toDate: '',
          labelType: []
        }));
        dispatch(setSelectedCustomers([]));
        dispatch(setSelectedLabelTypeIds([]));
        setLocalDates({ fromDate: null, toDate: null });
      }
    }
  }, [openSliderDaily, dispatch, isSearchTriggered]);

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
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                setLocalDates(prev => ({ ...prev, fromDate: null }));
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
                  const from = new Date(localDates.fromDate);
                  const check = new Date(date);
                  return check.setHours(0, 0, 0, 0) < from.setHours(0, 0, 0, 0);
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
                            <IconButton
                              onClick={(event) => {
                                event.stopPropagation();
                                setLocalDates(prev => ({ ...prev, toDate: null }));
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

      <Grid size={{ xs: 12 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <ButtonComponent
            text="Clear"
            borderRadius="100px"
            onClick={handleClear}
            color="#f44336"
            textColor="white"
            p={2}
          />
          <ButtonComponent
            text="Search"
            borderRadius="100px"
            onClick={onSubmit}
            color="#0073B7"
            textColor="white"
            p={2}
            disabled={!isSearchEnabled}
          />
        </Box>
      </Grid>
    </>
  );
};

export default FilterForm;
