import React, { useState, JSX } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Checkbox,
  TextField,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Chip,
  Tooltip,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ArrowDownward,
  ChevronLeft,
  ChevronRight,
  InfoOutline,
  ReplayOutlined,
} from "@mui/icons-material";

interface Column {
  id: string;
  label: string;
  disableSorting?: boolean;
  format?: (value: any) => JSX.Element | string;
  align: boolean;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  selectable?: boolean;
  title?: string;
  lastUpdate?: string;
  info?: boolean;
  searchVisible?: boolean;
  label?: string;
}

function ReusableTable<T extends Record<string, any>>({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
  selectable = false,
  title = "Table",
  lastUpdate = "",
  label = "3 companies",
  searchVisible = false,
  info = false,
}: TableProps<T>) {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (orderBy) {
      return order === "asc"
        ? a[orderBy] > b[orderBy]
          ? 1
          : -1
        : a[orderBy] < b[orderBy]
        ? 1
        : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Paper sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">{title}</Typography>
          {info && (
            <Tooltip title="Table information">
              <InfoOutline
                sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
              />
            </Tooltip>
          )}
          {label && (
            <Chip
              label={label}
              sx={{
                ml: 1,
                backgroundColor: "#F8FCFF",
                color: "#0447A8",
                border: "1px solid #0447A8",
                fontWeight: 500,
              }}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {lastUpdate && (
            <Chip
              icon={<ReplayOutlined />}
              label={`Last Update: ${lastUpdate}`}
              sx={{
                ml: 1,
                backgroundColor: "#F6F6F6",
                color: "#2F2F2F",
                fontWeight: 500,
                border: "1px solid #2F2F2F",
                "& .MuiChip-icon": { color: "#2F2F2F" },
              }}
            />
          )}
          {searchVisible && (
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
            />
          )}
        </Box>
      </Toolbar>
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
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
              )}
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  sx={{
                    whiteSpace: "nowrap",
                    padding: "4px 8px", // Reduce space inside the cell
                    height: "32px", // Ensure row height is minimal
                    lineHeight: "1", // Reduce text line spacing
                    color: "#656565",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {index !== 0 && !column.disableSorting ? (
                    <TableSortLabel
                      active={orderBy === column.id} // Highlights only the clicked column
                      direction={orderBy === column.id ? order : "desc"} // Default sorting is 'desc'
                      onClick={() => handleRequestSort(column.id)}
                      hideSortIcon={false} // Ensures sorting icons never disappear
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          opacity: 1, // Force the sorting icon to always be visible
                        },
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}

              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  padding: "4px 8px", // Reduce space inside the cell
                  height: "32px", // Ensure row height is minimal
                  lineHeight: "1", // Reduce text line spacing
                  color: "#656565",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Action
              </TableCell>
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
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} hover>
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      align={column.align ? "center" : "left"}
                      key={column.id}
                      sx={{
                        whiteSpace: "nowrap",
                        padding: "4px 8px",
                        height: "32px",
                        lineHeight: "1",
                        color: "#2F2F2F",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {column.format
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        {/* Left-aligned Page Indicator */}
        <Typography variant="body2">
          Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
        </Typography>

        {/* Pagination */}
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page + 1}
            onChange={(_, newPage) => setPage(newPage - 1)}
            shape="rounded"
            variant="outlined"
            siblingCount={0} // Show only current + next page
            boundaryCount={1} // Always show first and last page
            showFirstButton={false} // Hide default first button
            showLastButton={false} // Hide default last button
            renderItem={(item) => (
              <PaginationItem
                {...item}
                components={{
                  previous: ChevronLeft,
                  next: ChevronRight,
                }}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  minWidth: "36px",
                  height: "36px",
                  "&.Mui-selected": {
                    backgroundColor: "#0B72E7",
                    color: "#FFF",
                    borderColor: "#0B72E7",
                  },
                  "&:hover": {
                    backgroundColor: "#0B72E7",
                    color: "#FFF",
                    borderColor: "#0B72E7",
                  },
                }}
              />
            )}
          />
        </Stack>
      </Box>
    </Paper>
  );
}

export default ReusableTable;
