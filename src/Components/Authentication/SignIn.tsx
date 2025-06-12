import React, { useState, useEffect } from "react";
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ReusableInput from "../ReUsable/TextField";
import ReusableButton from "../ReUsable/Button";
import { signInSchema } from "../ZodSchemas/signInpageValidation";
import Logo from "../../assets/Images/Logo.svg";
import SignInImage from "../../assets/Images/signIn.png";
import BackgroundImage from "../../assets/Images/backgroundPatternImage.png";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import indicator from "../../assets/Images/indicator.png";
import { useLoginMutation } from "../../store/apis/authenticationApis";
import { toast } from "react-toastify";
import curveImage from "../../assets/Images/curves.png";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/masterData";

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    //Added the signIn comments
    const savedEmail = localStorage.getItem("rememberMeEmail");
    const savedPassword = localStorage.getItem("rememberMePassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    setErrors({});
    const emailResult = signInSchema.shape.email.safeParse(email);
    const trimmedPassword = password.trim();
    const newErrors: { email?: string; password?: string } = {};

    if (!emailResult.success) {
      newErrors.email = emailResult.error.issues[0]?.message || "Invalid email";
    }
    if (!trimmedPassword) {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await login({ username: email, password: trimmedPassword }).unwrap();
      if (response?.data?.token) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("auth", "true");
        localStorage.setItem("role", response?.data?.userTypeName);
        localStorage.setItem("userName", response?.data?.userName);
        localStorage.setItem("userId", response?.data?.userTypeId);
        localStorage.setItem("email",response?.data?.email );

        if (rememberMe) {
          localStorage.setItem("rememberMeEmail", email);
          localStorage.setItem("rememberMePassword", trimmedPassword);
        } else {
          localStorage.removeItem("rememberMeEmail");
          localStorage.removeItem("rememberMePassword");
        }

        navigate(from, { replace: true });
      } else {
        localStorage.clear();
        toast.error("Login failed: No token received");
        navigate("/");
      }
    } catch (err: any) {
      localStorage.clear();
      const statusCode = err?.status;
      const errorMessage = err?.data?.message || "Login failed";

      if (statusCode === 401) {
        setErrors({
          email: " ",
          password: "Invalid email or password",
        });
      } else {
        toast.error(errorMessage);
        navigate("/");
      }
    }
  };

  const isFormValid = () => {
    const trimmedPassword = password.trim();
    const emailResult = signInSchema.shape.email.safeParse(email);
    return emailResult.success && trimmedPassword.length > 0;
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

        {/* Sign In Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          style={{ width: "100%", maxWidth: "500px", textAlign: "center", marginTop: "5rem" }}
        >
          <Typography fontWeight={600} color="#2F2F2F" fontSize={32}>
            Sign In
          </Typography>

          <Box sx={{ textAlign: "left", width: "100%" }}>
            <Typography variant="body2" sx={{ fontWeight: 500, marginBottom: "4px" }} color="#656565">
              Email
            </Typography>
            <ReusableInput
              label=""
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email || ""}
              icon={<EmailOutlined />}
            />
          </Box>

          <Box sx={{ textAlign: "left", width: "100%", mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, marginBottom: "4px" }} color="#656565">
              Password
            </Typography>
            <ReusableInput
              label=""
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password || ""}
              icon={<LockOutlined />}
            />
          </Box>

          {/* Remember Me & Forgot Password */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", mt: 1 }}>
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                />
              } 
              label="Remember me" 
            />
            <Box onClick={() => navigate('/forgotPassword')}>
              <Typography variant="body2" sx={{ cursor: "pointer" }} color="primary">
                Forgot Password?
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
            <ReusableButton 
              type="submit"
              text="Sign In"
              onClick={handleLogin}
              width="100%"
              borderRadius="100px"
              color="#0073B7"
              disabled={!isFormValid()}
              loading={isLoading}
            />
          </Box>
        </form>
      </Box>

      {/* Right Section - Image & Description */}
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
          {/* Top main image */}
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

          {/* Dark section with text and curve on top */}
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
            {/* Curve Image */}
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

            {/* Text content */}
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                p: 3,
                textAlign: "left",
              }}
            >
              <Box sx={{ mb: 1 }}>
                <img src={indicator} alt="Indicator Icon" style={{ height: "4px" }} />
              </Box>
              <Typography sx={{ color: "#ECECEC", fontWeight: 600, fontSize: "20px" }}>
                Print & Lamination Data Hub
              </Typography>
              <Typography sx={{ mt: 1, color: "#ECECEC", fontWeight: 400, fontSize: "15px" }}>
                Enhance productivity with seamless data entry. Log in to access and update manufacturing records.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
