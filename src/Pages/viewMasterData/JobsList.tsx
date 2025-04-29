import React, { useEffect, useState } from "react";
import { Box, Grid, SelectChangeEvent, Skeleton, Tooltip, Typography } from "@mui/material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import { UENCell } from "../../Components/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setJobsListData,
} from "../../store/slices/viewMasterDataSlice";
import { useGetJobsListQuery, useViewMasterDataQuery } from "../../store/services/api";
import { jobsList } from "./data";


const JobsList: React.FC = () => {
  const navigate = useNavigate();
  const UEN= localStorage.getItem("actionSelectedUEN")
  let selectedUEN :any;
  if(UEN){
    selectedUEN =  UEN;
 }
  type StatusType = "Inprogress" | "On hold" | "Inactive" | "Completed"|"Active";
  const rowsPerPageStorageKey = "jobsDataRowsPerPage"
  const [rowsPerPage, setRowsPerPage] = useState(()=>{
    const savedPage = localStorage.getItem(rowsPerPageStorageKey);
    return savedPage !==null ? Number(savedPage):10;
  }); 

   const handleRowsPerPageChange = (event: SelectChangeEvent<string>): void => {
    setPage(0);
      setRowsPerPage(parseInt(event.target.value, 10));
      localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
    };
    
  const colorMap: Record<StatusType, string> = {
    "Inprogress": "#FAECD8",
    "On hold": "#F7DDDA",
    "Inactive": "#ffebee",
    "Completed": "#DDEED8",
    "Active": "#E6F4FF",
  };

  const textColorMap: Record<StatusType, string> = {
    "Inprogress": "#C08532",
    "On hold": "#B2493A",
    "Inactive": "#c62828",
    "Completed": "#478E30",
    "Active": "#0070F3",
  };

  const columns = [
    {
      id: "indentNumber",
      label: "Indent No.",
      align: true,
      disableSorting: false,
      format: (value: string) => (
        <UENCell value={value} onClick={() => navigate(`/viewMasterData/${selectedUEN}`)} />
      ),
    },
    {
      id: "labelType",
      label: "Type Of Label",
      align: false,
      disableSorting: true,
      format: (value: string) =>
        value !== null ? (
          <Tooltip title={value}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "4px 8px",
                display: "inline-block",
                backgroundColor: "#F8F9FA",
                maxWidth: 150,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {value}
            </Box>
          </Tooltip>
        ) : (
          "N/A"
        ),
    },
    {
      id: "status",
      label: "Status",
      align: true,
      disableSorting: false,
      format: (value: StatusType) => (
        value !== null ? (
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: "12px",
            fontSize: 12,
            backgroundColor: colorMap[value],
            color: textColorMap[value],
            fontWeight: 500,
            display: "inline-block",
          }}
        >
          {value}
        </Box>):
          "N/A"
        )
    },
    {
      id: "updatedAt",
      label: "Last Update",
      align: true,
      disableSorting: false,
             format : (value: string) =>
        value ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-") : "",
    },
    {
      id: "jobRunDate",
      label: "Last Executed",
      align: true,
      disableSorting: false,
             format : (value: string) =>
        value ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-") : "", 
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
    //       {value} Feedback
    //     </Box>
    //   ),
    // },
  ];

  const storageKey = "jobListDataPage";
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem(storageKey);
    return savedPage !== null ? Number(savedPage) : 0;
  });
    useEffect(() => {
      localStorage.setItem(storageKey, page.toString());
      localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
    }, [page,rowsPerPage]);


  const dispatch = useDispatch<AppDispatch>();

  const versionNumber = localStorage.getItem("actionVersionNo");
  const id =
    localStorage.getItem("actionSelectedUEN");
  const {data,isLoading} = useGetJobsListQuery({unitEffectiveNumber:selectedUEN})
  const { data: viewMasterDataDetailsData, isLoading: viewMasterDataDetailsLoading } = useViewMasterDataQuery(
    {
      ueNumber: id ? id : selectedUEN,
      versionNo: versionNumber ? versionNumber : '',
    },
    { refetchOnMountOrArgChange: true }
  );
  useEffect(() => {
    dispatch(setJobsListData(data?.data));
  }, [data]);
const {jobListData} = useSelector((state:RootState)=>state.viewMasterData)
  const viewMasterDataDetails = viewMasterDataDetailsData?.data?.masterDataDetails

  const maxChars = 120;
  const isLong = viewMasterDataDetails?.brand_description?.length > maxChars;
  const displayText = isLong
    ? viewMasterDataDetails?.brand_description.slice(0, maxChars) + "..."
    : viewMasterDataDetails?.brand_description;

    const renderValue = (value: string | undefined | null) => {
      return value ? value : "N/A";
    };

    const handlePageChange = (newPage: number) => {
      setPage(newPage);
      localStorage.setItem(storageKey, newPage.toString());
    };
    const maxCharsLabel= 20;
      const isLongLabel = viewMasterDataDetails?.label_type.length > maxCharsLabel;
      const displayTextLabel = isLongLabel
        ? viewMasterDataDetails?.label_type.slice(0, maxCharsLabel) + "..."
        : viewMasterDataDetails?.label_type;

  return (
    <Box sx={{ p: 0 }}>
      <Box p={2} sx={{ backgroundColor: "#fff", borderRadius: 2, mb: 2 }}>
      {viewMasterDataDetailsLoading ? (
  <Grid container spacing={2} pt={1}>
    {[...Array(3)].map((_, index) => (
      <Grid size={{xs:12,md:4}} key={index}>
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="50%" height={30} sx={{ mt: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 1 }} />
      </Grid>
    ))}
  </Grid>
) : (
  <Grid container spacing={2} pt={1}>
    <Grid size={{xs:12,md:4}}>
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        Unit Effective Number
      </Typography>
      <Typography variant="body1" sx={{ mt: 0.5, wordBreak: "break-word", whiteSpace: "pre-line" }}>
        {renderValue(viewMasterDataDetails?.unit_effectivity_number)}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>ITEM Code</Typography>
        <Typography variant="body1" sx={{ mt: 0.5, wordBreak: "break-word", whiteSpace: "pre-line" }}>
          {renderValue(viewMasterDataDetails?.item_code)}
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>Jar/Cap</Typography>
        <Typography variant="body1" sx={{ mt: 0.5, wordBreak: "break-word", whiteSpace: "pre-line" }}>
          {renderValue(viewMasterDataDetails?.jar_cap)}
        </Typography>
      </Box>
    </Grid>

    <Grid size={{xs:12,md:4}}>
      <Typography variant="body2" color="text.secondary" fontWeight={500}>Customer Name</Typography>
      <Typography variant="body1" sx={{ mt: 0.5, wordBreak: "break-word", whiteSpace: "pre-line" }}>
        {renderValue(viewMasterDataDetails?.customer_name)}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>Structure</Typography>
        <Typography variant="body1" sx={{ mt: 0.5, wordBreak: "break-word", whiteSpace: "pre-line" }}>
          {renderValue(viewMasterDataDetails?.structure)}
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }} color="#656565">Type Of Label</Typography>
                       <Tooltip
                         title={isLongLabel ? viewMasterDataDetails?.label_type : ""}
                         placement="top"
                         arrow
                       >
                         <Typography
                           variant="body1"
                           sx={{
                             mt: 0.5,
                             wordBreak: "break-word",
                             whiteSpace: "pre-line",
                           }}
                         >
                           {renderValue(displayTextLabel)}
                         </Typography>
                       </Tooltip>
        </Box>
      </Box>
    </Grid>

    <Grid size={{xs:12,md:4}}>
      <Box />
      <Typography variant="body2" color="text.secondary" fontWeight={500}>Customer Picture</Typography>
      {viewMasterDataDetails?.customer_logo ? (
        <img src={viewMasterDataDetails?.customer_logo} alt="customerPicture" />
      ) : "N/A"}

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          Brand Name & Pack-Description
        </Typography>
        <Tooltip
          title={isLong ? viewMasterDataDetails?.brand_description : ""}
          placement="top"
          arrow
        >
          <Typography variant="body1" sx={{ mt: 0.5, wordBreak: "break-word", whiteSpace: "pre-line" }}>
            {renderValue(displayText)}
          </Typography>
        </Tooltip>
      </Box>
    </Grid>
  </Grid>
)}

        <Box sx={{ paddingTop: 1.5 }}>
          <Box
            sx={{
              border: "1px solid #ECECEC",
              borderRadius: "18px",
              overflow: "hidden",
              mt: 1,
            }}
          >
            <ReusableTable
              columns={columns}
              data={jobListData?jobListData:[]}
              selectable={false}
              label={`${data?.totalRecords?data.totalRecords:0} Versions`}
              title="List of executed jobs"
              info={true}
              searchVisible={true}
              action={false}
              boxShadow={false}
              searchSize={true}
              isLoading={isLoading}
              id={"jobListData"}
              handleRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              pageNumber={page}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobsList;
