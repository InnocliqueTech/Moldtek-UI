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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface MasterDataFooterProps {
  selectedTab: number;
}

const MasterDataFooter: React.FC<MasterDataFooterProps> = ({ selectedTab }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const buttonText = [
    "Next: Master Data - Printing",
    "Next: Master Data - Lamination",
    "Next: Master Data - Dye Printing",
  ];

  const handleNextClick = () => {
    if (selectedTab < 3) {
      dispatch(setSelectedTab(selectedTab + 1));
    }
  };

  const handleSubmitPopupOpen = () => {
    dispatch(setSubmitPopup(true));
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
    dispatch(setSubmitPopupConfirm(true));
  };
  const handleSubmitPopupConfirmClose = () => {
    dispatch(setSubmitPopupConfirm(false));
    dispatch(setSubmitPopup(false));
    navigate("/masterData");
  };
  const { submitPopup, submitPopupConfirm,submitAndPublish } = useSelector(
    (store: RootState) => store.masterData
  );



  console.log(submitPopup,submitPopupConfirm,submitAndPublish,selectedTab,"POPUPCNSOE")

  return (
    <Box display="flex" justifyContent="center" gap={2} p={2}>
      {selectedTab === 3 ? (
        <ReusableButton
          text="Submit and Publish"
          color="#0073B7"
          borderRadius="100px"
          border="1px solid #0073B7"
          textColor="white"
          p={2}
          onClick={handleSubmitAndPublishPopupOpen}
        />
      ) : (
        <>
          <ReusableButton
            text={buttonText[selectedTab] || "Next: Master Data - Printing"}
            color=""
            borderRadius="100px"
            border="1px solid #ECECEC"
            textColor="#656565"
            p={2}
            onClick={handleNextClick}
          />
          <ReusableButton
            text="Save"
            color=""
            borderRadius="100px"
            border="1px solid #0073B7"
            textColor="#0073B7"
            p={2}
          />
          <ReusableButton
            text="Submit"
            color="#0073B7"
            borderRadius="100px"
            border="1px solid #0073B7"
            textColor="white"
            p={2}
            onClick={handleSubmitPopupOpen}
          />
          <ConfirmPopup
            open={submitPopup}
            title="Are you sure you want submit?This version is 4243. "
            message=""
            buttonText="No"
            buttonText2="Yes,Save it!"
            gifSrc=""
            onClose={handleSubmitPopupClose}
            onConfirm={handleSubmitPopupConfirmOpen}
          />
          <ConfirmPopup
            open={submitPopupConfirm}
            title="You have successfully created master data your version is 4253. "
            message="You're all set! Let’s get started."
            buttonText2="Go back to Master Data"
            gifSrc=""
            onConfirm={handleSubmitPopupConfirmClose}
            onClose={()=>{}}
          />
           <ConfirmPopup
            open={submitAndPublish}
            title="Are you sure you want submit?This version is 4243. "
            message=""
            buttonText="No"
            buttonText2="Yes,Save it!"
            gifSrc=""
            onClose={handleSubmitPopupClose}
            onConfirm={handleSubmitPopupConfirmOpen}
          />
        </>
      )}
    </Box>
  );
};

export default MasterDataFooter;
