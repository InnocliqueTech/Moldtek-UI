import React from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";

interface StatsCardProps {
  title: string;
  value?: number;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value,icon }) => {
  return (
    <Card sx={{ minWidth: 200, borderRadius: '16px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{fontSize:'14px',color:'#2F2F2F',fontWeight:600}}>
            {title}
          </Typography>
          <Box>{icon}</Box>
        </Box>
        <Typography sx={{fontSize:'20px',color:'#2F2F2F',fontWeight:600,mt:1}}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard
