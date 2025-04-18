import { Box, Typography, Grid, SelectChangeEvent } from '@mui/material';
import React, { useState , useEffect} from 'react';
import ReusableInput from '../../../Components/ReUsable/TextField';
import DropdownComponent from '../../../Components/ReUsable/Dropdown';
import ButtonComponent from '../../../Components/ReUsable/Button';
import { toast } from 'react-toastify';
import SubmitPopups from './submitPopups';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../store';
import { setSubmitAndPublishPopup } from '../../../store/slices/masterDataSlice';
import { listOfLables } from '../../createMasterData/data';
import { validateFormFields } from './formValidation';

const LOCAL_STORAGE_KEY = 'savedPlansData';

export interface FormField {
  id: string;
  label: string;
  value: string | string[];
  type?: string;
  component?: 'dropdown' | 'input';
  options?: string[];
}

const typeOfLabelOptions = listOfLables.map((option) => option.labelTypeName);

const initialFormFields: FormField[] = [
  { id: 'indentNumber', label: 'Indent Number:', value: '' },
  { id: 'unitEffNumber', label: 'Unit Effective Number:', value: '' },
  { id: 'ppcIndentQty', label: 'PPC Indent Qty (NOS):', value: '' },
  { id: 'colorsForSettings', label: 'No of Colors for settings', value: '' },
  { id: 'colorsForCirMatch', label: 'No Of Colours for Clr match', value: '' },
  { id: 'webLength', label: '1 Web Length for Colours Match', value: '' },
  { id: 'typeOfLabel', label: 'Type of Label', value: '',component: 'dropdown',
    options: typeOfLabelOptions, },
  // { id: 'colorMatching', label: 'Colour Matching', value: '' },
  { id: 'shadeMatching', label: 'Shade Matchings', value: '' },
  {
    id: 'labelType',
    label: 'No of Rolls',
    component: 'dropdown',
    options: ['KitKat 50g Wrapper'],
    value: ''
  },
  { id: 'batToPrint', label: 'Bat to Print Indent Qty (Mtrs) planned', value: '' },
  // { id: 'dieCutWastage', label: 'Die-Cut Wastage', value: '' },
  // { id: 'laminationWastage', label: 'Lamination Wastage', value: '' },
  {
    id: 'jobType',
    label: 'Job Type',
    component: 'dropdown',
    options: ['New','Repeat'],
    value: ''
  },
  { id: 'jobRunDate', label: 'Job Run Date', type: 'date', value: '' },
];

const CreatePlan: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formFields, setFormFields] = useState<FormField[]>(initialFormFields);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleInputChange = (
    fieldId: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    const extractedValue =
      typeof value === 'object' && 'target' in value ? value.target.value : value;

    setFormFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId ? { ...field, value: extractedValue } : field
      )
    );

  // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    const formData = formFields.reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {} as Record<string, string | string[]>);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    // toast.success('Data saved successfully!');
  };

  const handleSubmit = async () => {
    const validation = validateFormFields(formFields);
    if (!validation.isValid) {
      // Extract errors from validation object
      const { isValid, errorMessage, ...errorFields } = validation;
      setErrors(errorFields);
      toast.error('Please Enter valid data before submitting');
      return;
    }
    setErrors({});
    dispatch(setSubmitAndPublishPopup(true))
    const formData = formFields.reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {} as Record<string, string | string[]>);
    console.log(formData,"formData Submitted");
    try {
      // Here you would typically make an API call to submit the data
      // For example:
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Clear localStorage and reset form after successful submission
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setFormFields(initialFormFields);
      // toast.success('Data submitted successfully! Form has been reset.');
    } catch (error) {
      console.error('Failed to submit data:', error);
      toast.error('Failed to submit data. Please try again.');
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData && typeof parsedData === 'object') {
          const loadedFields = initialFormFields.map(field => {
            return {
              ...field,
              value: parsedData[field.id] || field.value
            };
          });
          setFormFields(loadedFields);
        }
      } catch (error) {
        console.error('Failed to parse saved data:', error);
      }
    }
  }, []);

  return (
    <Box className="bg-white rounded-xl px-5 py-2">
      <Box sx={{ mb: 1, pb: 1 }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: '600' }} className="mb-3">
          Add New Job
        </Typography>
        <Grid container spacing={2} pt={1}>
          {formFields.map(field => (
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
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 2, }}>
          * All fields are mandatory
        </Typography>
        <Box className="flex justify-end">
          <ButtonComponent
            text="Save"
            textColor="#0073B7"
            color="white"
            borderRadius="100px"
            p={2}
            border="1px solid #0073B7"
            styles={{ marginRight: '.5rem' }}
            onClick={handleSave}
          />
          <ButtonComponent
            text="Submit"
            textColor="#ffffff"
            color="#0073B7"
            borderRadius="100px"
            p={2}
            border="1px solid #0073B7"
            onClick={handleSubmit}
          />
        </Box>
      </Box>
      <SubmitPopups/>
    </Box>
  );
};

export default CreatePlan;