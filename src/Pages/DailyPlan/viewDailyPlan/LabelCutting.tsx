import React from "react";
import { Box } from "@mui/material";
import { machineSpecsColumns, productionColumns, approvalColumns } from "../data";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { useGetLabelCuttingDetailsQuery } from "../../../store/services/api";
import Loader from "../../../Loader";


interface LabelCuttingDetailsProps {
    indentNumber: string
  }

const LabelCutting: React.FC<LabelCuttingDetailsProps> = ({ indentNumber }) => {
  const {
    data: labelCuttingData,
    isLoading,
    isError,
    error,
  } = useGetLabelCuttingDetailsQuery(indentNumber);
  // const { machineConfiguration} = labelCuttingData?.data;
  const machineSpecsRows = [
    { ...labelCuttingData?.data?.machineConfiguration },
  ];
  const productionData = labelCuttingData?.data?.labelCuttingProcessReport;
  const approvalData = [{ ...labelCuttingData?.data?.approvalRemarks }];
  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading details: {JSON.stringify(error)}</div>;
  if (!labelCuttingData) return <div>No data found</div>;
  return (
    <>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Machine Configuration Table"
          columns={machineSpecsColumns}
          data={machineSpecsRows}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Label cutting process report"
          columns={productionColumns}
          data={productionData}
          firstRow={true}
        />
      </Box>
      <Box sx={{ borderRadius: "0px ", p: 1 }}>
        <TitledDataTable
          title="Approval and Remarks Section"
          columns={approvalColumns}
          data={approvalData}
          firstRow={true}
        />
      </Box>
    </>
  );
};

export default LabelCutting;