import { Box, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

const ReportsPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <BarChartIcon sx={{ fontSize: 64, color: "primary.main" }} />
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Reports
      </Typography>
      <Typography variant="body1" color="text.secondary">
        You don’t have any data yet. Please go through the sidebar navigation.
      </Typography>
    </Box>
  );
};

export default ReportsPage;
