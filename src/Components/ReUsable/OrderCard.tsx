import React from "react";
import { Typography, Grid, Box, Tooltip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AutoTooltipText from "./AutoTooltipText";

const OrderCard: React.FC = () => {
  const { viewMasterDataDetails } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const columns = [
    { id: "repeat", label: "Repeat" },
    { id: "ups", label: "UPs" },
    { id: "tracks", label: "Tracks" },
    { id: "labels", label: "# Labels/Meter" },
  ];

  const maxChars = 20;
  const maxCharsLabel = 20;
  const isLong = viewMasterDataDetails?.brand_description.length > maxChars;
  const displayText = isLong
    ? viewMasterDataDetails?.brand_description.slice(0, maxChars) + "..."
    : viewMasterDataDetails?.brand_description;
  const isLongLabel = viewMasterDataDetails?.label_type.length > maxCharsLabel;
  const displayTextLabel = isLongLabel
    ? viewMasterDataDetails?.label_type.slice(0, maxCharsLabel) + "..."
    : viewMasterDataDetails?.label_type;
  const renderValue = (value: string | undefined | null) => {
    return value ? value : "N/A";
  };

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
              <Tooltip
                title={isLongLabel ? viewMasterDataDetails?.label_type : ""}
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
                  {renderValue(displayTextLabel)}
                </Typography>
              </Tooltip>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Customer Picture
            </Typography>
            {viewMasterDataDetails?.customer_logo ? (
              <img
                src={viewMasterDataDetails?.customer_logo}
                alt="customer picture"
              />
            ) : (
              <Typography variant="body1">N/A</Typography>
            )}
            <Box sx={{ mt: 2 }}>
              <AutoTooltipText
                content={"Brand Name & Pack-Description"}
                maxLength={25}
                variant="body2"
                sx={{ color: "#656565" }}
                tooltipPlacement="bottom"
                TooltipProps={{ arrow: false }}
              />
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
                {renderValue(viewMasterDataDetails?.segment)}
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
            Repeat & Label Metrics
          </Typography>
          <InfoOutlined sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {Object.entries({
            repeat: viewMasterDataDetails?.repeat_length,
            ups: viewMasterDataDetails?.ups,
            tracks: viewMasterDataDetails?.tracks,
            labels: viewMasterDataDetails?.labels_per_meter,
          }).map(([key, value]) => (
            <Box
              key={key}
              sx={{
                flex: "1 1 200px",
                maxWidth: "calc(33.33% - 16px)",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {columns.find((col) => col.id === key)?.label || key}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {value ? value:'N/A'}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderCard;
