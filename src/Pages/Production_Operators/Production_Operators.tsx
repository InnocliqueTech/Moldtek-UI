import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  SelectChangeEvent,
  Tooltip,
  Typography,
  Alert,
  Skeleton,
} from "@mui/material";
import Cards from "../../Components/ReUsable/Cards";
import { Edit, InfoOutline } from "@mui/icons-material";
import ReusableTable from "../../Components/ReUsable/Table";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setIsSearchTriggered } from "../../store/slices/masterDataSlice";
import {
  setCreateSlider,
  setKLDEdit,
  setRowKLDData,
} from "../../store/slices/kldSlice";
import {
  useGetKLDDataMutation,
  useGetKLDmetricsQuery,
  useKldDataGlobalSearchMutation,
} from "../../store/apis/kldApis";
import { KLDData } from "../../store/apis/kldApis";

const ProductionOperatorsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: kldMetricsData, isLoading, isError } = useGetKLDmetricsQuery();
  const apiStats: KLDData | undefined = kldMetricsData?.data;
  const storageKey = "kldDataPage";
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem(storageKey);
    return savedPage !== null ? Number(savedPage) : 0;
  });
  const [previousPage, setPreviousPage] = useState(0);
  const rowsPerPageStorageKey = "kldDataRowsPerPage";
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const savedPage = localStorage.getItem(rowsPerPageStorageKey);
    return savedPage !== null ? Number(savedPage) : 10;
  });
  const stats = [
    {
      title: "Total KLD",
      value: apiStats?.["Total"] ?? 0,
      infoText: "Displays the total count of created KLD's",
    },
    {
      title: "KLD-SET CODE",
      value: apiStats?.["KLD - SET CODE"] ?? 0,
      infoText: "Displays the total count of Jar and Cap KLD sets.",
    },
    {
      title: "KLD-JAR CODE",
      value: apiStats?.["KLD - JAR CODE"] ?? 0,
      infoText: "Displays the total count of Jar KLD sets.",
    },
    {
      title: "KLD-CAP CODE",
      value: apiStats?.["KLD - CAP CODE"] ?? 0,
      infoText: "Displays the total count of Cap KLD sets.",
    },
  ];

  const handleRowsPerPageChange = (event: SelectChangeEvent<string>): void => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  };

  const columns = [
    {
      id: "unitEffectiveNumber",
      label: "Unit Effective Number",
      align: false,
      disableSorting: false,
    },
    {
      id: "jarCap",
      label: "Jar/Cap",
      align: false,
      disableSorting: false,
      format: (value: string) => (
        <Typography variant="body2" sx={{ fontWeight: 500, color: "#424242" }}>
          {value}
        </Typography>
      ),
    },

    {
      id: "itemCode",
      label: "Item Code",
      align: true,
      disableSorting: false,
    },
    {
      id: "kldCode",
      label: "KLD Code",
      align: false,
      disableSorting: false,
      format: (value: string | null) =>
        value ? (
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
  ];

  const {
    filtersPayload,
    openSliderKld,
    isSearchTriggered,
    debouncedSearchKLD,
    createSlider,
  } = useSelector((state: RootState) => state.kld);

  const [
    getKLDData,
    { data: listOfCompaniesData, isLoading: listOfCompaniesLoading },
  ] = useGetKLDDataMutation();

  const [
    kldDataGlobalSearch,
    { data: globalSearchData, isLoading: searchLoading },
  ] = useKldDataGlobalSearchMutation();

  useEffect(() => {
    if (debouncedSearchKLD === "" && !openSliderKld && !createSlider) {
      getKLDData({
        ...filtersPayload,
        page: isSearchTriggered ? 0 : page,
        size: rowsPerPage,
      });
    }
    if (isSearchTriggered) {
      setPage(0);
    }
  }, [page, filtersPayload, rowsPerPage, createSlider]);

  useEffect(() => {
    if (page !== 0) {
      setPreviousPage(page);
    }
    if (debouncedSearchKLD !== "" && !openSliderKld && !createSlider) {
      kldDataGlobalSearch({
        page: page,
        size: rowsPerPage,
        searchField: debouncedSearchKLD,
      });
    }
    if (debouncedSearchKLD !== "") {
      setPage(0);
    }
    if (debouncedSearchKLD === "") {
      setPage(previousPage);
    }
  }, [page, rowsPerPage, debouncedSearchKLD]);

  useEffect(() => {
    localStorage.setItem(storageKey, page.toString());
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  }, [page, rowsPerPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(setIsSearchTriggered(false));
    localStorage.setItem(storageKey, newPage.toString());
  };

  const actions = [
    {
      icon: (
        <Tooltip title="Update" arrow>
          <IconButton size="small" color="primary">
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
      onClick: (row: any) => {
        dispatch(setRowKLDData(row));
        dispatch(setKLDEdit(true));
        dispatch(setCreateSlider(true));
      },
    },
  ];

  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={1}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
              <Skeleton
                variant="rectangular"
                height={120}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))
        ) : isError ? (
          <Grid size={{ xs: 12 }}>
            <Alert severity="error">
              Failed to fetch KLD metrics. Please try again later.
            </Alert>
          </Grid>
        ) : (
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
          ))
        )}
      </Grid>

      <Box sx={{ paddingTop: 1.5 }}>
        <ReusableTable
          infoText={"Displays a list of master data KLD entries"}
          boxShadow={true}
          columns={columns}
          pageNumber={page}
          data={
            debouncedSearchKLD
              ? globalSearchData?.data ?? []
              : listOfCompaniesData?.data?.content ?? []
          }
          selectable={false}
          label={`${
            debouncedSearchKLD
              ? globalSearchData?.totalRecords ?? 0
              : listOfCompaniesData?.data?.totalItems ?? 0
          } klds`}
          title="KLD Overview"
          info={true}
          searchVisible={true}
          action={true}
          actions={actions}
          isLoading={listOfCompaniesLoading || searchLoading}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          id={"kldData"}
          totalLength={
            debouncedSearchKLD
              ? globalSearchData?.totalRecords ?? 0
              : listOfCompaniesData?.data?.totalItems ?? 0
          }
          pageRange={true}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
    </Box>
  );
};

export default ProductionOperatorsPage;
