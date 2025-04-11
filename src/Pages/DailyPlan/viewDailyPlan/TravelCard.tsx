import React from "react";
import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { printingColumns, printingData, jobDetails } from "../data";

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
        </>
    );
};

export default TravelCard;