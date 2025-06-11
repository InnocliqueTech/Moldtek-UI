import React, { useState, useEffect } from 'react';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import ReusableInput from '../../../Components/ReUsable/TextField';
import DropdownComponent from '../../../Components/ReUsable/Dropdown';
import ButtonComponent from '../../../Components/ReUsable/Button';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

interface UserFormField {
  id: string;
  label: string;
  value: string;
  type?: string;
  component?: 'dropdown' | 'input';
  options?: string[];
  required?: boolean;
}

const initialUserFields: UserFormField[] = [
  { id: 'firstName', label: 'First Name', value: '', type: 'text', required: true },
  { id: 'lastName', label: 'Last Name', value: '', type: 'text', required: true },
  { id: 'displayName', label: 'Display Name', value: '', type: 'text' },
  {
    id: 'role',
    label: 'Role',
    value: '',
    component: 'dropdown',
    options: ['Admin', 'Manager', 'User'],
    required: true,
  },
  { id: 'email', label: 'Email', value: '', type: 'email', required: true },
  { id: 'phoneNumber', label: 'Phone Number', value: '', type: 'text', required: true },
];

const CreateUser: React.FC = () => {
  const location = useLocation()
  const [formFields, setFormFields] = useState<UserFormField[]>(initialUserFields);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    fieldId: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    let extractedValue =
      typeof value === 'object' && 'target' in value ? value.target.value : value;

    // Add any custom logic for specific fields if needed in future
    if (fieldId === 'email' && typeof extractedValue === 'string') {
      extractedValue = extractedValue.trim().toLowerCase();
    }

    setFormFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId ? { ...field, value: extractedValue as string } : field
      )
    );

    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };


  const validateUserFields = () => {
    const newErrors: Record<string, string> = {};

    formFields.forEach(field => {
      if (field.required && !field.value.trim()) {
        newErrors[field.id] = `${field.label} is required`;
      }

      if (field.id === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          newErrors[field.id] = 'Invalid email format';
        }
      }

      if (field.id === 'phoneNumber' && field.value) {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(field.value)) {
          newErrors[field.id] = 'Invalid phone number';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateUserFields()) {
      toast.error('Please correct the errors before submitting');
      return;
    }

    const userData = formFields.reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {} as Record<string, string>);

    console.log('User Data to submit:', userData);
    toast.success('User created successfully!');
    // Call an API or dispatch an action here
  };

  const rowData = location.state?.rowData
  console.log("rowData", rowData)

  useEffect(() => {
    if (rowData) {
      setFormFields((prevFields) =>
        prevFields.map((field) => ({
          ...field,
          value: rowData[field.id] || ''
        }))
      )
    }
  }, [rowData])
  return (
    <Box style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px 24px' }}>
      {/* <Typography variant="h6" gutterBottom>{rowData ? "Update User" : "Create User"}</Typography> */}

      <Grid container spacing={2}>
        {formFields.map((field) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={field.id}>
            {field.component === 'dropdown' ? (
              <DropdownComponent
                label={field.label}
                options={field.options || []}
                value={field.value}
                onChange={(value) => handleInputChange(field.id, value)}
                isMultiSelect={false}
                checkbox={false}
                error={!!errors[field.id]}
                helperText={errors[field.id]}
              />
            ) : (
              <ReusableInput
                label={field.label}
                value={field.value}
                type={field.type || 'text'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(field.id, e.target.value)
                }
                error={!!errors[field.id]}
                helperText={errors[field.id]}
              />
            )}
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <ButtonComponent
          text={rowData ? "Update User" : "Create User"}
          textColor="#ffffff"
          color="#0073B7"
          borderRadius="100px"
          p={2}
          border="1px solid #0073B7"
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default CreateUser;
