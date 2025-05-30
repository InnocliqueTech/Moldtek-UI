import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import {
  printingColumns,
  laminationColumns,
  labelCuttingColumns,
  labelDispatchColums,
} from "../data";
import { useGetTravelCardDetailsQuery } from "../../../store/apis/dailyPlanApis";
import Loader from "../../../Loader";
import { transformJobDetails } from "./tableTransfermationFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setDailyPlanCancel, setDailyPlanSave, setUpdateDailyPlanPayload } from "../../../store/slices/viewDailyPlanSlice";
import {
  MachineDetails,
  LabelDispatchSummary,
} from "../../../store/Interfaces/createDailyPlanTypes";
import { InfoItem } from "../../../Components/ReUsable/InfoContainer"; // adjust path if needed
import { RootState } from "../../../store";

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
  const { data, isLoading, isError } =
    useGetTravelCardDetailsQuery(indentNumber);

  const [editableData, setEditableData] =
    useState<EditableTravelCardData | null>(null);
  const { dailyPlan,dailyPlanCancel,dailyPlanSave } = useSelector((state: RootState) => state.viewDailyPlan);

  // infoItems state for editing job details
  const [printingInfo, setPrintingInfo] = useState<InfoItem[]>([]);
  const [laminationInfo, setLaminationInfo] = useState<InfoItem[]>([]);
  const [cuttingInfo, setCuttingInfo] = useState<InfoItem[]>([]);

    useEffect(()=>{
    dispatch(setDailyPlanSave(false));
    dispatch(setDailyPlanCancel(false))
    },[])
  
  useEffect(() => {
    if (dailyPlanCancel && !dailyPlanSave) {

      if (data?.data) {
        const clearData = { ...data.data }
        setEditableData(data.data);
        
      setPrintingInfo(transformJobDetails(clearData.printingMachine, true));
      setLaminationInfo(transformJobDetails(clearData.laminationMachine, true));
      setCuttingInfo(transformJobDetails(clearData.labelCuttingMachine, true));
      }

      dispatch(setDailyPlanCancel(false));
      dispatch(setDailyPlanSave(false));
    }
  }, [dailyPlanCancel, dailyPlanSave]);

  // On data load, set editable states
  useEffect(() => {
    if (data?.data) {
     const newData =  { ...data.data }
      setEditableData(newData);

      setPrintingInfo(transformJobDetails(newData.printingMachine, true));
      setLaminationInfo(transformJobDetails(newData.laminationMachine, true));
      setCuttingInfo(transformJobDetails(newData.labelCuttingMachine, true));
    }
  }, [data]);

  const handleDataUpdate = (
    section: keyof EditableTravelCardData,
    newData: any[]
  ) => {
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

    setEditableData(updated);
    dispatch(setUpdateDailyPlanPayload({ ...updated }));
    onDataChange();
  };

  const handleInfoUpdate = (
    section: keyof EditableTravelCardData,
    updatedItems: InfoItem[]
  ) => {
    if (!editableData) return;

    if (
      section !== "printingMachine" &&
      section !== "laminationMachine" &&
      section !== "labelCuttingMachine"
    ) {
      console.warn("handleInfoUpdate not supported for:", section);
      return;
    }

    const updated: EditableTravelCardData = { ...editableData };
    const machine = { ...updated[section] } as MachineDetails;

    updatedItems.forEach((item) => {
      if (item.keyName && item.value !== undefined) {
        (machine as any)[item.keyName] = item.value;
      }
    });

    updated[section] = machine;
    setEditableData(updated);
    dispatch(setUpdateDailyPlanPayload({ ...updated }));
    onDataChange();
    // Update local infoItem state
    switch (section) {
      case "printingMachine":
        setPrintingInfo(updatedItems);
        break;
      case "laminationMachine":
        setLaminationInfo(updatedItems);
        break;
      case "labelCuttingMachine":
        setCuttingInfo(updatedItems);
        break;
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>No Data Available</div>;
  if (!editableData) return <div>data Loading...</div>;

  return (
    <>
      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Printing Machine"
          columns={printingColumns.map((col) => {
            if (col.id === "actuals") {
              return { ...col, edit: isEditing }; // actual column always editable
            }

            if (col.id === "target") {
              return {
                ...col,
                edit: isEditing,
                rowEditable: (row: any) =>
                  row.category === "Inspection Wastage",
              }; // target column editable only for Inspection Wastage
            }

            return { ...col, edit: false };
          })}
          data={editableData.printingMachine.categories}
          setData={(newData: any[]) =>
            handleDataUpdate("printingMachine", newData)
          }
          firstRow
          infoItems={printingInfo}
          setInfoItems={(updatedItems) =>
            handleInfoUpdate("printingMachine", updatedItems)
          }
          isEditing={isEditing}
          showInfoSection
          rowEditable={(row, columnId) => {
            if (columnId === "actuals") return true;
            if (columnId === "target")
              return row.category === "Inspection Wastage";
            return false;
          }}
        />
      </Box>
      {(dailyPlan.labelType !== "THINWALL" || dailyPlan.segment !== "TW") && (
        <Box sx={{ borderRadius: "0px", p: 1 }}>
          <TitledDataTable
            title="Lamination Machine"
            columns={laminationColumns.map((col) => {
              if (col.id === "actuals") {
                return { ...col, edit: isEditing };
              }

              if (col.id === "target") {
                return {
                  ...col,
                  edit: isEditing,
                  rowEditable: (row: any) =>
                    row.category === "Inspection Wastage",
                };
              }

              return { ...col, edit: false };
            })}
            data={editableData.laminationMachine.categories}
            setData={(newData: any[]) =>
              handleDataUpdate("laminationMachine", newData)
            }
            firstRow
            infoItems={laminationInfo}
            setInfoItems={(updatedItems) =>
              handleInfoUpdate("laminationMachine", updatedItems)
            }
            isEditing={isEditing}
            showInfoSection
            rowEditable={(row, columnId) => {
              if (columnId === "actuals") return true;
              if (columnId === "target")
                return row.category === "Inspection Wastage";
              return false;
            }}
            //rowEditable={(row) => row.category === "Inspection Wastage"}
          />
        </Box>
      )}

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Label Cutting Machine"
          columns={labelCuttingColumns.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={editableData.labelCuttingMachine.categories}
          setData={(newData: any[]) =>
            handleDataUpdate("labelCuttingMachine", newData)
          }
          firstRow
          infoItems={cuttingInfo}
          setInfoItems={(updatedItems) =>
            handleInfoUpdate("labelCuttingMachine", updatedItems)
          }
          isEditing={isEditing}
          showInfoSection
        />
      </Box>

      <Box sx={{ borderRadius: "0px", p: 1 }}>
        <TitledDataTable
          title="Label Dispatch Summary"
          columns={labelDispatchColums.map((col) => ({
            ...col,
            edit: isEditing && col.edit,
          }))}
          data={[editableData.labelDispatchSummary]}
          setData={(newData: any[]) =>
            handleDataUpdate("labelDispatchSummary", newData)
          }
        />
      </Box>
    </>
  );
};

export default TravelCard;
