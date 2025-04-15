import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  filterSchema,
  FilterFormValues,
} from "../../Components/ZodSchemas/filterValidation";
import ButtonComponent from "../../Components/ReUsable/Button";
import CustomerSelect from "./CustomersData";
import LabelTypeSelector from "./LabelType";

const FilterForm: React.FC = () => {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const {
    control,
    handleSubmit,
  } = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      fromDate: "",
      toDate: "",
      searchType: "Indent No",
      searchValue: "",
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    console.log("Submitted Data:", data);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Grid container spacing={2}>
        {/* From Date */}
        <Grid size={{xs:12,sm:6}}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            From Date
          </Typography>
          <Controller
            name="fromDate"
            control={control}
            render={() => (
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": { borderRadius: "8px" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                  "& .MuiInputBase-input": { padding: "10px" },
                }}
              />
            )}
          />
        </Grid>

        {/* To Date */}
        <Grid size={{xs:12,sm:6}} >
          <Typography variant="body2" sx={{ mb: 1 }}>
            To Date
          </Typography>
          <Controller
            name="toDate"
            control={control}
            render={() => (
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": { borderRadius: "8px" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                  "& .MuiInputBase-input": { padding: "10px" },
                }}
              />
            )}
          />
        </Grid>

        {/* <Grid size={{xs:12}}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Master Data Search
          </Typography>
          <Grid container spacing={1}>
            <Grid size={{xs:12,sm:4}} >
              <FormControl fullWidth>
                <Controller
                  name="searchType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      error={!!errors.searchType}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                    borderRight: "none",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                        },
                        "& .MuiInputBase-input": { padding: "10px" },
                      }}
                    >
                      <MenuItem value="Indent No">Indent No</MenuItem>
                      <MenuItem value="Order ID">Order ID</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={{xs:12,sm:8}} >
              <Controller
                name="searchValue"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    error={!!errors.searchValue}
                    helperText={errors.searchValue?.message}
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "8px",
                      },
                      "& .MuiInputBase-input": { padding: "10px" },
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid> */}
        <CustomerSelect/>
        <LabelTypeSelector/>

        {/* Search Button */}
        <Grid size={{xs:12}}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonComponent
              text="Search"
              borderRadius="100px"
              onClick={handleSubmit(onSubmit)}
              color="#0073B7"
              textColor="white"
              p={2}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterForm;
