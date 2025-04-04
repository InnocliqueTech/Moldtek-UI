import { Box } from "@mui/material";
import ReusableButton from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setSelectedTab,
  setSubmitPopup,
  setSubmitPopupConfirm,
} from "../../store/slices/masterDataSlice";
import ConfirmPopup from "./ConfirmPopup";
import { useNavigate } from "react-router-dom";

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

  const handleSubmitPopuOpen = () => {
    dispatch(setSubmitPopup(true));
  };
  const handleSubmitPopuClose = () => {
    dispatch(setSubmitPopup(false));
  };
  const handleSubmitPopupConfirmOpen = () => {
    dispatch(setSubmitPopupConfirm(true));
  };
  const handleSubmitPopupConfirmClose = () => {
    dispatch(setSubmitPopupConfirm(false));
    dispatch(setSubmitPopup(false));
    navigate("/masterData");
  };
  const { submitPopup, submitPopupConfirm } = useSelector(
    (store: RootState) => store.masterData
  );

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
            onClick={handleSubmitPopuOpen}
          />
          <ConfirmPopup
            open={submitPopup}
            title="Are you sure you want submit?This version is 4243. "
            message=""
            buttonText="No"
            buttonText2="Yes,Save it!"
            gifSrc=""
            onClose={handleSubmitPopuClose}
            onConfirm={handleSubmitPopupConfirmOpen}
          />
          <ConfirmPopup
            open={submitPopupConfirm}
            title="You have successfully created master data your version is 4253. "
            message="You're all set! Let’s get started."
            buttonText2="Go back to Master Data"
            gifSrc=""
            onClose={handleSubmitPopupConfirmClose}
          />
        </>
      )}
    </Box>
  );
};

export default MasterDataFooter;
