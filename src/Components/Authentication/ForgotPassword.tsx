import { useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import {
  EmailOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ReusableInput from "../ReUsable/TextField";
import ReusableButton from "../ReUsable/Button";

import { signInSchema } from "../ZodSchemas/signInpageValidation";
import indicator from "../../assets/Images/indicator.png";
import Logo from "../../assets/Images/Logo.svg";
import SignInImage from "../../assets/Images/signIn.png";
import BackgroundImage from "../../assets/Images/backgroundPatternImage.png";
import curveImage from "../../assets/Images/curves.png";
import { useForGotPasswordMutation } from "../../store/apis/authenticationApis";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [forgotPassword, { isLoading: sending }] = useForGotPasswordMutation();

  const handleGoToLogin = () => {
    navigate("/");
  };

  const handleSendEmail = async () => {
    setError("");
    if (!email) return setError("Please enter your email");

    const result = signInSchema.shape.email.safeParse(email);
    if (!result.success) return setError("Invalid email format");

    try {
      const response = await forgotPassword({ username: email }).unwrap();

      if (response?.statusCode === 200) {
        toast.success(
          response?.message || "Email verified. Set your new password."
        );
        setTimeout(() => {
          handleGoToLogin();
        }, 200);
      } else {
        toast.error(response?.message || "Verification failed.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  const renderContent = () => {
    return (
       <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendEmail();
          }}
          style={{ width: "100%", maxWidth: "500px", textAlign: "center", marginTop: "5rem" }}
        >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          marginTop: "5rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#2d3748", mb: 2 }}
        >
          Forgot Password
        </Typography>
        <Typography variant="body1" sx={{ color: "#718096", mb: 4 }}>
          Enter your email to receive reset instructions.
        </Typography>

        <Box sx={{ textAlign: "left", width: "100%" }}>
               <ReusableInput
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  icon={<EmailOutlined />}
/>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 3,
          }}
        >
          <ReusableButton
            text="Send Email"
            onClick={handleSendEmail}
            width="100%"
            borderRadius="100px"
            color="#0073B7"
            loading={sending}
            type="submit"
          />
        </Box>
      </Box>
      </form>
    );
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "50% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "60%",
          p: 4,
        }}
      >
        <Box sx={{ position: "absolute", top: 20, left: 20 }}>
          <img src={Logo} alt="Company Logo" style={{ maxWidth: "150px" }} />
        </Box>

        {renderContent()}

        {error && (
          <Alert
            severity="error"
            sx={{ mt: 3, width: "100%", maxWidth: "500px" }}
          >
            {error}
          </Alert>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            height: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ flex: 0.4 }}>
            <img
              src={SignInImage}
              alt="Sign In"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 0.6,
              position: "relative",
              backgroundColor: "#2F4052",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -1,
                left: 0,
                width: "100%",
                height: { sm: "70%", md: "100%" },
                zIndex: 4,
                pointerEvents: "none",
                display: { xs: "none", sm: "block" },
              }}
            >
              <img
                src={curveImage}
                alt="Curve"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  display: "block",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                p: 3,
                textAlign: "left",
              }}
            >
              <Box sx={{ mb: 1 }}>
                <img
                  src={indicator}
                  alt="Indicator Icon"
                  style={{ height: "4px" }}
                />
              </Box>
              <Typography
                sx={{ color: "#ECECEC", fontWeight: 600, fontSize: "20px" }}
              >
                Print & Lamination Data Hub
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  color: "#ECECEC",
                  fontWeight: 400,
                  fontSize: "15px",
                }}
              >
                Enhance productivity with seamless data entry. Log in to access
                and update manufacturing records.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
