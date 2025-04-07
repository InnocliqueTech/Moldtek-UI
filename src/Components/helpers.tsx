import React, { useEffect, useRef, useState } from "react";
import { LinkOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Chip,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

// Props for rendering text with tooltip if too long
interface RenderTooltipProps {
  content: string;
  strLength: number;
}

// Tooltip render logic for long strings
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

// Props for the UEN clickable cell
interface UENCellProps {
  value: string;
}

// Cell with clickable UEN navigation
export const UENCell: React.FC<UENCellProps> = ({ value }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/viewMasterData`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <span style={{ textDecoration: hovered ? "underline" : "none" }}>
        <RenderTooltip content={value} strLength={45} />
      </span>
      {hovered && <LinkOutlined style={{ color: "#172B4D" }} />}
    </div>
  );
};

// Props for the editable Autocomplete cell
interface AutocompleteCellProps {
  row: Record<string, any>;
  column: {
    id: string;
    options?: string[];
  };
  rowIndex: number;
  handleChange: (
    rowIndex: number,
    columnId: string,
    newValue: string[]
  ) => void;
}


export const AutocompleteCell: React.FC<AutocompleteCellProps> = ({
  row,
  column,
  rowIndex,
  handleChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const value: string[] = Array.isArray(row[column.id]) ? row[column.id] : [];

  const open = Boolean(anchorEl);

  // Dynamic options with "(new)" if needed
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

  return (
    <Box>
      {/* Box with chips & tooltip */}
      <Tooltip title={value?.join(", ")} arrow placement="top">
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
          {value.length > 0 ? (
            value.map((value, index) => (
              <Chip
                key={index}
                label={index > 1 ? `${value[0]}...` : value}
                size="small"
                sx={{ fontSize: "12px" }}
              />
            ))
          ) : (
            <Typography color="gray" fontSize="14px">
              Click to add 
            </Typography>
          )}
        </Box>
      </Tooltip>

      {/* Tag selector popover */}
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
          multiple
          freeSolo
          autoFocus
          filterSelectedOptions
          options={allOptions}
          value={value}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          onChange={(_, newValue) => {
            const cleaned = newValue.map((val) =>
              typeof val === "string" ? val.replace(" (new)", "") : val
            );
            handleChange(rowIndex, column.id, cleaned);
          }}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                size="small"
                sx={{
                  fontSize: "12px",
                  maxWidth: 180,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={inputRef}
              placeholder="Type or select values..."
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
