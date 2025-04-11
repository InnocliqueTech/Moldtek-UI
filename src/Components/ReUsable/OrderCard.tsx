import React, { useEffect, useMemo } from "react";
import { Typography, Grid, Box, Tooltip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setRepeatTableData } from "../../store/slices/viewMasterDataSlice";
import customerImage from "../../assets/Images/customerPicture.png";



const OrderCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repeatTableData } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const columns = [
    { id: "repeat", label: "Repeat" },
    { id: "ups", label: "UPs" },
    { id: "tracks", label: "Tracks" },
    { id: "labels", label: "# Labels/Meter" },
  ];
  const Tabledata = useMemo(
    () => [
      {
        repeat: 53,
        ups: 2783,
        tracks: 246,
        labels: 121,
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(setRepeatTableData(Tabledata));
  }, [dispatch, Tabledata]);

  const text =
    "0 LTR_AP_DTS_L.WT <APEX ULTIMA PROTEK TOPCOAT> [CODE:P34779J] (IML) ASIAN PAINTS ";
  const maxChars = 120;
  const isLong = text.length > maxChars;
  const displayText = isLong ? text.slice(0, maxChars) + "..." : text;

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
              UEN-20240801
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
                KK-50G-123
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
                N/A (For flexible packaging)
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
              Nestle
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
                PET
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
                Kitkat 50gm Wrapper
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
              <Tooltip title={isLong ? text : ""} placement="top" arrow>
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
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", mt: 1.5, p: 1,pt:0.2}}>
  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
    <Typography sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }} gutterBottom>
      Repeat & Label Metrics
    </Typography>
    <InfoOutlined sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
  </Box>

  {repeatTableData.map((item, idx) => (
    <Box
      key={idx}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {Object.entries(item).map(([key, value]) => (
        <Box
          key={key}
          sx={{
            flex: "1 1 200px",
            maxWidth: "calc(33.33% - 16px)", // fits 3 in a row with spacing
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
  ))}
</Box>


    </Box>
  );
};

export default OrderCard;
