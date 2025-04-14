import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Chip,
  Tooltip,
  InputAdornment,
  Stack,
  PaginationItem,
} from "@mui/material";
import { ChevronLeft, ChevronRight, InfoOutline } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

interface ColumnType {
  id: string;
  label: string;
  align?: boolean;
  disableSorting?: boolean;
  format?: (value: any) => React.ReactNode;
}

interface ReusablePopupProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  totalVersions?: number;
  table?: boolean;
  tableColumns?: ColumnType[];
  tableData?: any[];
}

const ROWS_PER_PAGE = 4;

const VersionPopup: React.FC<ReusablePopupProps> = ({
  open,
  onClose,
  title = "Popup",
  totalVersions = 0,
  table,
  tableColumns = [],
  tableData = [],
}) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return tableData;
    return tableData.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, tableData]);

  const paginatedData = filteredData.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "12px",
          width: 500,
          height: "auto",
          p: 1,
          px: 0,
          boxShadow: 6,
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header Row */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          px={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight={600} fontSize={16}>
              {title}
            </Typography>
            <Tooltip title="Table Info">
              <InfoOutline fontSize="small" sx={{ color: "#777" }} />
            </Tooltip>
            <Chip
              label={`${totalVersions} Versions`}
              size="small"
              sx={{
                backgroundColor: "#F8FCFF",
                color: "#0447A8",
                border: "1px solid #0447A8",
                fontWeight: 500,
              }}
            />
          </Box>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ ml: 0.5 }}>
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "50px",
                pl: 1.2,
                pr: 1,
                py: 0.5,
                fontSize: "0.875rem",
              },
            }}
            sx={{
              width: 180,
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                padding: "2px 8px", // tight padding inside the input
              },
              "& input": {
                padding: "6px 8px", // control actual input text padding
                fontSize: "0.875rem", // optional: smaller font size
              },
            }}
          />
        </Box>

        {/* Table */}
        {table && (
          <>
            <Box sx={{ overflowX: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {tableColumns.map((col) => (
                      <TableCell
                        key={col.id}
                        align={col.align ? "center" : "left"}
                        sx={{ fontWeight: 600 }}
                      >
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row, i) => (
                      <TableRow key={i}>
                        {tableColumns.map((col) => (
                          <TableCell
                            key={col.id}
                            align={col.align ? "center" : "left"}
                          >
                            {col.format ? col.format(row[col.id]) : row[col.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={tableColumns.length} align="center">
                        No matching results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>

            {/* Pagination */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 0.5,
                borderTop: "1px solid #ECECEC",
              }}
            >
              <Typography
                sx={{ color: "#2F2F2F", fontWeight: 500, fontSize: "14px" }}
              >
                Page {page} of {totalPages}
              </Typography>
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChangePage}
                  siblingCount={1}
                  boundaryCount={1}
                  shape="rounded"
                  variant="outlined"
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VersionPopup;
