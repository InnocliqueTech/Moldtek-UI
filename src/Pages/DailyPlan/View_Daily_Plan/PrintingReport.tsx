/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box , Typography} from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { useGetPrintingReportDetailsMutation } from "../../../store/apis/dailyPlanApis";
import {
  transformTensionData,
  transformPrintingProcessDataList,
  transformInkCoatingData,
  revertPrintingProcessData,
} from "./tableTransfermationFunctions";
import Loader from "../../../Loader";
import { useDispatch, useSelector } from "react-redux";
import { setDailyPlanCancel, setDailyPlanSave, setUpdateDailyPlanPayload } from "../../../store/slices/viewDailyPlanSlice";
import { PrintingReportResponse, } from "../../../store/Interfaces/createDailyPlanTypes";
import { InfoItem } from "../../../Components/ReUsable/InfoContainer";
import { ProcessReportItem } from "../../../store/Interfaces/createDailyPlanTypes";
import { RootState } from "../../../store";


interface PrintingReportsProps {
  indentNO: string;
  isEditing: boolean;
  onDataChange: () => void;
}

const PrintingReport: React.FC<PrintingReportsProps> = ({ indentNO, isEditing, onDataChange }) => {
  const dispatch = useDispatch();
  const [getPrintingReportDetails,{ data: printingReportsData, isLoading, isError, }] = useGetPrintingReportDetailsMutation();

  useEffect(()=>{
getPrintingReportDetails({indentNumber:indentNO,
    rollNumber:3})
  },[indentNO])

  const [editableData, setEditableData] = useState<PrintingReportResponse["data"] | null>(null);
  const [infoItems, setInfoItems] = useState<InfoItem[]>([]);
  const {dailyPlanCancel,dailyPlanSave} = useSelector((state:RootState)=>state.viewDailyPlan)

      const usage = printingReportsData?.data && printingReportsData.data.materialUsageShiftDetails;
const info: InfoItem[] = [
  { label: "Plain Film Weight/Repeat", value: usage?.plainFilmWeightPerRepeat?.toString() ?? "", editable: true, keyName: "plainFilmWeightPerRepeat" },
  { label: "Printed Film Weight/Repeat", value: usage?.printedFilmWeightPerRepeat?.toString() ?? "", editable: true, keyName: "printedFilmWeightPerRepeat" },
  { label: "Ink Weight/Repeat", value: usage?.inkWeightPerRepeat?.toString() ?? "", editable: true, keyName: "inkWeightPerRepeat" },
  { label: "Machine Name", value: usage?.printingMCName ?? "", editable: true, keyName: "printingMCName" },
  { label: "Left Over Roll (m)", value: usage?.leftOverRollMeters?.toString() ?? "", editable: true, keyName: "leftOverRollMeters" },
  { label: "Left Over Roll (kg)", value: usage?.leftOverRollKgs?.toString() ?? "", editable: true, keyName: "leftOverRollKgs" },
  { label: "Operator", value: usage?.operator ?? "", editable: true, keyName: "operator" },
  { label: "Shift QC", value: usage?.shiftQc ?? "", editable: true, keyName: "shiftQc" },
  { label: "Supervisor", value: usage?.supervisor ?? "", editable: true, keyName: "supervisor" },
  { label: "Remarks", value: usage?.remarks ?? "", editable: true, keyName: "remarks" },
];


  useEffect(() => {
    if (printingReportsData?.data) {
      setEditableData(printingReportsData.data);
      setInfoItems(info);
    }
  }, [printingReportsData]);

  useEffect(()=>{
  dispatch(setDailyPlanSave(false));
  dispatch(setDailyPlanCancel(false))
  },[])

useEffect(() => {
  if (dailyPlanCancel && !dailyPlanSave) {

    if (printingReportsData?.data) {
      setEditableData(structuredClone(printingReportsData.data));
      setInfoItems(info);
    }

    // 🔁 Reset flags after handling cancel
    dispatch(setDailyPlanCancel(false));
    dispatch(setDailyPlanSave(false));
  }
}, [dailyPlanCancel, dailyPlanSave]);

const handleDataUpdate = (section: keyof PrintingReportResponse["data"], newData: any[]) => {
  if (!editableData) return;

  const updated = { ...editableData };

  switch (section) {
    case "printingProcessReport":
          updated[section] = revertPrintingProcessData(newData) as ProcessReportItem[];
      break;
    case "printingRunMetrics":
      updated[section] = revertPrintingProcessData(newData) as ProcessReportItem[];
      break;

    case "inkCoatingSpecifications":
      updated[section] = [...newData];
      break;

    case "tensionControl": {
      const actualsRow = newData.find((row: any) => row.label === "Actuals");
      if (actualsRow) {
        updated.tensionControl = {
          ...updated.tensionControl,
          actuals: {
            unwinder: actualsRow.unwinder ? Number(actualsRow.unwinder) : null,
            infeed: actualsRow.infeed ? Number(actualsRow.infeed) : null,
            outfeed: actualsRow.outfeed ? Number(actualsRow.outfeed) : null,
            rewinder: actualsRow.rewinder ? Number(actualsRow.rewinder) : null,
          },
        };
      }
      break;
    }

    case "printRepeatLabellingDetails":
    case "materialSpecifications":
    case "foilRollConsumptionDetails":
      updated[section] = newData[0];
      break;

    default:
      return;
  }

  setEditableData(updated);
  dispatch(setUpdateDailyPlanPayload({ ...updated }));
  onDataChange();
};

  const handleInfoUpdate = (updatedItems: InfoItem[]) => {
    if (!editableData) return;

    const updated = { ...editableData };
    const shiftDetails = { ...updated.materialUsageShiftDetails };

    updatedItems.forEach((item) => {
      if (item.keyName && item.value !== undefined) {
        (shiftDetails as any)[item.keyName] = isNaN(Number(item.value)) ? item.value : Number(item.value);
      }
    });

    updated.materialUsageShiftDetails = shiftDetails;
    setEditableData(updated);
    setInfoItems(updatedItems);

    dispatch(setUpdateDailyPlanPayload({ ...updated }));
    onDataChange();
  };

  if (isLoading || !editableData) return <Loader />;

 if (isError) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error" gutterBottom>
          Failed to load Make Ready data
        </Typography>
        <Typography variant="body1" color="text.secondary">
          An unexpected error occurred. Please try again later
        </Typography>
      </Box>
    );
  }

  const { columns: inkColumns, rows: inkRows } = transformInkCoatingData(editableData.inkCoatingSpecifications);
  const { columns: tensionColumns, rows: tensionRows } = transformTensionData(editableData.tensionControl);
  const printRepeatData = [editableData?.printRepeatLabellingDetails];
  const materialSpecsData = [editableData?.materialSpecifications];
  const foilConsumptionData = [editableData.foilRollConsumptionDetails];
  const printingProcessData = transformPrintingProcessDataList(editableData.printingProcessReport);
  const printingRunMetricsRows = transformPrintingProcessDataList(editableData.printingRunMetrics);

  const rollKeys: string[] = [];
  const seen: Record<string, boolean> = {};
  
  printingRunMetricsRows.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key.startsWith("Roll-") && !seen[key]) {
        seen[key] = true;
        rollKeys.push(key);
      }
    });
  });
  

  const baseColumns = [
    { id: "particular", label: "Particular", edit: false },
    { id: "target", label: "Target", edit: isEditing },
  ];
  const rollColumns = rollKeys.map((roll) => ({
    id: roll,
    label: roll.replace("-", " "),
     edit: isEditing,
     editIcon:true
  }));

  const rollKeysMetrics: string[] = [];
  const seenMetrics: Record<string, boolean> = {};
  
  printingRunMetricsRows.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key.startsWith("Roll-") && !seenMetrics[key]) {
        seenMetrics[key] = true;
        rollKeysMetrics.push(key);
      }
    });
  });
  

  const baseColumnsMetrics = [
    { id: "particular", label: "", edit: false },
  ];
  const rollColumnsMetrics = rollKeysMetrics.map((roll) => ({
    id: roll,
    label: roll.replace("-", " "),
     edit: isEditing,
     editIcon:true
  }));




  return (
    <>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Ink & Coating Specifications"
          columns={inkColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={inkRows}
          setData={(data: any) =>
            handleDataUpdate("inkCoatingSpecifications", data)
          }
          firstRow
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Tension Control"
          columns={tensionColumns.map((col) => ({
            ...col,
            edit: isEditing && col.id !== "label",
          }))}
          rowEditable={(row) => row.label === "Actuals"}
          data={tensionRows.map((row) =>
    row.label === "Actuals" ? { ...row, rowEditIcon: true } : row
  )}
          setData={(data: any) => handleDataUpdate("tensionControl", data)}
          firstRow
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Print Repeat & Labelling Details"
          columns={[
            { id: "repeatInMM", label: "Repeat in MM" },
            { id: "ups", label: "UPS" },
            { id: "jarCap", label: "JAR/CAP"},
            { id: "labelsPerMtrs", label: "Labels Per Mtrs" },
          ]}
          data={printRepeatData}
          setData={(data: any) =>
            handleDataUpdate("printRepeatLabellingDetails", data)
          }
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Material Specifications"
          columns={[
            { id: "widthMm", label: "Width mm" },
            { id: "thicknessMicrons", label: "Thickness Microns" },
            { id: "gsm", label: "GSM", edit: isEditing, editIcon:true },
            { id: "dyne", label: "DYNE" },
            { id: "staticCharge", label: "Static Charge", edit: isEditing,editIcon:true },
            {
              id: "formatCorrection",
              label: "Format Correction",
              edit: isEditing,
              editIcon:true
            },
          ]}
          data={materialSpecsData ?materialSpecsData:[]}
          setData={(data: any) =>
            handleDataUpdate("materialSpecifications", data)
          }
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Foil Roll Consumption Details"
          columns={[
            { id: "foilInputRoll", label: "Foil Input Roll", edit: isEditing ,editIcon:true},
            {
              id: "foilReturnRoll",
              label: "Foil Return Roll",
              edit: isEditing,
              editIcon:true
            },
            { id: "consumption", label: "Consumption", edit: isEditing,editIcon:true },
            { id: "foilWidth", label: "Foil Width", edit: isEditing,editIcon:true },
          ]}
          data={foilConsumptionData}
          setData={(data: any) =>
            handleDataUpdate("foilRollConsumptionDetails", data)
          }
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Printing Process Report"
          columns={[...baseColumns, ...rollColumns]}
          data={printingProcessData.map((row) =>
    row.particular === "Input Plain Film For Printing Mtrs" ||row.particular === "Input Film For Printing Kgs" ? { ...row, rowEditIcon: true } : row
  )}
          setData={(data: any) =>
            handleDataUpdate("printingProcessReport", data)
          }
          rowEditable={(row, column) => {
            return (
              row.particular === "Input Plain Film For Printing Mtrs" ||
              row.particular === "Input Film For Printing Kgs" ||
              column.includes("Roll")
            );
          }}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
       <TitledDataTable
  title="Printing Run Metrics"
          columns={[...baseColumnsMetrics, ...rollColumnsMetrics]}
  data={printingRunMetricsRows}
  setData={(data: any) => handleDataUpdate("printingRunMetrics", data)}
/>
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Material Usage and Shift Details"
          showInfoSection
          showTableSection={false}
          infoItems={infoItems}
          setInfoItems={handleInfoUpdate}
          isEditing={isEditing}
        />
      </Box>
    </>
  );
};

export default PrintingReport;
