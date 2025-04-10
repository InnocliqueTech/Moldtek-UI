import React from "react";
import {
  Box,
  IconButton,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { Done } from "@mui/icons-material";
import { AutocompleteCell } from "../helpers";

interface Column {
  id: string;
  label: string;
  isDropdown?: boolean;
  options?: string[];
  edit?: boolean;
  editSelect?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  setData?: React.Dispatch<React.SetStateAction<T[]>>;
  columns: Column[];
  tableTitle?: boolean;
  firstRow?:boolean;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  setData,
  tableTitle = false,
  firstRow=false
}: DataTableProps<T>) => {
  const handleChange = <K extends keyof T>(
    rowIndex: number,
    columnId: K,
    value: T[K]
  ) => {
    const updated = [...data];
    updated[rowIndex] = { ...updated[rowIndex], [columnId]: value };
    if (setData) {
      setData(updated);
    }
  };

  return (
    <TableContainer
      sx={{
        maxHeight: 300,
        overflow: "auto",
        position: "relative",
        borderRadius: tableTitle ? "none" : 2,
        "& table": {
          borderCollapse: "separate",
          borderSpacing: 0,
        },
        "& thead th:first-of-type": {
          borderTopLeftRadius: tableTitle ? "none" : 8,
        },
        "& thead th:last-of-type": {
          borderTopRightRadius: tableTitle ? "none" : 8,
        },
        "& tbody tr:last-of-type td:first-of-type": {
          borderBottomLeftRadius: tableTitle ? "none" : 8,
        },
        "& tbody tr:last-of-type td:last-of-type": {
          borderBottomRightRadius: tableTitle ? "none" : 8,
        },
      }}
    >
      <Table
        stickyHeader
        sx={{
          minWidth: 1000,
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <TableHead
          sx={{
            position: "sticky",
            top: "-1px",
            zIndex: 2,
            backgroundColor: "#F5F5F5",
            height: "24px", // Reduce overall height
            "& .MuiTableCell-root": {
              padding: "2px 4px",
              height: "24px",
              maxWidth: 180,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "center",
              fontSize: "14px",
            },
          }}
        >
          <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
            {columns.map((column, index) => (
              <TableCell
                key={column.id}
                align="center"
                sx={{
                  fontWeight: 500,
                  border: "1px solid #ccc",
                  color: "#656565",
                  maxWidth: 180,
                  backgroundColor: "#F5F5F5",
                  borderRight:
                    index === columns.length - 1 && !tableTitle
                      ? "1px solid #ccc"
                      : index == columns.length && tableTitle
                      ? "none"
                      : "none",
                  borderBottom: "none",
                  borderLeft:
                    index == columns.length && tableTitle
                      ? "none"
                      : "1px solid #ccc",
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            "& .MuiTableCell-root": {
              padding: "2px 4px",
              height: "24px",
              maxWidth: 180,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "center",
            },
          }}
        >
          {Array.isArray(data) &&
            data?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    sx={{
                      border: "1px solid #ccc",
                      maxWidth: 180,
                      overflow: "hidden",
                      backgroundColor:
                      firstRow&&index===0 ? "#F0F0F0" : "inherit",
                      borderRight:
                        index === columns.length - 1 && !tableTitle
                          ? "1px solid #ccc"
                          : index !== columns.length - 1 && tableTitle
                          ? "none"
                          : "none",
                      borderBottom:
                        rowIndex === data.length - 1 && !tableTitle
                          ? "1px solid #ccc"
                          : rowIndex == data.length && tableTitle
                          ? "none"
                          : "none",
                      borderLeft:
                        rowIndex == data.length && tableTitle
                          ? "none"
                          : "1px solid #ccc",
                      borderBottomLeftRadius:
                        rowIndex === data.length - 1 &&
                        index === 0 &&
                        tableTitle
                          ? "12px"
                          : "0px",
                    }}
                  >
                    {column.isDropdown ? (
                      <Select
                        value={row[column.id] || ""}
                        onChange={(e) =>
                          handleChange(
                            rowIndex,
                            column.id as keyof T,
                            e.target.value as T[keyof T]
                          )
                        }
                        variant="standard"
                        fullWidth
                        renderValue={(selected) => (
                          <Tooltip title={selected} arrow>
                            <Box
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {selected}
                            </Box>
                          </Tooltip>
                        )}
                        sx={{
                          height: "32px",
                          fontSize: "14px",
                          borderBottom: "none", // Removes the underline
                          "&:before": { borderBottom: "none" }, // Removes default MUI underline
                          "&:after": { borderBottom: "none" }, // Ensures no focus underline
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottom: "none !important",
                          },
                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        }}
                      >
                        {column.options?.map((option) => (
                          <MenuItem key={option} value={option}>
                            <Tooltip title={option} arrow>
                              <ListItemText
                                primary={option}
                                sx={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "180px",
                                  color: "#2F2F2F",
                                }}
                              />
                            </Tooltip>
                            {row[column.id] === option && (
                              <IconButton sx={{ color: "#0073B7" }}>
                                <Done />
                              </IconButton>
                            )}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : column.editSelect ? (
                      <AutocompleteCell
                        row={row}
                        column={column}
                        rowIndex={rowIndex}
                        handleChange={(rowIndex, columnId, newValue) =>
                          handleChange(
                            rowIndex,
                            columnId as keyof T,
                            newValue as T[keyof T]
                          )
                        }
                      />
                    ) : column.edit ? (
                      <TextField
                        variant="standard"
                        value={row[column.id]}
                        onChange={(e) =>
                          handleChange(
                            rowIndex,
                            column.id as keyof T,
                            e.target.value as T[keyof T]
                          )
                        }
                        fullWidth
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            fontSize: "14px",
                            color: "#2F2F2F",
                            height: "32px",
                            padding: "0px",
                            input: {
                              textAlign: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            },
                          },
                        }}
                      />
                    ) : (
                      <Tooltip title={String(row[column.id])} arrow>
                        <Box
                          sx={{
                            maxWidth: "100%",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            fontSize: "14px",
                            color: "#2F2F2F",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {row[column.id]}
                        </Box>
                      </Tooltip>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
