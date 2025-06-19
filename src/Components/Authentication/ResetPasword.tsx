import { useState } from 'react';
import {
  Box,
  Typography,
  Alert,
} from '@mui/material';
import {
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  EmailOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReusableInput from '../ReUsable/TextField';
import ReusableButton from '../ReUsable/Button';
import { signInSchema } from '../ZodSchemas/signInpageValidation';
import indicator from "../../assets/Images/indicator.png";
import Logo from "../../assets/Images/Logo.svg";
import SignInImage from "../../assets/Images/signIn.png";
import BackgroundImage from "../../assets/Images/backgroundPatternImage.png";
import curveImage from "../../assets/Images/curves.png";
import { useResetPasswordMutation } from '../../store/apis/manageUsersApi';


const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    const emailResult = signInSchema.shape.email.safeParse(email);
    if (!emailResult.success) {
      setError(emailResult.error.issues[0]?.message || "Invalid email");
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

    try {
      const response = await resetPassword({
        email: email,
        newPassword: password,
    isForForgotPassword:true,
      }).unwrap();

      if (response?.statusCode === 200) {
        toast.success(response?.message);
        setStep('success');
      } else {
        toast.error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Error resetting password");
      navigate("/");
    }
  };



  const handleGoToLogin = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (step) {
      case 'form':
        return (
          <Box sx={{ width: "100%", maxWidth: "500px", textAlign: "center", marginTop: "5rem" }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#2d3748', mb: 2 }}>
              Reset Password
            </Typography>
            <Typography variant="body1" sx={{ color: '#718096', mb: 4 }}>
              Enter your email and set a new password.
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

            <Box sx={{ textAlign: "left", width: "100%", mt: 2 }}>
              <ReusableInput
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<LockIcon />}
              />
            </Box>

            <Box sx={{ textAlign: "left", width: "100%", mt: 2 }}>
              <ReusableInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<LockIcon />}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 3 }}>
              <ReusableButton
                text="Reset Password"
                onClick={handleResetPassword}
                width="100%"
                borderRadius="100px"
                color="#0073B7"
                loading={isLoading}
              />
            </Box>
          </Box>
        );

      case 'success':
        return (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
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
                    '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(72, 187, 120, 0.7)' },
                    '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 20px rgba(72, 187, 120, 0)' },
                    '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(72, 187, 120, 0)' },
                  },
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 60, color: 'white' }} />
              </Box>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#2d3748', mb: 2 }}>
              Password Reset Successful!
            </Typography>
            <Typography variant="body1" sx={{ color: '#718096', mb: 4 }}>
              You can now sign in with your new password.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <ReusableButton
                text="Go to Login"
                onClick={handleGoToLogin}
                width="40%"
                borderRadius="100px"
                color="#0073B7"
              />
            </Box>
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
          <Alert severity="error" sx={{ mt: 3, width: "100%", maxWidth: "500px" }}>
            {error}
          </Alert>
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

export default ResetPassword;
