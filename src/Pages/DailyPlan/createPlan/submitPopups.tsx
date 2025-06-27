import React, { useState } from "react";
import ConfirmPopup from "../../../Components/ReUsable/ConfirmPopup";
import { setSubmitAndPublishPopup } from "../../../store/slices/masterDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessPopup from "../../../Components/ReUsable/SuccessPopup";
import { setSelectedTabView } from "../../../store/slices/viewMasterDataSlice";

interface SubmitPopupsProps {
  onSubmit: () => Promise<{ success: boolean; error?: any }>;
  isLoading: boolean;
}

const SubmitPopups: React.FC<SubmitPopupsProps> = ({onSubmit,isLoading}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { submitAndPublish } = useSelector(
    (store: RootState) => store.masterData
  );
  const { recentlyCreatedIndentNumber } = useSelector(
    (store: RootState) => store.viewDailyPlan
  );

  const encodedParam = encodeURIComponent(recentlyCreatedIndentNumber);
  const [submitPopupConfirm, setSubmitPopupConfirm] = useState<boolean>(false);
  const handleSubmitPopupClose = () => {
    dispatch(setSubmitAndPublishPopup(false));
  };
  const handleSubmitPopupConfirmOpen = async () => {
    const resp=await onSubmit();
    if(resp.success) setSubmitPopupConfirm(true);
  };
  const handleSubmitPopupConfirmClose = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopupConfirm(false);
  };
  const handleSubmitPopupConfirmClick = () => {
    dispatch(setSubmitAndPublishPopup(false));
    setSubmitPopupConfirm(false);
    navigate(`/viewDailyPlan/${encodedParam}`);
    localStorage.setItem('dailyPlanDataPage','0')
    dispatch(setSelectedTabView(0));
    localStorage.setItem("status","Active");
  };
  
  return (
    <>
      <ConfirmPopup
        open={location.pathname === "/createPlan" && submitAndPublish}
        title="Are you sure you want submit Daily Plan ?"
        message=""
        buttonText="No"
        buttonText2="Yes,Save it!"
        gifSrc=""
        onClose={handleSubmitPopupClose}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={isLoading}
        popUpClosed={false}
      />
      <SuccessPopup
        open={submitPopupConfirm}
        message="You have successfully added a daily job"
        buttonText="View Daily Plan"
        onClose={handleSubmitPopupConfirmClose}
        onClick={handleSubmitPopupConfirmClick}
        popUpClosed={false}
      />
    </>
  );
};

export default SubmitPopups;
