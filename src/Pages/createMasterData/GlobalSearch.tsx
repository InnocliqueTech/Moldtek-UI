import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, InputAdornment, IconButton, Grid } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import LabelTypeSelector from './LabelType';
import ButtonComponent from '../../Components/ReUsable/Button';
import CustomerSelect from './CustomersData';
import { toast } from 'react-toastify';
import { FilterFormValues, filterSchema } from '../../Components/ZodSchemas/filterValidation';
import { ArrowForward, CalendarToday, Clear } from '@mui/icons-material';
import {setSearchButton} from "../../store/slices/masterDataSlice"

// LocalStorage Helpers
const getFromDate = (): string => localStorage.getItem('fromDate') || '';
const getToDate = (): string => localStorage.getItem('toDate') || '';

const saveFromDate = (date: string) => localStorage.setItem('fromDate', date);
const saveToDate = (date: string) => localStorage.setItem('toDate', date);

// React Component
const FilterForm: React.FC = () => {
  const { handleSubmit } = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      fromDate: "",
      toDate: "",
      searchType: "Indent No",
      searchValue: "",
    },
  });

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const dispatch = useDispatch();

  const handleDateChange = (date: Date | null, field: 'fromDate' | 'toDate') => {
    const formattedDate = date ? format(date, 'MM-dd-yyyy') : '';
    if (field === 'fromDate') saveFromDate(formattedDate);
    else saveToDate(formattedDate);
  };

  const handleClearDate = (field: 'fromDate' | 'toDate') => {
    if (field === 'fromDate') saveFromDate('');
    else saveToDate('');
  };

  const onSubmit = (data: FilterFormValues) => {
dispatch(setSearchButton(true)) ;
  };

  const fromDate = getFromDate();
  const toDate = getToDate();
  const customerNames = localStorage.getItem("selectedCustomerNames");
  const parsedCustomerNames = customerNames ? JSON.parse(customerNames) : [];

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Box sx={{ display: 'flex', gap: '2px' }}>
            {/* From Date */}
            <Box display="flex" flexDirection="column" flex="1" maxWidth="170px">
              <DatePicker
                label="From Date"
                open={openFrom}
                onOpen={() => setOpenFrom(true)}
                onClose={() => setOpenFrom(false)}
                value={fromDate ? new Date(fromDate) : null}
                onChange={(newValue) => handleDateChange(newValue, 'fromDate')}
                format="MM/dd/yyyy"
                slotProps={{
                  textField: {
                    placeholder: 'MM/dd/yyyy',
                    onClick: () => setOpenFrom(true),
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        borderWidth: '2px',
                        border: '#f0f0f0',
                        '& fieldset': { borderWidth: '2px' },
                        '&:hover fieldset': { borderWidth: '2px' },
                        '&.Mui-focused fieldset': { borderWidth: '2px', border: '#f0f0f0' },
                      },
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {fromDate ? (
                            <IconButton onClick={(event) => {
                              event.stopPropagation();
                              handleClearDate('fromDate');
                            }}>
                              <Clear />
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

            <ArrowForward sx={{ alignSelf: 'center' }} />

            {/* To Date */}
            <Box display="flex" flexDirection="column" flex="1" maxWidth="170px">
              <DatePicker
                label="To Date"
                open={openTo}
                onOpen={() => setOpenTo(true)}
                onClose={() => setOpenTo(false)}
                value={toDate ? new Date(toDate) : null}
                onChange={(newValue) => handleDateChange(newValue, 'toDate')}
                format="MM/dd/yyyy"
                shouldDisableDate={(date) => {
                  if (!fromDate) return false;
                  const from = new Date(fromDate);
                  from.setHours(0, 0, 0, 0);
                  const check = new Date(date);
                  check.setHours(0, 0, 0, 0);
                  return check < from;
                }}
                minDate={fromDate ? new Date(fromDate) : undefined}
                slotProps={{
                  textField: {
                    placeholder: 'MM/dd/yyyy',
                    onClick: () => setOpenTo(true),
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        borderWidth: '2px',
                        border: '#f0f0f0',
                        '& fieldset': { borderWidth: '2px' },
                        '&:hover fieldset': { borderWidth: '2px' },
                        '&.Mui-focused fieldset': { borderWidth: '2px', border: '#f0f0f0' },
                      },
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {toDate ? (
                            <IconButton onClick={(event) => {
                              event.stopPropagation();
                              handleClearDate('toDate');
                            }}>
                              <Clear />
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

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomerSelect />
          </Grid>

          <Grid item xs={12}>
            <LabelTypeSelector />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <ButtonComponent
                text="Search"
                borderRadius="100px"
                onClick={handleSubmit(onSubmit)}
                color="#0073B7"
                textColor="white"
                p={2}
                disabled={fromDate === '' || toDate === '' || parsedCustomerNames.length === 0}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FilterForm;
