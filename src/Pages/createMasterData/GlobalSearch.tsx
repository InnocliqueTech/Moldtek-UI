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
import LabelTypeSelector from "./LabelType";
import ButtonComponent from "../../Components/ReUsable/Button";
import CustomerSelect from "./CustomersData";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import {
  FiltersPayload,
  setFiltersPayload,
  setOpenSlider,
  setSelectedCustomers,
  setSelectedLabelTypeIds
} from "../../store/slices/masterDataSlice";
import { ArrowForward, CalendarToday, Clear as ClearIcon } from "@mui/icons-material";

interface LocalDatePayload {
  fromDate: string | null;
  toDate: string | null;
}

const FilterForm: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCustomers, selectedLabelTypeIds, filtersPayload, openSider } = useSelector(
    (state: RootState) => state.masterData
  );

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const [localDates, setLocalDates] = useState<LocalDatePayload>({
    fromDate: "",
    toDate: "",
  });

  const handleDateChange = (date: Date | null, field: keyof LocalDatePayload) => {
    setLocalDates((prev) => ({
      ...prev,
      [field]: date ? format(date, "MM-dd-yyyy") : null,
    }));
  };

  const isSearchEnabled = useMemo(() => {
    const hasCustomer = selectedCustomers.length > 0;
    const hasLabelTypes = selectedLabelTypeIds.length > 0;
    const hasValidDates = localDates.fromDate && localDates.toDate;
    return hasCustomer || hasValidDates || hasLabelTypes;
  }, [selectedCustomers, localDates, selectedLabelTypeIds]);

  console.log(selectedCustomers.length > 0,selectedLabelTypeIds,localDates.fromDate && localDates.toDate,"DATESOFTHEFILTER")

  const onSubmit = () => {
    if (!isSearchEnabled) {
      toast.error("Please select a Customer or both From and To dates!");
      return;
    }

    const customerName = selectedCustomers.map((customer: any) => customer.fullName);
    const labelType = selectedLabelTypeIds.map((label: any) => label.labelTypeName);

    const finalSearchPayload: FiltersPayload = {
      customerName,
      fromDate: localDates.fromDate && localDates.toDate ? localDates.fromDate : '',
      toDate: localDates.fromDate && localDates.toDate ? localDates.toDate : '',
      labelType
    };

    dispatch(setFiltersPayload(finalSearchPayload));
    setIsSearchTriggered(true);  // Mark search was triggered
    dispatch(setOpenSlider(false));
    toast.success("Search submitted successfully!");
  };

  const handleClear = () => {
    setLocalDates({
      fromDate: '',
      toDate: ''
    });

    dispatch(setFiltersPayload({
      customerName: [],
      fromDate: '',
      toDate: '',
      labelType: []
    }));

    dispatch(setSelectedCustomers([]));
    dispatch(setSelectedLabelTypeIds([]));
    dispatch(setOpenSlider(false));

    setIsSearchTriggered(false);  // Reset trigger
    toast.success("Filters cleared!");
  };

  // Clear selections if sidebar is closed without triggering search
  useEffect(() => {
    if (openSider) {
      if (!isSearchTriggered) {
        dispatch(setFiltersPayload({
          customerName: [],
          fromDate: '',
          toDate: '',
          labelType: []
        }));
        dispatch(setSelectedCustomers([]));
        dispatch(setSelectedLabelTypeIds([]));
        setLocalDates({
          fromDate: '',
          toDate: ''
        });
      }
      setIsSearchTriggered(false); // Reset for next interaction
    }
  }, [openSider, dispatch, isSearchTriggered]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Box sx={{ display: 'flex', gap: '2px',flexDirection:{md:'row',sm:'column'} }}>
            <Box display="flex" flexDirection="column" flex="1" maxWidth="170px">
              <DatePicker
                label="From Date"
                open={openFrom}
                onOpen={() => setOpenFrom(true)}
                onClose={() => setOpenFrom(false)}
                value={
                  localDates?.fromDate
                    ? new Date(localDates.fromDate)
                    : filtersPayload.fromDate
                      ? new Date(filtersPayload.fromDate)
                      : null
                }
                onChange={(newValue) => handleDateChange(newValue, "fromDate")}
                format="MM/dd/yyyy"
                slotProps={{
                  textField: {
                    placeholder: "MM/dd/yyyy",
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
                value={
                  localDates?.toDate
                    ? new Date(localDates.toDate)
                    : filtersPayload.toDate
                      ? new Date(filtersPayload.toDate)
                      : null
                }
                onChange={(newValue) => handleDateChange(newValue, "toDate")}
                format="MM/dd/yyyy"
                shouldDisableDate={(date) => {
                  if (!localDates?.fromDate) return false;
                  const from = new Date(localDates.fromDate);
                  const check = new Date(date);
                  return check.setHours(0, 0, 0, 0) < from.setHours(0, 0, 0, 0);
                }}
                minDate={localDates?.fromDate ? new Date(localDates.fromDate) : undefined}
                slotProps={{
                  textField: {
                    placeholder: "MM/dd/yyyy",
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

      <Grid size={{xs:12}}>
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
