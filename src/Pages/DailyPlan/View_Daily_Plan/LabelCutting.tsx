/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  machineSpecsColumns,
  productionColumns,
  approvalColumns,
} from "../data";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { useGetLabelCuttingDetailsMutation } from "../../../store/apis/dailyPlanApis";
import {
  setDailyPlanCancel,
  setDailyPlanSave,
  setUpdateDailyPlanPayload,
} from "../../../store/slices/viewDailyPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader";
import { RootState } from "../../../store";

interface LabelCuttingDetailsProps {
  indentNumber: string;
  isEditing: boolean;
  onDataChange: () => void;
}

interface LabelCuttingData {
  machineConfiguration: any;
  labelCuttingProcessReport: any[];
  approvalRemarks: any;
}

const LabelCutting: React.FC<LabelCuttingDetailsProps> = ({
  indentNumber,
  isEditing,
  onDataChange,
}) => {
  const dispatch = useDispatch();
  const [getLabelCuttingDetails,{
    data: labelCuttingData,
    isLoading,
    isError,
    error,
  }] = useGetLabelCuttingDetailsMutation();

  useEffect(()=>{
getLabelCuttingDetails(
  {indentNumber,
    rollNumber:1}
)
  },[indentNumber])

  // State to manage editable data
  const [editableData, setEditableData] = useState<LabelCuttingData | null>(
    null
  );
  const { dailyPlanCancel, dailyPlanSave } = useSelector(
    (state: RootState) => state.viewDailyPlan
  );
  // Initialize editable data when API data loads
  React.useEffect(() => {
    if (labelCuttingData) {
      setEditableData({
        machineConfiguration: [
          { ...labelCuttingData.data.machineConfiguration },
        ],
        labelCuttingProcessReport: [
          ...labelCuttingData.data.labelCuttingProcessReport,
        ],
        approvalRemarks: [{ ...labelCuttingData.data.approvalRemarks }],
      });
    }
  }, [labelCuttingData]);
  useEffect(() => {
    dispatch(setDailyPlanSave(false));
    dispatch(setDailyPlanCancel(false));
  }, []);

  useEffect(() => {
    if (dailyPlanCancel && !dailyPlanSave) {
      if (labelCuttingData) {
        setEditableData({
          machineConfiguration: [
            { ...labelCuttingData.data.machineConfiguration },
          ],
          labelCuttingProcessReport: [
            ...labelCuttingData.data.labelCuttingProcessReport,
          ],
          approvalRemarks: [{ ...labelCuttingData.data.approvalRemarks }],
        });
      }
      dispatch(setDailyPlanCancel(false));
      dispatch(setDailyPlanSave(false));
    }
  }, [dailyPlanCancel, dailyPlanSave]);

  const handleDataUpdate = (table: string, newData: any) => {
    if (!editableData) return;
    setEditableData((prev) => {
      if (!prev) return null;

      const updatedData = { ...prev };

      switch (table) {
        case "machineConfig":
          updatedData.machineConfiguration = [...newData];
          break;
        case "production":
          updatedData.labelCuttingProcessReport = Array.isArray(newData)
            ? [...newData]
            : [{ ...newData }];
          break;
        case "approval":
          updatedData.approvalRemarks = [...newData];
          break;
        default:
          break;
      }
      dispatch(
        setUpdateDailyPlanPayload({
          ...updatedData,
          machineConfiguration: updatedData.machineConfiguration[0],
          approvalRemarks: updatedData.approvalRemarks[0],
        })
      );

      return updatedData;
    });
    onDataChange();
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading details: {JSON.stringify(error)}</div>;
  if (!labelCuttingData || !editableData) return <div>data Loading....</div>;
  return (
    <>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Machine Configuration Table"
          columns={machineSpecsColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={editableData.machineConfiguration}
          setData={(newData: any) => handleDataUpdate("machineConfig", newData)}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Label cutting process report"
          columns={productionColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={editableData.labelCuttingProcessReport}
          setData={(newData: any) => handleDataUpdate("production", newData)}
          firstRow={true}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Approval and Remarks Section"
          columns={approvalColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={editableData.approvalRemarks}
          setData={(newData: any) => handleDataUpdate("approval", newData)}
          firstRow={false}
        />
      </Box>
    </>
  );
};

export default LabelCutting;
