import React, { useEffect, useRef, useState } from "react";
import { LinkOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Chip,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMountingTapesDropdownMutation } from "../store/services/api";
import { setMountinTapeDropDownValues } from "../store/slices/masterDataSlice";
import { useDispatch } from "react-redux";


interface RenderTooltipProps {
  content: string;
  strLength: number;
}


export const RenderTooltip: React.FC<RenderTooltipProps> = ({
  content,
  strLength,
}) => {
  if (content && content.length > strLength) {
    return (
      <Tooltip title={content} arrow>
        <span>{content.slice(0, strLength)}...</span>
      </Tooltip>
    );
  }
  return <span>{content}</span>;
};


interface UENCellProps {
  value: string;
  onClick: () => void;
}


export const UENCell: React.FC<UENCellProps> = ({ value, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
      }}
    >
      <span style={{ textDecoration: hovered ? "underline" : "none" }}>
        <RenderTooltip content={value} strLength={45} />
      </span>
      {hovered && <LinkOutlined style={{ color: "#172B4D" }} />}
    </div>
  );
};


interface AutocompleteCellProps {
  row: Record<string, any>;
  column: {
    id: string;
    options?: string[];
  };
  rowIndex: number;
  handleChange: (rowIndex: number, columnId: string, newValue: string) => void;
  onNewOptionAdd?:boolean;
}

export const AutocompleteCell: React.FC<AutocompleteCellProps> = ({
  row,
  column,
  rowIndex,
  handleChange,
  onNewOptionAdd
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const value: string =
    typeof row[column.id] === "string" ? row[column.id] : "";

  const open = Boolean(anchorEl);

  const allOptions =
    inputValue && !column.options?.includes(inputValue)
      ? [...(column.options || []), `${inputValue} (new)`]
      : column.options || [];

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()
      const [mountingTapesDropdown] = useMountingTapesDropdownMutation();
    
  
        const fetchDropdownValues = async (isNew:string) => {
          const response = await mountingTapesDropdown({ mounting_tape:isNew}).unwrap();
          const mountingTapeList = response?.data?.map((item: any) => item.mounting_tape);
          dispatch(setMountinTapeDropDownValues(mountingTapeList));
        };
    

  return (
    <Box>
      <Tooltip title={value} arrow placement="top">
        <Box
          onClick={handleClick}
          sx={{
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "6px 8px",
          }}
        >
          {value ? (
            <Chip
              label={value.length > 20 ? `${value.slice(0, 20)}...` : value}
              size="small"
              sx={{ fontSize: "12px" }}
            />
          ) : (
            <Typography color="gray" fontSize="14px">
              Click to add
            </Typography>
          )}
        </Box>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              width: 270,
              p: 1,
              mt: 1,
            },
          },
        }}
      >
        <Autocomplete
          freeSolo
          autoFocus
          options={allOptions}
          value={value}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          onChange={async (_, newValue) => {
            if (typeof newValue === "string") {
              const isNew = newValue.endsWith(" (new)");
              const cleaned = newValue.replace(" (new)", "");
          
              if (isNew && onNewOptionAdd) {
                try {
                  await fetchDropdownValues(cleaned);
                } catch (error) {
                  console.error("Failed to add new option:", error);
                  return; // Do not update cell if API fails
                }
              }
          
              handleChange(rowIndex, column.id, cleaned);
            }
          
            handleClose();
          }}
          
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={inputRef}
              placeholder="Type or select a value..."
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />
      </Popover>
    </Box>
  );
};

export const generateId = (): string => {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const randomPart = Array(16)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
  return timestamp + randomPart;
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return '';
  }
};