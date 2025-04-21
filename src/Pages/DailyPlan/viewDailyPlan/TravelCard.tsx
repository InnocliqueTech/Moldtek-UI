import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import {
  printingColumns,
  laminationColumns,
  labelCuttingColumns,
  labelDispatchColums,
} from "../data";
import { useGetTravelCardDetailsQuery } from "../../../store/services/api";
import Loader from "../../../Loader";
import { transformJobDetails } from "./tableTransfermationFunctions";
import { useDispatch } from "react-redux";
import { setUpdateDailyPlanPayload } from "../../../store/slices/viewDailyPlanSlice";
import {
  MachineDetails,
  LabelDispatchSummary,
} from "../../../store/Interfaces/createDailyPlanTypes";

interface TravelCardProps {
  indentNumber: string;
  isEditing: boolean;
  onDataChange: () => void;
}

interface EditableTravelCardData {
  printingMachine: MachineDetails;
  laminationMachine: MachineDetails;
  labelCuttingMachine: MachineDetails;
  labelDispatchSummary: LabelDispatchSummary;
}

const TravelCard: React.FC<TravelCardProps> = ({
  indentNumber,
  isEditing,
  onDataChange,
}) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetTravelCardDetailsQuery(indentNumber);

  const [editableData, setEditableData] = useState<EditableTravelCardData | null>(null);

  useEffect(() => {
    if (data?.data) {
      setEditableData({ ...data.data });
    }
  }, [data]);

  const handleDataUpdate = (section: keyof EditableTravelCardData, newData: any[]) => {
    if (!editableData) return;

    const updated: EditableTravelCardData = { ...editableData };

    if (section === "labelDispatchSummary") {
      updated.labelDispatchSummary = newData[0];
    } else {
      updated[section] = {
        ...updated[section],
        categories: [...newData],
      };
    }
console.log(updated,"inside handleDataUpdate");
    setEditableData(updated);
    dispatch(setUpdateDailyPlanPayload({ ...updated }));
    onDataChange();
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading details: {JSON.stringify(error)}</div>;
  if (!editableData) return <div>No data found</div>;

  return (
    <>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Printing Machine"
          columns={printingColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={editableData.printingMachine.categories}
          setData={(newData:any) => handleDataUpdate("printingMachine", newData)}
          firstRow={true}
          infoItems={transformJobDetails(editableData.printingMachine)}
          showInfoSection={true}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Lamination Machine"
          columns={laminationColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={editableData.laminationMachine.categories}
          setData={(newData:any) => handleDataUpdate("laminationMachine", newData)}
          firstRow={true}
          infoItems={transformJobDetails(editableData.laminationMachine)}
          showInfoSection={true}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Label Cutting Machine"
          columns={labelCuttingColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={editableData.labelCuttingMachine.categories}
          setData={(newData:any) => handleDataUpdate("labelCuttingMachine", newData)}
          firstRow={true}
          infoItems={transformJobDetails(editableData.labelCuttingMachine)}
          showInfoSection={true}
        />
      </Box>

      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Label Dispatch Summary"
          columns={labelDispatchColums.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={[editableData.labelDispatchSummary]}
          setData={(newData:any) => handleDataUpdate("labelDispatchSummary", newData)}
        />
      </Box>
    </>
  );
};

export default TravelCard;
