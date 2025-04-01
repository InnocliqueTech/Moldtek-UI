import React from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';

interface ButtonComponentProps extends ButtonProps {
  text: string;
  color?: string; // Background color
  textColor?: string; // Text color
  width?: string; // Width of the button
  height?: string; // Height of the button
  border?: string; // Border style (e.g., '2px solid black')
  loading?: boolean; // Optional loading state
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  color = 'blue', // Default color
  textColor = 'white', // Default text color
  width = 'auto', // Default width
  height = '40px', // Default height
  border = 'none', // Default no border
  loading,
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
        border: border,
        '&:hover': {
          backgroundColor: color ? `${color}D9` : 'transparent', // Darken color on hover
        },
      }}
    >
      {loading ? 'Loading...' : text}
    </MUIButton>
  );
};

export default ButtonComponent;
