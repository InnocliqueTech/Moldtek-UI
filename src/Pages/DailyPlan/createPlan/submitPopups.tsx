import React, { useState } from "react";
import ConfirmPopup from "../../../Components/ReUsable/ConfirmPopup";
import { setSubmitAndPublishPopup } from "../../../store/slices/masterDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { useLocation, useNavigate } from "react-router-dom";

const SubmitPopups: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { submitAndPublish } = useSelector(
    (store: RootState) => store.masterData
  );
  const [submitPopupConfirm, setSubmitPopupConfirm] = useState<boolean>(false);
  const handleSubmitPopupClose = () => {
    dispatch(setSubmitAndPublishPopup(false));
  };
  const handleSubmitPopupConfirmOpen = () => {
    setSubmitPopupConfirm(true);
  };
  const handleSubmitPopupConfirmClose = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopupConfirm(false);
  };
  const handleSubmitPopupConfirmClick = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopupConfirm(false);
    navigate("/dailyPlan");
  };
  return (
    <>
      <ConfirmPopup
        open={location.pathname === "/createPlan" && submitAndPublish}
        title="Are you sure you want submit ? Daily Plan"
        message=""
        buttonText="No"
        buttonText2="Yes,Save it!"
        gifSrc=""
        onClose={handleSubmitPopupClose}
        onClick={handleSubmitPopupConfirmOpen}
      />
      <ConfirmPopup
        open={submitPopupConfirm}
        title="You have successfully add a daily job"
        message=""
        buttonText2="Go back to Daily Plan"
        gifSrc=""
        onClose={handleSubmitPopupConfirmClose}
        onClick={handleSubmitPopupConfirmClick}
      />
    </>
  );
};

export default SubmitPopups;
