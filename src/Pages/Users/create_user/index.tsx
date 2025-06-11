import React, { useState, useEffect } from 'react';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import ReusableInput from '../../../Components/ReUsable/TextField';
import DropdownComponent from '../../../Components/ReUsable/Dropdown';
import ButtonComponent from '../../../Components/ReUsable/Button';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import CreateUserPopups from './CreateUserPopups';
import { useCreateUserMutation,useUpdateUserMutation } from '../../../store/apis/manageUsersApi';

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
  { id: 'displayName', label: 'Display Name', value: '', type: 'text' , required: true },
  {
    id: 'role',
    label: 'Role',
    value: '',
    component: 'dropdown',
    options: ['Admin', 'Supervisor', 'User'],
    required: true,
  },
  { id: 'email', label: 'Email', value: '', type: 'email', required: true },
  { id: 'phoneNumber', label: 'Phone Number', value: '', type: 'text',},
];

const CreateUser: React.FC = () => {
  const location = useLocation()
  const [formFields, setFormFields] = useState<UserFormField[]>(initialUserFields);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openPopup,setOpenPopup] = useState<boolean>(false);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

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
        const phoneRegex = /^(?:(?:\+?(\d{1,3}))?[\s-.]?)?(?:\(?(\d{1,4})\)?[\s-.]?)?(\d{1,4}[\s-.]?){1,4}\d{1,4}$/;
        if (!phoneRegex.test(field.value)) {
          newErrors[field.id] = 'Invalid phone number';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async () => {
    if (!validateUserFields()) {
      toast.error('Please correct the errors before submitting');
      return;
    }
    setOpenPopup(true);
  };

  const handleCreateUser = async () => {
    try {
      const userData = formFields.reduce((acc, field) => {
        acc[field.id] = field.value;
        return acc;
      }, {} as Record<string, string>);

      // Map role to userTypeId if needed
      const payload = {
        displayName: userData.displayName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        userTypeId: userData.role === 'Admin' ? 1 : userData.role === 'Supervisor' ? 2 : 3 // Example mapping
      };

      !rowData ? await createUser(payload).unwrap() : await updateUser({ userId:1234, userData: payload }).unwrap();
      setFormFields(initialUserFields);
      return { success: true };
    } catch (error) {
      toast.error('Failed to create user');
      return { success: false, error };
    }
  };

  const rowData = location.state?.rowData

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
       <CreateUserPopups 
        onSubmit={handleCreateUser} 
        isLoading={!rowData ? isLoading  : isUpdating } 
        open={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </Box>
  );
};

export default CreateUser;
