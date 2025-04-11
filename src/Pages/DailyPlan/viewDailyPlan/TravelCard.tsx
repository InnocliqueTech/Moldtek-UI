import React from "react";
import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { printingColumns, printingData, jobDetails ,laminationColumns,laminationData,labelCuttingColumns,labelCuttingData} from "../data";

const TravelCard: React.FC = () => {
    return (
        <>
            <Box sx={{ borderRadius: "0px ", p: 1 }}>
                <TitledDataTable
                    title="Printing Machine"
                    columns={printingColumns}
                    data={printingData}
                    firstRow={true}
                    infoItems={jobDetails}
                    showInfoSection={true}
                />
            </Box>

            <Box sx={{ borderRadius: "0px ", p: 1 }}>
                <TitledDataTable
                    title="Lamination Machine"
                    columns={laminationColumns}
                    data={laminationData}
                    firstRow={true}
                    infoItems={jobDetails}
                    showInfoSection={true}
                />
            </Box>

            <Box sx={{ borderRadius: "0px ", p: 1 }}>
                <TitledDataTable
                    title="Label Cutting Machine"
                    columns={labelCuttingColumns}
                    data={labelCuttingData}
                    firstRow={true}
                    infoItems={jobDetails}
                    showInfoSection={true}
                />
            </Box>
        </>
    );
};

export default TravelCard;