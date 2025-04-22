import React,{useEffect, useState} from 'react';
import { Avatar, Box, Grid, Typography,Skeleton, Tooltip } from "@mui/material";
import Cards from '../../Components/ReUsable/Cards'
import { InfoOutline } from "@mui/icons-material";
import ReusableTable from '../../Components/ReUsable/Table';
import { UENCell } from '../../Components/helpers';
import { useNavigate } from "react-router-dom";
// import {  dailyJobsListMockResp } from './data';
import {
  useDailyPlanFiltersMutation,
  useGetDailyJobMetricsQuery,
} from "../../store/services/api";
import { ApiStatsResponse,DailyJob } from '../../store/Interfaces/createDailyPlanTypes';
import { generateId,formatDate } from '../../Components/helpers';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface DailyPlanProps {
  title?: string;
}

interface StatItem {
  title: string;
  value: number;
}

interface TableDataModel {
  _id: string;
  unitEffectivityNumber: string;
  customer: {
    image: string;
    customerName: string;
  };
  indentNumber: string;
  masterVersionNo: Number | string;
  labelType: string;
  createdAt: string;
  jobRunDate: string;
  status:string;
}

const transformApiDataToStats = (apiData: ApiStatsResponse | undefined): StatItem[] => {
  if (!apiData) {
    // Return empty stats when no data
    return [
      { title: "Total Jobs", value: 0 },
      { title: "Lamination Jobs", value: 0 },
      { title: "Non-Lamination Jobs", value: 0 },
      { title: "New Jobs Added", value: 0 },
    ];
  }

  return [
    { title: "Total Jobs", value: apiData.totalJobs || 0 },
    { title: "Lamination Jobs", value: apiData.laminationJobs || 0 },
    { title: "Non-Lamination Jobs", value: apiData.nonLaminationJobs || 0 },
    { title: "New Jobs Added", value: apiData.newJobs || 0 },
  ];
};

const transformJobDataList = (apiData: DailyJob[] | undefined): TableDataModel[] => {
  if(!apiData){
   return [ {
      _id: generateId(),
      unitEffectivityNumber: "N/A",
      customer: { 
        image: "", 
        customerName:  "N/A" 
      },
      indentNumber: "N/A",
      masterVersionNo:  "N/A",
      labelType: "N/A",
      createdAt: "N/A",
      jobRunDate: "N/A",
      status:"N/A"
    }]
  }

  return apiData.map((job: DailyJob) => ({
    _id: generateId(),
    unitEffectivityNumber: job.unitEffectivityNumber || "--",
    customer: { 
      image: "", 
      customerName: job.customerName || "--" 
    },
    indentNumber: job.indentNumber || "--",
    masterVersionNo: job.masterVersionNo || "--",
    labelType: job.labelType || "--",
    createdAt: formatDate(job.createdAt),
    jobRunDate: formatDate(job.jobRunDate),
    status:job.status
  }));
};

const DailyPlan: React.FC<DailyPlanProps> = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const { 
    data: metricsData, 
    isLoading: isMetricsLoading, 
    // isError: isMetricsError, 
    // error: metricsError 
  } = useGetDailyJobMetricsQuery();

  
  // Jobs list API call
  // const { 
  //   data: dailyJobsList, 
  //   isLoading: isJobsLoading,
  //   // isError: isJobsError,
  //   // error: jobsError
  // } = useGetDailyJobsListQuery(pagination);

    const { filtersPayload,openSliderDaily,dropDown } = useSelector(
      (state: RootState) => state.viewDailyPlan
    );
  const [
    dailyPlanFilters,
    {
      data: listOfCompaniesData,
      isLoading: listOfCompaniesLoading,
      isError: companiesError,
    },
  ] = useDailyPlanFiltersMutation();
  useEffect(() => {

  
    if (!openSliderDaily|| dropDown) {
      dailyPlanFilters({ ...filtersPayload, page: page, size: rowsPerPage });
    }
  }, [page, openSliderDaily, filtersPayload, dropDown]);
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const stats = transformApiDataToStats(metricsData?.data) ;
  const data = transformJobDataList(listOfCompaniesData?.data)
  const navigate = useNavigate();
  const columns = [
    { id: "indentNumber", label: "Indent Number", align: false, format: (value: string,row:any) => <UENCell value={value} onClick={()=>{
      const uniteffectiveNumber = row.unitEffectivityNumber
      localStorage.setItem("unitEffectiveNumberDaily",uniteffectiveNumber);
      localStorage.setItem("status",row.status);
      const encodedParam = encodeURIComponent(value);
      navigate(`/viewDailyPlan/${encodedParam}`)
    }} />, },
      {
        id: "unitEffectivityNumber",
        label: "Effective Unit Number",
        align: false,
      },
      {
        id: "customer",
        label: "Customer",
        align: false,
        format: (value: { image?: string; customerName: string }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              src={value.image || undefined} // Show image if available
              alt={value.customerName}
              sx={{
                width: 32,
                height: 32,
                fontSize: 14,
                bgcolor: value.image ? "transparent" : "#656565", // Background if no image
              }}
            >
              {!value.image && value.customerName?.charAt(0).toUpperCase()}{" "}
              {/* Show initial */}
            </Avatar>
            <Typography variant="body2">{value.customerName}</Typography>{" "}
            {/* Display name */}
          </Box>
        ),
      },
      {
        id: "labelType",
        label: "Type Of Label",
        align: true,
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
             ) : null,
         },
      {
        id: "masterVersionNo",
        label: "Master Data Version",
        align: true,
      },
      {
        id: "status",
        label: "Status",
        align: true,
        dropdown: true,
        dropdownOptions: [
          { label: "Inprogress", value: "Inprogress" },
          { label: "Completed", value: "Completed" },
          { label: "Active", value: "Active" },
          {label:"Inactive",value:"Inactive"}
        ]
      },
      { id: "createdAt", label: "Created On", align: false },
      // { id: "lastUpdated", label: "Last Updated", align: false },
      { id: "jobRunDate", label: "Scheduled On", align: false },
    ];
      if ( companiesError) {
        return (
          <Box sx={{ textAlign: "center", color: "error.main" }}>
            <Typography variant="h6">
              There was an error fetching the data. Please try again later.
            </Typography>
          </Box>
        );
      }
  return (
     <Box sx={{ p: 0 }}>
          <Grid container spacing={1}>
            {isMetricsLoading ? (
              // Show skeletons when loading
              Array.from({ length: 4 }).map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`skeleton-${index}`}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={100}
                    sx={{ borderRadius: 2 }}
                  />
                </Grid>
              ))
            ) : (
              // Show actual cards when not loading
              stats.map((stat, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                  <Cards
                    title={stat.title}
                    value={stat.value}
                    icon={
                      <InfoOutline
                        sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
                      />
                    }
                  />
                </Grid>
              ))
            )}
          </Grid>
          <Box sx={{ paddingTop: 2 }}>
            <ReusableTable
              columns={columns}
              data={data}
              selectable={true}
              label={`${listOfCompaniesData?.totalRecords? listOfCompaniesData.totalRecords:0} Jobs`}
              title="List of Job Tracker"
              // lastUpdate="2 hours ago"
              info={true}
              searchVisible={true}
              action={true}
              onSelectionChange={(selectedItems) => {
                console.log('Selected items:', selectedItems);
              }}
              id={"dailyPlan"}
              rowIdentifier="_id" 
              isLoading={listOfCompaniesLoading}
              rowsPerPage={rowsPerPage}
              totalLength={
                listOfCompaniesData?.totalRecords
                  ? listOfCompaniesData.totalRecords
                  : 0
              }
              pageRange={true}
              onPageChange={handlePageChange}
              actions={[
                {
                  label: "Download",
                  onClick: async () => {
                    // this is the sample file download , replace it when we get the real url
                    try{
                    const response = await fetch('https://pdfobject.com/pdf/sample.pdf');
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'sample.pdf';
                    document.body.appendChild(link);
                    link.click();

                    // Clean up
                    link.remove();
                    window.URL.revokeObjectURL(url);
                    }
                    catch(e){
                      toast.error("Failed to Downlaod");
                      
                    }
                  },
                },
                {
                  label: "InActive",
                  onClick: () =>     toast.success("Status Updated Successfully")
                },
              ]}
              boxShadow={true}
            />
          </Box>
     </Box>
  );
};

export default DailyPlan;