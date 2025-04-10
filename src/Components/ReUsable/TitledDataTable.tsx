import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import InfoOutline from "@mui/icons-material/InfoOutlined";
import DataTable from "./MasterDataTable"; // Adjust the import path as needed

interface Column {
  id: string;
  label: string;
  isDropdown?: boolean;
  options?: string[];
  edit?: boolean;
  editSelect?: boolean;
}

interface TitledDataTableProps<T> {
  title?: string;
  columns: Column[];
  data: T[];
  setData?: React.Dispatch<React.SetStateAction<T[]>>;
  borderColor?: string;
  borderRadius?: string | number;
  titleColor?: string;
  infoIconColor?: string;
  firstRow?: boolean
}

const TitledDataTable = <T extends Record<string, any>>({
  title = "",
  columns,
  data,
  setData,
  borderColor = "#ECECEC",
  borderRadius = "16px",
  titleColor = "#2F2FF",
  infoIconColor = "#9F9F9F",
  firstRow = false
}: TitledDataTableProps<T>) => {
  return (
    <Box
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
        py: 0,
        mt: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography
          sx={{
            color: titleColor,
            fontWeight: 600,
            fontSize: "16px",
          }}
          gutterBottom
        >
          {title}
        </Typography>
        <InfoOutline
          sx={{ color: infoIconColor, width: 20, height: 20 }}
        />
      </Box>
      <Box sx={{
        borderBottom: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
      }}>
        <DataTable
          columns={columns}
          data={data}
          setData={setData}
          tableTitle={true}
          firstRow={firstRow ? true : false}
        />
      </Box>
      <Box className="mt-4 p-4 ">
        <Box>
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Unit Effectivity Number
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                UEN-20240801
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              {/* <Box sx={{ mt: 2 }}> */}
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                ITEM Code
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                KK-50G-123
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Jar/Cap
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                N/A (For flexible packaging)
              </Typography>
              {/* </Box> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default TitledDataTable;