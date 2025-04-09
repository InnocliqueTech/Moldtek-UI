import React, { useEffect } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../Components/ReUsable/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import customerPicture from "../../assets/Images/customerPicture.png";
import { UENCell } from "../../Components/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setJobsListData,
  setViewMasterDataDetails,
} from "../../store/slices/viewMasterDataSlice";

const JobsList: React.FC = () => {
  const navigate = useNavigate();
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
        <UENCell value={value} onClick={() => navigate("/viewMasterData")} />
      ),
    },
    {
      id: "segment",
      label: "Segment",
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
    {
      id: "comment",
      label: "Comment",
      align: true,
      disableSorting: true,
      format: (value: number) => (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            backgroundColor: "white",
            color: "#2F2F2F",
            px: 1.5,
            py: 0.5,
            borderRadius: "6px",
            fontSize: 12,
            border: "1px solid #ECECEC",
            fontWeight: 500,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              color: value > 0 ? "#DC6803" : "#027A48",
              backgroundColor: value > 0 ? "#DC6803" : "#12B76A",
            }}
          />
          {value} Feedback
        </Box>
      ),
    },
  ];

  const masterDataDetails = {
    uen: "UEN-20240801",
    customerName: "Nestlé",
    customerPicture: customerPicture,
    jarCap: "N/A (For flexible packaging)",
    itemCode: "KK-50G-123",
    brandPack: "KitKat 50g Wrapper",
    structure: "PET",
  };

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

  const onBack = () => {
    navigate("/masterData");
  };

  const dispatch = useDispatch<AppDispatch>();
  const { jobListData, viewMasterDataDetails } = useSelector(
    (state: RootState) => state.viewMasterData
  );

  useEffect(() => {
    dispatch(setJobsListData(data));
    dispatch(setViewMasterDataDetails(masterDataDetails));
  }, [dispatch]);

  return (
    <Box sx={{ p: 0 }}>
      <Box p={2} sx={{ backgroundColor: "#fff", borderRadius: 2, mb: 2 }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid display="flex" alignItems="center">
            <Box sx={{ border: "1px solid #ECECEC", borderRadius: "10px" }}>
              <IconButton
                onClick={onBack}
                sx={{
                  mr: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ ml: "4px" }}>
              Master Data Details{" "}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid>
              <ButtonComponent
                text={"Version History"}
                onClick={() => {}}
                textColor="#2F2F2F"
                color="white"
                borderRadius="100px"
                p={1}
                border="1px solid #ECECEC"
              />
            </Grid>
            <Grid>
              <ButtonComponent
                text={"Modify Master Data"}
                onClick={() => navigate(`/updateMasterData/${123}`)}
                textColor="#2F2F2F"
                color="white"
                borderRadius="100px"
                border="1px solid #ECECEC"
                p={1}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              Unit Effectivity Number
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {viewMasterDataDetails.uen}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              Customer / Company Name
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {viewMasterDataDetails.customerName}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              Customer / Company Picture
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              {viewMasterDataDetails.customerPicture ? (
                <img
                  src={viewMasterDataDetails.customerPicture}
                  alt="customerPicture"
                  width={100}
                  height={100}
                />
              ) : null}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              Brand Name & Pack
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {viewMasterDataDetails.brandPack}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              Item Code
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {viewMasterDataDetails.itemCode}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              Jar/Cap
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {viewMasterDataDetails.jarCap}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              Structure
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {viewMasterDataDetails.structure}
            </Typography>
          </Grid>
          </Grid>
        <Box sx={{ paddingTop: 2 }}>
          <Box
            sx={{
              border: "1px solid #ECECEC",
              borderRadius: "16px",
              p: 0,
              py: 2,
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
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobsList;
