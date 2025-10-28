/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { materialColumns } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import Loader from "../../../Loader";
import { InfoItem } from "../../../Components/ReUsable/InfoContainer";
import {
  setDailyPlanCancel,
  setDailyPlanSave,
  setUpdateDailyPlanPayload,
} from "../../../store/slices/viewDailyPlanSlice";
import { InkCoatingSpecification } from "../../../store/slices/viewDailyPlanSlice";
import { useParams } from "react-router-dom";

const inkCoatingColumns = [
  { id: "stationNo", label: "Station No" },
  { id: "colorPantone", label: "Colour Pantone Code" },
  { id: "mixingOnGec", label: "Mixing on GEC" },
  { id: "mtplCode", label: "MTPL Code" },
  { id: "lfValue", label: "LF Value" },
  { id: "supplierBatchNo", label: "Supplier Batch No", edit: true,editIcon:true },
];

const generateAnaloxColumns = (specs: any[]) => {
  const maxStation = Math.max(...specs.map((s) => s.stationNo || 0));
  return [
    { id: "parameter", label: "Parameter" },
    ...Array.from({ length: maxStation }, (_, i) => ({
      id: `station${i + 1}`,
      label: `Station ${i + 1}`,
    })),
  ];
};

const transformAnaloxData = (specs: any[]) => {
  const parameterLabels: Record<string, string> = {
    lpcm: "LPCM",
    vol: "Volume",
    stationSpec: "Mounting Tape",
  };

  const parameters = ["lpcm", "vol", "stationSpec"];

  return parameters.map((param) => {
    const row: Record<string, string | number> = {
      parameter: parameterLabels[param] || param,
    };
    specs.forEach((station) => {
      row[`station${station.stationNo}`] = station[param];
    });
    return row;
  });
};

interface MakeReadyProps {
  loading: boolean;
  error: boolean;
  isEditing: boolean;
  onDataChange: () => void;
}

const MakeReady: React.FC<MakeReadyProps> = ({
  loading = false,
  error = false,
  isEditing,
  onDataChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    inkCoatingSpecifications,
    materialSpecification,
    mountingTapeSpecifications,
    plateMountingSupervisorReport,
    analoxSpecifications = [],
    dailyPlanCancel,
    dailyPlanSave,
  } = useSelector((state: RootState) => state.viewDailyPlan);

  const [editableMaterialSpec, setEditableMaterialSpec] = useState(
    materialSpecification || {}
  );
  const [plateReportItems, setPlateReportItems] = useState<InfoItem[]>([]);
  const [
    editableInkCoatingSpecifications,
    setEditableInkCoatingSpecifications,
  ] = useState(inkCoatingSpecifications || []);
  const { indentNo } = useParams();
  const decodedIndentNo = decodeURIComponent(indentNo || "");

  useEffect(() => {
    dispatch(setDailyPlanSave(false));
    dispatch(setDailyPlanCancel(false));
  }, []);

  const report: InfoItem[] = [
    {
      label: "Plates Inspection",
      value: plateMountingSupervisorReport?.platesInspection ?? "",
      editable: true,
      keyName: "platesInspection",
    },
    {
      label: "Mounter",
      value: plateMountingSupervisorReport?.mounter,
      editable: true,
      keyName: "mounter",
    },
    {
      label: "Approver",
      value: plateMountingSupervisorReport?.approver,
      editable: true,
      keyName: "approver",
    },
    {
      label: "Ink Kitchen Supervisor",
      value: plateMountingSupervisorReport?.inkKitchenSupervisor,
      editable: true,
      keyName: "inkKitchenSupervisor",
    },
    {
      label: "Plate Mounting Supervisor Report",
      value: plateMountingSupervisorReport?.plateMountingSupervisor,
      editable: true,
      keyName: "plateMountingSupervisor",
    },
    {
      label: "Shift QC Incharge",
      value: plateMountingSupervisorReport?.shiftQcIncharge,
      editable: true,
      keyName: "shiftQcIncharge",
    },
  ];
  useEffect(() => {
    if (dailyPlanCancel && !dailyPlanSave) {

      if (
        materialSpecification ||
        inkCoatingSpecifications ||
        plateMountingSupervisorReport
      ) {
        setEditableMaterialSpec(structuredClone(materialSpecification));
        setEditableInkCoatingSpecifications(
          structuredClone(inkCoatingSpecifications)
        );

        setPlateReportItems(report);
      }

      // 🔁 Reset flags after handling cancel
      dispatch(setDailyPlanCancel(false));
      dispatch(setDailyPlanSave(false));
    }
  }, [dailyPlanCancel, dailyPlanSave]);

  useEffect(() => {
    if (inkCoatingSpecifications && inkCoatingSpecifications.length > 0) {
      setEditableInkCoatingSpecifications(inkCoatingSpecifications);
    }

    if (materialSpecification) {
      setEditableMaterialSpec(materialSpecification);
    }

    if (plateMountingSupervisorReport) {
      setPlateReportItems(report);
    }
  }, [
    inkCoatingSpecifications,
    materialSpecification,
    plateMountingSupervisorReport,
    decodedIndentNo,
  ]);

  // const handleShiftReportUpdate = (items: InfoItem[]) => {
  //   setPlateReportItems(items);
  //   const updatedReport: any = {};
  //   items.forEach((item) => {
  //     updatedReport[item.keyName!] = item.value;
  //   });
  //   dispatch(setUpdateDailyPlanPayload({
  //   plateMountingSupervisorReport: updatedReport,
  //   materialSpecification: editableMaterialSpec,
  //   inkCoatingSpecifications,
  //   analoxSpecifications,
  //   mountingTapeSpecifications,
  //   // Optionally include other sections (inkCoatingSpecifications etc.)
  // }));
  //   onDataChange();
  // };

  // const handleMaterialSpecChange = (newData: any[]) => {
  //   if (newData.length > 0) {
  //     const updated = newData[0];
  //     setEditableMaterialSpec(updated);
  //     dispatch(setUpdateDailyPlanPayload({
  //       plateMountingSupervisorReport: Object.fromEntries(plateReportItems.map(item => [item.keyName!, item.value])),
  //       materialSpecification: updated,
  //       inkCoatingSpecifications,
  //       analoxSpecifications,
  //       mountingTapeSpecifications,
  //       // Add others here if you want a complete payload
  //     }));
  //     onDataChange();
  //   }
  // };

  // const handleInkCoatingChange = (newData: any[]) => {
  //   dispatch(setUpdateDailyPlanPayload({
  //     plateMountingSupervisorReport: Object.fromEntries(plateReportItems.map(item => [item.keyName!, item.value])),
  //     materialSpecification: editableMaterialSpec,
  //     inkCoatingSpecifications: newData,
  //     analoxSpecifications,
  //     mountingTapeSpecifications,
  //   }));
  //   onDataChange();
  // };

  const handleDataUpdate = (
    section:
      | "materialSpecification"
      | "plateMountingSupervisorReport"
      | "inkCoatingSpecifications",
    newData: any[] | InfoItem[]
  ) => {
    let updatedPayload: any = {
      analoxSpecifications,
      mountingTapeSpecifications,
    };

    switch (section) {
      case "materialSpecification":
        setEditableMaterialSpec(newData[0]);
        updatedPayload.materialSpecification = newData[0];
        updatedPayload.plateMountingSupervisorReport = Object.fromEntries(
          plateReportItems.map((item) => [item.keyName!, item.value])
        );
        updatedPayload.inkCoatingSpecifications = inkCoatingSpecifications;
        break;

      case "plateMountingSupervisorReport":
        const updatedReport: any = {};
        (newData as InfoItem[]).forEach((item) => {
          updatedReport[item.keyName!] = item.value;
        });
        setPlateReportItems(newData as InfoItem[]);
        updatedPayload.plateMountingSupervisorReport = updatedReport;
        updatedPayload.materialSpecification = editableMaterialSpec;
        updatedPayload.inkCoatingSpecifications = inkCoatingSpecifications;
        break;

      case "inkCoatingSpecifications":
        setEditableInkCoatingSpecifications(
          newData as InkCoatingSpecification[]
        );
        updatedPayload.inkCoatingSpecifications = newData;
        updatedPayload.materialSpecification = editableMaterialSpec;
        updatedPayload.plateMountingSupervisorReport = Object.fromEntries(
          plateReportItems.map((item) => [item.keyName!, item.value])
        );
        break;

      default:
        return;
    }

    dispatch(setUpdateDailyPlanPayload(updatedPayload));
    onDataChange();
  };

  const analoxCols = generateAnaloxColumns(analoxSpecifications);
  const analoxData = transformAnaloxData(analoxSpecifications);

  if (loading) return <Loader />;

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error" gutterBottom>
          Failed to load Make Ready data
        </Typography>
        <Typography variant="body1" color="text.secondary">
          An unexpected error occurred. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Ink & Coating Specifications"
          columns={inkCoatingColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
            editIcon: col.editIcon
          }))}
          data={editableInkCoatingSpecifications || []}
          setData={(newData: any[]) =>
            handleDataUpdate("inkCoatingSpecifications", newData)
          }
          firstRow
        />
      </Box>

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Analox Specifications"
          columns={analoxCols}
          data={analoxData}
          firstRow
        />
      </Box>

      {/* <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Mounting Tape Specifications"
          columns={tapeColumns}
          data={mountingTapeSpecifications || []}
          firstRow
        />
      </Box> */}

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Material Specifications"
          columns={materialColumns.map((col) => ({
            ...col,
            edit: isEditing && col.id === "gsm",
            editIcon:col.id==="gsm"?true:false
          }))}
          data={[editableMaterialSpec]}
          setData={(newData: any[]) =>
            handleDataUpdate("materialSpecification", newData)
          }
        />
      </Box>

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Shift Supervisor Report"
          showInfoSection
          showTableSection={false}
          infoItems={plateReportItems}
          setInfoItems={(updatedItems) =>
            handleDataUpdate("plateMountingSupervisorReport", updatedItems)
          }
          isEditing={isEditing}
        />
      </Box>
    </>
  );
};

export default MakeReady;
