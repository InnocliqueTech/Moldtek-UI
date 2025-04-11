import React from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import Cards from "../../Components/ReUsable/Cards";
import { InfoOutline } from "@mui/icons-material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import { UENCell } from "../../Components/helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setSelectedTab } from "../../store/slices/masterDataSlice";

const MasterData: React.FC = () => {
  const navigate = useNavigate();
const dispatch = useDispatch<AppDispatch>();
  const stats = [
    { title: "Total Jobs", value: 2000 },
    { title: "Lamination Jobs", value: 1140 },
    { title: "Non-Lamination Jobs", value: 860 },
    { title: "Total Customers", value: 674 },
  ];
  const columns = [
    {
      id: "uen",
      label: "Unit Effectivity Number",
      align: false,
      format: (value: string) => <UENCell value={value} onClick={() => {dispatch(setSelectedTab(0)),navigate('/viewMasterData')}} />,
      disableSorting: false,
    },
    {
      id: "customer",
      label: "Customer",
      align: false,
      disableSorting: false,
      format: (value: { image?: string; customer: string }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={value.image || undefined} // Show image if available
            alt={value.customer}
            sx={{
              width: 32,
              height: 32,
              fontSize: 14,
              bgcolor: value.image ? "transparent" : "#656565", // Background if no image
            }}
          >
            {!value.image && value.customer?.charAt(0).toUpperCase()}{" "}
            {/* Show initial */}
          </Avatar>
          <Typography variant="body2">{value.customer}</Typography>{" "}
          {/* Display name */}
        </Box>
      ),
    },
    {
      id: "version",
      label: "Version No",
      align: true,
      disableSorting: false,
    },
    {
      id: "segment",
      label: "Type Of Label",
      align: true,
      disableSorting: false,
      format: (value: string) => (
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
      ),
    },
    {
      id: "createdOn",
      label: "Created On",
      align: false,
      disableSorting: false,
    },
    {
      id: "lastUpdated",
      label: "Last Updated",
      align: false,
      disableSorting: false,
    },
  ];

  const data = [
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Hero - Hero Corporation" },
      version: 8861,
      segment: "LB",
      createdOn: "28/10/2012",
      lastUpdated: "1 hour ago",
      lastExecuted: "28/10/2012",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Tech - Technologies Co." },
      version: 9151,
      segment: "TW",
      createdOn: "18/09/2016",
      lastUpdated: "3 hours ago",
      lastExecuted: "18/09/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Gen - General Enterprise" },
      version: 5626,
      segment: "QP",
      createdOn: "07/05/2016",
      lastUpdated: "2 hours ago",
      lastExecuted: "07/05/2016",
    },
    {
      uen: "UEN-20240802",
      customer: { image: "", customer: "Hero - Hero Corporation" },
      version: 8861,
      segment: "LB",
      createdOn: "28/10/2012",
      lastUpdated: "1 hour ago",
      lastExecuted: "28/10/2012",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Tech - Technologies Co." },
      version: 9151,
      segment: "TW",
      createdOn: "18/09/2016",
      lastUpdated: "3 hours ago",
      lastExecuted: "18/09/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Gen - General Enterprise" },
      version: 5626,
      segment: "QP",
      createdOn: "07/05/2016",
      lastUpdated: "2 hours ago",
      lastExecuted: "07/05/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Hero - Hero Corporation" },
      version: 8861,
      segment: "LB",
      createdOn: "28/10/2012",
      lastUpdated: "1 hour ago",
      lastExecuted: "28/10/2012",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Tech - Technologies Co." },
      version: 9151,
      segment: "TW",
      createdOn: "18/09/2016",
      lastUpdated: "3 hours ago",
      lastExecuted: "18/09/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Gen - General Enterprise" },
      version: 5626,
      segment: "QP",
      createdOn: "07/05/2016",
      lastUpdated: "2 hours ago",
      lastExecuted: "07/05/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Hero - Hero Corporation" },
      version: 8861,
      segment: "LB",
      createdOn: "28/10/2012",
      lastUpdated: "1 hour ago",
      lastExecuted: "28/10/2012",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Tech - Technologies Co." },
      version: 9151,
      segment: "TW",
      createdOn: "18/09/2016",
      lastUpdated: "3 hours ago",
      lastExecuted: "18/09/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Gen - General Enterprise" },
      version: 5626,
      segment: "QP",
      createdOn: "07/05/2016",
      lastUpdated: "2 hours ago",
      lastExecuted: "07/05/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Hero - Hero Corporation" },
      version: 8861,
      segment: "LB",
      createdOn: "28/10/2012",
      lastUpdated: "1 hour ago",
      lastExecuted: "28/10/2012",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Tech - Technologies Co." },
      version: 9151,
      segment: "TW",
      createdOn: "18/09/2016",
      lastUpdated: "3 hours ago",
      lastExecuted: "18/09/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Gen - General Enterprise" },
      version: 5626,
      segment: "QP",
      createdOn: "07/05/2016",
      lastUpdated: "2 hours ago",
      lastExecuted: "07/05/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Hero - Hero Corporation" },
      version: 8861,
      segment: "LB",
      createdOn: "28/10/2012",
      lastUpdated: "1 hour ago",
      lastExecuted: "28/10/2012",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Tech - Technologies Co." },
      version: 9151,
      segment: "TW",
      createdOn: "18/09/2016",
      lastUpdated: "3 hours ago",
      lastExecuted: "18/09/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Gen - General Enterprise" },
      version: 5626,
      segment: "QP",
      createdOn: "07/05/2016",
      lastUpdated: "2 hours ago",
      lastExecuted: "07/05/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Hero - Hero Corporation" },
      version: 8861,
      segment: "LB",
      createdOn: "28/10/2012",
      lastUpdated: "1 hour ago",
      lastExecuted: "28/10/2012",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Tech - Technologies Co." },
      version: 9151,
      segment: "TW",
      createdOn: "18/09/2016",
      lastUpdated: "3 hours ago",
      lastExecuted: "18/09/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Gen - General Enterprise" },
      version: 5626,
      segment: "QP",
      createdOn: "07/05/2016",
      lastUpdated: "2 hours ago",
      lastExecuted: "07/05/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Hero - Hero Corporation" },
      version: 8861,
      segment: "LB",
      createdOn: "28/10/2012",
      lastUpdated: "1 hour ago",
      lastExecuted: "28/10/2012",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Tech - Technologies Co." },
      version: 9151,
      segment: "TW",
      createdOn: "18/09/2016",
      lastUpdated: "3 hours ago",
      lastExecuted: "18/09/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Gen - General Enterprise" },
      version: 5626,
      segment: "QP",
      createdOn: "07/05/2016",
      lastUpdated: "2 hours ago",
      lastExecuted: "07/05/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Hero - Hero Corporation" },
      version: 8861,
      segment: "LB",
      createdOn: "28/10/2012",
      lastUpdated: "1 hour ago",
      lastExecuted: "28/10/2012",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Tech - Technologies Co." },
      version: 9151,
      segment: "TW",
      createdOn: "18/09/2016",
      lastUpdated: "3 hours ago",
      lastExecuted: "18/09/2016",
    },
    {
      uen: "UEN-20240801",
      customer: { image: "", customer: "Gen - General Enterprise" },
      version: 5626,
      segment: "QP",
      createdOn: "07/05/2016",
      lastUpdated: "2 hours ago",
      lastExecuted: "07/05/2016",
    },
  ];

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
          data={data}
          selectable={false}
          label="42 Companies"
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
              onClick: () => navigate(`/updateMasterData/${123}`),
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default MasterData;
