
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  Stack,
  Fade,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Lock as LockIcon,
  Email as EmailIcon,
  Visibility,
  VisibilityOff,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  EmailOutlined,
} from '@mui/icons-material';
import ReusableButton from "../ReUsable/Button";
import { useNavigate } from 'react-router-dom';
import indicator from "../../assets/Images/indicator.png";
import Logo from "../../assets/Images/Logo.svg";
import SignInImage from "../../assets/Images/signIn.png";
import BackgroundImage from "../../assets/Images/backgroundPatternImage.png";
import ReusableInput from '../ReUsable/TextField';
import curveImage from "../../assets/Images/curves.png";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'code' | 'password' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setStep('code');
  };

  const handleVerifyCode = () => {
    if (!code) {
      setError('Please enter the verification code');
      return;
    }
    setError('');
    setStep('password');
  };

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setError('');
    setStep('success');
  };

  const handleGoBack = () => {
    if (step === 'email') {
      navigate('/');
    } else if (step === 'code') {
      setStep('email');
    } else if (step === 'password') {
      setStep('code');
    }
  };

  const handleGoToLogin = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (step) {
      case 'email':
        return (
          <>
           <Box
          style={{ width: "100%", maxWidth: "500px", textAlign: "center", marginTop: "5rem" }}
        >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                color: '#2d3748',
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              Reset Password
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#718096',
                mb: 4,
                fontSize: '1rem',
                lineHeight: 1.6,
              }}
            >
              Enter your email address and we'll send you a verification code to reset your password.
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
              // error={!!errors.email}
              // helperText={errors.email || ""}
              icon={<EmailOutlined />}
            />
          </Box>
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
                      <ReusableButton
                        text="Send Verification Code"
                        onClick={handleSendCode}
                        width="100%"
                        borderRadius="100px"
                        color="#0073B7"
                        // disabled={!isFormValid()}
                        // loading={isLoading}
                      />
                    </Box>
            </Box>
          </>
        );

      case 'code':
        return (
          <>
           <Box
          style={{ width: "100%", maxWidth: "500px", textAlign: "center", marginTop: "5rem" }}
        >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                color: '#2d3748',
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              Enter Verification Code
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#718096',
                mb: 4,
                fontSize: '1rem',
                lineHeight: 1.6,
              }}
            >
              We've sent a 6-digit verification code to {email}. Please enter it below.
            </Typography>
                                  <Box sx={{ textAlign: "left", width: "100%" }}>
            {/* <Typography variant="body2" sx={{ fontWeight: 500, marginBottom: "4px" }} color="#656565">
              Verification Code
            </Typography> */}
            <ReusableInput
              label=" Verification Code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              type="email"
              value={code}
            />
          </Box>
           <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
                      <ReusableButton
                        text=" Verify Code"
                        onClick={handleVerifyCode}
                        width="100%"
                        borderRadius="100px"
                        color="#0073B7"
                        // disabled={!isFormValid()}
                        // loading={isLoading}
                      />
                    </Box>
                    </Box>
          </>
        );

      case 'password':
        return (
          <>
           <Box
          style={{ width: "100%", maxWidth: "500px", textAlign: "center", marginTop: "5rem" }}
        >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                color: '#2d3748',
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              Set New Password
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#718096',
                mb: 4,
                fontSize: '1rem',
                lineHeight: 1.6,
              }}
            >
              Create a new password for your account. Make sure it's strong and secure.
            </Typography>
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#667eea' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#667eea' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleResetPassword}
              sx={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                py: 1.5,
                mb: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8, #6a42a0)',
                },
              }}
            >
              Reset Password
            </Button>
            </Box>
          </>
        );

      case 'success':
        return (
          <>
            <Box
              sx={{
                mb: 3,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #48bb78, #38a169)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                      boxShadow: '0 0 0 0 rgba(72, 187, 120, 0.7)',
                    },
                    '70%': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 0 20px rgba(72, 187, 120, 0)',
                    },
                    '100%': {
                      transform: 'scale(1)',
                      boxShadow: '0 0 0 0 rgba(72, 187, 120, 0)',
                    },
                  },
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: 60,
                    color: 'white',
                  }}
                />
              </Box>
            </Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                color: '#2d3748',
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              Password Reset Successful!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#718096',
                mb: 4,
                fontSize: '1rem',
                lineHeight: 1.6,
              }}
            >
              Your password has been successfully reset. You can now sign in with your new password.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleGoToLogin}
              sx={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                py: 1.5,
                mb: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8, #6a42a0)',
                },
              }}
            >
              Go to Login
            </Button>
          </>
        );

      default:
        return null;
    }
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
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {step !== 'success' && (
               <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{
                   width: step === 'email' ?"25%":"20%",
                  borderColor: '#0073B7',
                  color: '#0073B7',
                  borderRadius: '100px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  px: '2px',
                  py:'4px',
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#0073B7',
                    color: '#0073B7',
                    backgroundColor: 'rgba(102, 126, 234, 0.04)',
                    borderWidth: 2,
                  },
                }}
              >
                {step === 'email' ? 'Back to Home' : 'Back'}
              </Button>
              </Box>
            )}
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

export default ForgotPassword;

