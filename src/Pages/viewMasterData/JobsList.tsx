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
import { jobsList } from "./data";
import { useGetJobsListQuery } from "../../store/services/api";


const JobsList: React.FC = () => {
  const navigate = useNavigate();
  const UEN= localStorage.getItem("actionSelectedUEN")
  let selectedUEN :any;
  if(UEN){
    selectedUEN =  UEN;
 }
  type StatusType = "In progress" | "On hold" | "Not yet started" | "Completed";

  const colorMap: Record<StatusType, string> = {
    "In progress": "#FAECD8",
    "On hold": "#F7DDDA",
    "Not yet started": "#DCEAF7",
    "Completed": "#DDEED8",
  };

  const textColorMap: Record<StatusType, string> = {
    "In progress": "#C08532",
    "On hold": "#B2493A",
    "Not yet started": "#0447A8",
    "Completed": "#478E30",
  };

  const columns = [
    {
      id: "unitEffectivityNumber",
      label: "Indent No.",
      align: true,
      disableSorting: false,
      format: (value: string) => (
        <UENCell value={value} onClick={() => navigate(`/viewMasterData/${selectedUEN}`)} />
      ),
    },
    {
      id: "labelType",
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
      id: "updatedAt",
      label: "Last Update",
      align: true,
      disableSorting: false,
             format : (value: string) =>
        value ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-") : "",
    },
    {
      id: "jobRunDate",
      label: "Last Executed",
      align: true,
      disableSorting: false,
             format : (value: string) =>
        value ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-") : "", 
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




  const dispatch = useDispatch<AppDispatch>();
  const { viewMasterDataDetails } = useSelector(
    (state: RootState) => state.viewMasterData
  );

  const {data,isLoading} = useGetJobsListQuery({unitEffectiveNumber:selectedUEN})


  useEffect(() => {
    dispatch(setJobsListData(data?.data));
  }, [dispatch]);

  const maxChars = 120;
  const isLong = viewMasterDataDetails?.brand_description.length > maxChars;
  const displayText = isLong
    ? viewMasterDataDetails?.brand_description.slice(0, maxChars) + "..."
    : viewMasterDataDetails?.brand_description;

    const renderValue = (value: string | undefined | null) => {
      return value ? value : "N/A";
    };

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
              {renderValue(viewMasterDataDetails?.unit_effectivity_number)}
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
                {renderValue(viewMasterDataDetails?.item_code)}
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
                {renderValue(viewMasterDataDetails?.jar_cap)}
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
              {renderValue(viewMasterDataDetails?.customer_name)}
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
                {renderValue(viewMasterDataDetails?.structure)}
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
                {renderValue(viewMasterDataDetails?.label_type)}
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
              {viewMasterDataDetails?.customer_logo ? (
                <img
                  src={viewMasterDataDetails?.customer_logo}
                  alt="customerPicture"
                />
              ) : "N/A"}

            <Box sx={{ mt: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Brand Name & Pack Description
              </Typography>
              <Tooltip
                title={isLong ? viewMasterDataDetails?.brand_description : ""}
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
                  {renderValue(displayText)}
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
              data={jobsList.data}
              selectable={false}
              label={`${jobsList.totalRecords} Versions`}
              title="List of executed jobs"
              info={true}
              searchVisible={true}
              action={false}
              boxShadow={false}
              searchSize={true}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobsList;
