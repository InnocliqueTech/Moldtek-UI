import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  filterSchema,
  FilterFormValues,
} from "../../Components/ZodSchemas/filterValidation";
import { Padding } from "@mui/icons-material";
import ButtonComponent from "../../Components/ReUsable/Button";

const FilterForm: React.FC = () => {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
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
    <Box sx={{ p: 3 }}>
      {/* From Date */}
      <Typography variant="body2" sx={{ mb: 1 }}>
        From Date
      </Typography>
      <Controller
        name="fromDate"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            type="date"
            variant="outlined"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "& .MuiInputBase-input": {
                padding: "8px",
              },
            }}
          />
        )}
      />

      {/* To Date */}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        To Date
      </Typography>
      <Controller
        name="toDate"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            type="date"
            variant="outlined"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "& .MuiInputBase-input": {
                padding: "8px",
              },
            }}
          />
        )}
      />

      {/* Master Data Search */}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Master Data Search
      </Typography>
      <Box sx={{ display: "flex" }}>
        {/* Search Type */}
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
                  "& .MuiInputBase-input": { padding: "8px" },
                }}
              >
                <MenuItem value="Indent No">Indent No</MenuItem>
                <MenuItem value="Order ID">Order ID</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {/* Search Input */}
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
              sx={{ "& .MuiInputBase-input": { padding: "8px" } }}
            />
          )}
        />
      </Box>

      {/* Search Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <ButtonComponent
          text="Search"
          borderRadius="100px"
          onClick={handleSubmit(onSubmit)}
          color="#0073B7"
          textColor="white"
          p={2}
        />
      </Box>
    </Box>
  );
};

export default FilterForm;
