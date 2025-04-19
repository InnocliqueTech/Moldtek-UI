import React, { useEffect, useState } from "react";
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
import { useLoginMutation } from "../../store/services/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setRememberMe } from "../../store/slices/masterDataSlice";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/masterData", { replace: true });
    }
  }, [navigate]);



  const from = location.state?.from?.pathname || "/masterData";
const {rememberMe} = useSelector((state:RootState)=>state.masterData)
  const [login,{isLoading}] = useLoginMutation();
const dispatch = useDispatch();
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
  
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", response?.data?.token);
        storage.setItem("auth", "true");
        storage.setItem("role", response?.data?.userTypeName);
  
        navigate(from, { replace: true });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.setItem("auth", "false");
        toast.error("Login failed: No token received");
        navigate("/");
      }
    } catch (err: any) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.setItem("auth", "false");
      toast.error(err?.data?.message || "Login failed: No token received");
      navigate("/");
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
        <Box sx={{ width: "100%", maxWidth: "500px", textAlign: "center" ,mt:20}}>
          <Typography fontWeight={600} color="#2F2F2F" fontSize={32}>
            Sign In
          </Typography>

          {/* Email Input */}
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
            <FormControlLabel control={<Checkbox />} label="Remember me" onClick={()=>dispatch(setRememberMe(true))} />
            {/* <Typography variant="body2" sx={{ cursor: "pointer" }} color="primary">
              Forgot Password?
            </Typography> */}
          </Box>

          {/* Sign-In Button */}
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
          <ReusableButton 
  text="Sign In"
  onClick={handleLogin}
  width="100%"
  borderRadius="100px"
  color="#0073B7"
  disabled={!isFormValid()}
  loading={isLoading}
/>

          </Box>
        </Box>
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
            height: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          {/* Image Section */}
          <Box sx={{ flex: 0.2 }}>
            <img src={SignInImage} alt="Sign In" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>

          {/* Content Section */}
          <Box
            sx={{
              flex: 0.8,
              backgroundColor: "#2F4052",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              textAlign: "left",
              p: 3,
            }}
          >
            <Box sx={{ mb: 1 }}>
              <img src={indicator} alt="Indicator Icon" style={{ height: "4px" }} />
            </Box>
            <Typography sx={{color:'#ECECEC',fontWeight:600,fontSize:'20px'}}>Print & Lamination Data Hub</Typography>
            <Typography   sx={{ mt: 1 ,color:'#ECECEC',fontWeight:400,fontSize:'15px'}}>
              Enhance productivity with seamless data entry. Log in to access and update manufacturing records.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;