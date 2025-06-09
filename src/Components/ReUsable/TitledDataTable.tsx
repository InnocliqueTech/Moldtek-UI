import React from "react";
import { Box, Typography } from "@mui/material";
// import InfoOutline from "@mui/icons-material/InfoOutlined";
import DataTable from "./MasterDataTable"; // Adjust the import path as needed
import InfoContainer, { InfoItem } from "./InfoContainer";

interface Column {
  id: string;
  label: string;
  isDropdown?: boolean;
  options?: string[];
  edit?: boolean;
  editSelect?: boolean;
  editIcon?:boolean;
}

interface TitledDataTableProps<T> {
  title?: string;
  columns?: Column[];
  data?: T[];
  setData?: ((data: T[]) => void) | React.Dispatch<React.SetStateAction<T[]>>;
  borderColor?: string;
  borderRadius?: string | number;
  titleColor?: string;
  infoIconColor?: string;
  firstRow?: boolean;
  infoItems?: InfoItem[];
  showInfoSection?: boolean;
  showTableSection?: boolean;
  isEditing?: boolean;
  setInfoItems?: (items: InfoItem[]) => void;
  // rowEditable?: (row: T) => boolean;
  rowEditable?: (row: T, columnId: string) => boolean;
}

const TitledDataTable = <T extends Record<string, any>>({
  title = "",
  columns = [],
  data = [],
  setData,
  borderColor = "#ECECEC",
  borderRadius = "16px",
  titleColor = "#2F2FF",
  // infoIconColor = "#9F9F9F",
  firstRow = false,
  infoItems = [],
  showInfoSection = false,
  showTableSection = true,
  isEditing,
  setInfoItems,
  rowEditable,
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
          // padding: !showTableSection?  "8px 8px 0px 8px" : "8px",
          padding: "8px 8px 0px 8px",
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
        {/* <InfoOutline sx={{ color: infoIconColor, width: 20, height: 20 }} /> */}
      </Box>
      {showTableSection && (
        <Box
          sx={{
            borderBottom: `1px solid ${borderColor}`,
            borderRadius: borderRadius,
            marginBottom: showInfoSection ? "1rem" : "0px",
          }}
        >
          <DataTable
            columns={columns}
            data={data}
            setData={setData}
            tableTitle={true}
            firstRow={firstRow ? true : false}
            rowEditable={rowEditable}
          />
        </Box>
      )}
      {/* container with title and text  */}

      {showInfoSection && infoItems.length > 0 && (
        <InfoContainer
          infoItems={infoItems}
          isEditing={isEditing}
          setInfoItems={setInfoItems}
          borderColor={borderColor}
          startingTimeValue={
            infoItems.find((item) => item.label === "Job Starting Time")
              ?.value || ""
          }
        />
      )}
    </Box>
  );
};

export default TitledDataTable;
