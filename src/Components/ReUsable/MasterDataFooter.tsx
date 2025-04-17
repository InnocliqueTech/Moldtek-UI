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
  const buttonText = [
    "Next: Master Data - Printing",
    "Next: Master Data - Lamination",
    "Next: Master Data - Dye Cutting",
  ];
  const {
    submitPopup,
    submitPopupConfirm,
    submitAndPublish,
    submitAndPublishButtonMasterData,
    submitAndPublishButtonDyeCutting,
    submitAndPublishButtonLamination,
    submitAndPublishButtonPrinting,
    requestPayload,
    saveFormData
  } = useSelector((store: RootState) => store.masterData);
  const handleNextClick = () => {
    if (selectedTab < 3) {
      dispatch(setSelectedTab(selectedTab + 1));
    }
  };

  const handleSubmitPopupClose = () => {
    dispatch(setSubmitPopup(false));
  };
  const handleSubmitAndPublishPopupOpen = () => {
    if (selectedTab === 3) {
      dispatch(setSubmitAndPublishPopup(true));
      if (handleSave) handleSave();
    }
  };

  const [createMasterData, { isLoading, isSuccess, isError }] = useCreateMasterDataMutation();

  const handleSubmitPopupConfirmOpen = () => {
    dispatch(setSubmitAndPublishPopup(false));

    createMasterData({ requestPayload })
      .then(() => {
        if (isSuccess) {
          // Only open the confirmation popup after successful API call
          dispatch(setSubmitPopupConfirm(true));
          dispatch(clearDyeCuttingFormData());
          dispatch(clearDyeCuttingFormErrors());
      
          dispatch(clearLaminatingFormData());
          dispatch(clearLaminationFormErrors());
      
          dispatch(clearPrintingFormData());
          dispatch(clearPrintingFormErrors());
      
          dispatch(clearMasterDetaisData());
          dispatch(clearMasterDataFormErrors());
        }
      })
      .catch(() => {
        // Handle error
        if (isError) {
        toast.error("Error Fetching Data")
        }
      });
    dispatch(setSubmitPopupConfirm(true));
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


  const { id } = useParams();
  console.log(requestPayload,"REQUESTPAYLOAd")
  const UEN = localStorage.getItem("selectedUEN");
  let selectedUEN :any;
  if(UEN){
    selectedUEN =  UEN;
 }
  const version = localStorage.getItem("selectedVersionNo");
  
  let versionNo = version ? parseInt(version) : 0;
  let displayVersion = id ? versionNo+1 : versionNo;

const confirmTitle = `Are you sure you want to submit? This version is ${requestPayload.masterDataDetails.unit_effectivity_number} V1.`;
const confirmPublishTitle = id
  ? `Are you sure you want to update and publish? This version is ${selectedUEN} V${displayVersion}.`
  : `Are you sure you want to submit and publish? This version is ${requestPayload.masterDataDetails.unit_effectivity_number} V1.`;

const successTitle = id
  ? `You have successfully updated master data. Your version is ${requestPayload.masterDataDetails.unit_effectivity_number} V1.`
  : `You have successfully created master data. Your version is ${selectedUEN} V${displayVersion}.`;
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="center"
      alignItems="center"
      gap={2}
      // p={2}
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
          // disabled={
          //   submitAndPublishButtonMasterData ||
          //   submitAndPublishButtonDyeCutting ||
          //   submitAndPublishButtonLamination ||
          //   submitAndPublishButtonPrinting
          //     ? true
          //     : false
          // }
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
        buttonText2="Yes,Save it!"
        gifSrc=""
        onClose={handleSubmitPopupClose}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={isLoading}
      />
   <SuccessPopup
  open={submitPopupConfirm}
  message={successTitle}
  onClose={handleSubmitPopupConfirmClick}
  subMessage="You’re all set! Let’s get started."
  buttonText='Go back to Master Data'
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
      />
    </Box>
  );
};

export default MasterDataFooter;
