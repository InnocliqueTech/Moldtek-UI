import React from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import Cards from "../../Components/ReUsable/Crads";
import {InfoOutline } from "@mui/icons-material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import  { UENCell } from "../../Components/helpers";

const MasterData: React.FC = () => {
  const navigate = useNavigate();


  const stats = [
    { title: "Total Jobs", value: 2000 },
    { title: "Lamination Jobs", value: 1140 },
    { title: "Non-Lamination Jobs", value: 860 },
    { title: "New Jobs Added", value: 674 },
  ];
  const columns = [
    {
      id: "uen",
      label: "Unit Effectivity Number",
      align: false,
      format: (value: string) => <UENCell value={value} />,
    },
    {
      id: "customer",
      label: "Customer",
      align: false,
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
    { id: "version", label: "Version Number", align: true },
    {
      id: "segment",
      label: "Segment",
      align: true,
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
    { id: "createdOn", label: "Created On", align: false },
    { id: "lastUpdated", label: "Last Updated", align: false },
    { id: "lastExecuted", label: "Last Executed", align: false },
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
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
      <Box sx={{ paddingTop: 2 }}>
        <ReusableTable
          columns={columns}
          data={data}
          selectable={false}
          label="42 Companies"
          title="List of Companies"
          lastUpdate="2 hours ago"
          info={true}
          searchVisible={true}
          actions={[
            {
              label: "View",
              // icon: <VisibilityIcon fontSize="small" />,
              onClick: (row) => navigate(`/viewMasterData`),
            },
            {
              label: "Edit",
              // icon: <EditIcon fontSize="small" />,
              onClick: (row) => navigate(`/editMasterData`),
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default MasterData;
