import React from "react";
import { Typography, Card, CardContent, Box, Skeleton, Tooltip } from "@mui/material";

interface StatsCardProps {
  title: string;
  value?: number;
  icon?: React.ReactElement;
  isLoading?: boolean;
  infoText?:string
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, isLoading,infoText='cardInfo' }) => {
  return (
    <Card sx={{ minWidth: 200, borderRadius: "16px", flex: 1 }}>
      <CardContent
        sx={{
          px: "8px",
          pt: "8px",
          pb: "8px !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="circular" width={32} height={32} />
            </>
          ) : (
            <>
              <Typography
                sx={{ fontSize: "14px", color: "#2F2F2F", fontWeight: 600 }}
              >
                {title}
              </Typography>
              {icon &&
              <Box><Tooltip title={infoText}>{icon}</Tooltip></Box>}
            </>
          )}
        </Box>

        <Box sx={{ mt: 1 }}>
          {isLoading ? (
            <Skeleton variant="text" width="40%" height={28} />
          ) : (
            <Typography
              sx={{ fontSize: "20px", color: "#2F2F2F", fontWeight: 600 }}
            >
              {value}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
