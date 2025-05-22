import React from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";
import {
  ClearIcon,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarToday } from "@mui/icons-material";
import { format } from "date-fns";
export interface InfoItem {
  label: string;
  value: string;
  gridSize?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  editable?: boolean;
  keyName?: string;
  type?: string;
}
interface InfoContainerProps {
  infoItems: InfoItem[];
  isEditing?: boolean; // ✨ New
  setInfoItems?: (updatedItems: InfoItem[]) => void; // ✨ New
  borderColor?: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  infoItems,
  isEditing = false,
  setInfoItems,
}) => {

  const handleChange = (index: number, newValue: string) => {
    if (!setInfoItems) return;
    const updated = [...infoItems];
    updated[index] = { ...updated[index], value: newValue };
    setInfoItems(updated);
  };

 const parseDateSafe = (value: string | null | undefined): Date | null => {
  if (!value) return null;

  // Check if value matches dd/MM/yyyy or dd/MM/yyyy HH:mm (basic)
  const dateParts = value.split(" ")[0].split("/");
  if (dateParts.length === 3) {
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // months are 0-based
    const year = parseInt(dateParts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  // fallback: try default JS parse (ISO etc)
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};


  return (
    <Box className="px-4 pb-4">
      <Grid container spacing={2} pt={1}>
        {infoItems.map((item, index) => (
          <Grid
            key={`${item.keyName || item.label}-${item.label}`}
            size={{
              xs: item.gridSize?.xs || 12,
              sm: item.gridSize?.sm || 6,
              md: item.gridSize?.md || 4,
              lg: item.gridSize?.lg || 3,
            }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {item.label}
            </Typography>
            {isEditing && item.editable ? (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {item.type === "date" ? (
                  <DateTimePicker
                    value={parseDateSafe(item.value)}
                    onChange={(newValue) =>
                      handleChange(
                        index,
                        newValue ? format(newValue, "yyyy-MM-dd'T'HH:mm") : ""
                      )
                    }
                    format="dd/MM/yyyy hh:mm a"
                    slots={{
                      openPickerIcon: CalendarToday,
                      clearIcon: ClearIcon,
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        variant: "outlined",
                        placeholder: "dd/MM/yyyy hh:mm a",
                        sx: { mt: 0.5 },
                      },
                      actionBar: {
                        actions: ["clear", "cancel", "accept"],
                      },
                    }}
                  />
                ) : (
                  <TextField
                    fullWidth
                    type={"text"}
                    size="small"
                    variant="outlined"
                    value={item.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    sx={{ mt: 0.5 }}
                  />
                )}
              </LocalizationProvider>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                {item.value || "N/A"}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfoContainer;
