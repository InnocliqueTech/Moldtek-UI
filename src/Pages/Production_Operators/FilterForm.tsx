import React, { useState,  useEffect, useRef } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  InputAdornment,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowForward,
  CalendarToday,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { RootState } from "../../store";
import { LocalDatePayload } from "./Filter";


interface FilterFormProps {
  setLocalDates: React.Dispatch<React.SetStateAction<LocalDatePayload>>;
  localDates: LocalDatePayload;
  selectedJarCaps: string;
  setSelectedJarCaps:React.Dispatch<React.SetStateAction<string>>;
}

const FilterForm: React.FC<FilterFormProps> = ({
  setLocalDates,
  localDates,
  selectedJarCaps,
  setSelectedJarCaps
}) => {
  const dispatch = useDispatch();
  const { openSliderKld,isSearchTriggered } = useSelector(
    (state: RootState) => state.kld
  );

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);



  const hasInitialized = useRef(false);

  useEffect(() => {
    if (openSliderKld && !hasInitialized.current) {
      hasInitialized.current = true;

      if (!isSearchTriggered) {
        setLocalDates({ fromDate: null, toDate: null });
      }
    }
  }, [openSliderKld, dispatch, isSearchTriggered]);

  const handleDateChange = (
    date: Date | null,
    field: keyof LocalDatePayload
  ) => {
    setLocalDates((prev) => ({ ...prev, [field]: date }));
  };



const jarCapOptions = [
  { label: "JAR", value: "jar" },
  { label: "CAP", value: "cap" },
  { label: "JAR/CAP", value: "jar/cap" },
   { label: "JAR&CAP", value: "jar&cap" },
];

const toggleJarCap = (value: string) => {
  setSelectedJarCaps(value)
};

const handleClearJarCaps = () => {
  setSelectedJarCaps('');
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
      <Grid container spacing={1} sx={{ mt: 2, mb: 2 }}>
<Grid size={{xs:12}}
  sx={{ display: "flex", alignItems: "center", mb: 1 }}
>
  <Typography variant="subtitle1">
    Jar/Cap ({selectedJarCaps.length})
  </Typography>
  <IconButton size="small" onClick={handleClearJarCaps}>
    <ClearIcon fontSize="small" />
  </IconButton>
</Grid>

{jarCapOptions.map((option) => {
  const isSelected = selectedJarCaps.includes(option.value);
  return (
    <Grid key={option.value} >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 0,
          border: "2px solid",
          borderColor:"#ccc",
          borderRadius: "20px",
          cursor: "pointer",
          backgroundColor:"transparent",
        }}
        onClick={() => toggleJarCap(option.value)}
      >
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          style={{
            width: "14px",
            height: "14px",
            marginRight: "8px",
            borderRadius: "0px",
          }}
        />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "16px",
          }}
        >
          {option.label}
        </Typography>
      </Box>
    </Grid>
  );
})}

      </Grid>

    </>
  );
};

export default FilterForm;
