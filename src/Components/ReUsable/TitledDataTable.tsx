import React from "react";
import { Box, Typography } from "@mui/material";
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
}:TitledDataTableProps<T>) => {
  return (
    <Box
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
        py: 0,
        mt: 2,
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
      <DataTable
        columns={columns}
        data={data}
        setData={setData}
        tableTitle={true}
        firstRow={true}
      />
    </Box>
  );
};

export default TitledDataTable;