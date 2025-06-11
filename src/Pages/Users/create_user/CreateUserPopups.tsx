import React, { useState } from "react";
import ConfirmPopup from "../../../Components/ReUsable/ConfirmPopup";
import SuccessPopup from "../../../Components/ReUsable/SuccessPopup";
import { useNavigate } from "react-router-dom";

interface CreateUserPopupsProps {
  onSubmit: () => Promise<{ success: boolean; error?: any }>;
  isLoading: boolean;
  open: boolean;
  onClose: () => void;
}

const CreateUserPopups: React.FC<CreateUserPopupsProps> = ({
  onSubmit,
  isLoading,
  open,
  onClose
}) => {
  const navigate = useNavigate();
  const [submitPopupConfirm, setSubmitPopupConfirm] = useState<boolean>(false);

  const handleSubmitPopupClose = () => {
    onClose();
  };

  const handleSubmitPopupConfirmOpen = async () => {
    const resp = await onSubmit();
    if (resp.success) {
      setSubmitPopupConfirm(true);
    }
  };

  const handleSubmitPopupConfirmClose = () => {
    setSubmitPopupConfirm(false);
    onClose();
  };

  const handleSubmitPopupConfirmClick = () => {
    setSubmitPopupConfirm(false);
    onClose();
    navigate(`/users`);
  };

  return (
    <>
      <ConfirmPopup
        open={open && !submitPopupConfirm}
        title="Are you sure you want to create this user?"
        message="Please confirm that all the details are correct before submitting."
        buttonText="Cancel"
        buttonText2="Confirm"
        gifSrc=""
        onClose={handleSubmitPopupClose}
        onClick={handleSubmitPopupConfirmOpen}
        isLoading={isLoading}
        popUpClosed={false}
      />
      <SuccessPopup
        open={submitPopupConfirm}
        message="User created successfully!"
        buttonText="View Users"
        onClose={handleSubmitPopupConfirmClose}
        onClick={handleSubmitPopupConfirmClick}
        popUpClosed={false}
      />
    </>
  );
};

export default CreateUserPopups;