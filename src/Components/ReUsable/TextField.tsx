// components/ReusableInput.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface ReusableInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  error?: boolean;
  helperText?: string;
}

const ReusableInput: React.FC<ReusableInputProps> = ({
  label,
  value,
  onChange,
  type,
  error = false,
  helperText = '',
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth
      variant="outlined"
      error={error}
      helperText={helperText}
    />
  );
};

export default ReusableInput;
