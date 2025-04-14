import { Box, Typography, Grid, SelectChangeEvent } from '@mui/material';
import React, { useState , useEffect} from 'react';
import ReusableInput from '../../../Components/ReUsable/TextField';
import DropdownComponent from '../../../Components/ReUsable/Dropdown';
import ButtonComponent from '../../../Components/ReUsable/Button';

const LOCAL_STORAGE_KEY = 'savedPlansData';

interface FormField {
  id: string;
  label: string;
  value: string | string[];
  type?: string;
  component?: 'dropdown' | 'input';
  options?: string[];
}

interface Plan {
  id: number;
  formFields: FormField[];
}

const initialFormFields: FormField[] = [
  { id: 'indentNumber', label: 'Indent Number:', value: '' },
  { id: 'unitEffNumber', label: 'Unit Effective Number:', value: '' },
  { id: 'ppcIndentQty', label: 'PPC Indent Qty (NOS):', value: '' },
  { id: 'colorsForSettings', label: 'No of Colors for settings', value: '' },
  { id: 'colorsForCirMatch', label: 'No Of Colours for Clr match', value: '' },
  { id: 'webLength', label: '1 Web Length for Colours Match', value: '' },
  { id: 'colorMatching', label: 'Colour Matching', value: '' },
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
  { id: 'jobRunDate', label: 'Job Run Date', type: 'date', value: '' },
];

const CreatePlan: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([{ id: 1, formFields: initialFormFields }]);

  const handleInputChange = (
    planId: number,
    fieldId: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    const extractedValue =
      typeof value === 'object' && 'target' in value ? value.target.value : value;

    setPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === planId
          ? {
            ...plan,
            formFields: plan.formFields.map(field =>
              field.id === fieldId ? { ...field, value: extractedValue } : field
            )
          }
          : plan
      )
    );
  };

  const handleSave = () => {
    const allFormData = plans.map(plan => {
      return plan.formFields.reduce((acc, field) => {
        acc[field.id] = field.value;
        return acc;
      }, {} as Record<string, string | string[]>);
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allFormData));
    console.log('All plans data saved to localStorage:', allFormData);
    
    // Optional: Show a success message
    alert('Data saved successfully!');
  };
  const handleRemovePlan = (planId: number) => {
    if (plans.length <= 1) return; // Don't remove the last plan
    setPlans(plans.filter(plan => plan.id !== planId));
  };

  const handleAddNewJob = () => {
    const newId = plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1;
    setPlans([...plans, { id: newId, formFields: [...initialFormFields] }]);
  };

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          // Reconstruct the plans with the saved data
          const loadedPlans = parsedData.map((planData, index) => {
            const formFields = initialFormFields.map(field => {
              return {
                ...field,
                value: planData[field.id] || field.value
              };
            });
            return {
              id: index + 1,
              formFields
            };
          });
          setPlans(loadedPlans);
        }
      } catch (error) {
        console.error('Failed to parse saved data:', error);
      }
    }
  }, []);

  return (
    <Box className="bg-white rounded-xl px-5 py-2">
      {plans.map((plan, index) => (
        <Box key={plan.id} sx={{ mb: 1, borderBottom: index < plans.length - 1 ? '1px solid #e0e0e0' : 'none', pb: 1 }}>
          <Box className="mb-3 flex justify-between">
            <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>
              Add Indent Number {plans.length > 1 ? `(Job ${index + 1})` : ''}
            </Typography>
            <Box>
              {plans.length > 1 && (
                <ButtonComponent
                  text="Remove job"
                  textColor="#f44336"
                  color="white"
                  borderRadius="100px"
                  p={2}
                  styles={{ marginRight: '.5rem' }}
                  border="1px solid #f44336"
                  onClick={() => handleRemovePlan(plan.id)}
                />
              )}
              {/* <ButtonComponent
            text="Reset"
            textColor="#0073B7"
            color="white"
            borderRadius="100px"
            p={2}
            border="1px solid #0073B7"
            styles={{ marginRight: '.5rem' }}
            onClick={handleReset}
          /> */}

            </Box>
          </Box>

          <Grid container spacing={2} pt={1}>
            {plan.formFields.map(field => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`${plan.id}-${field.id}`}>
                {field.component === 'dropdown' ? (
                  <DropdownComponent
                    label={field.label}
                    options={field.options || []}
                    value={field.value}
                    onChange={(value) => handleInputChange(plan.id, field.id, value)}
                    isMultiSelect={false}
                    checkbox={false}
                  />
                ) : (
                  <ReusableInput
                    label={field.label}
                    value={field.value}
                    type={field.type || 'text'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(plan.id, field.id, e.target.value)
                    }
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box className="flex justify-end mt-4">
            {(plans.length) - 1 == index && <ButtonComponent
              text="Add New Job"
              textColor="#0073B7"
              color="white"
              borderRadius="100px"
              p={2}
              border="1px solid #0073B7"
              styles={{ marginRight: '.5rem' }}
              onClick={handleAddNewJob}
            />}
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
        </Box>))}
    </Box>
  );
};

export default CreatePlan;
