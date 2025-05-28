import { Box } from "@mui/material";
import ReusableButton from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  clearDyeCuttingFormData,
  clearDyeCuttingFormErrors,
  clearLaminatingFormData,
  clearLaminationFormErrors,
  clearMasterDataFormErrors,
  clearMasterDetaisData,
  clearPrintingFormData,
  clearPrintingFormErrors,
  setDyeCuttingDataTouched,
  setLaminationDataTouched,
  setMasterDataDataTouched,
  setMasterDataNotifications,
  setPrintingDataTouched,
  setSelectedFile,
  setSelectedTab,
  setSubmitAndPublishPopup,
  setSubmitPopup,
  setSubmitPopupConfirm,
  setSubmitTrue,
  setUploadedFile,
  setUploadPopup,
} from "../../store/slices/masterDataSlice";
import ConfirmPopup from "./ConfirmPopup";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateMasterDataMutation,
  useLazyMasterDataNotificationsQuery,
} from "../../store/apis/masterDataApis";
import { toast } from "react-toastify";
import SuccessPopup from "./SuccessPopup";
import { useUploadCustomerFileMutation } from "../../store/apis/genericApis";
import { useEffect } from "react";

interface MasterDataFooterProps {
  selectedTab: number;
  handleSave?: () => void;
}

const MasterDataFooter: React.FC<MasterDataFooterProps> = ({
  selectedTab,
  handleSave,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    submitPopup,
    submitPopupConfirm,
    submitAndPublish,
    submitAndPublishButtonMasterData,
    submitAndPublishButtonDyeCutting,
    submitAndPublishButtonLamination,
    submitAndPublishButtonPrinting,
    requestPayload,
    masterDataDetailsSave,
    printingDataSave,
    laminationDataSave,
    submitTrue,
    saveFormData,
    laminationTab,
    printingTab,
    customerLogoFile,
    uploadFile,
  } = useSelector((store: RootState) => store.masterData);
  const { viewMasterDataDetails } = useSelector(
    (store: RootState) => store.viewMasterData
  );
  const [uploadCustomerFile, { isLoading: uploadLoading }] =
    useUploadCustomerFileMutation();
  const skipLamination =
    saveFormData.label_type === "THINWALL" || saveFormData.segment === "TW";
  const skipLaminationButton =
    viewMasterDataDetails.label_type === "THINWALL" ||
    viewMasterDataDetails.segment === "TW";
  const buttonText = [
    "Next: Master Data - Printing",
    skipLamination || skipLaminationButton
      ? "Next: Master Data - Dye Cutting"
      : "Next: Master Data - Lamination",
    "Next: Master Data - Dye Cutting",
  ];

  const [createMasterData, { isLoading }] = useCreateMasterDataMutation();

  const handleNextClick = () => {
    if (selectedTab < 3) dispatch(setSelectedTab(selectedTab + 1));
  };

  const handleSubmitAndPublishPopupOpen = () => {
    dispatch(setSubmitTrue(false));
    if (
      ((!skipLamination || !skipLaminationButton) && selectedTab === 3) ||
      ((skipLamination || skipLaminationButton) && selectedTab === 2)
    ) {
      dispatch(setSubmitAndPublishPopup(true));
      if (handleSave) handleSave();
    }
  };
  const [masterDataNotifications, { data }] =
    useLazyMasterDataNotificationsQuery();

useEffect(() => {
    if (data?.notifications) {
      dispatch(setMasterDataNotifications(data?.notifications));
    }
  }, [data, dispatch]);

  const handleSubmitPopupClose = () => dispatch(setSubmitPopup(false));

  const handleSubmitPopupConfirmOpen = async () => {
    if (!submitTrue) {
      try {
        const response = await createMasterData(requestPayload);

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
        const unitNumber =
          requestPayload?.masterDataDetails?.unit_effectivity_number;

        if (customerLogoFile) {
          try {
            await uploadCustomerFile({
              file: customerLogoFile,
              unitNumber,
              type: "customer",
            }).unwrap();
          } catch (uploadErr: any) {
            const message =
              uploadErr?.data?.message ||
              uploadErr?.message ||
              "Customer logo upload failed.";
            toast.error(message);
            return;
          }
        }
        dispatch(setSubmitAndPublishPopup(false));
        dispatch(setSubmitPopupConfirm(true));
        dispatch(clearDyeCuttingFormData());
        dispatch(clearDyeCuttingFormErrors());

        dispatch(clearLaminatingFormData());
        dispatch(clearLaminationFormErrors());

        dispatch(clearPrintingFormData());
        dispatch(clearPrintingFormErrors());

        dispatch(clearMasterDetaisData());
        dispatch(clearMasterDataFormErrors());

        dispatch(setPrintingDataTouched(false));
        dispatch(setDyeCuttingDataTouched(false));
        dispatch(setLaminationDataTouched(false));
        dispatch(setMasterDataDataTouched(false));
      } catch (err: any) {
        const message =
          err?.data?.message ||
          err?.message ||
          "Unexpected error during submission.";
        toast.error(message);
      }
    }

    if (submitTrue) {
      if (uploadFile) {
        try {
          await uploadCustomerFile({
            file: uploadFile,
            unitNumber: "",
            type: "master",
          }).unwrap();

          dispatch(setSubmitAndPublishPopup(false));
          dispatch(setUploadedFile(null));
          setTimeout(() => {
            masterDataNotifications();
          }, 5 * 60 * 1000);
        } catch (err) {
          console.error("Upload failed:", err);

          let message = "Upload failed. Please try again.";

          // Check for RTK Query error format
          if (err && typeof err === "object") {
            const errData = err as {
              data?: { message?: string };
              message?: string;
            };

            if (errData?.data?.message) {
              message = errData.data.message;
            } else if (errData?.message) {
              message = errData.message;
            }
          }

          toast.error(message);
        }
      } else {
        toast.warn("No file selected to upload.");
      }
      dispatch(setSubmitPopupConfirm(true));
      dispatch(setSelectedFile(null));
    }
  };

  const handleSubmitPopupConfirmClose = () => {
    dispatch(setSubmitAndPublishPopup(false));
    dispatch(setSubmitPopupConfirm(false));
    dispatch(setSubmitPopup(false));
    dispatch(setSelectedFile(null));
  };

  const handleSubmitPopupConfirmClick = () => {
    dispatch(setSubmitAndPublishPopup(false));
    dispatch(setSubmitPopupConfirm(false));
    dispatch(setSubmitPopup(false));
    navigate("/masterData");
    localStorage.setItem("masterDataPage", "0");
    dispatch(setSelectedFile(null));
  };

  const UEN = localStorage.getItem("selectedUEN") ?? "";
  const version = parseInt(localStorage.getItem("selectedVersionNo") || "0");
  const displayVersion = id ? version + 1 : version;

  const confirmTitle = `Are you sure you want to submit? This version is ${requestPayload.masterDataDetails.unit_effectivity_number} V1.`;
  const confirmPublishTitle = id
    ? `Are you sure you want to update and publish? This version is ${UEN} V${displayVersion}.`
    : `Are you sure you want to submit and publish? This version is ${requestPayload.masterDataDetails.unit_effectivity_number} V1.`;

  const successTitle = id
    ? `You have successfully updated master data. Your version is ${UEN} V${displayVersion}.`
    : submitTrue
    ? `We are currently processing your data. Please wait a moment`
    : `You have successfully created master data. Your version is ${requestPayload.masterDataDetails.unit_effectivity_number} V1.`;

  const isSubmitDisabled = () => {
    if (!id && printingTab && laminationTab) {
      return (
        submitAndPublishButtonMasterData ||
        submitAndPublishButtonDyeCutting ||
        submitAndPublishButtonPrinting ||
        ((!skipLamination || !skipLaminationButton) &&
          submitAndPublishButtonLamination)
      );
    } else if (id) {
      return (
        submitAndPublishButtonMasterData ||
        submitAndPublishButtonDyeCutting ||
        submitAndPublishButtonPrinting ||
        ((!skipLamination || !skipLaminationButton) &&
          submitAndPublishButtonLamination)
      );
    } else {
      return true;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="center"
      alignItems="center"
      gap={2}
      flexWrap="wrap"
    >
      {selectedTab === 3 ||
      (selectedTab === 2 &&
        (saveFormData.label_type === "THINWALL" ||
          saveFormData.segment === "TW" ||
          viewMasterDataDetails.label_type === "THINWALL" ||
          viewMasterDataDetails.segment === "TW")) ? (
        <ReusableButton
          text={id ? "Update and Publish" : "Submit and Publish"}
          color="#0073B7"
          borderRadius="100px"
          border="1px solid #0073B7"
          textColor="white"
          p={2}
          onClick={handleSubmitAndPublishPopupOpen}
          disabled={isSubmitDisabled()}
        />
      ) : (
        <>
          <ReusableButton
            text="Save"
            color=""
            borderRadius="100px"
            border="1px solid #0073B7"
            textColor="#0073B7"
            p={2}
            onClick={handleSave}
            disabled={
              (selectedTab === 0 && masterDataDetailsSave) ||
              (selectedTab === 1 && printingDataSave) ||
              (selectedTab === 2 && laminationDataSave)
            }
          />
          <ReusableButton
            text={buttonText[selectedTab] || "Next: Master Data - Printing"}
            color=""
            borderRadius="100px"
            border="1px solid #ECECEC"
            textColor="#656565"
            p={2}
            onClick={handleNextClick}
          />

          {/* <ReusableButton
            text="Submit"
            color="#0073B7"
            borderRadius="100px"
            border="1px solid #0073B7"
            textColor="white"
            p={2}
            onClick={handleSubmitPopupOpen}
          /> */}
        </>
      )}

      <ConfirmPopup
        open={submitPopup}
        title={confirmTitle}
        message=""
        buttonText="No"
        buttonText2="Yes, Save it!"
        gifSrc=""
        onClose={handleSubmitPopupClose}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={isLoading || uploadLoading}
        noButton={isLoading || uploadLoading ? true : false}
      />

      <SuccessPopup
        open={submitPopupConfirm}
        message={successTitle}
        onClose={handleSubmitPopupConfirmClose}
        onClick={handleSubmitPopupConfirmClick}
        subMessage={submitTrue ? "" : "You’re all set! Let’s get started."}
        buttonText="Go back to Master Data"
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
          dispatch(setSubmitAndPublishPopup(false));
          if (submitTrue) {
            dispatch(setUploadPopup(true));
          }
        }}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={isLoading || uploadLoading}
        popUpClosed={false}
        noButton={isLoading || uploadLoading ? true : false}
      />
    </Box>
  );
};

export default MasterDataFooter;
