

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Fade,
} from '@mui/material';
import {
  Lock as LockIcon,
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container>
        <Fade in timeout={800}>
          <Box
            sx={{
              padding: { xs: 3, sm: 6 },
              textAlign: 'center',
              borderRadius: 4,
               width: '100vw'
            }}
          >
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
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                      boxShadow: '0 0 0 0 rgba(255, 107, 107, 0.7)',
                    },
                    '70%': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 0 20px rgba(255, 107, 107, 0)',
                    },
                    '100%': {
                      transform: 'scale(1)',
                      boxShadow: '0 0 0 0 rgba(255, 107, 107, 0)',
                    },
                  },
                }}
              >
                <LockIcon
                  sx={{
                    fontSize: 60,
                    color: 'white',
                  }}
                />
              </Box>
            </Box>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                color: '#2d3748',
                mb: 2,
                fontSize: { xs: '2.5rem', sm: '3.5rem' },
              }}
            >
              401
            </Typography>

            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
                color: '#4a5568',
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              Unauthorized Access
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#718096',
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.6,
                maxWidth: 400,
                margin: '0 auto 2rem auto',
              }}
            >
              Sorry, you don't have permission to access this page.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<HomeIcon />}
                onClick={handleGoHome}
                sx={{
                  background: '#1976d2',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  minWidth: 160,
                  '&:hover': {
                    background: '#1976d2',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Go Home
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  minWidth: 160,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#1976d2',
                    color: '#1976d2',
                    backgroundColor: 'rgba(102, 126, 234, 0.04)',
                    transform: 'translateY(-2px)',
                    borderWidth: 2,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Go Back
              </Button>
            </Stack>

          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default UnauthorizedPage;
