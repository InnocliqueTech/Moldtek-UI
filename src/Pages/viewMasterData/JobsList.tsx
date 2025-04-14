import React, { useEffect } from "react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import { UENCell } from "../../Components/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setJobsListData,
} from "../../store/slices/viewMasterDataSlice";


const JobsList: React.FC = () => {
  const navigate = useNavigate();
  const {selectedUEN} = useSelector((state:RootState)=>state.masterData)
  type StatusType = "In-Progress" | "On-Hold" | "Not Yet Started" | "Completed";

  const colorMap: Record<StatusType, string> = {
    "In-Progress": "#FAECD8",
    "On-Hold": "#F7DDDA",
    "Not Yet Started": "#DCEAF7",
    Completed: "#DDEED8",
  };

  const textColorMap: Record<StatusType, string> = {
    "In-Progress": "#C08532",
    "On-Hold": "#B2493A",
    "Not Yet Started": "#0447A8",
    Completed: "#478E30",
  };

  const columns = [
    {
      id: "uen",
      label: "Indent No.",
      align: true,
      disableSorting: false,
      format: (value: string) => (
        <UENCell value={value} onClick={() => navigate(`/viewMasterData/${selectedUEN}`)} />
      ),
    },
    {
      id: "segment",
      label: "Type Of Label",
      align: true,
      disableSorting: true,
      format: (value: string) => (
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: "6px",
            fontSize: 12,
            color: "#344054",
            fontWeight: 500,
            display: "inline-block",
            border: "1px solid #ECECEC",
          }}
        >
          {value}
        </Box>
      ),
    },
    {
      id: "status",
      label: "Status",
      align: true,
      disableSorting: false,
      format: (value: StatusType) => (
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: "12px",
            fontSize: 12,
            backgroundColor: colorMap[value],
            color: textColorMap[value],
            fontWeight: 500,
            display: "inline-block",
          }}
        >
          {value}
        </Box>
      ),
    },
    {
      id: "lastUpdated",
      label: "Last Update",
      align: true,
      disableSorting: false,
    },
    {
      id: "lastExecuted",
      label: "Last Executed",
      align: true,
      disableSorting: false,
    },
    // {
    //   id: "comment",
    //   label: "Comment",
    //   align: true,
    //   disableSorting: true,
    //   format: (value: number) => (
    //     <Box
    //       sx={{
    //         display: "inline-flex",
    //         alignItems: "center",
    //         gap: 0.5,
    //         backgroundColor: "white",
    //         color: "#2F2F2F",
    //         px: 1.5,
    //         py: 0.5,
    //         borderRadius: "6px",
    //         fontSize: 12,
    //         border: "1px solid #ECECEC",
    //         fontWeight: 500,
    //       }}
    //     >
    //       <Box
    //         component="span"
    //         sx={{
    //           width: 8,
    //           height: 8,
    //           borderRadius: "50%",
    //           color: value > 0 ? "#DC6803" : "#027A48",
    //           backgroundColor: value > 0 ? "#DC6803" : "#12B76A",
    //         }}
    //       />
    //       {value} Feedback
    //     </Box>
    //   ),
    // },
  ];


  const data = [
    {
      uen: "ORD-1001",
      segment: "Printing",
      status: "In-Progress",
      lastUpdated: "2 hours ago",
      lastExecuted: "28/10/2012",
      comment: 1,
    },
    {
      uen: "ORD-1002",
      segment: "Lamination",
      status: "Not Yet Started",
      lastUpdated: "1 hours ago",
      lastExecuted: "18/09/2016",
      comment: 0,
    },
    {
      uen: "ORD-1003",
      segment: "Dye Cutting",
      status: "On-Hold",
      lastUpdated: "3 hours ago",
      lastExecuted: "07/05/2016",
      comment: 0,
    },
    {
      uen: "ORD-1004",
      segment: "Printing",
      status: "In-Progress",
      lastUpdated: "2 hours ago",
      lastExecuted: "16/08/2013",
      comment: 2,
    },
    {
      uen: "ORD-1005",
      segment: "Lamination",
      status: "On-Hold",
      lastUpdated: "1 hours ago",
      lastExecuted: "16/08/2013",
      comment: 0,
    },
    {
      uen: "ORD-1006",
      segment: "Dye Cutting",
      status: "Completed",
      lastUpdated: "3 hours ago",
      lastExecuted: "16/08/2013",
      comment: 0,
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { jobListData, viewMasterDataDetails } = useSelector(
    (state: RootState) => state.viewMasterData
  );

  useEffect(() => {
    dispatch(setJobsListData(data));
  }, [dispatch]);

  const maxChars = 120;
  const isLong = viewMasterDataDetails.brand_description.length > maxChars;
  const displayText = isLong
    ? viewMasterDataDetails.brand_description.slice(0, maxChars) + "..."
    : viewMasterDataDetails.brand_description;

  return (
    <Box sx={{ p: 0 }}>
      <Box p={2} sx={{ backgroundColor: "#fff", borderRadius: 2, mb: 2 }}>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
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
              {viewMasterDataDetails.unit_effectivity_number}
            </Typography>
            <Box sx={{ mt: 2 }}>
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
                {viewMasterDataDetails.item_code}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
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
                {viewMasterDataDetails.jar_cap}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Customer Name
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 0.5,
                wordBreak: "break-word",
                whiteSpace: "pre-line",
              }}
            >
              {viewMasterDataDetails.customer_name}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Structure
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                {viewMasterDataDetails.structure}
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ mt: 2 }} >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500 }}
                color="#656565"
              >
                Type Of Label
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                {viewMasterDataDetails.label_type}
              </Typography>
            </Box>

            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
          <Box />
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Customer Picture
              </Typography>
              {viewMasterDataDetails.customer_logo ? (
                <img
                  src={viewMasterDataDetails.customer_logo}
                  alt="customerPicture"
                />
              ) : null}

            <Box sx={{ mt: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Brand Name & Pack Description
              </Typography>
              <Tooltip
                title={isLong ? viewMasterDataDetails.brand_description : ""}
                placement="top"
                arrow
              >
                <Typography
                  variant="body1"
                  sx={{
                    mt: 0.5,
                    wordBreak: "break-word",
                    whiteSpace: "pre-line",
                  }}
                >
                  {displayText}
                </Typography>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ paddingTop: 1.5 }}>
          <Box
            sx={{
              border: "1px solid #ECECEC",
              borderRadius: "18px",
              overflow: "hidden",
              mt: 1,
            }}
          >
            <ReusableTable
              columns={columns}
              data={jobListData}
              selectable={false}
              label="24 Versions"
              title="List of executed jobs"
              info={true}
              searchVisible={true}
              action={false}
              boxShadow={false}
              searchSize={true}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobsList;
