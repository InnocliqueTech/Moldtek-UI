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
  setPrintingDataTouched,
  setSelectedTab,
  setSubmitAndPublishPopup,
  setSubmitPopup,
  setSubmitPopupConfirm,
} from "../../store/slices/masterDataSlice";
import ConfirmPopup from "./ConfirmPopup";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateMasterDataMutation } from "../../store/services/api";
import { toast } from "react-toastify";
import SuccessPopup from "./SuccessPopup";

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
  } = useSelector((store: RootState) => store.masterData);
  const skipLamination =
    saveFormData.label_type === "Thin Wall" || saveFormData.segment === "TW";

  const buttonText = [
    "Next: Master Data - Printing",
    skipLamination
      ? "Next: Master Data - Dye Cutting"
      : "Next: Master Data - Lamination",
    "Next: Master Data - Dye Cutting",
  ];

  const [createMasterData, { isLoading }] = useCreateMasterDataMutation();

  const handleNextClick = () => {
    if (selectedTab < 3) dispatch(setSelectedTab(selectedTab + 1));
  };

  const handleSubmitAndPublishPopupOpen = () => {
    if (selectedTab === 3) {
      dispatch(setSubmitAndPublishPopup(true));
      if (handleSave) handleSave();
    }
  };

  const handleSubmitPopupClose = () => dispatch(setSubmitPopup(false));
  const handleSubmitPopupConfirmOpen = () => {
    if (!submitTrue) {
      createMasterData(requestPayload)
        .then((response) => {
          console.log(response, "RESPONSEOFTHEDATA");
          if (response && response.data && response.data.statusCode === 200) {
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
          } else {
            const errorData = (response as any)?.error?.data;
            const message = errorData?.message
              ? errorData?.message
              : response.data.message
              ? response.data.message
              : "Error saving master data";

            toast.error(message);
          }
        })
        .catch((err) => {
          console.error("Error in createMasterData:", err);

          let message = "An unexpected error occurred while saving master data";

          if ("data" in err && err.data) {
            // Check if the error has a "data" field
            message = err.data?.message || message;
          } else if ("message" in err && err.message) {
            // If the error is a SerializedError type, use its message
            message = err.message;
          }

          toast.error(message);
        });
    }
    if (submitTrue) {
      dispatch(setSubmitAndPublishPopup(false));
      dispatch(setSubmitPopupConfirm(true));
    }
  };

  const handleSubmitPopupConfirmClose = () => {
    dispatch(setSubmitAndPublishPopup(false));
    dispatch(setSubmitPopupConfirm(false));
    dispatch(setSubmitPopup(false));
  };

  const handleSubmitPopupConfirmClick = () => {
    dispatch(setSubmitAndPublishPopup(false));
    dispatch(setSubmitPopupConfirm(false));
    dispatch(setSubmitPopup(false));
    navigate("/masterData");
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
    : `You have successfully created master data. Your version is ${requestPayload.masterDataDetails.unit_effectivity_number} V1.`;

  const isSubmitDisabled = () => {
    if (printingTab && laminationTab) {
      return (
        submitAndPublishButtonMasterData ||
        submitAndPublishButtonDyeCutting ||
        submitAndPublishButtonPrinting ||
        (!skipLamination && submitAndPublishButtonLamination)
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
      {selectedTab === 3 ? (
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
        isLoading={isLoading}
      />

      <SuccessPopup
        open={submitPopupConfirm}
        message={successTitle}
        onClose={handleSubmitPopupConfirmClose}
        onClick={handleSubmitPopupConfirmClick}
        subMessage="You’re all set! Let’s get started."
        buttonText="Go back to Master Data"
      />

      <ConfirmPopup
        open={submitAndPublish}
        title={confirmPublishTitle}
        message=""
        buttonText="No"
        buttonText2="Yes, Publish it!"
        gifSrc=""
        onClose={() => dispatch(setSubmitAndPublishPopup(false))}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default MasterDataFooter;
