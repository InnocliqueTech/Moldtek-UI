import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setVersionPopup } from "../../store/slices/viewMasterDataSlice";
import { Box } from "@mui/material";
import VersionPopup from "./versionPopUp";

const VersinDetails: React.FC = () => {
  const tableColumns = [
    { id: "version", label: "Version No.", align: true },
    { id: "updatedAt", label: "Last Update", align: true },
    {
      id: "comment",
      label: "Comment",
      align: true,
      disableSorting: true,
      format: (value: number) => (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            backgroundColor: "white",
            color: "#2F2F2F",
            px: 1.5,
            py: 0.5,
            borderRadius: "6px",
            fontSize: 12,
            border: "1px solid #ECECEC",
            fontWeight: 500,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              color: value > 0 ? "#DC6803" : "#027A48",
              backgroundColor: value > 0 ? "#DC6803" : "#12B76A",
            }}
          />
          {value} Comment
        </Box>
      ),
    },
  ];

  const allData = [
    { version: "ORD-1001", updatedAt: "2 hours ago", comment: 1 },
    { version: "ORD-1002", updatedAt: "1 hours ago", comment: 0 },
    { version: "ORD-1003", updatedAt: "3 hours ago", comment: 0 },
    { version: "ORD-1004", updatedAt: "2 hours ago", comment: 2 },
    { version: "ORD-1005", updatedAt: "1 hours ago", comment: 0 },
    { version: "ORD-1006", updatedAt: "3 hours ago", comment: 0 },
    { version: "ORD-1007", updatedAt: "4 hours ago", comment: 1 },
    { version: "ORD-1008", updatedAt: "5 hours ago", comment: 0 },
    { version: "ORD-1009", updatedAt: "6 hours ago", comment: 3 },
    { version: "ORD-1010", updatedAt: "7 hours ago", comment: 0 },
    { version: "ORD-1011", updatedAt: "8 hours ago", comment: 2 },
    { version: "ORD-1012", updatedAt: "9 hours ago", comment: 0 },
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
    totalVersions={allData.length}
    table
    tableColumns={tableColumns}
    tableData={allData}
    />
  );
};

export default VersinDetails;
