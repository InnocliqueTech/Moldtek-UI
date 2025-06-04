import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Modal,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ReusableTable from "../../Components/ReUsable/Table";
import { useNavigate } from "react-router-dom";
import { UENCell } from "../../Components/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setJobsListData,
  setSelectedTabView,
} from "../../store/slices/viewMasterDataSlice";
import {
  useGetJobsListQuery,
  useViewMasterDataQuery,
} from "../../store/apis/masterDataApis";
import {
  setBackButtonNavigationAllowed,
  setIsEditing,
  setSideNavigationAllowed,
} from "../../store/slices/viewDailyPlanSlice";
import { Close, Visibility } from "@mui/icons-material";
import theme from "../../theme";
import AutoTooltipText from "../../Components/ReUsable/AutoTooltipText";

const JobsList: React.FC = () => {
  const navigate = useNavigate();
  const UEN = localStorage.getItem("actionSelectedUEN");
  let selectedUEN: any;
  if (UEN) {
    selectedUEN = UEN;
  }
  type StatusType =
    | "Inprogress"
    | "On hold"
    | "Inactive"
    | "Completed"
    | "Active";
  const rowsPerPageStorageKey = "jobsDataRowsPerPage";
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const savedPage = localStorage.getItem(rowsPerPageStorageKey);
    return savedPage !== null ? Number(savedPage) : 10;
  });

  const handleRowsPerPageChange = (event: SelectChangeEvent<string>): void => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  };

  const colorMap: Record<StatusType, string> = {
    Inprogress: "#FAECD8",
    "On hold": "#F7DDDA",
    Inactive: "#ffebee",
    Completed: "#DDEED8",
    Active: "#E6F4FF",
  };

  const textColorMap: Record<StatusType, string> = {
    Inprogress: "#C08532",
    "On hold": "#B2493A",
    Inactive: "#c62828",
    Completed: "#478E30",
    Active: "#0070F3",
  };

  const columns = [
    {
      id: "indentNumber",
      label: "Indent No.",
      align: true,
      disableSorting: false,
      format: (value: string, row: any) => (
        <UENCell
          value={value}
          onClick={() => {
            const uniteffectiveNumber = selectedUEN;
            localStorage.setItem(
              "unitEffectiveNumberDaily",
              uniteffectiveNumber
            );
            localStorage.setItem("status", row.status);
            const encodedParam = encodeURIComponent(value);
            navigate(`/viewDailyPlan/${encodedParam}`);
            dispatch(setSelectedTabView(0));
            dispatch(setIsEditing(false));
            dispatch(setSideNavigationAllowed(false));
            dispatch(setBackButtonNavigationAllowed(false));
          }}
        />
      ),
    },
    {
      id: "labelType",
      label: "Type Of Label",
      align: false,
      disableSorting: true,
      format: (value: string) =>
        value !== null ? (
          <Tooltip title={value}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "4px 8px",
                display: "inline-block",
                backgroundColor: "#F8F9FA",
                maxWidth: 150,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {value}
            </Box>
          </Tooltip>
        ) : (
          "N/A"
        ),
    },
    {
      id: "status",
      label: "Status",
      align: true,
      disableSorting: false,
      format: (value: StatusType) =>
        value !== null ? (
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
        ) : (
          "N/A"
        ),
    },
    {
      id: "updatedAt",
      label: "Last Update",
      align: true,
      disableSorting: false,
      format: (value: string) =>
        value
          ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-")
          : "",
    },
    {
      id: "jobRunDate",
      label: "Last Executed",
      align: true,
      disableSorting: false,
      format: (value: string) =>
        value
          ? new Date(value).toLocaleDateString("en-GB").replace(/\//g, "-")
          : "",
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

  const storageKey = "jobListDataPage";
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem(storageKey);
    return savedPage !== null ? Number(savedPage) : 0;
  });
  useEffect(() => {
    localStorage.setItem(storageKey, page.toString());
    localStorage.setItem(rowsPerPageStorageKey, rowsPerPage.toString());
  }, [page, rowsPerPage]);

  const dispatch = useDispatch<AppDispatch>();

  const versionNumber = localStorage.getItem("actionVersionNo");
  const id = localStorage.getItem("actionSelectedUEN");
  const { data, isLoading } = useGetJobsListQuery({
    unitEffectiveNumber: selectedUEN,
  });
  const {
    data: viewMasterDataDetailsData,
    isLoading: viewMasterDataDetailsLoading,
  } = useViewMasterDataQuery(
    {
      ueNumber: id ? id : selectedUEN,
      versionNo: versionNumber ? versionNumber : "",
    },
    { refetchOnMountOrArgChange: true }
  );
  useEffect(() => {
    dispatch(setJobsListData(data?.data));
  }, [data]);
  const { jobListData } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const viewMasterDataDetails =
    viewMasterDataDetailsData?.data?.masterDataDetails;

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  let maxChars = 90;

  if (isXs) maxChars = 50;
  else if (isSm) maxChars = 50;
  else if (isMd) maxChars = 32;
  else if (isLg) maxChars = 45;
  else if (isXl) maxChars = 50;

  let maxCharsLabel = 20;

  if (isXs) maxCharsLabel = 50;
  else if (isSm) maxCharsLabel = 70;
  else if (isMd) maxCharsLabel = 25;
  else if (isLg) maxCharsLabel = 38;
  else if (isXl) maxCharsLabel = 90;

  const renderValue = (
    value: string | number | null | undefined,
    MAX_LENGTH: number
  ) => {
    const displayValue =
      value !== null && value !== undefined ? String(value) : "N/A";

    // Check if truncation is needed
    const isTruncated = displayValue.length > MAX_LENGTH;
    const truncatedValue = isTruncated
      ? displayValue.slice(0, MAX_LENGTH) + "..."
      : displayValue;

    // If truncated, show tooltip on hover with full value
    return (
      <Tooltip title={isTruncated ? displayValue : ""} arrow>
        <span style={{ cursor: isTruncated ? "pointer" : "default" }}>
          {truncatedValue ? truncatedValue : "N/A"}
        </span>
      </Tooltip>
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    localStorage.setItem(storageKey, newPage.toString());
  };

  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);

    useEffect(()=>{
      if(imagePreviewOpen){
        setImagePreviewOpen(false)
      }
    },[location])

      const getInitial = (name: string) =>
  name ? name.trim().charAt(0).toUpperCase() : "?";

  const logo = viewMasterDataDetails?.customer_logo;
const name = viewMasterDataDetails?.customer_name;

  return (
    <Box sx={{ p: 0 }}>
      <Box p={2} sx={{ backgroundColor: "#fff", borderRadius: 2, mb: 2 }}>
        {viewMasterDataDetailsLoading ? (
          <Grid container spacing={2} pt={1}>
            {[...Array(3)].map((_, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={50}
                  sx={{ mt: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={30}
                  sx={{ mt: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={50}
                  sx={{ mt: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="50%"
                  height={30}
                  sx={{ mt: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={50}
                  sx={{ mt: 1 }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Unit Effective Number
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                {renderValue(
                  viewMasterDataDetails?.unit_effectivity_number,
                  maxChars
                )}
              </Typography>

              <Box sx={{ mt: 4 }}>
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
                  {renderValue(viewMasterDataDetails?.item_code, maxChars)}
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
                  {renderValue(viewMasterDataDetails?.jar_cap, maxChars)}
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
  <Box>
    <Typography variant="body2" color="text.secondary" fontWeight={500}>
      Customer Name
    </Typography>
<Stack direction="row" alignItems="center" spacing={1} mt={1}>
  <Box position="relative" width={32} height={32}>
    <Avatar
      src={logo || ""}
      sx={{
        width: 32,
        height: 32,
        bgcolor: "#1976d2",
        fontSize: 14,
      }}
    >
      {!logo && getInitial(name)}
    </Avatar>
    {logo && (
      <Tooltip title="Preview">
        <IconButton
          size="small"
          onClick={() => setImagePreviewOpen(true)}
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            bgcolor: "transparent",
            "&:hover": { bgcolor: "transparent" },
          }}
        >
          <Visibility fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Box>

  <Box>
    <Typography
      variant="body1"
      sx={{
        mt: 0.5,
        wordBreak: "break-word",
        whiteSpace: "pre-line",
      }}
    >
      {renderValue(name, maxChars)}
    </Typography>
  </Box>
</Stack>
  </Box>

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
                  {renderValue(viewMasterDataDetails?.structure, maxChars)}
                </Typography>

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  sx={{ mt: 2 }}
                >
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
                    {renderValue(
                      viewMasterDataDetails?.label_type,
                      maxCharsLabel
                    )}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box />
              <Box sx={{ mt: 0 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={500}
                          >
                           KLD
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              mt: 0.5,
                              wordBreak: "break-word",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {renderValue(viewMasterDataDetails?.kld, maxChars)}
                          </Typography>
                        </Box>

              <Box sx={{ mt:  3 }}>
                <AutoTooltipText
                  content={"Brand Name & Pack-Description"}
                  maxLength={30}
                  variant="body2"
                  sx={{ color: "#656565" }}
                  tooltipPlacement="bottom"
                  TooltipProps={{ arrow: false }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 0.5,
                    wordBreak: "break-word",
                    whiteSpace: "pre-line",
                  }}
                >
                  {renderValue(
                    viewMasterDataDetails?.brand_description,
                    maxChars
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}

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
              infoText="List of all jobs associated with this unit's effective number."
              columns={columns}
              data={jobListData ? jobListData : []}
              selectable={false}
              label={`${data?.totalRecords ? data.totalRecords : 0} Jobs`}
              title="List of executed jobs"
              info={true}
              searchVisible={true}
              action={false}
              boxShadow={false}
              searchSize={true}
              isLoading={isLoading}
              id={"jobListData"}
              handleRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              pageNumber={page}
            />
          </Box>
        </Box>
      </Box>
      <Modal
        open={imagePreviewOpen}
        onClose={() =>{}}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
            outline: "none",
            maxWidth: "90%",
            maxHeight: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Modal Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            mb={2}
          >
            <Typography variant="h6" component="h2">
              Preview of Image
            </Typography>
            <IconButton onClick={() => setImagePreviewOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* Image Preview */}
          {viewMasterDataDetails?.customer_logo ? (
            <Box
              component="img"
              src={viewMasterDataDetails?.customer_logo}
              alt="Full Image"
              sx={{
                maxWidth: "100%",
                maxHeight: "75vh",
                borderRadius: "8px",
                objectFit: "contain",
              }}
            />
          ) : (
            <Typography variant="body1">N/A</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default JobsList;
