import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  ListItemText,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Done } from "@mui/icons-material";

interface Column {
  id: string;
  label: string;
  isDropdown?: boolean;
  options?: string[];
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const DataTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "#F5F5F5",
            height: "32px", // Reduce overall height
            "& .MuiTableCell-root": {
              padding: "4px 8px", // Reduce padding inside header cells
              height: "32px", // Reduce row height
            },
          }}
        >
          <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="center"
                sx={{ fontWeight: 500, border: "1px solid #ccc" ,color:'#656565',fontSize:'14px'}}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& .MuiTableCell-root": {
              padding: "4px 8px", // Apply to all table cells
              height: "32px",
            },
          }}
        >
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{ border: "1px solid #ccc" }}
                  align="center"
                >
                  {column.isDropdown ? (
                    <Select
                      value={row[column.id]}
                      variant="standard" // Keep it standard
                      fullWidth
                      renderValue={(selected) => selected}
                      sx={{
                        borderBottom: "none", // Removes the underline
                        "&:before": { borderBottom: "none" }, // Removes default MUI underline
                        "&:after": { borderBottom: "none" }, // Ensures no focus underline
                        "&:hover:not(.Mui-disabled):before": {
                          borderBottom: "none !important",
                        }, // Removes hover effect
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
                    color:"#2F2F2F"
                  }}
                />
              </Tooltip>

              {row[column.id].includes(option) && (
               <IconButton sx={{color:'#0073B7'}}><Done/></IconButton>
              )}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    row[column.id]
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
