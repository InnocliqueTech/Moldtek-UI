import React, { useState, JSX } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
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
  Menu,
  MenuItem,
  Button,
  Fade,
  Slide,
  Badge,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  ChevronLeft,
  ChevronRight,
  InfoOutline,
  ReplayOutlined,
} from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";

interface Column {
  id: string;
  label: string;
  disableSorting?: boolean;
  format?: (value: any) => JSX.Element | string;
  align: boolean;
}
interface TableAction<T> {
  label: string;
  icon?: JSX.Element;
  onClick: (row: T) => void;
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
  actions?: TableAction<T>[];
  action?: boolean;
  boxShadow?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
  rowIdentifier?: keyof T; // Key to identify unique rows
}

function ReusableTable<T extends Record<string, any>>({
  columns,
  data,
  selectable = false,
  title = "Table",
  lastUpdate = "",
  label = "3 companies",
  searchVisible = false,
  info = false,
  actions,
  action = false,
  boxShadow = false,
  onSelectionChange,
  rowIdentifier = "id" as keyof T, // Default to 'id' if not specified
}: TableProps<T>) {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px–900px

  const [selected, setSelected] = useState<T[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [showSelectionBar, setShowSelectionBar] = useState(false);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: T
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

const rowsPerPage = 10



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
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target,"inside selectAll");
    if (event.target.checked) {
      const newSelected = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setSelected(newSelected);
      setShowSelectionBar(event.target.checked);
      if (onSelectionChange) onSelectionChange(newSelected);
      return;
    }
    setSelected([]);
    if (onSelectionChange) onSelectionChange([]);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>, row: T) => {
    console.log(row,"inside oneSelect");
    const selectedIndex = selected.findIndex(
      (item) => item[rowIdentifier] === row[rowIdentifier]
    );
    let newSelected: T[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    if (onSelectionChange) onSelectionChange(newSelected);
    setShowSelectionBar(newSelected.length > 0);
  };

  const isSelected = (row: T) => {
    return selected.some((item) => item[rowIdentifier] === row[rowIdentifier]);
  };

  const isAllSelected = () => {
    if (filteredData.length === 0) return false;
    const currentPageRows = filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    return currentPageRows.every((row) => isSelected(row));
  };

  const handleClearSelection = () => {
    setSelected([]);
    setShowSelectionBar(false);
  };

  const handleDownload = () => {
    console.log("Download selected:", selected);
    // Implement your download logic here
  };
  
  const handleUpload = () => {
    console.log("Upload selected:", selected);
    // Implement your upload logic here
  };

  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: !boxShadow ? "0px" : "12px", overflow: "hidden" }}
    >
      <Toolbar
      disableGutters
        sx={{
          minHeight:'55px !important' ,
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
          alignItems: {
            xs: "flex-start",
            sm: "flex-start",
            md: "center",
          },
          justifyContent: "space-between",
          gap: !boxShadow ? 0 : 2,
          px: 1
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {selected.length > 0 ? (
            <Typography variant="h6">
              {selected.length} selected
            </Typography>
          ) : (
            <>
              <Typography variant="h6">{title}</Typography>
              {info && (
                <Tooltip title="Table information">
                  <InfoOutline
                    sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
                  />
                </Tooltip>
              )}
            </>
          )}
          {label && (
            <Chip
              label={label}
              sx={{
                backgroundColor: "#F8FCFF",
                color: "#0447A8",
                border: "1px solid #0447A8",
                fontWeight: 500,
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          {lastUpdate && (
            <Chip
              icon={<ReplayOutlined />}
              label={`Last Update: ${lastUpdate}`}
              sx={{
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
              fullWidth={isXs || isSm}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: "100%",
                  md: "240px",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
            />
          )}
        </Box>
      </Toolbar>

      <TableContainer
        sx={{
          maxHeight:  300,
          overflowY: "auto",
          overflowX: "auto",
          position: "relative",
        }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: 1000,
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
                padding: "2px 4px", // Reduce padding inside header cells
                height: "24px", // Reduce row height
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isAllSelected()}
                    onChange={handleSelectAll}
                    indeterminate={
                      selected.length > 0 &&
                      selected.length <
                        Math.min(
                          rowsPerPage,
                          filteredData.length - page * rowsPerPage
                        )
                    }
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  align={column.align ? "center" : "left"}
                  key={column.id}
                  sx={{
                    whiteSpace: "nowrap",
                    lineHeight: "1", // Reduce text line spacing
                    color: "#656565",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {!column.disableSorting ? (
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
              {action && (
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    lineHeight: "1", // Reduce text line spacing
                    color: "#656565",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableCell-root": {
                padding: "2px 4px", // Apply to all table cells
                height: "24px",
              },
              "& .MuiTableRow-root.Mui-selected": {
                backgroundColor: "#e3f2fd",
                "&:hover": {
                  backgroundColor: "#bbdefb",
                },
              },
            }}
          >
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row);
                return (
                  <TableRow
                    key={index}
                    hover
                    selected={isItemSelected}
                    // onClick={(event) => {
                    //   if (selectable && !(event.target instanceof HTMLElement && event.target.tagName === 'INPUT')) {
                    //     const fakeEvent = {
                    //       target: { checked: !isItemSelected },
                    //     } as React.ChangeEvent<HTMLInputElement>;
                    //     handleSelect(fakeEvent, row);
                    //   }
                    // }}
                    sx={{
                      cursor: selectable ? 'pointer' : 'default',
                    }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleSelect(event, row)}
                          onClick={(event) => event.stopPropagation()}
                        />
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
                    {action && (
                      <TableCell align="right">
                        <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
          {selectedRow && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {actions?.map((action, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleMenuClose();
                    action.onClick(selectedRow); // Pass current row
                  }}
                >
                  {action.icon && <Box mr={1}>{action.icon}</Box>}
                  {action.label}
                </MenuItem>
              ))}
            </Menu>
          )}
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          borderTop:'1px solid #ECECEC'
        }}
      >
        <Typography
          sx={{ color: "#2F2F2F", fontWeight: 500, fontSize: "14px" }}
        >
          Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
        </Typography>
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
      {showSelectionBar && (
        <Fade in={showSelectionBar}>
          <Slide direction="up" in={showSelectionBar} mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: 'fixed',
                bottom: 60,
                left: '45%',
                transform: 'translateX(-50%)',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                zIndex: 1000,
                border: '1px solid #e0e0e0',
              }}
            >
              <IconButton
                onClick={handleClearSelection}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              <Divider orientation="vertical" flexItem />

              <Typography variant="body2" sx={{ minWidth: 100 }}>
                <Badge
                  badgeContent={selected.length}
                  color="primary"
                  sx={{ mr: 1 }}
                />
                selected
              </Typography>

              <Divider orientation="vertical" flexItem />

              <Button
                variant="text"
                startIcon={<FileDownloadIcon />}
                onClick={handleDownload}
                size="small"
                sx={{ textTransform: 'none' }}
              >
                Download
              </Button>

              <Button
                variant="text"
                startIcon={<FileUploadIcon />}
                onClick={handleUpload}
                size="small"
                sx={{ textTransform: 'none' }}
              >
                Upload
              </Button>
            </Box>
          </Slide>
        </Fade>
      )}
    </Paper>
  );
}

export default ReusableTable;
