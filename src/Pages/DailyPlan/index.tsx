import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Skeleton,
  Tooltip,
  SelectChangeEvent,
} from "@mui/material";
import Cards from "../../Components/ReUsable/Cards";
import { InfoOutline } from "@mui/icons-material";
import ReusableTable from "../../Components/ReUsable/Table";
import { UENCell } from "../../Components/helpers";
import { useNavigate } from "react-router-dom";
// import {  dailyJobsListMockResp } from './data';
import {
  useDailyPlanFiltersMutation,
  useDailyPlanGlobalSearchMutation,
  useGetDailyJobMetricsQuery,
} from "../../store/apis/dailyPlanApis";
import {
  ApiStatsResponse,
  DailyJob,
} from "../../store/Interfaces/createDailyPlanTypes";
import { generateId, formatDate } from "../../Components/helpers";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setSelectedTabView } from "../../store/slices/viewMasterDataSlice";
import {
  setBackButtonNavigationAllowed,
  setDebouncedSearchDailyPlan,
  setIsEditing,
  setIsSearchTriggered,
  setSideNavigationAllowed,
} from "../../store/slices/viewDailyPlanSlice";

interface DailyPlanProps {
  title?: string;
}

interface StatItem {
  title: string;
  value: number;
  infoText: string;
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
  status: string;
}

const transformApiDataToStats = (
  apiData: ApiStatsResponse | undefined
): StatItem[] => {
  if (!apiData) {
    // Return empty stats when no data
    return [
      {
        title: "Total Jobs",
        value: 0,
        infoText: "Displays the count of newly created jobs",
      },
      {
        title: "Lamination Jobs",
        value: 0,
        infoText:
          "Displays the total count of lamination jobs where label type is Thinwall or segment is designated as TW",
      },
      {
        title: "Non-Lamination Jobs",
        value: 0,
        infoText:
          "Displays the total count of non-lamination jobs where label type is not Thinwall and segment is not TW.",
      },
      {
        title: "Completed Jobs",
        value: 0,
        infoText: "Displays total number of jobs created",
      },
    ];
  }

  return [
    {
      title: "Total Jobs",
      value: apiData.totalJobs || 0,
      infoText: "Displays the count of newly created jobs",
    },
    {
      title: "Lamination Jobs",
      value: apiData.laminationJobs || 0,
      infoText:
        "Displays the total count of lamination jobs where label type is Thinwall or segment is designated as TW",
    },
    {
      title: "Non-Lamination Jobs",
      value: apiData.nonLaminationJobs || 0,
      infoText:
        "Displays the total count of non-lamination jobs where label type is not Thinwall and segment is not TW.",
    },
    {
      title: "Completed Jobs",
      value: apiData.completedJobs || 0,
      infoText: "Displays total number of jobs created",
    },
  ];
};

const transformJobDataList = (
  apiData: DailyJob[] | undefined
): TableDataModel[] => {
  if (!apiData) {
    return [
      {
        _id: generateId(),
        unitEffectivityNumber: "--",
        customer: {
          image: "",
          customerName: "--",
        },
        indentNumber: "--",
        masterVersionNo: "--",
        labelType: "--",
        createdAt: "--",
        jobRunDate: "--",
        status: "--",
      },
    ];
  }

  return apiData.map((job: DailyJob) => ({
    _id: generateId(),
    unitEffectivityNumber: job.unitEffectivityNumber || "--",
    customer: {
      image: "",
      customerName: job.customerName || "--",
    },
    jarCap:job.jarCap,
    indentNumber: job.indentNumber || "--",
    masterVersionNo: job.masterVersionNo || "--",
    labelType: job.labelType || "--",
    createdAt: formatDate(job.createdAt),
    jobRunDate: formatDate(job.jobRunDate),
    status: job.status,
  }));
};

const DailyPlan: React.FC<DailyPlanProps> = () => {
  const storageKey = "dailyPlanDataPage";
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem(storageKey);
    return savedPage !== null ? Number(savedPage) : 0;
  });
   const previousPage = localStorage.getItem('PreviousPageDailyPlan');
  const rowsPerPageStorageKey = "dailyPlanDataRowsPerPage";
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const savedPage = localStorage.getItem(rowsPerPageStorageKey);
    return savedPage !== null ? Number(savedPage) : 10;
  });
  const { data: metricsData, isLoading: isMetricsLoading } =
    useGetDailyJobMetricsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const handleRowsPerPageChange = (event: SelectChangeEvent<string>): void => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  };
  // Jobs list API call
  // const {
  //   data: dailyJobsList,
  //   isLoading: isJobsLoading,
  //   // isError: isJobsError,
  //   // error: jobsError
  // } = useGetDailyJobsListQuery(pagination);

  const {
    filtersPayload,
    openSliderDaily,
    dropDown,
    isSearchTriggered,
    debouncedSearchDailyPlan,
  } = useSelector((state: RootState) => state.viewDailyPlan);
  const [
    dailyPlanFilters,
    {
      data: listOfCompaniesData,
      isLoading: listOfCompaniesLoading,
      // isError: companiesError,
    },
  ] = useDailyPlanFiltersMutation();

  const [
    dailyPlanGlobalSearch,
    { data: globalSearchData, isLoading: searchLoading },
  ] = useDailyPlanGlobalSearchMutation();

  useEffect(() => {
    if ((debouncedSearchDailyPlan === "" && !openSliderDaily) || dropDown) {
      dailyPlanFilters({
        ...filtersPayload,
        page: isSearchTriggered ? 0 : page,
        size: rowsPerPage,
      });
    }
    if (isSearchTriggered) {
      setPage(0);
    }
  }, [page, openSliderDaily, filtersPayload, dropDown, rowsPerPage]);

  useEffect(() => {
    if (debouncedSearchDailyPlan !== "") {
      localStorage.setItem("PreviousPageDailyPlan",page.toString());
      setPage(0);
    } else {
      setPage(Number(previousPage));
    }
  }, [debouncedSearchDailyPlan]);

  useEffect(() => {
    if (!openSliderDaily && debouncedSearchDailyPlan !== "") {
      dailyPlanGlobalSearch({
        page: page,
        size: rowsPerPage,
        searchField: debouncedSearchDailyPlan,
      });
    }
  }, [page, rowsPerPage, debouncedSearchDailyPlan, openSliderDaily]);

  const dispatch = useDispatch();
  const stats = transformApiDataToStats(metricsData?.data);
  const data = transformJobDataList(listOfCompaniesData?.data);
  const dataSearch = transformJobDataList(globalSearchData?.data);
  const navigate = useNavigate();
  const columns = [
    {
      id: "indentNumber",
      label: "Indent Number",
      align: false,
      format: (value: string, row: any) => (
        <UENCell
          value={value}
          row={row}
          onClick={() => {
            if (row?.status != "Inactive") {

              const uniteffectiveNumber = row.unitEffectivityNumber;
              localStorage.setItem(
                "unitEffectiveNumberDaily",
                uniteffectiveNumber
              );
              localStorage.setItem("status", row.status);
              localStorage.setItem("jarCapdaily",row.jarCap);
              const encodedParam = encodeURIComponent(value);
              navigate(`/viewDailyPlan/${encodedParam}`);
              dispatch(setDebouncedSearchDailyPlan(""));
              dispatch(setSelectedTabView(0));
              dispatch(setIsEditing(false));
              dispatch(setSideNavigationAllowed(false));
              dispatch(setBackButtonNavigationAllowed(false));
            }
          }}
        />
      ),
    },
    {
      id: "unitEffectivityNumber",
      label: "Unit Effective Number",
      align: false,
    },
  {
      id: "jarCap",
      label: "JAR/CAP",
      align: true,
      disableSorting: false,
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
      align: false,
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
        { label: "Inactive", value: "Inactive" },
      ],
    },
    { id: "createdAt", label: "Created On", align: false,disableSorting: false, format: (value: string) =>
        value
          ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-")
          : "",
     },
    // { id: "lastUpdated", label: "Last Updated", align: false },
    { id: "jobRunDate", label: "Scheduled On", align: false,disableSorting: false,format: (value: string) =>
        value
          ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-")
          : "", },
  ];
  // if ( companiesError) {
  //   return (
  //     <Box sx={{ textAlign: "center", color: "error.main" }}>
  //       <Typography variant="h6">
  //         There was an error fetching the data. Please try again later.
  //       </Typography>
  //     </Box>
  //   );
  // }

  useEffect(() => {
    localStorage.setItem(storageKey, page.toString());
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  }, [page, rowsPerPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(setIsSearchTriggered(false));
    localStorage.setItem(storageKey, newPage.toString());
  };

  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={1}>
        {isMetricsLoading
          ? // Show skeletons when loading
            Array.from({ length: 4 }).map((_, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={`skeleton-${index}`}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={100}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : // Show actual cards when not loading
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
                  infoText={stat.infoText}
                />
              </Grid>
            ))}
      </Grid>
      <Box sx={{ paddingTop: 2 }}>
        <ReusableTable
          infoText="Displays a list of daily plan jobs, including their details"
          columns={columns}
          data={debouncedSearchDailyPlan ? dataSearch ?? [] : data ?? []}
          selectable={true}
          label={`${
            debouncedSearchDailyPlan
              ? globalSearchData?.totalRecords ?? 0
              : listOfCompaniesData?.totalRecords ?? 0
          } Jobs`}
          title="Job OverView"
          pageNumber={page}
          info={true}
          searchVisible={true}
          action={false}
          onSelectionChange={(selectedItems) => {
            console.log("Selected items:", selectedItems);
          }}
          id={"dailyPlan"}
          rowIdentifier="_id"
          isLoading={listOfCompaniesLoading || searchLoading}
          rowsPerPage={rowsPerPage}
          totalLength={
            debouncedSearchDailyPlan
              ? globalSearchData?.totalRecords ?? 0
              : listOfCompaniesData?.totalRecords ?? 0
          }
          pageRange={true}
          onPageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          // actions={[
          //   {
          //     label: "Download",
          //     onClick: async () => {
          //       // this is the sample file download , replace it when we get the real url
          //       try{
          //       const response = await fetch('https://pdfobject.com/pdf/sample.pdf');
          //       const blob = await response.blob();
          //       const url = window.URL.createObjectURL(blob);

          //       const link = document.createElement('a');
          //       link.href = url;
          //       link.download = 'sample.pdf';
          //       document.body.appendChild(link);
          //       link.click();

          //       // Clean up
          //       link.remove();
          //       window.URL.revokeObjectURL(url);
          //       }
          //       catch(e){
          //         toast.error("Failed to Downlaod");

          //       }
          //     },
          //   },
          //   {
          //     label: "InActive",
          //     onClick: () =>     toast.success("Status Updated Successfully")
          //   },
          // ]}
          boxShadow={true}
        />
      </Box>
    </Box>
  );
};

export default DailyPlan;
