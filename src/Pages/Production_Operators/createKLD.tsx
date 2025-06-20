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
import {
  useCreateKldDataMutation,
  useUpdateKldDataMutation,
} from "../../store/apis/kldApis";
import { setCreateSlider } from "../../store/slices/kldSlice";
import SuccessPopup from "../../Components/ReUsable/SuccessPopup";
import ConfirmPopup from "../../Components/ReUsable/ConfirmPopup";
import { toast } from "react-toastify";

interface KLDSliderProps {
  open: boolean;
  onClose: () => void;
}

const KLDSlider: React.FC<KLDSliderProps> = ({ open, onClose }) => {
  const { kldEdit, rowKldData } = useSelector((state: RootState) => state.kld);

  const dispatch = useDispatch();

  const [submitPopupConfirm, setSubmitPopupConfirm] = useState<boolean>(false);
  const [submitAndPublish, setSubmitAndPublishPopup] = useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    unitEffectiveNumber: "",
    jarCap: "",
    itemCode: "",
    kldCode: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    unitEffectiveNumber: "",
  });

  const [createKldData, { isLoading }] = useCreateKldDataMutation();
  const [updateKldData, { isLoading: kldUpdateLoading }] =
    useUpdateKldDataMutation();
  useUpdateKldDataMutation;

  const onSubmit = () => {
    const { unitEffectiveNumber} = formValues;

    const errors: { unitEffectiveNumber: string } = {
      unitEffectiveNumber: "",
    };

    let hasError = false;

    const uenRegex = /^\d+$/;
    if (!uenRegex.test(unitEffectiveNumber)) {
      errors.unitEffectiveNumber =
        "Unit Effective Number must be numeric only.";
      hasError = true;
    }

   
    if (hasError) {
      setFieldErrors(errors); 
      return; 
    } else if (!hasError) {
      setFieldErrors({  unitEffectiveNumber: "" });
      setSubmitAndPublishPopup(true);
    }
  };

  const successTitle = kldEdit
    ? `You have successfully updated KLD Master Data.`
    : `You have successfully created KLD Master Data.`;

  const confirmPublishTitle = kldEdit
    ? `Are you sure you want to update and publish? `
    : `Are you sure you want to submit and publish? `;

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
    switch ((formValues.jarCap ?? "").toUpperCase()) {
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
      (formValues.unitEffectiveNumber ?? "").trim() &&
      (formValues.jarCap ?? "").trim() &&
      (formValues.itemCode ?? "").trim() &&
      (formValues.kldCode ?? "").trim(),
    [formValues]
  );

  useEffect(() => {
    if (kldEdit && rowKldData) {
      setFormValues({
        unitEffectiveNumber: rowKldData.unitEffectiveNumber ?? "",
        jarCap: rowKldData.jarCap ?? "",
        itemCode: rowKldData.itemCode ?? "",
        kldCode: rowKldData.kldCode ?? "",
      });
    } else {
      setFormValues({
        unitEffectiveNumber: "",
        jarCap: "",
        itemCode: "",
        kldCode: "",
      });
    }
  }, [kldEdit, open, rowKldData]);

  const handleSubmitPopupConfirmClose = () => {
    setSubmitAndPublishPopup(false);
    setSubmitPopupConfirm(false);
  };

  const handleSubmitPopupConfirmClick = () => {
    setSubmitAndPublishPopup(false);
    setSubmitPopupConfirm(false);
    dispatch(setCreateSlider(false));
    localStorage.setItem("kldDataPage", "0");
  };

  const handleSubmitPopupConfirmOpen = async () => {
    const _formData = {
      unitEffectiveNumber: formValues.unitEffectiveNumber,
      jarCap: formValues.jarCap,
      itemCode: formValues.itemCode,
      kldCode: formValues.kldCode,
    };
    try {
      const response = !kldEdit
        ? await createKldData(_formData)
        : await updateKldData(_formData);

      const isCreateSuccess =
        response && response.data && response.data.statusCode === 200;

      if (!isCreateSuccess) {
        const errorData = (response as any)?.error?.data;
        const message =
          errorData?.message ||
          response?.data?.message ||
          "Error saving master data";

        toast.error(message);
        return;
      }

      setSubmitAndPublishPopup(false);

      setSubmitPopupConfirm(true);
      setFormValues({
        unitEffectiveNumber: "",
        jarCap: "",
        itemCode: "",
        kldCode: "",
      });
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.message ||
        "Unexpected error during submission.";
      toast.error(message);
    }
  };

  const handleDrawerClose = () => {
    setFieldErrors({
      unitEffectiveNumber: "",
    });
    onClose(); 
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleDrawerClose}
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
              label="Unit Effective Number"
              value={(formValues.unitEffectiveNumber ?? "").toString()}
              onChange={handleChange("unitEffectiveNumber")}
              required
              disabled={kldEdit ? true : false}
              error={!!fieldErrors.unitEffectiveNumber}
              helperText={fieldErrors.unitEffectiveNumber}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <DropdownComponent
              label="Jar/Cap"
              options={["JAR&CAP", "JAR", "CAP"]}
              value={formValues.jarCap ?? ""}
              onChange={handleChange("jarCap")}
              isMultiSelect={false}
              checkbox={false}
              required
              disabled={kldEdit ? true : false}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ReusableInput
              label="Item Code"
              value={formValues.itemCode ?? ""}
              onChange={handleChange("itemCode")}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ReusableInput
              label={getKLDLabel()}
              value={formValues.kldCode ?? ""}
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
        <SuccessPopup
          open={submitPopupConfirm}
          message={successTitle}
          onClose={handleSubmitPopupConfirmClose}
          onClick={handleSubmitPopupConfirmClick}
          subMessage={""}
          buttonText="Go back to KLD Master Data"
          popUpClosed={false}
        />

        <ConfirmPopup
          open={submitAndPublish}
          title={confirmPublishTitle}
          message=""
          buttonText="No"
          buttonText2="Yes, Publish it!"
          gifSrc=""
          onClose={() => {
            setSubmitAndPublishPopup(false);
          }}
          onClick={handleSubmitPopupConfirmOpen}
          isLoading={!kldEdit ? isLoading : kldUpdateLoading}
          popUpClosed={false}
          noButton={!kldEdit ? isLoading : kldUpdateLoading}
        />
      </Box>
    </Drawer>
  );
};

export default KLDSlider;
