import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";
import { number } from "zod";

interface ButtonComponentProps extends Omit<ButtonProps, "color"> {
  text: string;
  color?: string; // Custom background color
  textColor?: string; // Custom text color
  width?: string;
  height?: string;
  border?: string; // Custom border style
  borderRadius?: string; // Custom border radius
  loading?: boolean; // Loading state
  p?:string | number
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  color = "blue",
  textColor = "white",
  width = "auto",
  height = "40px",
  border = "none",
  borderRadius = "8px", // Default border radius
  loading,
  p='2px',
  ...props
}) => {
  return (
    <MUIButton
      {...props}
      disabled={loading}
      sx={{
        backgroundColor: color,
        color: textColor,
        width: width,
        height: height,
padding:p,
whiteSpace:'nowrap',
        border: border !== "none" ? border : "2px solid transparent", // Default to transparent border if "none"
        borderRadius: borderRadius, // Apply dynamic border radius
        "&:hover": {
          backgroundColor: color ? `${color}D9` : "transparent",
        },
        // Handle visibility if border is none and text color is also light
        ...(color === "none" && { color: textColor || "black" }), // Ensure text is visible if color is none
      }}
    >
      {loading ? "Loading..." : text}
    </MUIButton>
  );
};

export default ButtonComponent;
