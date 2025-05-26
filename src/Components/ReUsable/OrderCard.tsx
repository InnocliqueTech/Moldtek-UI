import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Tooltip,
  IconButton,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { Close, Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AutoTooltipText from "./AutoTooltipText";
import theme from "../../theme";

const OrderCard: React.FC = () => {
  const { viewMasterDataDetails } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const columns = [
    { id: "repeat", label: "Repeat" },
    { id: "ups", label: "UPs" },
    { id: "tracks", label: "Tracks" },
    { id: "labels", label: "# Labels/Meter" },
    { id: "noOfColorsSetting", label: "No of Colors for settings" },
    { id: "noOfSpecialColors", label: "No of special colors" },
  ];

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

  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const entries = Object.entries({
    repeat: viewMasterDataDetails?.repeat_length,
    ups: viewMasterDataDetails?.ups,
    tracks: viewMasterDataDetails?.tracks,
    labels: viewMasterDataDetails?.labels_per_meter,
    noOfColorsSetting: viewMasterDataDetails?.noOfColorsSetting,
    noOfSpecialColors: viewMasterDataDetails?.noOfSpecialColors,
  });

  // First 3 entries for the first row, rest for second row
  const firstRow = entries.slice(0, 3);
  const secondRow = entries.slice(3, 6);

  return (
    <Box>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 1.5 }}>
        <Grid container spacing={2} pt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
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
              {renderValue(viewMasterDataDetails?.customer_name, maxChars)}
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
                {renderValue(viewMasterDataDetails?.structure, maxChars)}
              </Typography>
            </Box>
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
                {renderValue(viewMasterDataDetails?.label_type, maxCharsLabel)}
              </Typography>
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
                Customer Picture
              </Typography>

              {viewMasterDataDetails?.customer_logo ? (
                <Box sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
                  <Box
                    component="img"
                    src={viewMasterDataDetails?.customer_logo}
                    alt="Uploaded"
                    sx={{
                      width: 150,
                      height: 35,
                      borderRadius: "8px",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <Tooltip title="View">
                    <IconButton
                      onClick={() => setImagePreviewOpen(true)}
                      color="primary"
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Typography variant="body1">N/A</Typography>
              )}
            </Box>
            <Box sx={{ mt: viewMasterDataDetails?.customer_logo ? 0 : 2 }}>
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
                  mt: 0,
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
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Segment
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                {renderValue(viewMasterDataDetails?.segment, maxChars)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          border: "1px solid #ECECEC",
          borderRadius: "16px",
          mt: 1.5,
          p: 1,
          pt: 0.2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Typography
            sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
          >
            Repeat & Print Details
          </Typography>
          {/* <InfoOutlined sx={{ color: "#9F9F9F", width: 20, height: 20 }} /> */}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* First Row */}
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
          >
            {firstRow.map(([key, value]) => (
              <Box key={key} sx={{ flex: "1 1 30%", maxWidth: "33.33%" }}>
                <Typography variant="body2" color="textSecondary">
                  {columns.find((col) => col.id === key)?.label || key}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {renderValue(value, maxChars)}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Second Row */}
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
          >
            {secondRow.map(([key, value]) => (
              <Box key={key} sx={{ flex: "1 1 30%", maxWidth: "33.33%" }}>
                <Typography variant="body2" color="textSecondary">
                  {columns.find((col) => col.id === key)?.label || key}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {renderValue(value, maxChars)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Modal
        open={imagePreviewOpen}
        onClose={() => setImagePreviewOpen(false)}
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

export default OrderCard;
