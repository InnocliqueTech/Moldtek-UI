import React, { useEffect, useMemo } from "react";
import { Typography, Grid, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonComponent from "./Button";
import { InfoOutline } from "@mui/icons-material";
import DataTable from "./MasterDataTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setRepeatTableData } from "../../store/slices/viewMasterDataSlice";

interface OrderCardProps {
  orderId?: string;
  data: {
    label: string;
    value: string;
    isImage?: boolean;
  }[];
  button1Text?: string;
  button2Text?: string;
  onBack?: () => void;
  button1Click?: () => void;
  button2Click?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  data,
  onBack,
  button1Click,
  button2Click,
  button1Text,
  button2Text,
}) => {
  // Move "Brand Name & Pack Description" to the end
  const reorderedData = [
    ...data.filter((item) => item.label !== "Brand Name & Pack Description"),
    ...data.filter((item) => item.label === "Brand Name & Pack Description"),
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { repeatTableData } = useSelector(
    (state: RootState) => state.viewMasterData
  );
  const columns = [
    { id: "repeat", label: "Repeat" },
    { id: "ups", label: "UPs" },
    { id: "tracks", label: "Tracks" },
    {
      id: "labels",
      label: "# Labels/Meter",
    },
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

  return (
    <Box>
      <Box sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 1 }}>
        <Grid container spacing={1} alignItems="flex-start">
          {reorderedData.map((item, index) => {
            const isFullWidth = item.label === "Brand Name & Pack Description";

            return (
              <Grid
                size={{
                  xs: 12,
                  sm: isFullWidth ? 12 : 6,
                  md: isFullWidth ? 12 : 3,
                }}
                key={index}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2" color="textSecondary">
                    {item.label}
                  </Typography>
                  {item.isImage ? (
                    <img
                      src={item.value}
                      alt={item.label}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 0.5,
                        wordBreak: "break-word",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.value}
                    </Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Typography
          sx={{ color: "#2F2FF", fontWeight: 600, fontSize: "16px" }}
          gutterBottom
        >
          Repeat Length & Label Coverage
        </Typography>
        <InfoOutline sx={{ color: "#9F9F9F", width: 20, height: 20 }} />
      </Box>
      {repeatTableData.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            p: 1.5,
            border: "1px solid #ECECEC",
            borderRadius: "16px",
          }}
        >
          {Object.entries(item).map(([key, value]) => (
            <Box key={key} sx={{ minWidth: "200px" }}>
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
  );
};

export default OrderCard;
