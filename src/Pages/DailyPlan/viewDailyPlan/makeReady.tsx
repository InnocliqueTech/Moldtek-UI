import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { tapeColumns, materialColumns } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import Loader from "../../../Loader";
import { InfoItem } from "../../../Components/ReUsable/InfoContainer";
import { setUpdateDailyPlanPayload } from "../../../store/slices/viewDailyPlanSlice";

const inkCoatingColumns = [
  { id: "stationNo", label: "Station No" },
  { id: "colorPantone", label: "Colour Pantone Code" },
  { id: "mixingOnGec", label: "Mixing on GEC" },
  { id: "mtplCode", label: "MTPL Code" },
  { id: "lfValue", label: "LF Value" },
  { id: "supplierBatchNo", label: "Supplier Batch No" },
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
  const parameters = ["lpcm", "vol" , "stationSpec"];
  return parameters.map((param) => {
    const row: Record<string, string | number> = { parameter: param };
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
  } = useSelector((state: RootState) => state.viewDailyPlan);

  const [editableMaterialSpec, setEditableMaterialSpec] = useState(materialSpecification || {});
  const [plateReportItems, setPlateReportItems] = useState<InfoItem[]>([]);

  useEffect(() => {
    if (plateMountingSupervisorReport) {
      const report: InfoItem[] = [
        {
          label: "Plates Inspection",
          value: plateMountingSupervisorReport.platesInspection ?? "",
          editable: true,
          keyName: "platesInspection",
        },
        {
          label: "Mounter",
          value: plateMountingSupervisorReport.mounter,
          editable: true,
          keyName: "mounter",
        },
        {
          label: "Approver",
          value: plateMountingSupervisorReport.approver,
          editable: true,
          keyName: "approver",
        },
        {
          label: "Ink Kitchen Supervisor",
          value: plateMountingSupervisorReport.inkKitchenSupervisor,
          editable: true,
          keyName: "inkKitchenSupervisor",
        },
        {
          label: "Plate Mounting Supervisor Report",
          value: plateMountingSupervisorReport.plateMountingSupervisor,
          editable: true,
          keyName: "plateMountingSupervisor",
        },
        {
          label: "Shift QC Incharge",
          value: plateMountingSupervisorReport.shiftQcIncharge,
          editable: true,
          keyName: "shiftQcIncharge",
        },
      ];
      setPlateReportItems(report);
    }
  }, [plateMountingSupervisorReport]);

  const handleShiftReportUpdate = (items: InfoItem[]) => {
    setPlateReportItems(items);
    const updatedReport: any = {};
    items.forEach((item) => {
      updatedReport[item.keyName!] = item.value;
    });
    dispatch(setUpdateDailyPlanPayload({
    plateMountingSupervisorReport: updatedReport,
    materialSpecification: editableMaterialSpec,
    inkCoatingSpecifications,
    analoxSpecifications,
    mountingTapeSpecifications,
    // Optionally include other sections (inkCoatingSpecifications etc.)
  }));
    onDataChange();
  };

  const handleMaterialSpecChange = (newData: any[]) => {
    if (newData.length > 0) {
      const updated = newData[0];
      setEditableMaterialSpec(updated);
      dispatch(setUpdateDailyPlanPayload({
        plateMountingSupervisorReport: Object.fromEntries(plateReportItems.map(item => [item.keyName!, item.value])),
        materialSpecification: updated,
        inkCoatingSpecifications,
        analoxSpecifications,
        mountingTapeSpecifications,
        // Add others here if you want a complete payload
      }));
      onDataChange();
    }
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
          columns={inkCoatingColumns}
          data={inkCoatingSpecifications || []}
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
            edit: isEditing && col.id === "gsm", // ✅ Only GSM editable
          }))}
          data={[editableMaterialSpec]}
          setData={handleMaterialSpecChange}
        />
      </Box>

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Shift Supervisor Report"
          showInfoSection={true}
          showTableSection={false}
          infoItems={plateReportItems}
          setInfoItems={handleShiftReportUpdate}
          isEditing={isEditing}
        />
      </Box>
    </>
  );
};

export default MakeReady;
