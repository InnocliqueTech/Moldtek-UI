import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setVersionPopup } from "../../store/slices/viewMasterDataSlice";
// import { Box } from "@mui/material";
import VersionPopup from "./versionPopUp";
import { versionData } from "./data";

const VersinDetails: React.FC = () => {
  const tableColumns = [
    { id: "unit_effective_number", label: "Version No.", align: true },
    { id: "created_at", label: "Last Update", align: true },
    // {
    //   id: "comment",
    //   label: "Comment",
    //   align: true,
    //   disableSorting: true,
    //   format: (value: number) => (
    //     <Box
    //       sx={{
    //         display: "inline-flex",
    //         alignItems: "center",
    //         gap: 0.5,
    //         backgroundColor: "white",
    //         color: "#2F2F2F",
    //         px: 1.5,
    //         py: 0.5,
    //         borderRadius: "6px",
    //         fontSize: 12,
    //         border: "1px solid #ECECEC",
    //         fontWeight: 500,
    //       }}
    //     >
    //       <Box
    //         component="span"
    //         sx={{
    //           width: 8,
    //           height: 8,
    //           borderRadius: "50%",
    //           color: value > 0 ? "#DC6803" : "#027A48",
    //           backgroundColor: value > 0 ? "#DC6803" : "#12B76A",
    //         }}
    //       />
    //       {value} Comment
    //     </Box>
    //   ),
    // },
  ];



  const { versionPopup } = useSelector((store: RootState) => store.viewMasterData);
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseVesionPopup = () => {
    dispatch(setVersionPopup(false));
  };

  return (
    <VersionPopup
    open={versionPopup}
    onClose={handleCloseVesionPopup}
    title="List of executed jobs"
    totalVersions={versionData.totalRecords}
    table
    tableColumns={tableColumns}
    tableData={versionData.data}
    />
  );
};

export default VersinDetails;
