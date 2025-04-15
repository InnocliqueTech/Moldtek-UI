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
  Fade,
  Slide,
  Divider,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ChevronLeft,
  ChevronRight,
  InfoOutline,
  ReplayOutlined,
} from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import CancelIcon from "../../assets/Images/cancel.png";
import ButtonComponent from "./Button";
interface Column {
  id: string;
  label: string;
  disableSorting?: boolean;
  format?: (value: any) => string | JSX.Element | null;
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
  rowIdentifier?: keyof T;
  searchSize?: boolean;
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
  rowIdentifier = "id" as keyof T, 
  searchSize = false,
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

  const rowsPerPage = 10;

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!orderBy) return 0;
    return order === "asc"
      ? a[orderBy] > b[orderBy]
        ? 1
        : -1
      : a[orderBy] < b[orderBy]
      ? 1
      : -1;
  });

  const filteredData = search
    ? sortedData.filter((row) => {
        const searchValue = search.toLowerCase();
        return (
          row.uen?.toString().toLowerCase().includes(searchValue) ||
          row.version?.toString().toLowerCase().includes(searchValue) ||
          row.unit_effectivity_number
            ?.toString()
            .toLowerCase()
            .includes(searchValue)
        );
      })
    : sortedData;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setShowSelectionBar(event.target.checked);
    if (onSelectionChange) onSelectionChange([]);
  };

  const handleSelect = (row: T) => {
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
  };

  const handleUpload = () => {
    console.log("Upload selected:", selected);
  };
  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: !boxShadow ? 0 : 2, overflow: "hidden" }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: "55px !important",
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
          px: !boxShadow ? 1 : 1.5,
          mt: { md: !boxShadow ? "-8px" : 0, sm: 0 },
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
          <Typography fontSize={searchSize ? "1rem" : "1.25rem"}>
            {title}
          </Typography>
          {info && (
            <Tooltip title="Table Info">
              <InfoOutline fontSize="small" sx={{ color: "#777" }} />
            </Tooltip>
          )}
          {label && (
            <Chip
              label={label}
              size="small"
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
            flexDirection: "row",
            alignItems: { xs: "flex-start", sm: "center" },
            flexWrap: "wrap",
            gap: 1.5,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {lastUpdate && (
            <Chip
              icon={<ReplayOutlined />}
              label={`Last Update: ${lastUpdate}`}
              size="small"
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
              fullWidth={isXs || isSm}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: "100%",
                  md: "240px",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  padding: "2px 8px",
                },
                "& input": {
                  padding: searchSize ? "2px 0px" : "6px 8px", 
                  fontSize: "0.875rem", 
                },
              }}
            />
          )}
        </Box>
      </Toolbar>

      <TableContainer
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          overflowX: "auto",
          position: "relative",
          mt: { md: !boxShadow ? "-8px" : 0, sm: 0 },
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
              height: "32px", 
              "& .MuiTableCell-root": {
                padding: "4px 8px",
                height: "32px",
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
              {columns.map((column, index) => (
                <TableCell
                  align={column.align ? "center" : "left"}
                  key={column.id}
                  sx={{
                    whiteSpace: "nowrap",
                    lineHeight: "1", 
                    color: "#656565",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginLeft: index === 0 ? "8px" : undefined,
                  }}
                >
                  {!column.disableSorting ? (
                    <TableSortLabel
                      active={orderBy === column.id} 
                      direction={orderBy === column.id ? order : "desc"}
                      onClick={() => handleRequestSort(column.id)}
                      hideSortIcon={false} 
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          opacity: 1, 
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
                    lineHeight: "1", 
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
                padding: "4px 8px",
                height: "32px",
              },
              "& .MuiTableRow-root.Mui-selected": {
                backgroundColor: "#e3f2fd",
                "&:hover": {
                  backgroundColor: "#bbdefb",
                },
              },
            }}
          >
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            ) : (
              filteredData
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
                        cursor: selectable ? "pointer" : "default",
                      }}
                    >
                      {selectable && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={() => handleSelect(row)}
                            onClick={(event) => event.stopPropagation()}
                          />
                        </TableCell>
                      )}
                      {columns.map((column, index) => (
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
                            marginLeft: index === 0 ? "8px" : undefined,
                          }}
                        >
                          {column.format
                            ? column.format(row[column.id])
                            : row[column.id]}
                        </TableCell>
                      ))}
                      {action && (
                        <TableCell align="left">
                          <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
            )}
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
                    action.onClick(selectedRow);
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
          p: 0.5,
          borderTop: "1px solid #ECECEC",
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
          <Slide
            direction="up"
            in={showSelectionBar}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                position: "fixed",
                bottom: 60,
                left: "45%",
                transform: "translateX(-50%)",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: 2,
                zIndex: 1000,
                border: "1px solid #3A63D2",
              }}
            >
              <IconButton
                onClick={handleClearSelection}
                size="small"
                sx={{ color: "text.secondary" }}
              >
                <img src={CancelIcon} alt="cancel icon" />
              </IconButton>

              <Typography variant="body2" sx={{ minWidth: 100 }}>
                {/* <Badge
                  badgeContent={selected.length}
                  color="primary"
                  sx={{ mr: 1 }}
                /> */}
                {selected.length} {selected.length > 1 ? "Jobs" : "Job"}{" "}
                selected
              </Typography>

              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderRightWidth: 2 }}
              />

              <ButtonComponent
                text={"Upload"}
                onClick={handleUpload}
                textColor="#0073B7"
                color="white"
                borderRadius="100px"
                p={2}
                border="1px solid #0073B7"
              />

              <ButtonComponent
                text={"Download"}
                onClick={handleDownload}
                textColor="#0073B7"
                color="white"
                borderRadius="100px"
                p={2}
                border="1px solid #0073B7"
              />
            </Box>
          </Slide>
        </Fade>
      )}
    </Paper>
  );
}

export default ReusableTable;
