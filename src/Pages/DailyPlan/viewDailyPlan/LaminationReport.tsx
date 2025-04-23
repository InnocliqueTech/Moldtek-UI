import { Box, Typography } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { useGetLaminationReportDetailsQuery } from "../../../store/services/api";
import {
  transformZoneTempData,
  transformUnwindRewindData,
  transformLaminationFilmData,
} from "./tableTransfermationFunctions";
import { LaminationReportResponse } from "../../../store/Interfaces/createDailyPlanTypes";
import { useEffect, useState } from "react";
import { setUpdateDailyPlanPayload } from "../../../store/slices/viewDailyPlanSlice";
import { useDispatch } from "react-redux";
import Loader from "../../../Loader";
import { InfoItem } from "../../../Components/ReUsable/InfoContainer";

const zoneTempPressingColumns = [
  { id: "particular", label: "" },
  { id: "zone1", label: "Zone - 1 Temp" },
  { id: "zone2", label: "Zone - 2 Temp" },
  { id: "nipPressure", label: "NIP Pressure" },
  { id: "speed", label: "Speed Mtr/min" },
];

const unwindRewindColumns = [
  { id: "particular", label: "" },
  { id: "priLaminated", label: "Pri.Laminated (Printed Film)" },
  { id: "secUnwinder", label: "Sec.Unwinder (Plain Film)" },
  { id: "lamiSet", label: "Lami-Set" },
  { id: "rewinder", label: "Re-Winder" },
];

const laminationFilmColumns = [
  { id: "spec", label: "" },
  { id: "priLaminated", label: "Pri.Laminated (Printed Film)" },
  { id: "secUnwinder", label: "Sec.Unwinder (Plain Film)" },
];

const repeatColumns = [
  { id: "label", label: "" },
  { id: "printedFilmRepeat", label: "Printed Film", edit: true },
  { id: "afterLaminationRepeat", label: "After Lamination", edit: true },
];

const bondingMaterialColumns = [
  { id: "bondingMaterial", label: "Bonding Material" },
  { id: "code", label: "Code" },
  { id: "brand", label: "Brand" },
  { id: "mixingRatio", label: "Mixing Ratio" },
  { id: "actual", label: "Actual", edit: true },
];

const viscosityWeightColumns = [
  // { id: 'metric', label: '' },
  { id: "viscosityRange", label: "Viscosity Range" },
  { id: "actualViscosity", label: "Actual", edit: true },
  { id: "gsmRange", label: "GSM Range", edit: true },
  { id: "gsmRangeActual", label: "Actual", edit: true },
  { id: "mixingComposition", label: "Mixing Composition", edit: true },
  { id: "actualComposition", label: "Actual", edit: true },
  { id: "rubberRollerWidth", label: "Rubber Roller Width", edit: true },
  // { id: "compositeGsm", label: "Composite gsm ",edit:true },
];

const laminationProcessColumns = [
  { id: "particular", label: "" },
  { id: "target", label: "Target", edit: true },
  { id: "actual", label: "Actual", edit: true },
];

const qcCheckColumns = [
  { id: "type", label: "Type" },
  { id: "repeat", label: "Repeat", edit: true },
  { id: "curling", label: "Curling", edit: true },
  { id: "bondStrength", label: "Bond Strength", edit: true },
  { id: "others", label: "Others", edit: true },
];

const plainFilmLeftColumns = [
  { id: "meters", label: "Meters" },
  { id: "kgs", label: "Kgs." },
];

const plainFilmLeftData = [{ meters: "12", kgs: "--" }];

interface LaminationReportProps {
  indentNumber: string;
  isEditing?: boolean;
  onDataChange: () => void;
}

const LaminationReport: React.FC<LaminationReportProps> = ({
  indentNumber,
  isEditing,
  onDataChange,
}) => {
  const { data, isLoading, isError, error } =
    useGetLaminationReportDetailsQuery(indentNumber);

  const [editableData, setEditableData] = useState<
    LaminationReportResponse["data"] | null
  >(null);
  const [infoItems, setInfoItems] = useState<any>([]);
  useEffect(() => {
    if (data?.data) {
      setEditableData(data?.data);
      const usage = data.data.plainFilmLeftOverRoll;
      const info: InfoItem[] = [
        {
          label: "Plain Film LeftOverRoll Meters",
          value: usage?.plainFilmLeftOverRollMeters?.toString(),
          editable: true,
          keyName: "plainFilmLeftOverRollMeters",
        },
        {
          label: "Plain Film LeftOverRoll Kgs",
          value: usage?.plainFilmLeftOverRollKgs?.toString(),
          editable: true,
          keyName: "plainFilmLeftOverRollKgs",
        },
        {
          label: "Qc Approval",
          value: usage?.qcApproval?.toString(),
          editable: true,
          keyName: "qcApproval",
        },
        {
          label: "Incharge Comments",
          value: usage?.inchargeComments,
          editable: true,
          keyName: "inchargeComments",
        },
      ];
      setInfoItems(info);
    }
  }, [data]);
  

  const handleInfoUpdate = (updatedItems: InfoItem[]) => {
    if (!editableData) return;

    const updated = { ...editableData };
    const shiftDetails = { ...updated.plainFilmLeftOverRoll };

    updatedItems.forEach((item) => {
      if (item.keyName && item.value !== undefined) {
        (shiftDetails as any)[item.keyName] = isNaN(Number(item.value))
          ? item.value
          : Number(item.value);
      }
    });

    updated.plainFilmLeftOverRoll = shiftDetails;
    setEditableData(updated);
    setInfoItems(updatedItems);

    dispatch(setUpdateDailyPlanPayload({ ...updated }));
    onDataChange();
  };
  const dispatch = useDispatch();

  const handleDataUpdate = (
    section: keyof LaminationReportResponse["data"],
    newData: any[]
  ) => {
    if (!editableData) return;

    const updated = { ...editableData };

    switch (section) {
      case "zoneTemperatureAndPressing": {
        const actualsRow = newData.find(
          (row: any) => row.particular === "Actual"
        );
        if (actualsRow) {
          updated.zoneTemperatureAndPressing = {
            ...updated.zoneTemperatureAndPressing,
            zone1TempActual: Number(actualsRow.zone1),
            zone2TempActual: Number(actualsRow.zone2),
            nipPressureActual: Number(actualsRow.nipPressure),
            speedMtrMinActual: Number(actualsRow.speed),
          };
        }
        break;
      }
      case "unwindingRewindingTension": {
        const actualsRow = newData.find(
          (row: any) => row.particular === "Actual"
        );
        if (actualsRow) {
          updated.unwindingRewindingTension = {
            ...updated.unwindingRewindingTension,
            priLaminatedActual: actualsRow.priLaminated,
            secUnwinderActual: actualsRow.secUnwinder,
            lamiSetActual: actualsRow.lamiSet,
            rewinderActual: actualsRow.rewinder,
          };
        }
        break;
      }
      case "laminationFilmSpecifications": {
        const actualsRow = newData.find((row: any) => row.spec === "GSM");
        if (actualsRow) {
          updated.laminationFilmSpecifications = {
            ...updated.laminationFilmSpecifications,
            secUnwinderGsm: actualsRow.secUnwinder,
            priLaminatedGsm: actualsRow.priLaminated,
          };
        }
        break;
      }
      case "repeat": {
        const actualsRow = newData.find(
          (row: any) => row.label === "Repeat (MM)"
        );
        updated.repeat = {
          ...updated.repeat,
          printedFilmRepeat: actualsRow.printedFilmRepeat
            ? Number(actualsRow.printedFilmRepeat)
            : 0,
          afterLaminationRepeat: actualsRow.afterLaminationRepeat
            ? Number(actualsRow.afterLaminationRepeat)
            : 0,
        };
        break;
      }
      case "bondingMaterialSpecifications": {
        updated.bondingMaterialSpecifications = newData.map((item: any) => ({
          bondingMaterial: item.bondingMaterial || "", // required field
          code: item.code || "", // required field
          brand: item.brand || "", // required field
          mixingRatio: item.mixingRatio || "", // required field
          actual: item.actual !== undefined ? String(item.actual) : null,
        }));
        break;
      }
      case "viscosityWeightMetrics": {
        const actualsRow = newData.find(
          (row: any) => row.viscosityRange !== "Viscosity Range"
        );
        updated.viscosityWeightMetrics = {
          ...updated.viscosityWeightMetrics,
          actualViscosity: actualsRow.actualViscosity,
          gsmRange: actualsRow.gsmRange,
          gsmRangeActual: actualsRow.gsmRangeActual,
          mixingComposition: actualsRow.mixingComposition,
          actualComposition: actualsRow.actualComposition,
          rubberRollerWidth: actualsRow.rubberRollerWidth,
        };
        break;
      }
      case "laminationProcessReport": {
        updated.laminationProcessReport = newData.map((item: any) => ({
          particular: item.particular,
          target: item.target || "", // required field
          actual: item.actual || "",
        }));
        break;
      }
      case "qcCheckList": {
        updated.qcCheckList = newData.map((item: any) => ({
          type: item.type || "",
          repeat: item.repeat || "",
          curling: item.curling || "",
          bondStrength: item.bondStrength || "",
          others: item.others || "",
        }));
        break;
      }

      default:
        return;
    }
    setEditableData(updated);
    dispatch(setUpdateDailyPlanPayload({ ...updated }));
    onDataChange();
  };
  if (isLoading || !editableData) return <Loader />;
  const zoneTempPressingData = transformZoneTempData(
    editableData.zoneTemperatureAndPressing
  );
  const unwindRewindData = transformUnwindRewindData(
    editableData.unwindingRewindingTension
  );
  const laminationFilmData = transformLaminationFilmData(
    editableData.laminationFilmSpecifications
  );
  const repeatData = [{ ...editableData.repeat, label: "Repeat (MM)" }];

  const bondingMaterialData = editableData.bondingMaterialSpecifications;
  const viscosityWeightData = [{ ...editableData.viscosityWeightMetrics }];
  const laminationProcessData = editableData.laminationProcessReport;
  const qcCheckData = editableData.qcCheckList;


  if (error || isError) {
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

  return (
    <>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Zone Temperature & Pressing Conditions"
          columns={zoneTempPressingColumns.map((col) => ({
            ...col,
            edit: isEditing && col.id !== "particular",
          }))}
          data={zoneTempPressingData}
          firstRow={true}
          setData={(data: any) =>
            handleDataUpdate("zoneTemperatureAndPressing", data)
          }
          rowEditable={(row) => row.particular === "Actual"}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Unwinding & Rewinding Tension"
          columns={unwindRewindColumns.map((col) => ({
            ...col,
            edit: isEditing && col.id !== "particular",
          }))}
          data={unwindRewindData}
          firstRow={true}
          setData={(data: any) =>
            handleDataUpdate("unwindingRewindingTension", data)
          }
          rowEditable={(row) => row.particular === "Actual"}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Lamination Film Specifications"
          columns={laminationFilmColumns.map((col) => ({
            ...col,
            edit: isEditing && col.id !== "spec",
          }))}
          data={laminationFilmData}
          firstRow={true}
          setData={(data: any) =>
            handleDataUpdate("laminationFilmSpecifications", data)
          }
          rowEditable={(row) => row.spec === "GSM"}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Repeat (MM)"
          columns={repeatColumns.map((col) => ({
            ...col,
            edit: isEditing && col.id !== "label",
          }))}
          data={repeatData}
          firstRow={false}
          setData={(data: any) => handleDataUpdate("repeat", data)}
          rowEditable={(row) => row.label === "Repeat (MM)"}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Bonding Material Specifications"
          columns={bondingMaterialColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={bondingMaterialData}
          firstRow={true}
          setData={(data: any) =>
            handleDataUpdate("bondingMaterialSpecifications", data)
          }
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Viscosity & Weight Metrics"
          columns={viscosityWeightColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={viscosityWeightData}
          firstRow={false}
          setData={(data: any) =>
            handleDataUpdate("viscosityWeightMetrics", data)
          }
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Lamination Process Report"
          columns={laminationProcessColumns.map((col) => ({
            ...col,
            edit: isEditing && col.id !== "particular" && col.edit,
          }))}
          data={laminationProcessData}
          firstRow={true}
          setData={(data: any) =>
            handleDataUpdate("laminationProcessReport", data)
          }
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="QC Check"
          columns={qcCheckColumns.map((col) => ({
            ...col,
            edit: isEditing && col.id !== "type" && col.edit,
          }))}
          data={qcCheckData}
          firstRow={false}
          setData={(data: any) => handleDataUpdate("qcCheckList", data)}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Plain Film Left Over Roll"
          columns={plainFilmLeftColumns}
          data={plainFilmLeftData}
          firstRow={false}
          showTableSection={false}
          infoItems={infoItems}
          showInfoSection={true}
          setInfoItems={handleInfoUpdate}
          isEditing={isEditing}
        />
      </Box>
    </>
  );
};

export default LaminationReport;
