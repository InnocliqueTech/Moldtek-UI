import React, { useState, useMemo, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import ReusableInput from "../../Components/ReUsable/TextField";
import DropdownComponent from "../../Components/ReUsable/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ButtonComponent from "../../Components/ReUsable/Button";
import { setKLDEdit } from "../../store/slices/kldSlice";

interface KLDSliderProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const KLDSlider: React.FC<KLDSliderProps> = ({ open, onClose, onSubmit }) => {
  const { kldEdit } = useSelector((state: RootState) => state.kld);
const dispatch = useDispatch();
  const [uen, setUen] = useState("");
  const [jarCapValue, setJarCapValue] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [kldCode, setKldCode] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const getKLDLabel = () => {
    switch (jarCapValue.toUpperCase()) {
      case "JAR":
        return "KLD-JAR Code";
      case "CAP":
        return "KLD-CAP Code";
      case "JAR&CAP":
        return "KLD-SET Code";
      default:
        return "KLD Code";
    }
  };


  const isSubmitEnabled = useMemo(
    () =>
      uen.trim() !== "" &&
      jarCapValue.trim() !== "" &&
      itemCode.trim() !== "" &&
      kldCode.trim() !== "",
    [uen, jarCapValue, itemCode, kldCode]
  );

   const kldData =  {
    uen: "251",
    jarCap: "JAR",
    itemCode: "FSITW0460MLRRXXXX",
    kldCode: "KLD-JAR-001"
  }

  useEffect(()=>{
dispatch (setKLDEdit(false))
  },[])

    useEffect(() => {
    if (kldEdit && kldData) {
      setUen(kldData.uen || "");
      setJarCapValue(kldData.jarCap || "");
      setItemCode(kldData.itemCode || "");
      setKldCode(kldData.kldCode || "");
    } else {
      // clear fields on create
      setUen("");
      setJarCapValue("");
      setItemCode("");
      setKldCode("");
    }
  }, [kldEdit, kldData, open]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : isTablet ? 300 : 400,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          p: 0,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={2}
        borderBottom="1px solid #ddd"
      >
        <Typography fontSize={18} fontWeight={600}>
          {kldEdit ? "Update KLD" : "Create KLD"}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box flex={1} p={3} overflow="auto">
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <ReusableInput
              label="UEN"
              value={uen}
              onChange={(e) => setUen(e.target.value)}
              required
            />
          </Grid>
          <Grid size={{xs:12}}>
            <DropdownComponent
              label="Jar/Cap"
              options={["Jar&CAP", "JAR", "CAP"]}
              value={jarCapValue}
              onChange={(e: any) => setJarCapValue(e.target.value)}
              isMultiSelect={false}
              checkbox={false}
              required
            />
          </Grid>
          <Grid size={{xs:12}}>
            <ReusableInput
              label="Item Code"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              required
            />
          </Grid>
          <Grid size={{xs:12}}>
            <ReusableInput
              label={getKLDLabel()}
              value={kldCode}
              onChange={(e) => setKldCode(e.target.value)}
              required
            />
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        px={2}
        py={1.5}
        borderTop="1px solid #ddd"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        bottom={0}
        bgcolor="#fff"
        zIndex={2}
      >
        <Typography fontSize={13} color="text.secondary">
          {kldEdit?"Updated On":"Created On"}: {dayjs().format("DD MMM YYYY")}
        </Typography>
        <ButtonComponent
          text="Submit"
          borderRadius="100px"
          onClick={onSubmit}
          color="#0073B7"
          textColor="white"
          p={2}
          disabled={!isSubmitEnabled}
        />
      </Box>
    </Drawer>
  );
};

export default KLDSlider;
