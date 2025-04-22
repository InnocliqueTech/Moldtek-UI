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
  styles?:{},
  disabled?:boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  color = "blue",
  textColor = "white",
  width = "auto",
  height = "40px",
  border = "none",
  borderRadius = "8px",
  loading = false,
  p = "2px",
  styles = {},
  disabled = false,
  ...props
}) => {

  const hasClick = typeof props.onClick === "function";

  return (
    <MUIButton
      {...props}
      disabled={disabled || loading}
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
        cursor: hasClick ? "pointer" : "default",
        pointerEvents: hasClick ? "auto" : "none",
        "&:hover": {
          backgroundColor: hasClick
            ? color
              ? `${color}D9`
              : "transparent"
            : color,
        },
        "&.Mui-disabled": {
          backgroundColor: "#E0E0E0",
          color: "#000000",
          border: "none",
        },
        ...(color === "none" && { color: textColor || "black" }),
        ...styles,
      }}
    >
      {loading ? "Loading...." : text}
    </MUIButton>
  );
};


export default ButtonComponent;
