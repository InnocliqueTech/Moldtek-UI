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

interface KLDSliderProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const KLDSlider: React.FC<KLDSliderProps> = ({ open, onClose, onSubmit }) => {
  const { kldEdit } = useSelector((state: RootState) => state.kld);

  const [formValues, setFormValues] = useState({
    unitEffectiveNumber: "",
    jarCap: "",
    itemCode: "",
    kldCode: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange =
    (field: keyof typeof formValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
      const value = e.target?.value ?? e;
      setFormValues((prev) => ({ ...prev, [field]: value }));
    };

  const getKLDLabel = () => {
    switch (formValues.jarCap.toUpperCase()) {
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
      formValues.unitEffectiveNumber.trim() &&
      formValues.jarCap.trim() &&
      formValues.itemCode.trim() &&
      formValues.kldCode.trim(),
    [formValues]
  );

  const kldData = {
    unitEffectiveNumber: "251",
    jarCap: "JAR",
    itemCode: "FSITW0460MLRRXXXX",
    kldCode: "KLD-JAR-001",
  };

  useEffect(() => {
    if (kldEdit) {
      setFormValues({
        unitEffectiveNumber: kldData.unitEffectiveNumber,
        jarCap: kldData.jarCap,
        itemCode: kldData.itemCode,
        kldCode: kldData.kldCode,
      });
    } else {
      setFormValues({
        unitEffectiveNumber: "",
        jarCap: "",
        itemCode: "",
        kldCode: "",
      });
    }
  }, [kldEdit, open]);


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
          <Grid size={{ xs: 12 }}>
            <ReusableInput
              label="unitEffectiveNumber"
              value={formValues.unitEffectiveNumber.toString()}
              onChange={handleChange("unitEffectiveNumber")}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <DropdownComponent
              label="Jar/Cap"
              options={["JAR&CAP", "JAR", "CAP"]}
              value={formValues.jarCap}
              onChange={handleChange("jarCap")}
              isMultiSelect={false}
              checkbox={false}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ReusableInput
              label="Item Code"
              value={formValues.itemCode}
              onChange={handleChange("itemCode")}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ReusableInput
              label={getKLDLabel()}
              value={formValues.kldCode}
              onChange={handleChange("kldCode")}
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
        <ButtonComponent
          color="white"
          text={`${kldEdit ? "Updated On" : "Created On"}: ${dayjs().format(
            "DD MMM YYYY"
          )}`}
          textColor="#0E0E0E"
          borderRadius="100px"
          border="1px solid #E5E5E5"
          p={"14px"}
        />
        <ButtonComponent
          text={kldEdit ? "Update" : "Submit"}
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
