import { Box, Typography, Grid, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import ReusableInput from '../../../Components/ReUsable/TextField';
import DropdownComponent from '../../../Components/ReUsable/Dropdown';
import ButtonComponent from '../../../Components/ReUsable/Button';

interface FormField {
  id: string;
  label: string;
  value: string | string[];
  type?: string;
  component?: 'dropdown' | 'input';
  options?: string[];
}

const CreatePlan: React.FC = () => {
  const initialFormFields: FormField[] = [
    { id: 'indentNumber', label: 'Indent Number:', value: '' },
    { id: 'ppcIndentQty', label: 'PPC Indent Qty (NOS):', value: '' },
    { id: 'colorsForSettings', label: 'No of Colors for settings', value: '' },
    { id: 'colorsForCirMatch', label: 'No Of Colours for Cir match', value: '' },
    { id: 'webLength', label: '1 Web Length for Colours Match', value: '' },
    { id: 'colorMatching', label: 'Colour Matching', value: '' },
    { id: 'shadeMatching', label: 'Shade Matchings', value: '' },
    {
      id: 'labelType',
      label: 'Type of Label',
      component: 'dropdown',
      options: ['KitKat 50g Wrapper'],
      value: ''
    },
    { id: 'batToPrint', label: 'Bat to Print Indent Qty (Mtrs) planned', value: '' },
    { id: 'dieCutWastage', label: 'Die-Cut Wastage', value: '' },
    { id: 'laminationWastage', label: 'Lamination Wastage', value: '' },
    { id: 'jobRunDate', label: 'Job Run Date', type: 'date', value: '' },
  ];

  const [formFields, setFormFields] = useState<FormField[]>(initialFormFields);

  const handleInputChange = (
    id: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    const extractedValue =
      typeof value === 'object' && 'target' in value ? value.target.value : value;

    setFormFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? { ...field, value: extractedValue } : field
      )
    );
  };

  const handleSave = () => {
    const formData = formFields.reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {} as Record<string, string | string[]>);

    console.log('Form data to save:', formData);
  };

  const handleAddNewJob = () => {
    console.log('Add new job button clicked');
  };

  const handleReset = () => {
    setFormFields(initialFormFields);
  };

  return (
    <Box className="bg-white rounded-xl px-5 py-6">
      <Box className="mb-3 flex justify-between">
        <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>
          Add Indent Number
        </Typography>
        <Box>
          <ButtonComponent
            text="Add New Job"
            textColor="#0073B7"
            color="white"
            borderRadius="100px"
            p={2}
            border="1px solid #0073B7"
            styles={{ marginRight: '.5rem' }}
            onClick={handleAddNewJob}
          />
          <ButtonComponent
            text="Reset"
            textColor="#0073B7"
            color="white"
            borderRadius="100px"
            p={2}
            border="1px solid #0073B7"
            styles={{ marginRight: '.5rem' }}
            onClick={handleReset}
          />
          <ButtonComponent
            text="Save"
            textColor="#0073B7"
            color="white"
            borderRadius="100px"
            p={2}
            border="1px solid #0073B7"
            onClick={handleSave}
          />
        </Box>
      </Box>

      <Grid container spacing={2} pt={1}>
        {formFields.map(field => (
          <Grid size={{xs:12, sm:6 ,md:4, lg:3}}  key={field.id}>
            {field.component === 'dropdown' ? (
              <DropdownComponent
                label={field.label}
                options={field.options || []}
                value={field.value}
                onChange={(value) => handleInputChange(field.id, value)}
                isMultiSelect={false}
                checkbox={false}
              />
            ) : (
              <ReusableInput
                label={field.label}
                value={field.value}
                type={field.type || 'text'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(field.id, e.target.value)
                }
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CreatePlan;
