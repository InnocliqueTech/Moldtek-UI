import React from 'react';
import { Avatar, Box, Grid, Typography } from "@mui/material";
import Cards from '../../Components/ReUsable/Cards'
import { InfoOutline } from "@mui/icons-material";
import ReusableTable from '../../Components/ReUsable/Table';
import { UENCell } from '../../Components/helpers';
import { useNavigate } from "react-router-dom";
import { stats, data } from './data';

interface DailyPlanProps {
  title?: string;
}

const DailyPlan: React.FC<DailyPlanProps> = () => {
  const navigate = useNavigate();
   const columns = [
    { id: "version", label: "Indent Number", align: false, format: (value: string) => <UENCell value={value} onClick={()=>{
      navigate('/viewDailyPlan')
    }} />, },
      {
        id: "uen",
        label: "Effective Unit Number",
        align: false,
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
      {
        id: "segment",
        label: "Type Of Label",
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
      {
        id: "masterDataVersion",
        label: "Master Data Version",
        align: true,
      },
      { id: "createdOn", label: "Created On", align: false },
      // { id: "lastUpdated", label: "Last Updated", align: false },
      { id: "lastExecuted", label: "Scheduled On", align: false },
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
    
          <Box sx={{ paddingTop: 2 }}>
            <ReusableTable
              columns={columns}
              data={data}
              selectable={true}
              label="42 Companies"
              title="List of Job Tracker"
              // lastUpdate="2 hours ago"
              info={true}
              searchVisible={true}
              action={true}
              onSelectionChange={(selectedItems) => {
                console.log('Selected items:', selectedItems);
              }}
              rowIdentifier="_id" 
              actions={[
               
                // {
                //   label: "Edit",
                //   onClick: () => navigate(`/edit`),
                // },
                {
                  label: "Download",
                  onClick: () => navigate(`/download`),
                },
                {
                  label: "InActive",
                  onClick: () => navigate(`/inactive`),
                },
              ]}
              boxShadow={true}
            />
          </Box>
        </Box>
  );
};

export default DailyPlan;