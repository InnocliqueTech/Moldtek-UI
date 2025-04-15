import React from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import Cards from "../../Components/ReUsable/Cards";
import { InfoOutline } from "@mui/icons-material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import { UENCell } from "../../Components/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSelectedTab } from "../../store/slices/viewMasterDataSlice";
import { setSelectedUEN } from "../../store/slices/masterDataSlice";
import { dataofCards, listOfCompanies } from "./data";

const MasterData: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const transformedData = listOfCompanies.data.map((row) => ({
    ...row,
    customer_name: {
      image: row.customer_logo,
      customer: row.customer_name,
    },
  }));

  const stats = [
    { title: "Total Jobs", value: dataofCards.data.totalJobs },
    { title: "Lamination Jobs", value: dataofCards.data.laminationJobs },
    { title: "Non-Lamination Jobs", value: dataofCards.data.nonLaminationJobs },
    { title: "Total Customers", value: dataofCards.data.totalCustomers },
  ];
  const columns = [
    {
      id: "unit_effectivity_number",
      label: "Unit Effectivity Number",
      align: false,
      format: (value: string) => (
        <UENCell
          value={value}
          onClick={() => {
            dispatch(setSelectedUEN(value)),
              dispatch(setSelectedTab(0)),
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
      align: true,
      disableSorting: false,
      format: (value: string) =>
        value !== null ? (
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "4px 8px",
              display: "inline-block",
              backgroundColor: "#F8F9FA",
            }}
          >
            {value}
          </Box>
        ) : null,
    },

    {
      id: "created_at",
      label: "Created On",
      align: false,
      disableSorting: false,
    },
    {
      id: "updated_at",
      label: "Last Updated",
      align: false,
      disableSorting: false,
    },
  ];

  const { selectedUEN } = useSelector((state: RootState) => state.masterData);

  return (
    <Box sx={{ p: 0 }}>
      <Grid container spacing={1}>
        {stats.map((stat, index) => (
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
        ))}
      </Grid>

      <Box sx={{ paddingTop: 1.5 }}>
        <ReusableTable
          boxShadow={true}
          columns={columns}
          data={transformedData}
          selectable={false}
          label={`${listOfCompanies.totalRecords} Companies`}
          title="List of Companies"
          info={true}
          searchVisible={true}
          action={true}
          actions={[
            {
              label: "View Job Data",
              onClick: () => navigate(`/viewJobsList`),
            },
            {
              label: "Update",
              onClick: () => navigate(`/updateMasterData/${selectedUEN}`),
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default MasterData;
