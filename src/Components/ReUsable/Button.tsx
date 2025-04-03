import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";

interface ButtonComponentProps extends Omit<ButtonProps, "color"> {
  text: string;
  color?: string; // Custom background color
  textColor?: string; // Custom text color
  width?: string;
  height?: string;
  border?: string; // Custom border style
  borderRadius?: string; // Custom border radius
  loading?: boolean; // Loading state
  p?: string | number;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  color = "blue",
  textColor = "white",
  width = "auto",
  height = "40px",
  border = "none",
  borderRadius = "8px", 
  loading,
  p = "2px",
  ...props
}) => {
  const formatText = (text: string) => 
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  return (
    <MUIButton
      {...props}
      disabled={loading}
      sx={{
        backgroundColor: color,
        color: textColor,
        width: width,
        height: height,
        padding: p,
        whiteSpace: "nowrap",
        border: border !== "none" ? border : "2px solid transparent",
        borderRadius: borderRadius,
        textTransform: "none",
        "&:hover": {
          backgroundColor: color ? `${color}D9` : "transparent",
        },
        ...(color === "none" && { color: textColor || "black" }),
      }}
    >
      {loading ? "Loading..." : formatText(text)}
    </MUIButton>
  );
};

export default ButtonComponent;
