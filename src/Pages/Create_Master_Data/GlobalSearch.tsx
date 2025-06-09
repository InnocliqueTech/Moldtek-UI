import React, { useState, useEffect, useRef } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  InputAdornment,
  IconButton,
  Grid,
  // TextField,
  // Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LabelTypeSelector from "./LabelType";
import CustomerSelect from "./CustomersData";
import { RootState } from "../../store";
import {
  setFiltersPayload,
  setSelectedCustomers,
  setSelectedLabelTypeIds,
} from "../../store/slices/masterDataSlice";
import {
  ArrowForward,
  CalendarToday,
  Clear as ClearIcon,
} from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
import { LocalDatePayload } from "./Filter";


interface FilterFormProps {
  setLocalDates: React.Dispatch<React.SetStateAction<LocalDatePayload>>;
  localDates: LocalDatePayload;
  searchField: string;
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
}



const FilterForm: React.FC<FilterFormProps> = ({
  setLocalDates,
  localDates,
  // searchField,
  setSearchField,
}) => {
  const dispatch = useDispatch();
  const {
    openSider,
    isSearchTriggered,
  } = useSelector((state: RootState) => state.masterData);

  const [openFrom, setOpenFrom] = useState(false);

  const [openTo, setOpenTo] = useState(false);


  const hasInitialized = useRef(false);

  useEffect(() => {
    if (openSider && !hasInitialized.current) {
      hasInitialized.current = true;

      if (!isSearchTriggered) {
        dispatch(
          setFiltersPayload({
            customerName: [],
            fromDate: "",
            toDate: "",
            labelType: [],
            searchField: "",
          })
        );
        dispatch(setSelectedCustomers([]));
        dispatch(setSelectedLabelTypeIds([]));
        setLocalDates({ fromDate: null, toDate: null });
        setSearchField("");
      }
    }
  }, [openSider, dispatch, isSearchTriggered]);

  const handleDateChange = (
    date: Date | null,
    field: keyof LocalDatePayload
  ) => {
    setLocalDates((prev) => ({ ...prev, [field]: date }));
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
                              onClick={(event) => {
                                event.stopPropagation();
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
                              onClick={(event) => {
                                event.stopPropagation();
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
      {/* <Grid container spacing={4} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Search Term</Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Search For UEN"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
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
                fontSize: "0.875rem",
              },
            }}
            sx={{
              minWidth: { xs: "235%", sm: "235%", md: "370px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                px: 1,
              },
              "& .MuiInputBase-input": {
                padding: "4px 0",
                fontSize: "0.875rem",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              },
              "& input": {
                padding: "6px 8px",
                fontSize: "0.875rem",
              },
            }}
          />
        </Grid>
      </Grid> */}
    </>
  );
};

export default FilterForm;
