import React, { useState } from "react";
import { Box } from "@mui/material";
import { machineSpecsColumns, productionColumns, approvalColumns } from "../data";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { useGetLabelCuttingDetailsQuery } from "../../../store/services/api";
import Loader from "../../../Loader";

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
  onDataChange 
}) => {
  const { data: labelCuttingData, isLoading, isError, error } = 
    useGetLabelCuttingDetailsQuery(indentNumber);

  // State to manage editable data
  const [editableData, setEditableData] = useState<LabelCuttingData | null>(null);

  // Initialize editable data when API data loads
  React.useEffect(() => {
    if (labelCuttingData) {
      setEditableData({
        machineConfiguration: [{...labelCuttingData.data.machineConfiguration}],
        labelCuttingProcessReport: [...labelCuttingData.data.labelCuttingProcessReport],
        approvalRemarks: [{...labelCuttingData.data.approvalRemarks}]
      });
    }
  }, [labelCuttingData]);

  const handleDataUpdate = (table: string, newData: any) => {
    console.log(table,newData,"inside dataUpdate");
    if (!editableData) return;
    
    setEditableData(prev => {
      if (!prev) return null;
      
      const updatedData = {...prev};
      
      switch (table) {
        case 'machineConfig':
          updatedData.machineConfiguration = [...newData];
          break;
        case 'production':
          updatedData.labelCuttingProcessReport = Array.isArray(newData) 
            ? [...newData] 
            : [{...newData}];
          break;
        case 'approval':
          updatedData.approvalRemarks = [...newData];
          break;
        default:
          break;
      }
      
      return updatedData;
    });

    // Notify parent component about data changes
    onDataChange();
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading details: {JSON.stringify(error)}</div>;
  if (!labelCuttingData || !editableData) return <div>No data found</div>;
console.log({editableData},"inside labelCutting");
  return (
    <>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Machine Configuration Table"
          columns={machineSpecsColumns.map(col => ({
            ...col,
            edit: isEditing && col.edit
          }))}
          data={editableData.machineConfiguration}
          setData={(newData) => handleDataUpdate('machineConfig', newData)}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Label cutting process report"
          columns={productionColumns.map(col => ({
            ...col,
            edit: isEditing && col.edit
          }))}
          data={editableData.labelCuttingProcessReport}
          setData={(newData) => handleDataUpdate('production', newData)}
          firstRow={true}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Approval and Remarks Section"
          columns={approvalColumns.map(col => ({
            ...col,
            edit: isEditing && col.edit
          }))}
          data={editableData.approvalRemarks}
          setData={(newData) => handleDataUpdate('approval', newData)}
          firstRow={true}
        />
      </Box>
    </>
  );
};

export default LabelCutting;