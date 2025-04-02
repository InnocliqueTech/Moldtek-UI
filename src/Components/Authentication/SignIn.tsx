import React, { useState } from "react";
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReusableInput from "../ReUsable/TextField";
import ReusableButton from "../ReUsable/Button";
import { signInSchema } from "../ZodSchemas/signInpageValidation";
import Logo from "../../assets/Images/Logo.svg";
import SignInImage from "../../assets/Images/signIn.png";
import BackgroundImage from "../../assets/Images/backgroundPatternImage.png";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import indicator from "../../assets/Images/indicator.png";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleLogin = () => {
    setErrors({});
    const result = signInSchema.safeParse({ email, password });

    if (!result.success) {
      const newErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") {
          newErrors.email = err.message;
        } else if (err.path[0] === "password") {
          newErrors.password = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
<Box sx={{ height: "100vh", display: "flex",width:'100vw' }}>
  {/* Left Section */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "60%", // Fixed width
      p: 4,
    }}
  >
    <Box sx={{ position: "absolute", top: 20, left: 20 }}>
      <img src={Logo} alt="Company Logo" style={{ maxWidth: "150px" }} />
    </Box>

    <Box sx={{ width: "100%", maxWidth: "350px", textAlign: "center" }}>
      <img
        src={BackgroundImage}
        alt="Background"
        style={{ width: "100%", borderRadius: "8px" }}
      />
    </Box>

    {/* Sign In Form */}


    <Box sx={{ width: "100%", maxWidth: "500px", textAlign: "center", mt: -8 }}>
  <Typography variant="h5" gutterBottom>
    Sign In
  </Typography>

  {/* Email Input */}
  <Box sx={{ textAlign: "left", width: "100%" }}>
    <Typography variant="body2" sx={{ fontWeight: 500, marginBottom: "4px" }} color="#656565">
      Email
    </Typography>
    <ReusableInput
    label=''
      placeholder="Enter your email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={!!errors.email}
      helperText={errors.email || ""}
      icon={<EmailOutlined />}
    />
  </Box>

  {/* Password Input */}
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
    <FormControlLabel control={<Checkbox />} label="Remember me" />
    <Typography variant="body2" sx={{ cursor: "pointer" }} color="primary">
      Forgot Password?
    </Typography>
  </Box>

  {/* Sign-In Button */}
  <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
    <ReusableButton text="Sign In" onClick={handleLogin} width="100%" borderRadius="100px" />
  </Box>
</Box>

  </Box>

  {/* Right Section - Occupies remaining space */}
  <Box
  sx={{
    flex: 1, // Takes remaining width
    height: "100vh", // Full height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 2,
  }}
>
  <Box
    sx={{
      width: "100%",
      height: "100%",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: 3,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
    }}
  >
    {/* Image Section - 40% height */}
    <Box sx={{ flex: 0.2 }}>
      <img
        src={SignInImage}
        alt="Sign In"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>

    {/* Content Section - 60% height */}
    <Box
      sx={{
        flex: 0.8,
        backgroundColor: "#1a2b47",
        color: "white",
        display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start", // Align content to the left
    textAlign: "left",
    p: 3,
      }}
    >
       <Box sx={{ mb: 1 }}>
    <img src={indicator} alt="Indicator Icon" style={{ width: "20px", height: "20px" }} />
  </Box>
      <Typography variant="h6">Print & Lamination Data Hub</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Enhance productivity with seamless data entry. Log in to access and update manufacturing records.
      </Typography>
    </Box>
  </Box>
</Box>

</Box>

  );
};

export default SignInPage;