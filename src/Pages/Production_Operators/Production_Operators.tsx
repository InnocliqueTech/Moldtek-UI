import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";
import Cards from "../../Components/ReUsable/Cards";
import { Edit, InfoOutline } from "@mui/icons-material";
import ReusableTable from "../../Components/ReUsable/Table";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  setIsSearchTriggered,
} from "../../store/slices/masterDataSlice";
import { setCreateSlider, setKLDEdit } from "../../store/slices/kldSlice";

const ProductionOperatorsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

 const data = {
    totalKld: 124,
    kldSetCode: 46,
    kldJarCode: 61,
    kldCapCode: 17,
  };
  const storageKey = "kldDataPage";
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem(storageKey);
    return savedPage !== null ? Number(savedPage) : 0;
  });
  const rowsPerPageStorageKey = "kldDataRowsPerPage";
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const savedPage = localStorage.getItem(rowsPerPageStorageKey);
    return savedPage !== null ? Number(savedPage) : 10;
  });
  const stats = [
    {
      title: "Total KLD",
      value: data?.totalKld || 0,
      infoText:
        "Displays the count of master data jobs with the latest version",
    },
    {
      title: "KLD-SET CODE",
      value: data?.kldSetCode || 0,
      infoText:
        "Displays the total count of lamination jobs where label type is Thinwall or segment is designated as TW",
    },
    {
      title: "KLD-JAR CODE",
      value: data?.kldJarCode || 0,
      infoText:
        "Displays the total count of non-lamination jobs where label type is not Thinwall and segment is not TW",
    },
    {
      title: "KLD-CAP CODE",
      value: data?.kldCapCode || 0,
      infoText: "Displays the total count of customers",
    },
  ];

  const handleRowsPerPageChange = (event: SelectChangeEvent<string>): void => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  };

const rows = [
  {
    unit_effectivity_number: "UEN123456",
    version_no: "v1.0",
    jarCap: "JAR",
    item_code: "FSI0460MLRRXXXX",
    kld_code: "KLD-001-ABCD",
  },
  {
    unit_effectivity_number: "UEN987654",
    version_no: "v2.3",
    jarCap: "CAP",
    item_code: "FSI1000MLPBXXXX",
    kld_code: "KLD-002-XYZT",
  },
  {
    unit_effectivity_number: "UEN555888",
    version_no: "v3.1",
    jarCap: "JAR/CAP",
    item_code: "FSI500MLTWXXXX",
    kld_code: null,
  },
];


  const columns = [
    {
      id: "unit_effectivity_number",
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
    <Typography
      variant="body2"
      sx={{ fontWeight: 500, color: "#424242" }}
    >
      {value}
    </Typography>
  ),
},


    {
      id: "item_code",
      label: "Item Code",
      align: true,
      disableSorting: false,
    },
    {
      id: "kld_code",
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

  // const { filtersPayload, openSider, isSearchTriggered } = useSelector(
  //   (state: RootState) => state.masterData
  // );
  // const [
  //   masterFilters,
  //   { data: listOfCompaniesData, isLoading: listOfCompaniesLoading },
  // ] = useMasterFiltersMutation();

  // useEffect(() => {
  //   if (!openSider) {
  //     masterFilters({
  //       ...filtersPayload,
  //       page: isSearchTriggered ? 0 : page,
  //       size: rowsPerPage,
  //     });
  //   }
  //   if (isSearchTriggered) {
  //     setPage(0);
  //   }
  // }, [page, openSider, filtersPayload, rowsPerPage]);


  useEffect(() => {
    localStorage.setItem(storageKey, page.toString());
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  }, [page, rowsPerPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(setIsSearchTriggered(false));
    localStorage.setItem(storageKey, newPage.toString());
  };



const actions =[
        {
          icon: (
            <Tooltip title="Update" arrow>
              <IconButton size="small" color="primary">
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          ),
          onClick: () => {
           dispatch(setKLDEdit(true));
           dispatch(setCreateSlider(true));
          },
        },
      ]

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
                // isLoading={isLoading}
                infoText={stat.infoText}
              />
            </Grid>
          ))}
      </Grid>

      <Box sx={{ paddingTop: 1.5 }}>
        <ReusableTable
          infoText={
            "Displays a list of master data entries with their associated SKU information."
          }
          boxShadow={true}
          columns={columns}
          pageNumber={page}
          data={rows ? rows : []}
          selectable={false}
          label={
            rows?.length
              ? `${ rows?.length} klds`
              : "0 klds"
          }
          title="KLD Overview"
          info={true}
          searchVisible={true}
          action={true}
          actions={actions}
          // isLoading={listOfCompaniesLoading}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          id={"kldData"}
          totalLength={
            rows?.length
              ?  rows?.length
              : 0
          }
          pageRange={true}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
    </Box>
  );
};

export default ProductionOperatorsPage;
