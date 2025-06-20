import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setVersionPopup } from "../../store/slices/viewMasterDataSlice";
import VersionPopup from "./versionPopUp";
import { useVersionHistoryQuery } from "../../store/apis/masterDataApis";

const VersinDetails: React.FC = () => {
    const tableColumns = [
      {
        id: "unit_effective_number",
        label: "Version No.",
        align: true,
        format: (_: any, row: any) => {
          const combinedValue = `${row.unit_effective_number} - ${row.version_no}`;
      console.log(row,"ROWDATA")
          const handleClick = () => {
            localStorage.setItem("VersionNumber", row.version_no);
            localStorage.setItem("UEN", row.unit_effective_number);
            localStorage.setItem("JARCAP",row.jar_cap)
          };
      
          return (
            <a
              href="/versionDetails"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "#000",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
              }}
            >
              {combinedValue}
            </a>
          );
        },
      },      
      {
        id: "created_at",
        label: "Last Update",
        align: true,
        format: (value: string) =>
          value ? new Date(value).toLocaleDateString("en-CA") : "", 
      },
    
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


  const UEN = localStorage.getItem("selectedUEN");
  let selectedUEN :any;
  if(UEN){
    selectedUEN =  UEN;
 }
  const { versionPopup } = useSelector((store: RootState) => store.viewMasterData);
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseVesionPopup = () => {
    dispatch(setVersionPopup(false));
  };

 const { data, isLoading } = useVersionHistoryQuery(
  { unitEffectiveNumber: selectedUEN },
  {
    skip: !versionPopup, // skip query if popup is not open
    refetchOnMountOrArgChange: true,
  }
);

  
  return (
    <VersionPopup
    open={versionPopup}
    onClose={handleCloseVesionPopup}
    title="List of Versions"
    totalVersions={data?.totalRecords?data?.totalRecords:'0'}
    table
    tableColumns={tableColumns}
    tableData={data?.data? data?.data:[]}
    isLoading={isLoading}
    />
  );
};

export default VersinDetails;
