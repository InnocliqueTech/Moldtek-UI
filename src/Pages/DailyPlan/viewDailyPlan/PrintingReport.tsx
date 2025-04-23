import React, { useEffect, useState } from "react";
import { Box , Typography} from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { useGetPrintingReportDetailsQuery } from "../../../store/services/api";
import {
  transformTensionData,
  transformPrintingProcessDataList,
  transformInkCoatingData,
  revertPrintingProcessData,
} from "./tableTransfermationFunctions";
import Loader from "../../../Loader";
import { useDispatch } from "react-redux";
import { setUpdateDailyPlanPayload } from "../../../store/slices/viewDailyPlanSlice";
import { PrintingReportResponse, } from "../../../store/Interfaces/createDailyPlanTypes";
import { InfoItem } from "../../../Components/ReUsable/InfoContainer";
import { ProcessReportItem } from "../../../store/Interfaces/createDailyPlanTypes";


interface PrintingReportsProps {
  indentNO: string;
  isEditing: boolean;
  onDataChange: () => void;
}

const PrintingReport: React.FC<PrintingReportsProps> = ({ indentNO, isEditing, onDataChange }) => {
  const dispatch = useDispatch();
  const { data: printingReportsData, isLoading, isError, } = useGetPrintingReportDetailsQuery(indentNO);

  const [editableData, setEditableData] = useState<PrintingReportResponse["data"] | null>(null);
  const [infoItems, setInfoItems] = useState<InfoItem[]>([]);

  useEffect(() => {
    if (printingReportsData?.data) {
      setEditableData(printingReportsData.data);
      const usage = printingReportsData.data.materialUsageShiftDetails;
      const info: InfoItem[] = [
        { label: "Plain Film Weight/Repeat", value: usage?.plainFilmWeightPerRepeat?.toString(), editable: true, keyName: "plainFilmWeightPerRepeat" },
        { label: "Printed Film Weight/Repeat", value: usage?.printedFilmWeightPerRepeat?.toString(), editable: true, keyName: "printedFilmWeightPerRepeat" },
        { label: "Ink Weight/Repeat", value: usage?.inkWeightPerRepeat?.toString(), editable: true, keyName: "inkWeightPerRepeat" },
        { label: "Machine Name", value: usage?.printingMCName, editable: true, keyName: "printingMCName" },
        { label: "Left Over Roll (m)", value: usage?.leftOverRollMeters?.toString() || "", editable: true, keyName: "leftOverRollMeters" },
        { label: "Left Over Roll (kg)", value: usage?.leftOverRollKgs, editable: true, keyName: "leftOverRollKgs" },
        { label: "Operator", value: usage?.operator, editable: true, keyName: "operator" },
        { label: "Shift QC", value: usage?.shiftQc, editable: true, keyName: "shiftQc" },
        { label: "Supervisor", value: usage?.supervisor, editable: true, keyName: "supervisor" },
        { label: "Remarks", value: usage?.remarks, editable: true, keyName: "remarks" },
      ];
      setInfoItems(info);
    }
  }, [printingReportsData]);

  const handleDataUpdate = (section: keyof PrintingReportResponse["data"], newData: any[]) => {
    if (!editableData) return;

    const updated = { ...editableData };

    switch (section) {
      case "printingProcessReport":
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
    console.log(updated,"inside dataUpdate");
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
  const printRepeatData = [editableData.printRepeatLabellingDetails];
  const materialSpecsData = [editableData.materialSpecifications];
  const foilConsumptionData = [editableData.foilRollConsumptionDetails];
  const printingProcessData = transformPrintingProcessDataList(editableData.printingProcessReport);
  const printingRunMetricsRows = transformPrintingProcessDataList(editableData.printingRunMetrics);
  return (
    <>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Ink & Coating Specifications"
          columns={inkColumns.map(col => ({ ...col, edit: isEditing && col.edit }))}
          data={inkRows}
          setData={(data:any) => handleDataUpdate("inkCoatingSpecifications", data)}
          firstRow
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Tension Control"
          columns={tensionColumns.map(col => ({
            ...col,
            edit: isEditing && col.id !== "label",
          }))}
          rowEditable={(row) => row.label === "Actuals"}
          data={tensionRows}
          setData={(data:any) => handleDataUpdate("tensionControl", data)}
          firstRow
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Print Repeat & Labelling Details"
          columns={[
            { id: "repeatInMM", label: "Repeat in MM", edit: isEditing },
            { id: "ups", label: "UPS", edit: isEditing },
            { id: "jarCap", label: "JAR/CAP", edit: isEditing },
            { id: "labelsPerMtrs", label: "Labels Per Mtrs", edit: isEditing },
          ]}
          data={printRepeatData}
          setData={(data:any) => handleDataUpdate("printRepeatLabellingDetails", data)}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Material Specifications"
          columns={[
            { id: "widthMm", label: "Width mm" },
            { id: "thicknessMicrons", label: "Thickness Microns" },
            { id: "gsm", label: "GSM", edit: isEditing },
            { id: "dyne", label: "DYNE" },
            { id: "staticCharge", label: "Static Charge", edit: isEditing },
            { id: "formatCorrection", label: "Format Correction", edit: isEditing },
          ]}
          data={materialSpecsData}
          setData={(data:any) => handleDataUpdate("materialSpecifications", data)}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Foil Roll Consumption Details"
          columns={[
            { id: "foilInputRoll", label: "Foil Input Roll", edit: isEditing },
            { id: "foilReturnRoll", label: "Foil Return Roll", edit: isEditing },
            { id: "consumption", label: "Consumption", edit: isEditing },
            { id: "foilWidth", label: "Foil Width", edit: isEditing },
          ]}
          data={foilConsumptionData}
          setData={(data:any) => handleDataUpdate("foilRollConsumptionDetails", data)}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Printing Process Report"
          columns={[
            { id: "particular", label: "Particular", edit: false },
            { id: "target", label: "Target", edit: isEditing },
            { id: "roll1", label: "Roll-1", edit: isEditing },
            { id: "roll2", label: "Roll-2", edit: isEditing },
          ]}
          data={printingProcessData}
          setData={(data:any) => handleDataUpdate("printingProcessReport", data)}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Printing Run Metrics"
          columns={[
            { id: "particular", label: "", edit: false },
            { id: "target", label: "Target", edit: false },
            { id: "roll1", label: "Roll-1", edit: isEditing },
            { id: "roll2", label: "Roll-2", edit: isEditing },
          ]}
          data={printingRunMetricsRows}
          setData={(data:any) => handleDataUpdate("printingRunMetrics", data)}
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
