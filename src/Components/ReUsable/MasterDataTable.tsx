import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  LaminatingTableRow,
  PrintingTableRow,
  setInvalidFieldsTable,
  setLaminationFormData,
  setSavePrintingFormData,
  setSubmitAndPublishButtonMasterLamination,
  setSubmitAndPublishButtonPrinting,
} from "../../store/slices/masterDataSlice";

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
  firstRow?: boolean;
  id?: string;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  setData,
  tableTitle = false,
  firstRow = false,
  id,
}: DataTableProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { printingSaveFormData, laminaionFormData, invalidFieldsTable } =
    useSelector((state: RootState) => state.masterData);

  const [invalidFields, setInvalidFields] = useState<{
    [key: string]: boolean;
  }>({});
 
  const validateInput = (columnId: string, value: string): boolean => {
    const numericFields = ["volume", "uv_led_intensity", "lf_value"];
    const lpcmFields = ["lpcm"];
    const laminationFileds =  ["code","ratio","brand"]

    if (value === "") return true;

    if (numericFields.includes(columnId)) {
      return /^\d+$/.test(value) && value !== "0";
    }
    if (id==='printing' && lpcmFields.includes(columnId)) {
      return /^[a-zA-Z0-9\s]*$/.test(value);
    }
    if (id==='lamination' && laminationFileds.includes(columnId)) {
      return /^[a-zA-Z0-9\s]*$/.test(value);
    }
    return /^[A-Za-z\s]*$/.test(value);
  };

  const handleChange = <K extends keyof T>(
    rowIndex: number,
    columnId: K,
    value: T[K] | string
  ) => {
    const updated = [...data];
    const numberKeys = ["lf_value", "lpcm", "station_no", "ratio"];
    let updatedValue: any = value;

    if (numberKeys.includes(columnId as string)) {
      updatedValue =
        value === "" ? "" : isNaN(Number(value)) ? value : Number(value);
    }

    updated[rowIndex] = {
      ...updated[rowIndex],
      [columnId]: updatedValue,
    };

    setData?.(updated);

    if (id === "printing") {
      dispatch(
        setSavePrintingFormData({
          ...printingSaveFormData,
          stationWiseMetrics: updated as unknown as PrintingTableRow[],
        })
      );
    }

    if (id === "lamination") {
      dispatch(
        setLaminationFormData({
          ...laminaionFormData,
          bondingMaterials: updated as unknown as LaminatingTableRow[],
        })
      );
    }
  };

  useEffect(() => {
    if (invalidFieldsTable) {
      setInvalidFields(invalidFieldsTable);
    }
  }, [invalidFieldsTable]);

  // Check mandatory fields on data change
  useEffect(() => {
    if(id==='printing'){
    const mandatoryFields = ["color_pantone", "lpcm", "lf_value"];

    // Check if any mandatory field is empty
    const hasEmptyMandatory = Array.isArray(data) 
    ? data?.some((row) =>
      mandatoryFields.some((field) => {
        const value = row[field];
        return (
          value === "" || value === 0 || value === null || value === undefined
        );
      })
    ) : false;

    // Check if any field is marked invalid in your state
    const hasAnyInvalidField = Object.values(invalidFields).some(
      (isInvalid) => isInvalid
    );

    // Set the global error state
    dispatch(setSubmitAndPublishButtonPrinting(hasEmptyMandatory || hasAnyInvalidField));
  }
  if(id==='lamination'){
    const mandatoryFields = ["code","ratio","brand"];

    // Check if any mandatory field is empty
    const hasEmptyMandatory = Array.isArray(data) 
    ? data?.some((row) =>
        mandatoryFields.some((field) => {
          const value = row[field];
          return (
            value === "" || value === 0 || value === null || value === undefined
          );
        })
      )
    : false;
  

    // Check if any field is marked invalid in your state
    const hasAnyInvalidField = Object.values(invalidFields).some(
      (isInvalid) => isInvalid
    );

    // Set the global error state
    dispatch(setSubmitAndPublishButtonMasterLamination(hasEmptyMandatory || hasAnyInvalidField));
  }
  }, [data, invalidFields]);

  return (
    <>
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
              height: "24px",
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
                        : "none",
                    borderBottom: "none",
                    borderLeft: "1px solid #ccc",
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
                        maxWidth: 180,
                        overflow: "hidden",
                        backgroundColor: invalidFields[
                          `${rowIndex}_${column.id}`
                        ]
                          ? "#ffe6e6"
                          : firstRow && index === 0
                          ? "#F0F0F0"
                          : "inherit",
                        border: invalidFields[`${rowIndex}_${column.id}`]
                          ? "1px solid red"
                          : "1px solid #ccc",
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
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const isValid = validateInput(
                              column.id,
                              inputValue
                            );
                            const key = `${rowIndex}_${column.id}`;
                            const updatedInvalidFileds = {
                              ...invalidFields,
                              [key]: !isValid,
                            };
                            setInvalidFields(updatedInvalidFileds);
                            dispatch(setInvalidFieldsTable(updatedInvalidFileds))
                            handleChange(
                              rowIndex,
                              column.id as keyof T,
                              inputValue as T[keyof T]
                            );
                          }}
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
                            {row[column.id] || "N/A"}
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
    </>
  );
};

export default DataTable;
