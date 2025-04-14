import React from "react";
import { Box } from "@mui/material";
import { machineSpecsColumns, machineSpecsRows, productionColumns, productionData, approvalColumns, approvalData } from "../data";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";

const LabelCutting: React.FC = () => {
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