import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotFoundPageImage from "../../assets/Images/NotFound.jpg";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width:"100vw",
        textAlign: "center",
      }}
    >
      <img
        src={NotFoundPageImage} // Replace with your image path
        alt="Not Found"
        style={{ width: "300px", marginBottom: "20px" }}
      />
      <Typography variant="h4" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
