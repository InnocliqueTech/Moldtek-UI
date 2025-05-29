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
  isEditing?: boolean;
  setInfoItems?: (updatedItems: InfoItem[]) => void;
  borderColor?: string;
  startingTimeValue?: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  infoItems,
  isEditing = false,
  setInfoItems,
  startingTimeValue,
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
    <Box sx={{ px: 4, pb: 4 }}>
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
  onChange={(newValue) => {
    const start = parseDateSafe(startingTimeValue);
    if (
      item.label === "Completion Time" &&
      newValue &&
      start &&
      newValue < start
    ) {
      return; // block invalid time from even setting
    }

    handleChange(
      index,
      newValue ? format(newValue, "yyyy-MM-dd'T'HH:mm") : ""
    );
  }}
  onAccept={(newValue) => {
    const start = parseDateSafe(startingTimeValue);
    if (
      item.label === "Completion Time" &&
      newValue &&
      start &&
      newValue < start
    ) {
      // prevent closing the popup if invalid
      return false;
    }
  }}
  format="dd/MM/yyyy hh:mm a"
  minDateTime={
    item.label === "Completion Time" && startingTimeValue
      ? parseDateSafe(startingTimeValue) ?? undefined
      : undefined
  }
  shouldDisableTime={(timeValue, clockType) => {
    if (item.label !== "Completion Time" || !startingTimeValue) return false;

    const start = parseDateSafe(startingTimeValue);
    if (!start) return false;

    const selected = parseDateSafe(item.value) || new Date();

    const sameDay =
      start.getFullYear() === selected.getFullYear() &&
      start.getMonth() === selected.getMonth() &&
      start.getDate() === selected.getDate();

    if (!sameDay) return false;

    const startHour = start.getHours();
    const startMinute = start.getMinutes();

    const value =
      timeValue instanceof Date
        ? clockType === "hours"
          ? timeValue.getHours()
          : timeValue.getMinutes()
        : timeValue;

    if (clockType === "hours") {
      return value < startHour;
    }

    if (clockType === "minutes") {
      const selectedHour = selected.getHours();
      if (selectedHour === startHour) {
        return value < startMinute;
      }
    }

    return false;
  }}
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
    popper: {
      modifiers: [
        {
          name: "flip",
          enabled: true,
          options: {
            altBoundary: true,
            rootBoundary: "viewport",
            padding: 8,
          },
        },
        {
          name: "preventOverflow",
          enabled: true,
          options: {
            altAxis: true,
            tether: true,
            rootBoundary: "document",
            padding: 8,
          },
        },
      ],
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
