import { Box, Typography } from "@mui/material";
import { ManageAccountsOutlined } from "@mui/icons-material";

const ProductionOperatorsPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <ManageAccountsOutlined sx={{ fontSize: 64, color: "primary.main" }} />
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Production Operators
      </Typography>
      <Typography variant="body1" color="text.secondary">
        You don’t have any data yet. Please go through the sidebar navigation.
      </Typography>
    </Box>
  );
};

export default ProductionOperatorsPage;
