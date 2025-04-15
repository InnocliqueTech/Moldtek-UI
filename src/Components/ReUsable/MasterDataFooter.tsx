import { Box } from "@mui/material";
import ReusableButton from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setSelectedTab,
  setSubmitAndPublishPopup,
  setSubmitPopup,
  setSubmitPopupConfirm,
} from "../../store/slices/masterDataSlice";
import ConfirmPopup from "./ConfirmPopup";
import { useNavigate, useParams } from "react-router-dom";

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
    }
  };

  const handleSubmitPopupConfirmOpen = () => {
    dispatch(setSubmitAndPublishPopup(false));
    dispatch(setSubmitPopupConfirm(true));
    if(handleSave)
      handleSave()
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

  const { submitPopup, submitPopupConfirm, submitAndPublish,submitAndPublishButton } = useSelector(
    (store: RootState) => store.masterData
  );
  const {id} = useParams();

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
          text={id ? "Update and Publish":"Submit and Publish"}
          color="#0073B7"
          borderRadius="100px"
          border="1px solid #0073B7"
          textColor="white"
          p={2}
          onClick={handleSubmitAndPublishPopupOpen}
          disabled={submitAndPublishButton?true:false}
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
        title="Are you sure you want submit?This version is 4243. "
        message=""
        buttonText="No"
        buttonText2="Yes,Save it!"
        gifSrc=""
        onClose={handleSubmitPopupClose}
        onClick={handleSubmitPopupConfirmOpen}
      />
      <ConfirmPopup
        open={submitPopupConfirm}
        title={id?"You have successfully updated master data your version is 4253.":"You have successfully created master data your version is 4253."}
        message="You're all set! Let’s get started."
        buttonText2="Go back to Master Data"
        gifSrc=""
        onClose={handleSubmitPopupConfirmClose}
        onClick={handleSubmitPopupConfirmClick}
      />
      <ConfirmPopup
        open={submitAndPublish}
        title={id ?"Are you sure you want update and publish? This version is 4243.":"Are you sure you want submit and publish? This version is 4243."}
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
