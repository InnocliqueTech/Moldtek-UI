import React from "react";
import { Typography, Grid, Box, Tooltip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import customerImage from "../../assets/Images/customerPicture.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";



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

  const maxChars = 120;
  const isLong = viewMasterDataDetails.brand_description.length > maxChars;
  const displayText = isLong ?viewMasterDataDetails.brand_description.slice(0, maxChars) + "..." : viewMasterDataDetails.brand_description;

  return (
    <Box>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 1.5 }}>
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
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ mt: 2 }}>
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
               {viewMasterDataDetails.brand_name}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>

            <Box  />
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Customer Picture
              </Typography>
              <img src={customerImage} alt="customer picture" />
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Brand Name & Pack Description
              </Typography>
              <Tooltip title={isLong ? viewMasterDataDetails.brand_description : ""} placement="top" arrow>
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
      </Box>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", mt: 1.5, p: 1, pt: 0.2 }}>
  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
    <Typography sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }} gutterBottom>
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
      repeat: viewMasterDataDetails.repeat_length,
      ups: viewMasterDataDetails.ups,
      tracks: viewMasterDataDetails.tracks,
      labels: viewMasterDataDetails.labels_per_meter,
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
          {value}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>


    </Box>
  );
};

export default OrderCard;
