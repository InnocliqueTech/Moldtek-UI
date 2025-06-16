import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Skeleton,
} from '@mui/material';
import { Person, Lock } from '@mui/icons-material';
import ReusableInput from '../../Components/ReUsable/TextField';
import ReusableButton from '../../Components/ReUsable/Button';
import { useGetPersonalDetailsQuery, useResetPasswordMutation } from '../../store/apis/manageUsersApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

const userId = localStorage.getItem("userId")||"";
const email = localStorage.getItem("email");

  const [resetPassword,{isLoading}] = useResetPasswordMutation();

  const {data,isLoading:personalDetailsLoading} = useGetPersonalDetailsQuery(email);


  useEffect(()=>{
if(data){
  setPersonalDetails(data.data)
}
  },[data])

  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    displayName:''
  });

  const handlePersonalChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalDetails({ ...personalDetails, [field]: e.target.value });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handlePasswordChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordDetails({ ...passwordDetails, [field]: e.target.value });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

const validatePersonalForm = () => {
  const newErrors = { ...errors };
  let isValid = true;

  if (!personalDetails.firstName?.trim()) {
    newErrors.firstName = 'First Name is required';
    isValid = false;
  }

  if (!personalDetails.lastName?.trim()) {
    newErrors.lastName = 'Last Name is required';
    isValid = false;
  }

  if (!personalDetails.displayName?.trim()) {
    newErrors.displayName = 'Display Name is required';
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};


  const validatePasswordForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!passwordDetails.oldPassword.trim()) {
      newErrors.oldPassword = 'Old Password is required';
      isValid = false;
    }
    if (!passwordDetails.newPassword.trim()) {
      newErrors.newPassword = 'New Password is required';
      isValid = false;
    }
    if (!passwordDetails.confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = 'Confirm New Password is required';
      isValid = false;
    } else if (passwordDetails.newPassword !== passwordDetails.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSavePersonal = () => {
    if (validatePersonalForm()) {
      console.log('Personal Details Saved:', personalDetails);
    }
  };

const handleSavePassword = async () => {
  if (validatePasswordForm()) {
    try {
      await resetPassword({
        userId: Number(userId),
        newPassword: passwordDetails.newPassword,
        oldPassword: passwordDetails.oldPassword,
      }).unwrap();

      toast.success("Password reset successfully. You will be redirected to login. Please login with your new password.");
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage); 
    }
  }
};


 


  return (
    <Box>
      {/* Personal Details Card */}
      <Paper elevation={3} sx={{ borderRadius: '12px', p: 3, mb: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Person sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={600}>
            Personal Details
          </Typography>
        </Box>
<Grid container spacing={3}>
  {personalDetailsLoading ? (
    <>
      {[...Array(5)].map((_, index) => (
        <Grid size={{xs:12,sm:6}} key={index}>
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: '8px' }} />
        </Grid>
      ))}
    </>
  ) : (
    <>
      <Grid size={{xs:12,sm:6}}>
        <ReusableInput
          label="First Name"
          value={personalDetails.firstName}
          onChange={handlePersonalChange('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
        />
      </Grid>
      <Grid size={{xs:12,sm:6}}>
        <ReusableInput
          label="Last Name"
          value={personalDetails.lastName}
          onChange={handlePersonalChange('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
        />
      </Grid>
      <Grid size={{xs:12,sm:6}}>
        <ReusableInput
          label="Display Name"
          value={personalDetails.displayName}
          onChange={handlePersonalChange('displayName')}
          error={!!errors.displayName}
          helperText={errors.displayName}
          required
        />
      </Grid>
      <Grid size={{xs:12,sm:6}}>
        <ReusableInput
          label="Email"
          value={personalDetails.email}
          onChange={() => {}}
          disabled
        />
      </Grid>
      <Grid size={{xs:12,sm:6}}>
        <ReusableInput
          label="Phone Number"
          value={personalDetails.phone}
          onChange={handlePersonalChange('phone')}
          placeholder="+1 (555) 123-4567"
        />
      </Grid>
    </>
  )}
</Grid>


        <Box mt={4} display="flex" justifyContent="flex-end">
          <ReusableButton
            text="Save Changes"
            borderRadius="100px"
            color="#0073B7"
            textColor="white"
            p={2}
            onClick={handleSavePersonal}
          />
        </Box>
      </Paper>

      {/* Update Password Card */}
      <Paper elevation={3} sx={{ borderRadius: '12px', p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Lock sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={600}>
            Update Password
          </Typography>
        </Box>

        <Grid container spacing={3}>
         <Grid size={{xs:12,sm:6}}>
            <ReusableInput
              label="Old Password"
              type="password"
              value={passwordDetails.oldPassword}
              onChange={handlePasswordChange('oldPassword')}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword}
              required
            />
          </Grid>
         <Grid size={{xs:12,sm:6}}>
            <ReusableInput
              label="New Password"
              type="password"
              value={passwordDetails.newPassword}
              onChange={handlePasswordChange('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              required
            />
          </Grid>
         <Grid size={{xs:12,sm:6}}>
            <ReusableInput
              label="Confirm New Password"
              type="password"
              value={passwordDetails.confirmNewPassword}
              onChange={handlePasswordChange('confirmNewPassword')}
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword}
              required
            />
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <ReusableButton
            text="Save Changes"
            borderRadius="100px"
            color="#0073B7"
            textColor="white"
            p={2}
            onClick={handleSavePassword}
            loading={isLoading}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
