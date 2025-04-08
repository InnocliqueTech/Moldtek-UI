import React from "react";
import {
  Typography,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonComponent from "./Button";

interface OrderCardProps {
  orderId: string;
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
  return (
    <Box>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Grid display="flex" alignItems="center">
          <Box sx={{ border: "1px solid #ECECEC", borderRadius: "10px" }}>
            <IconButton onClick={onBack} sx={{ mr: 0, '&:hover': {
        backgroundColor: 'transparent',
      }, }}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ ml: "4px" }}>
            {orderId}
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {button1Text && (
            <Grid>
              <ButtonComponent
                text={button1Text}
                onClick={button1Click}
                textColor="#2F2F2F"
                color="white"
                borderRadius="100px"
                p={1}
                border="1px solid #ECECEC"
              />
            </Grid>
          )}
          {button2Text && (
            <Grid>
              <ButtonComponent
                text={button2Text}
                onClick={button2Click}
                textColor="#2F2F2F"
                color="white"
                borderRadius="100px"
                border="1px solid #ECECEC"
                p={1}
              />
            </Grid>
          )}
        </Grid>
      </Grid>

      <Box
        sx={{ border: "1px solid #ECECEC", borderRadius: "16px", p: 2, mt: 2 }}
      >
        <Grid container spacing={2} alignItems="flex-start">
          {data.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
                      whiteSpace: "pre-line", // optional if you want line breaks
                    }}
                  >
                    {item.value}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderCard;
