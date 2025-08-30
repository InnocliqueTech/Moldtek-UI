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
import { Done, Edit } from "@mui/icons-material";
import { AutocompleteCell } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  // setInvalidFieldsTable,
  setLaminationFormData,
  // setLaminationTableValueVaidation,
  // setPrintingTableValueVaidation,
  setSavePrintingFormData,
} from "../../store/slices/masterDataSlice";
import {
  LaminatingTableRow,
  LaminationFormData,
  PrintingFormValues,
  PrintingTableRow,
} from "../../store/Interfaces/masterDataTypes";

interface Column {
  id: string;
  label: string;
  isDropdown?: boolean;
  options?: string[];
  edit?: boolean;
  editSelect?: boolean;
  required?: boolean;
  onNewOptionAdd?: boolean;
  field?: string;
  editIcon?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  setData?: ((data: T[]) => void) | React.Dispatch<React.SetStateAction<T[]>>;
  columns: Column[];
  tableTitle?: boolean;
  firstRow?: boolean;
  id?: string;
  rowEditable?: (row: T, columnId: string) => boolean;
  setFormData?: React.Dispatch<React.SetStateAction<PrintingFormValues>>;
  setFormDataLaminaton?: React.Dispatch<
    React.SetStateAction<LaminationFormData>
  >;

  // rowEditable?: (row: T) => boolean;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  setData,
  tableTitle = false,
  firstRow = false,
  id,
  setFormData,
  rowEditable,
  setFormDataLaminaton,
}: DataTableProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { printingSaveFormData, laminaionFormData, invalidFieldsTable } =
    useSelector((state: RootState) => state.masterData);
  const { isEditing } = useSelector((state: RootState) => state.viewDailyPlan);

  const [invalidFields, setInvalidFields] = useState<{
    [key: string]: boolean;
  }>({});
  // const validateInput = (columnId: string, value: string): boolean => {
  //   // const numericFields = [
  //   //   "station_no",
  //   //   "ratio",
  //   //   "uv_led_intensity",
  //   //   "volume",
  //   //   "lf_value",
  //   // ];
  //   const laminationFields = ["code", "brand"];
  //   const printingFields = ["color_pantone"];

  //   if (value === "") return true;

  //   if (numericFields.includes(columnId)) {
  //     // Allow any digits (including leading zeros) with optional decimal part
  //     const isValidDecimal = /^\d+(\.\d+)?$/.test(value);
  //     const isValidPercentage = /^\d+(\.\d+)?%$/.test(value);

  //     return isValidDecimal || isValidPercentage;
  //   }

  //   if (id === "lamination" && laminationFields.includes(columnId)) {
  //     return /^[a-zA-Z0-9\s]*$/.test(value);
  //   }

  //   if (id === "printing" && printingFields.includes(columnId)) {
  //     return /^[\x20-\x7E]*$/.test(value);
  //   }

  //   return true;
  // };

  const handleChange = <K extends keyof T>(
    rowIndex: number,
    columnId: K,
    value: T[K] | string
  ) => {
    const updated = [...data];
    const numberKeys = [
      "station_no",
      "ratio",
      "uv_led_intensity",
      "volume",
      "lf_value",
    ];

    let updatedValue: any = value;

    if (numberKeys.includes(columnId as string)) {
      const stringValue = String(value);

      const isValidDecimal = /^\d+(\.\d+)?$/.test(stringValue);
      const isValidPercentage = /^\d+(\.\d+)?%$/.test(stringValue);

      if (stringValue === "") {
        updatedValue = "";
      } else if (isValidDecimal) {
        updatedValue = Number(stringValue);
      } else if (isValidPercentage) {
        updatedValue = stringValue;
      } else {
        updatedValue = stringValue;
      }
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
      if (setFormData) {
        setFormData((prev) => ({
          ...prev,
          stationWiseMetrics: updated as unknown as PrintingTableRow[],
        }));
      }
    }

    if (id === "lamination") {
      dispatch(
        setLaminationFormData({
          ...laminaionFormData,
          bondingMaterials: updated as unknown as LaminatingTableRow[],
        })
      );
      if (setFormDataLaminaton) {
        setFormDataLaminaton((prev) => ({
          ...prev,
          bondingMaterials: updated as unknown as LaminatingTableRow[],
        }));
      }
    }
  };

  useEffect(() => {
    if (invalidFieldsTable) {
      setInvalidFields(invalidFieldsTable);
    }
  }, [invalidFieldsTable]);

  const hardenerCodeOptions = ["KN75"];
  // const laminationFields = ["ratio", "code", "brand"];
  // const printingFields = [
  //   "lf_value",
  //   "lpcm",
  //   "station_no",
  //   "mptl_code",
  //   "mixing_on_gec",
  //   "uv_led_intensity",
  //   "volume",
  //   "color_pantone",
  // ];


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
                  {column.required && (
                    <Box component="span" sx={{ color: "#D32F2F", ml: 0.5 }}>
                      *
                    </Box>
                  )}
                  {column.edit && column.editIcon && (
                    <Box component="span" sx={{ color: "#00000066", ml: 0.5 }}>
                      <Edit sx={{ width: "24px", height: "16px" }} />
                    </Box>
                  )}
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
              data
                .filter((row) => row && typeof row === "object")
                .map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns?.map((column, index) => (
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
                        {(location.pathname.includes("/viewMasterData") &&
                          row?.type === "Ethyl" &&
                          ["ratio"].includes(column.id)) ||
                        (!location.pathname.includes("/viewMasterData") &&
                          row?.type === "Ethyl" &&
                          ["code", "brand", "ratio"].includes(column.id)) ||
                        (row?.type === "Adhesive" &&
                          ["ratio"].includes(column.id)) ||
                        (row?.type === "Hardner" &&
                          ["ratio"].includes(column.id)) ? (
                          location.pathname.includes("/viewMasterData") ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                                color: "#2F2F2F",
                              }}
                            >
                              {row[column.id]}&nbsp;kg
                            </Box>
                          ) : (
                            <Box sx={{ position: "relative", width: "80%" }}>
                              {/* TextField input */}
                              <TextField
                                variant="standard"
                                value={row[column.id]}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // const isValid = validateInput(
                                  //   column.id,
                                  //   inputValue
                                  // );
                                  // const key = `${rowIndex}_${column.id}`;
                                  // const updatedInvalidFields = {
                                  //   ...invalidFields,
                                  //   [key]: !isValid,
                                  // };
                                  // setInvalidFields(updatedInvalidFields);
                                  // dispatch(
                                  //   setInvalidFieldsTable(updatedInvalidFields)
                                  // );

                                  // const isLaminationField =
                                  //   laminationFields.some((field) =>
                                  //     column.id
                                  //       .toLowerCase()
                                  //       .includes(field.toLowerCase())
                                  //   );
                                  // dispatch(
                                    // setLaminationTableValueVaidation(
                                    //   isLaminationField && !isValid
                                    //     ? true
                                    //     : false
                                    // )
                                  // );

                                  // const isPrintingField = printingFields.some(
                                  //   (field) =>
                                  //     column.id
                                  //       .toLowerCase()
                                  //       .includes(field.toLowerCase())
                                  // );
                                  // dispatch(
                                    // setPrintingTableValueVaidation(
                                    //   isPrintingField && !isValid ? true : false
                                    // )
                                  // );

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
                                      textAlign: "left",
                                      paddingRight: "30px",
                                    },
                                  },
                                }}
                                inputProps={{
                                  inputMode:
                                    column.id === "ratio" ? "numeric" : "text",
                                }}
                              />

                              {/* KG Unit Label */}
                              {column.id === "ratio" && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    right: "8px",
                                    pointerEvents: "none",
                                    color: "#666",
                                    fontSize: "14px",
                                  }}
                                >
                                  kg
                                </Box>
                              )}

                              {/* Edit Icon for Actuals Row in First Column */}
                            </Box>
                          )
                        ) : column.isDropdown &&
                          row.type === "Hardner" &&
                          column.id === "code" ? (
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
                            {hardenerCodeOptions.map((option) => (
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
                        ) : column.isDropdown ? (
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
                        ) : column.editSelect && !column.onNewOptionAdd ? (
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
                        ) : column.editSelect && column.onNewOptionAdd ? (
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
                            onNewOptionAdd={column.onNewOptionAdd}
                            field={column.field}
                          />
                        ) : column.edit &&
                          (!rowEditable || rowEditable(row, column.id)) ? (
                          <TextField
                            placeholder="Enter a value"
                            variant="standard"
                            value={row[column?.id] ? row[column?.id] : ""} // only the number
                            onChange={(e) => {
                              let inputValue = e.target.value;
                              // const isValid = validateInput(
                              //   column.id,
                              //   inputValue
                              // );
                              // const isLaminationField = laminationFields.some(
                              //   (field) =>
                              //     column.id
                              //       .toLowerCase()
                              //       .includes(field.toLowerCase())
                              // );

                              // if (isLaminationField && !isValid) {
                              //   dispatch(
                              //     setLaminationTableValueVaidation(true)
                              //   );
                              // } else if (isLaminationField && isValid) {
                              //   dispatch(
                              //     setLaminationTableValueVaidation(false)
                              //   );
                              // }
                              // const isPrintingField = printingFields.some(
                              //   (field) =>
                              //     column.id
                              //       .toLowerCase()
                              //       .includes(field.toLowerCase())
                              // );

                              // if (isPrintingField && !isValid) {
                              //   dispatch(setPrintingTableValueVaidation(true));
                              // } else if (isPrintingField && isValid) {
                              //   dispatch(setPrintingTableValueVaidation(false));
                              // }

                              // const key = `${rowIndex}_${column.id}`;
                              // const updatedInvalidFileds = {
                              //   ...invalidFields,
                              //   [key]: !isValid,
                              // };
                              // setInvalidFields(updatedInvalidFileds);
                              // dispatch(
                              //   setInvalidFieldsTable(updatedInvalidFileds)
                              // );

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
                                // background: isEditing ? "" : ""
                              },
                            }}
                          />
                        ) : (
                          <Tooltip
                            title={String(row ? row[column?.id] : "")}
                            arrow
                          >
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
                              {row ? (
                                <>
                                  {row[column?.id]}
                                  {((row.type === "Hardner" &&
                                    !location.pathname.includes(
                                      "/viewMasterData"
                                    )) ||
                                    row.type === "Adhesive") &&
                                    !location.pathname.includes(
                                      "/viewMasterData"
                                    ) && (
                                      <Box
                                        component="span"
                                        sx={{ color: "#D32F2F", ml: 0.3 }}
                                      >
                                        *
                                      </Box>
                                    )}
                                  {row.rowEditIcon && isEditing && (
                                    <Box
                                      component="span"
                                      sx={{ color: "#00000066", ml: 0.5 }}
                                    >
                                      <Edit
                                        sx={{ width: "24px", height: "16px" }}
                                      />
                                    </Box>
                                  )}
                                </>
                              ) : (
                                "N/A"
                              )}
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
