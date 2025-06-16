import React, { useState, JSX, useEffect } from "react";
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
  // Menu,
  MenuItem,
  Fade,
  Slide,
  Divider,
  InputAdornment,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  SxProps,
  Theme,
  SelectChangeEvent,
  DialogContentText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  InfoOutline,
  InsertDriveFile,
  ReplayOutlined,
  SdCardAlert,
} from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import CancelIcon from "../../assets/Images/cancel.png";
import ButtonComponent from "./Button";
import { useUpdateStatusJobMutation } from "../../store/apis/dailyPlanApis";
import { useDispatch, useSelector } from "react-redux";
import { setDebouncedSearchDailyPlan, setDropDown } from "../../store/slices/viewDailyPlanSlice";
import { RootState } from "../../store";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../../api.config";
import ErrorIcon from "@mui/icons-material/Error";
import Loader from "../../Loader";
import { useLocation } from "react-router-dom";
import { setDebouncedSearch } from "../../store/slices/masterDataSlice";
import { setDebouncedSearchKLD } from "../../store/slices/kldSlice";
import { setDebouncedSearchUser } from "../../store/slices/userSlice";

interface Column {
  id: string;
  label: string;
  disableSorting?: boolean;
  format?: (value: any, row: any) => string | JSX.Element | null;
  align: boolean;
  dropdown?: boolean;
  dropdownOptions?: { label: string; value: string }[];
}
interface TableAction<T> {
  label?: string;
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
  infoText?: string;
  searchVisible?: boolean;
  label?: string;
  actions?: TableAction<T>[];
  action?: boolean;
  boxShadow?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
  rowIdentifier?: keyof T;
  searchSize?: boolean;
  isLoading?: boolean;
  rowsPerPage?: number;
  onPageChange?: (newPage: number) => void;
  id?: string;
  totalLength?: number;
  pageRange?: boolean;
  pageNumber?: number;
  handleRowsPerPageChange?: (event: SelectChangeEvent<string>) => void;
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
  isLoading = false,
  rowsPerPage = 10,
  onPageChange,
  id,
  totalLength = 0,
  pageRange = false,
  pageNumber = 0,
  infoText = "Table Info",
  handleRowsPerPageChange,
}: TableProps<T>) {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<string>("");
  // const [page, setPage] = useState<number>(pageRange ? pageNumber : 0);
  const [search, setSearch] = useState<string>("");
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px–900px

  const [selected, setSelected] = useState<T[]>([]);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [showSelectionBar, setShowSelectionBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaderDownload, setLoaderDownload] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { dropDown } = useSelector((state: RootState) => state.viewDailyPlan);

  // const handleMenuOpen = (
  //   event: React.MouseEvent<HTMLButtonElement>,
  //   row: T
  // ) => {
  //   setAnchorEl(event.currentTarget);
  //   setSelectedRow(row);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   setSelectedRow(null);
  // };
  const role = localStorage.getItem("role") || "";


  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  useEffect(() => {
    const handler = setTimeout(() => {
      if (id === 'masterData') {
        dispatch(setDebouncedSearch(search));
      }
      if (id === 'dailyPlan') {
        dispatch(setDebouncedSearchDailyPlan(search));
      }
      if (id === 'kldData') {
        dispatch(setDebouncedSearchKLD(search));
      }
      {
        if (id === 'userData') {
          dispatch(setDebouncedSearchUser(search));
          console.log("setDebouncedSearchUser(search)", setDebouncedSearchUser(search))
        }
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const getValue = (row: any, key: string) => {
    if (key === "customer_name")
      return row.customer_name?.customer?.toLowerCase() || "";
    return row[key];
  };

  const sortedData = [...data].sort((a, b) => {
    if (!orderBy) return 0;
    const aValue = getValue(a, orderBy);
    const bValue = getValue(b, orderBy);

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    return order === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
        ? 1
        : -1;
  });

  const filteredData = search
    ? sortedData.filter((row) => {
      const searchValue = search.toLowerCase();

      if (id === "jobsList") {
        return Object.entries(row).some(([key, value]) => {
          if (!value) return false;

          let stringValue = "";

          // Check if the field is a date field — format it as dd-mm-yyyy
          if (key.toLowerCase().includes("date")) {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
              stringValue = date
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-");
            }
          } else {
            stringValue = value.toString();
          }

          return stringValue.toLowerCase().includes(searchValue);
        });
      }
      else {
        return (sortedData)
      }
    })
    : sortedData;

  const handleSelectAll = () => {
    const allSelected = filteredData
      .filter((row) => !checkTheDisableStatus(row))
      .every((row) => isSelected(row));

    let newSelected: T[] = [];

    if (!allSelected) {
      newSelected = [...filteredData];
    } else {
      newSelected = [];
    }

    setSelected(newSelected);
    setShowSelectionBar(newSelected.length > 0);
    if (onSelectionChange) onSelectionChange(newSelected);
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

  const checkTheDisableStatus = (row: T) => {
    return row?.status == "Inactive";
  };

  const isAllSelected = () => {
    if (filteredData.length === 0) return false;
    const filtered = filteredData.filter((row) => !checkTheDisableStatus(row));
    const allSelected =
      filtered.length > 0 && filtered.every((row) => isSelected(row));
    return allSelected;
  };

  // useEffect(() => {
  //   if (!pageRange) {
  //     setPage(0);
  //   }
  // }, [pageRange]);

  const handleClearSelection = () => {
    setSelected([]);
    setShowSelectionBar(false);
  };
  const [updateStatusJob] = useUpdateStatusJobMutation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [statusChangeMessage, setStatusChangeMessage] =
    useState<React.ReactNode>("");

  const handleDropdownSelect = (row: T, newValue: string) => {
    if (newValue === "Inactive") {
      setStatusChangeMessage(
        <>
          Are you sure you want to change the status from{" "}
          <strong>{row.status}</strong> to <strong>{newValue}</strong>?<br />
          If you proceed,the total daily job data is deleted for this number.
        </>
      );
    } else {
      setStatusChangeMessage(
        <>
          Are you sure you want to change the status from{" "}
          <strong>{row.status}</strong> to <strong>{newValue}</strong>?<br />
        </>
      );
    }
    setSelectedRow(row);
    setSelectedValue(newValue);
    setConfirmDialogOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!selectedRow) return;
    setLoading(true);
    setConfirmDialogOpen(false);

    try {
      const response = await updateStatusJob({
        indentNumber: selectedRow.indentNumber,
        status: selectedValue,
      }).unwrap();

      if (response?.statusCode === 200) {
        dispatch(setDropDown(!dropDown));
        if (response?.message !== "Status Updated") {
          toast.error(response?.message);
        } else {
          toast.success("Status Updated Successfully!");
        }
      } else {
        toast.error(response?.message);
        dispatch(setDropDown(!dropDown));
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      dispatch(setDropDown(!dropDown));
    } finally {
      setLoading(false);
    }
  };
  // const storageKey = `${id}-page`;
  // useEffect(() => {
  //   const savedPage = localStorage.getItem(storageKey);
  //   if (savedPage !== null) {
  //     setPage(Number(savedPage));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(storageKey, page.toString());
  // }, [page]);

  const [downloadSummary, setDownloadSummary] = useState<null | {
    total: number;
    downloaded: string[];
    errors: string[];
  }>(null);

  const handleBulkDownload = async () => {
    if (selected.length === 0) {
      toast.warning("Please select at least one row!");
      return;
    }

    setLoaderDownload(true);
    const results: {
      indentNumber: string;
      status: "success" | "error";
      message?: string;
      blob?: Blob;
    }[] = [];

    try {
      const downloadTasks = selected.map(async (row) => {
        const unitNumber = row.unitEffectivityNumber;
        const indentNumber = decodeURIComponent(row.indentNumber || "");
        const url = `${BASE_API_URL}/master/downloadDailyJobTemplate?unitNumber=${unitNumber}&indentNumber=${indentNumber}`;

        try {
          const response = await fetch(url, { method: "GET" });
          if (!response.ok) {
            const errorData = await response.json();
            results.push({
              indentNumber,
              status: "error",
              message: errorData?.message || "Download failed.",
            });
          } else {
            const blob = await response.blob();
            results.push({
              indentNumber,
              status: "success",
              blob,
            });
          }
        } catch (err) {
          results.push({
            indentNumber,
            status: "error",
            message: err instanceof Error ? err.message : "Unknown error",
          });
        }
      });

      await Promise.all(downloadTasks);

      // Handle successful downloads
      results
        .filter((result) => result.status === "success")
        .forEach(({ indentNumber, blob }) => {
          if (blob) {
            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = `${indentNumber}.xlsx`;
            link.click();
            URL.revokeObjectURL(fileUrl);
          }
        });

      const successful = results
        .filter((r) => r.status === "success")
        .map((r) => r.indentNumber);
      const failed = results
        .filter((r) => r.status === "error")
        .map((r) => `${r.message}`);

      if (failed.length > 0) {
        setDownloadSummary({
          total: selected.length,
          downloaded: successful,
          errors: failed,
        });
      } else if (successful.length > 0 && failed.length <= 0) {
        toast.success(
          `${successful.length === 1
            ? "File downloaded successfully."
            : "Files downloaded successfully."
          }`
        );
      }
    } finally {
      setLoaderDownload(false);
    }
  };

  const getStatusStyles = (status: string): SxProps<Theme> => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          color: "#0070F3",
          backgroundColor: "#E6F4FF",
        };
      case "inactive":
        return {
          color: "#c62828",
          backgroundColor: "#ffebee",
        };
      case "inprogress":
        return {
          color: "#C08532",
          backgroundColor: "#FAECD8",
        };
      case "completed":
        return {
          color: "#478E30",
          backgroundColor: "#DDEED8",
        };
      default:
        return {
          color: "#424242",
          backgroundColor: "transparent",
        };
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (!!downloadSummary) {
      setDownloadSummary(null);
    }
    if (confirmDialogOpen) {
      setConfirmDialogOpen(false);
    }
  }, [location]);


  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: !boxShadow ? 0 : 2, overflow: "hidden" }}
    >
      <>
        {loaderDownload ? (
          <Loader text="Please wait, the downloading of your files takes some time." />
        ) : (
          <>
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
                  <Tooltip title={infoText}>
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
                    placeholder={"Search"}
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
                        px: 1,
                      },
                      "& .MuiInputBase-input": {
                        padding: searchSize ? "2px 0px" : "4px 0",
                        fontSize: "0.875rem",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
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
              <Table stickyHeader sx={{ minWidth: 1000 }}>
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
                              filteredData.length - pageNumber * rowsPerPage
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
                  {isLoading || loading ? (
                    Array.from({ length: 8 }).map((_, rowIndex) => (
                      <TableRow key={`skeleton-${rowIndex}`}>
                        {selectable && (
                          <TableCell padding="checkbox">
                            <Checkbox disabled />
                          </TableCell>
                        )}
                        {columns.map((column, index) => (
                          <TableCell key={`${column.id}-skeleton-${index}`}>
                            <Box
                              sx={{
                                width: "100%",
                                height: 16,
                                borderRadius: 1,
                                backgroundColor: "#e0e0e0",
                                animation: "pulse 1.5s infinite ease-in-out",
                                "@keyframes pulse": {
                                  "0%": { opacity: 1 },
                                  "50%": { opacity: 0.4 },
                                  "100%": { opacity: 1 },
                                },
                              }}
                            />
                          </TableCell>
                        ))}
                        {action && (
                          <TableCell>
                            <Box
                              sx={{
                                width: 24,
                                height: 16,
                                backgroundColor: "#e0e0e0",
                                borderRadius: 1,
                              }}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={
                          columns.length +
                          (selectable ? 1 : 0) +
                          (action ? 1 : 0)
                        }
                        align="center"
                      >
                        No Data Available
                      </TableCell>
                    </TableRow>
                  ) : (
                    (pageRange
                      ? filteredData
                      : filteredData.slice(
                        pageNumber * rowsPerPage,
                        pageNumber * rowsPerPage + rowsPerPage
                      )
                    ).map((row: any, index: any) => {
                      const isItemSelected = isSelected(row);
                      const isRowCheckBoxDisable = checkTheDisableStatus(row);
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
                                disabled={isRowCheckBoxDisable}
                                checked={isItemSelected}
                                onChange={() => handleSelect(row)}
                                onClick={(event) => event.stopPropagation()}
                              />
                            </TableCell>
                          )}
                          {columns.map((column, index) => (
                            <TableCell
                              key={column.id}
                              align={column.align ? "center" : "left"}
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
                              {column.dropdown && column.dropdownOptions ? (
                                <Select
                                  size="small"
                                  value={row[column.id] || ""}
                                  onChange={(e) =>
                                    handleDropdownSelect(
                                      row,
                                      // column.id,
                                      e.target.value
                                    )
                                  }
                                  displayEmpty
                                  disabled={(row[column.id] || "").toLowerCase() === "completed" && role.toLowerCase() !== 'admin'}
                                  variant="standard"
                                  sx={{
                                    width: 150,
                                    border: "none",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    ...getStatusStyles(row[column.id] || ""),
                                    "& .MuiSelect-select": {
                                      padding: 0,
                                    },
                                    "&::before, &::after": {
                                      display: "none",
                                    },
                                    "& fieldset": {
                                      display: "none",
                                    },
                                  }}
                                >
                                  {column.dropdownOptions.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : column.format ? (
                                column.format(row[column.id], row)
                              ) : (
                                row[column.id]
                              )}
                            </TableCell>
                          ))}
                          {actions && actions.length > 0 && (
                            <TableCell align="right">
                              <Stack direction="row">
                                {actions.map((action, index) => (
                                  <Tooltip key={index} title={action.label} arrow>
                                    <IconButton
                                      size="small"
                                      onClick={() => {
                                        action.onClick(row);
                                      }}
                                      sx={{
                                        p: 0.1,
                                        color: "inherit",
                                      }}
                                    >
                                      {action.icon}
                                    </IconButton>
                                  </Tooltip>
                                ))}
                              </Stack>
                            </TableCell>
                          )}

                        </TableRow>
                      );
                    })
                  )}
                </TableBody>


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
                {pageRange
                  ? `Page ${pageNumber + 1} of ${Math.ceil(
                    totalLength / rowsPerPage
                  )}`
                  : `Page ${pageNumber + 1} of ${Math.ceil(
                    filteredData.length / rowsPerPage
                  )}`}
              </Typography>
              <Box display={"flex"} flexDirection={"row"}>
                <Typography sx={{ marginRight: "4px", marginTop: "6px" }}>
                  Rows per page:
                </Typography>
                <Select
                  value={rowsPerPage.toString()}
                  onChange={handleRowsPerPageChange}
                  label="Rows per page"
                  variant="standard"
                  sx={{
                    height: "32px",
                    fontSize: "14px",
                    marginTop: "4px",
                    borderBottom: "none",
                    "&:before": { borderBottom: "none" },
                    "&:after": { borderBottom: "none" },
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
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
                <Stack spacing={2}>
                  <Pagination
                    count={
                      pageRange
                        ? Math.ceil(totalLength / rowsPerPage)
                        : Math.ceil(filteredData.length / rowsPerPage)
                    }
                    page={pageNumber + 1}
                    onChange={(_, newPage) => {
                      onPageChange?.(newPage - 1);
                      // setPage(newPage - 1);
                    }}
                    shape="rounded"
                    variant="outlined"
                    siblingCount={0}
                    boundaryCount={1}
                    showFirstButton={false}
                    showLastButton={false}
                    renderItem={(item) => {
                      if (pageRange) {
                        const hasNextPage =
                          (pageNumber + 1) * rowsPerPage < totalLength;
                        const hasPrevPage = pageNumber > 0;

                        const disabled =
                          (item.type === "previous" && !hasPrevPage) ||
                          (item.type === "next" && !hasNextPage);

                        return (
                          <PaginationItem
                            {...item}
                            disabled={disabled}
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
                        );
                      } else {
                        return (
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
                                borderColor: "#0B72E7",
                              },
                            }}
                          />
                        );
                      }
                    }}
                  />
                </Stack>
              </Box>
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

                    {/* <ButtonComponent
                text={"Upload"}
                onClick={handleUpload}
                textColor="#0073B7"
                color="white"
                borderRadius="100px"
                p={2}
                border="1px solid #0073B7"
              /> */}

                    <ButtonComponent
                      text={
                        loaderDownload ? "Downloading..." : "Download Template"
                      }
                      onClick={handleBulkDownload}
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
            <Dialog
              open={!!downloadSummary}
              onClose={() => { }}
              maxWidth="sm"
              fullWidth
              PaperProps={{ sx: { borderRadius: 3 } }}
            >
              <DialogTitle>Download Summary</DialogTitle>

              <DialogContent dividers>
                {downloadSummary && (
                  <>
                    {/* Summary Counts Row */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: 2,
                        mb: 3,
                        bgcolor: "grey.100",
                        borderRadius: 2,
                      }}
                    >
                      <Typography fontWeight="bold">
                        Total Selected: {downloadSummary.total}
                      </Typography>
                      <Typography fontWeight="bold" color="green.700">
                        Downloaded: {downloadSummary.downloaded.length}
                      </Typography>
                      <Typography fontWeight="bold" color="error.main">
                        Failed: {downloadSummary.errors.length}
                      </Typography>
                    </Box>

                    {/* Downloaded Files */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        bgcolor: "green.50",
                        border: "1px solid",
                        borderColor: "green.300",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          color: "success.main",
                        }}
                      >
                        <CheckCircle sx={{ color: "success.main", mr: 1 }} />{" "}
                        Downloaded Files:
                      </Typography>

                      {downloadSummary.downloaded.length > 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          {downloadSummary.downloaded.map((name) => (
                            <Box
                              key={name}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 1,
                                border: "1px solid",
                                borderColor: "green.200",
                                borderRadius: 1,
                                bgcolor: "white",
                              }}
                            >
                              <InsertDriveFile
                                sx={{ color: "success.main", mr: 1 }}
                              />
                              <Typography variant="body2">
                                {name} Downloaded
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2">None</Typography>
                      )}
                    </Box>

                    {/* Failed Files */}
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "red.50",
                        border: "1px solid",
                        borderColor: "red.300",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          color: "error.main",
                        }}
                      >
                        <ErrorIcon sx={{ mr: 1 }} /> Failed Files:
                      </Typography>

                      {downloadSummary.errors.length > 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          {downloadSummary.errors.map((err, i) => (
                            <Box
                              key={i}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 1,
                                border: "1px solid",
                                borderColor: "red.200",
                                borderRadius: 1,
                                bgcolor: "white",
                              }}
                            >
                              <SdCardAlert
                                sx={{ color: "error.main", mr: 1 }}
                              />
                              <Typography variant="body2">{err}</Typography>
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2">None</Typography>
                      )}
                    </Box>
                  </>
                )}
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={() => setDownloadSummary(null)}
                  variant="contained"
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={confirmDialogOpen}
              onClose={() => { }}
              maxWidth="sm"
              fullWidth
              PaperProps={{ sx: { borderRadius: 5, p: 0.5 } }}
            >
              <DialogTitle>Confirm Status Change</DialogTitle>
              <DialogContent>
                <DialogContentText>{statusChangeMessage}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 10,
                    color: "primary.main",
                    borderColor: "primary.main",
                    "&:hover": {
                      // backgroundColor: 'primary.main',
                      // color: 'white',
                      borderColor: "primary.main",
                    },
                  }}
                  onClick={() => setConfirmDialogOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    borderRadius: 10,
                    backgroundColor: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                  onClick={handleConfirmUpdate}
                >
                  Yes, Change Status
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </>
    </Paper>
  );
}

export default ReusableTable;
