
import React, { useEffect, useRef, useState } from "react";
import { LinkOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Chip,
  TextField,
  Tooltip,
} from "@mui/material";

interface RenderTooltipProps {
  content: string;
  strLength: number;
}

interface AutocompleteCellProps {
  row: Record<string, any>;
  column: {
    id: string;
    options?: string[];
  };
  rowIndex: number;
  handleChange: (rowIndex: number, columnId: string, newValue: string[]) => void;
}


export const RenderTooltip: React.FC<RenderTooltipProps> = ({ content, strLength }) => {
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
}

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




export const AutocompleteCell: React.FC<AutocompleteCellProps> = ({
  row,
  column,
  rowIndex,
  handleChange
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
console.log(row[column.id],"ROWOFTHEDATA")
  const value = row[column.id] ? row[column.id] : [];
  console.log(value,"ROWOFTHEDATA1")

  const allOptions = inputValue && !column.options?.includes(inputValue)
    ? [...(column.options || []), `${inputValue} (new)`]
    : column.options || [];

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  return (
    <Tooltip title={value && value?.join(", ")} arrow placement="top">
      <Box
        onClick={() => setOpen(true)}
        sx={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          cursor: "pointer"
        }}
      >
        <Autocomplete
          multiple
          freeSolo
          open={open}
          options={allOptions}
          value={value}
          inputValue={inputValue}
          onInputChange={(_, newInput) => setInputValue(newInput)}
          onChange={(_, newValue) => {
            const cleaned = newValue.map((val) =>
              typeof val === "string" ? val.replace(" (new)", "") : val
            );
            (handleChange as (rowIndex: number, columnId: string, newValue: string[]) => void)(
              rowIndex,
              column.id,
              cleaned
            );
          }}
          
          onBlur={() => setOpen(false)}
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
              variant="standard"
              placeholder={value.length === 0 ? "Click to add" : ""}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                sx: {
                  fontSize: "14px",
                  color: "#2F2F2F",
                  input: {
                    textAlign: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  },
                },
              }}
            />
          )}
          filterSelectedOptions
          fullWidth
        />
      </Box>
    </Tooltip>
  );
};




