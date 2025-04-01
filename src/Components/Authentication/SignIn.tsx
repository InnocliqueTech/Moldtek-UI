import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReusableInput from '../ReUsable/TextField';
import ReusableButton from '../ReUsable/Button';
import { signInSchema } from '../ZodSchemas/signInpageValidation';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleLogin = () => {
    // Clear previous errors
    setErrors({});

    // Validate using Zod schema
    const result = signInSchema.safeParse({ email, password });

    if (!result.success) {
      // If validation fails, set errors for the form
      const newErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'email') {
          newErrors.email = err.message;
        } else if (err.path[0] === 'password') {
          newErrors.password = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // If validation passes, proceed to dashboard
      // Simulate successful authentication (Replace with actual API call)
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left section with form */}
      <Grid size={{ xs: 6, md: 8 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 4 }} component="div">
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <ReusableInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email || ''}
        />
        <ReusableInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password || ''}
        />
        <ReusableButton text="Login" onClick={handleLogin} fullWidth />
        {errors.email || errors.password ? (
          <Typography color="error" variant="body2">
            There are errors in the form. Please check the inputs.
          </Typography>
        ) : null}
      </Grid>

      {/* Right section with image */}
      <Grid size={{ xs: 6, md: 8 }}>
        <Box
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SignInPage;
