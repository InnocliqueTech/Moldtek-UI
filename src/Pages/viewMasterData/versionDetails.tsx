import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setVersionPopup } from "../../store/slices/viewMasterDataSlice";
import ReusablePopup from "../../Components/ReUsable/PopUp";
import { Box } from "@mui/material";



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
                {value} Feedback
              </Box>
            ),
          },
      ];
      const tableData = [
        {
          version: "ORD-1001",
          updatedAt: "2 hours ago",
          comment: 0, 
        },
        {
          version: "ORD-1002",
          updatedAt: "1 hours ago",
          comment: 1 
        },
        {
          version: "ORD-1003",
          updatedAt: "3 hours ago",
          comment: 0
        },
        {
          version: "ORD-1004",
          updatedAt: "2 hours ago",
          comment: 0
        },
        {
          version: "ORD-1005",
          updatedAt: "1 hours ago",
          comment:1
        },
        {
          version: "ORD-1006",
          updatedAt: "3 hours ago",
          comment:0
        },
      ];
      

    const {versionPopup} = useSelector((store:RootState)=>store.viewMasterData);
    const dispatch = useDispatch<AppDispatch>()
    const handleCloseVesionPopup= ()=>{
        dispatch(setVersionPopup(false))
      }
    return (
        <ReusablePopup 
        open={versionPopup}
        onClose={handleCloseVesionPopup}
        table={true}
        tableColumns={tableColumns}
        tableData={tableData}
        />
    )
}
export default VersinDetails