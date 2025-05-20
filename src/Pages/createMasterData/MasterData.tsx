import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import Cards from "../../Components/ReUsable/Cards";
import { InfoOutline } from "@mui/icons-material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import { UENCell } from "../../Components/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSelectedTab } from "../../store/slices/viewMasterDataSlice";
import {
  useGetMetricsQuery,
  useMasterFiltersMutation,
} from "../../store/services/api";
import { setIsSearchTriggered, setUpdateButton } from "../../store/slices/masterDataSlice";

const MasterData: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, isError } = useGetMetricsQuery();
  const storageKey = "masterDataPage";
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem(storageKey);
    return savedPage !== null ? Number(savedPage) : 0;
  });
    const rowsPerPageStorageKey = "masterDataRowsPerPage"
    const [rowsPerPage, setRowsPerPage] = useState(()=>{
      const savedPage = localStorage.getItem(rowsPerPageStorageKey);
      return savedPage !==null ? Number(savedPage):10;
    }); 
  const stats = [
    { title: "Total Jobs", value: data?.data.totalJobs||0,infoText:'Displays the count of master data jobs with the latest version'},
    { title: "Lamination Jobs", value: data?.data.laminationJobs||0 ,infoText:'Displays the total count of lamination jobs where label type is Thinwall or segment is designated as TW'},
    { title: "Non-Lamination Jobs", value: data?.data.nonLaminationJobs||0,infoText:'Displays the total count of non-lamination jobs where label type is not Thinwall and segment is not TW' },
    { title: "Total Customers", value: data?.data.totalCustomers||0,infoText:'Displays the total count of customers' },
  ];


  const handleRowsPerPageChange = (event: SelectChangeEvent<string>): void => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  };
  
  const columns = [
    {
      id: "unit_effectivity_number",
      label: "Unit Effective Number",
      align: false,
      format: (value: string, row: any) => (
        <UENCell
          value={value}
          onClick={() => {
            localStorage.setItem("selectedUEN", value);
            localStorage.setItem("selectedVersionNo", row.version_no);
            dispatch(setSelectedTab(0));
            navigate(`/viewMasterData/${value}`);
          }}
        />
      ),
      disableSorting: false,
    },
    {
      id: "customer_name",
      label: "Customer",
      align: false,
      disableSorting: false,
      format: (value: { image: string | null; customer: string | null }) =>
        value && value.customer ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              src={value.image || undefined}
              alt={value.customer}
              sx={{
                width: 32,
                height: 32,
                fontSize: 14,
                bgcolor: "#656565",
              }}
            >
              {!value.image && value.customer?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2">{value.customer}</Typography>
          </Box>
        ) : null,
    },

    {
      id: "version_no",
      label: "Version No",
      align: true,
      disableSorting: false,
    },
    {
      id: "label_type",
      label: "Type Of Label",
      align: false,
      disableSorting: false,
      format: (value: string | null) =>
        value ? (
          <Tooltip title={value}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '4px 8px',
                display: 'inline-block',
                backgroundColor: '#F8F9FA',
                maxWidth: 150,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {value}
            </Box>
          </Tooltip>
        ) : (
          'N/A'
        )
      
    },
    {
      id: "created_at",
      label: "Created On",
      align: false,
      disableSorting: false,
      format: (value: string) =>
        value
          ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-")
          : "",
    },
    {
      id: "updated_at",
      label: "Last Updated",
      align: false,
      disableSorting: false,
      format: (value: string) =>
        value
          ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-")
          : "",
    },
  ];


  const { filtersPayload, openSider,isSearchTriggered } = useSelector(
    (state: RootState) => state.masterData
  );
  const [
    masterFilters,
    {
      data: listOfCompaniesData,
      isLoading: listOfCompaniesLoading,
      isError: companiesError,
    },
  ] = useMasterFiltersMutation();

  useEffect(() => {
    if (!openSider) {
      masterFilters({ ...filtersPayload, page: isSearchTriggered?0:page, size: rowsPerPage });
    }
    if(isSearchTriggered){
      setPage(0)
    }
  }, [page, openSider,filtersPayload,rowsPerPage]);

  const transformedData = listOfCompaniesData?.data?.map((row: any) => ({
    ...row,
    customer_name: {
      image: row.customer_logo,
      customer: row.customer_name,
    },
  }));
  
  useEffect(() => {
    localStorage.setItem(storageKey, page.toString());
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  }, [page,rowsPerPage]);
  

  if (isError || companiesError) {
    return (
      <Box sx={{ textAlign: "center", color: "error.main" }}>
        <Typography variant="h6">
          There was an error fetching the data. Please try again later.
        </Typography>
      </Box>
    );
  }
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(setIsSearchTriggered(false));
    localStorage.setItem(storageKey, newPage.toString());
  };
  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={1}>
        {stats &&
          stats?.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Cards
                title={stat.title}
                value={stat.value}
                icon={
                  <InfoOutline
                    sx={{ color: "#9F9F9F", width: "20px", height: "20px" }}
                  />
                }
                isLoading={isLoading}
                infoText={stat.infoText}
              />
            </Grid>
          ))}
      </Grid>

      <Box sx={{ paddingTop: 1.5 }}>
        <ReusableTable
        infoText={'Displays a list of master data entries with their associated SKU information.'}
          boxShadow={true}
          columns={columns}
          pageNumber={page}
          data={transformedData ? transformedData : []}
          selectable={false}
          label={
            listOfCompaniesData?.totalRecords
              ? `${listOfCompaniesData?.totalRecords} Jobs`
              : "0 Job"
          }
          title="Overview"
          info={true}
          searchVisible={false}
          action={true}
          actions={[
            {
              label: "View Job Data",
              onClick: (row: any) => {
                const selectedUENAction = row?.unit_effectivity_number;
                const versionNoAction = row?.version_no;
                localStorage.setItem("actionSelectedUEN", selectedUENAction);
                localStorage.setItem("actionVersionNo", versionNoAction);
                navigate(`/viewJobsList`); // If you want this to depend on the row, add params here.
              },
            },
            {
              label: "Update",
              onClick: (row: any) => {
                const selectedUENActionUpdate = row?.unit_effectivity_number;
                localStorage.setItem(
                  "actionSelectedUEN",
                  selectedUENActionUpdate
                );
                const versionNoAction = row?.version_no;
                localStorage.setItem("actionVersionNo", versionNoAction);
                const actionSelectedUpdateUEN =
                  localStorage.getItem("actionSelectedUEN");
                  dispatch(setUpdateButton(true))
                navigate(`/updateMasterData/${actionSelectedUpdateUEN}`);
              },
            },
          ]}
          isLoading={listOfCompaniesLoading}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          id={"masterData"}
          totalLength={
            listOfCompaniesData?.totalRecords
              ? listOfCompaniesData?.totalRecords
              : 0
          }
          pageRange={true}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
    </Box>
  );
};

export default MasterData;
