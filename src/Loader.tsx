import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "./assets/Images/Logo.svg"

const Loader: React.FC = () => {
    return (
    <Box className="loader-container">
    <img src={Logo} alt="Logo" className="logo" />
    <Typography variant="h6" fontWeight={500} className="loader-text">
      Loading<span className="dot-flash" />
    </Typography>

    <style>
      {`
        .loader-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #e3f2fd, #ffffff);
          animation: fadeIn 0.8s ease-in-out;
        }

        .logo {
          width: 80px;
          height: auto;
          margin-bottom: 16px;
        }

        .loader-text {
          font-family: 'Segoe UI', sans-serif;
          font-size: 1.5rem;
          color: #1976d2;
        }

        .dot-flash::after {
          content: '';
          display: inline-block;
          animation: dots 1.2s steps(3, end) infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes dots {
          0% { content: ''; }
          33% { content: '.'; }
          66% { content: '..'; }
          100% { content: '...'; }
        }
      `}
    </style>
  </Box>
);
};

export default Loader;