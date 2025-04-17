import React from "react";
import { Box } from "@mui/material";
import TitledDataTable from "../../../Components/ReUsable/TitledDataTable";
import { printingColumns ,laminationColumns,labelCuttingColumns,labelDispatchColums} from "../data";
import { useGetTravelCardDetailsQuery } from "../../../store/services/api";
import Loader from "../../../Loader";
import { transformJobDetails } from "./tableTransfermationFunctions";


interface TravelCardDetailsProps {
    indentNumber: string
  }

const TravelCard: React.FC<TravelCardDetailsProps> = ({ indentNumber }) => {
    const {
      data: travelCardData,
      isLoading,
      isError,
      error,
    } = useGetTravelCardDetailsQuery(indentNumber);
    const printingData = travelCardData?.data?.printingMachine?.categories;
    const printintJobDetails = transformJobDetails(
      travelCardData?.data?.printingMachine
    );
    const laminationData = travelCardData?.data?.laminationMachine?.categories;
    const laminationJobDetails = transformJobDetails(
      travelCardData?.data?.laminationMachine
    );
    const labelCuttingData =
      travelCardData?.data?.labelCuttingMachine?.categories;
    const labelCuttingJobDetails = transformJobDetails(
      travelCardData?.data?.labelCuttingMachine
    );
    const labelDispatchRows = [
      { ...travelCardData?.data?.labelDispatchSummary },
    ];
    
    if (isLoading) return <Loader />;
    if (isError)
      return <div>Error loading details: {JSON.stringify(error)}</div>;
    if (!travelCardData) return <div>No data found</div>;
    return (
        <>
            <Box sx={{ borderRadius: "0px ", p: 1 }}>
                <TitledDataTable
                    title="Printing Machine"
                    columns={printingColumns}
                    data={printingData}
                    firstRow={true}
                    infoItems={printintJobDetails}
                    showInfoSection={true}
                />
            </Box>

            <Box sx={{ borderRadius: "0px ", p: 1 }}>
                <TitledDataTable
                    title="Lamination Machine"
                    columns={laminationColumns}
                    data={laminationData}
                    firstRow={true}
                    infoItems={laminationJobDetails}
                    showInfoSection={true}
                />
            </Box>

            <Box sx={{ borderRadius: "0px ", p: 1 }}>
                <TitledDataTable
                    title="Label Cutting Machine"
                    columns={labelCuttingColumns}
                    data={labelCuttingData}
                    firstRow={true}
                    infoItems={labelCuttingJobDetails}
                    showInfoSection={true}
                />
            </Box>

            <Box sx={{ borderRadius: "0px ", p: 1 }}>
                <TitledDataTable
                    title="Label Dispatch Summary"
                    columns={labelDispatchColums}
                    data={labelDispatchRows}
                    // firstRow={true}
                    // infoItems={jobDetails}
                    // showInfoSection={true}
                />
            </Box>
        </>
    );
};

export default TravelCard;