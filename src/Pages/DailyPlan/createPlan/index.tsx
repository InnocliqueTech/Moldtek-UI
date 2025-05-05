import { Box, Typography, Grid, RadioGroup, FormControlLabel, Radio ,SelectChangeEvent} from '@mui/material';
import React, { useState, useEffect } from 'react';
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
import { useSaveDailyJobMutation } from '../../../store/services/api';
import { SaveDailyJobRequest } from '../../../store/Interfaces/createDailyPlanTypes';

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
  { id: 'jobRunDate', label: 'Job Run Date', type: 'date', value: '' },
  { id: 'unitEffectivityNumber', label: 'Unit Effective Number:', value: '' },
  { id: 'segment', label: 'Segment', component: 'dropdown', value: '', options: ['PB','PH','LB','TW','QP'] },
  { id: 'labelType', label: 'Type of Label', value: '', component: 'dropdown', options: typeOfLabelOptions },
  { id: 'ppcIndentQtyNos', label: 'PPC Indent Qty (NOS):', value: '' },
  { id: 'noOfColorsSetting', label: 'No of Colors for settings', value: '' },
  { id: 'noOfSpecialColors', label: 'No of special colors', value: '' },
  { id: 'webLengthForColorMatch', label: '1 Web Length for Colours Match', value: '' },
  { id: 'numberOfRolls', label: 'No of Rolls', component: 'dropdown', options: ['1','2','3','4','5','6'], value: '' },
  { id: 'balanceIndentQtyPlanned', label: 'Bal to Print Indent Qty (Mtrs) planned', value: '' },
  { id: 'customerName', label: 'Customer Name', type: 'text', value: '' },
  { id: 'brandName', label: 'Brand Name & Pack-size', type: 'text', value: '' },
  { id: 'jarCap', label: 'Jar/Cap', type: 'text', value: '' },
  { id: 'width', label: 'Width', value: '' },
  { id: 'thickness', label: 'Thickness', type: 'text', value: '' },
  { id: 'substrateType', label: 'Substrate Type', type: 'text', value: '',component:"dropdown",options:["ORANGE PEEL FILM (CHIRIPAL)",
    "ORANGE PEEL FILM (GULF PACK)",
    "WHITE HIGH DENSITY  FILM"] },
  { id: 'gsm', label: 'GSM', type: 'text', value: '' },
  { id: 'repeatLength', label: 'Repeat Length', value: '' },
  { id: 'ups', label: 'UPS', value: '' },
  { id: 'dyne', label: 'Dyne', value: '' },
  { id: 'substrate', label: 'Printing Substrate', value: ''},
  { id: 'lamSubstrate', label: 'Lamination Substrate', value: '' },
];

const fieldsToSkipForRepeat = [
  'customerName',
  'brandName',
  'jarCap',
  'width',
  'thickness',
  'subStrateType',
  'gsm',
  'repeatLength',
  'ups',
  'substrate',
  'lamSubstrate',
  'dyne',
  'substrateType'
];


const CreatePlan: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formFields, setFormFields] = useState<FormField[]>(initialFormFields);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [jobType, setJobType] = useState<'New' | 'Repeat'>('New');
  const [saveDailyJob, { isLoading }] = useSaveDailyJobMutation();

  const shouldShowField = (fieldId: string): boolean => {
    if (jobType === 'Repeat') {
      return !fieldsToSkipForRepeat.includes(fieldId);
    }
    return true;
  };

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
  }

  // const handleSave = () => {
  //   const formData = formFields.reduce((acc, field) => {
  //     acc[field.id] = field.value;
  //     return acc;
  //   }, {} as Record<string, string | string[]>);

  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  //   // toast.success('Data saved successfully!');
  // };

  const prepareSubmitData = (): SaveDailyJobRequest => {
    const formData: any = {};
    
    formFields.forEach(field => {
      if ([
        'ppcIndentQtyNos',
        'balanceIndentQtyPlanned',
        'noOfColorsSetting',
        'noOfSpecialColors',
        'webLengthForColorMatch',
        'numberOfRolls',
        'ups',
        'repeatLength',
        'width',
        'dyne',
        'gsm',
        'thickness'
      ].includes(field.id)) {
        formData[field.id] = Number(field.value) || 0;
      } else {
        formData[field.id] = field.value;
      }
    });

    if (formData.jobRunDate) {
      formData.jobRunDate = new Date(formData.jobRunDate).toISOString().split('T')[0];
    }

    formData.jobType = jobType;

    return formData as SaveDailyJobRequest;
  };

  const handleSubmit = async () => {
    const validation = validateFormFields(formFields.filter(f => shouldShowField(f.id)));
    if (!validation.isValid) {
      // Extract errors from validation object
      const { isValid, errorMessage, ...errorFields } = validation;
      setErrors(errorFields);
      toast.error('Please Enter valid data before submitting');
      return;
    }
    setErrors({});
    dispatch(setSubmitAndPublishPopup(true));
  };

  const submitFormData = async (): Promise<{ success: boolean; error?: any }> => {
    const formData = prepareSubmitData();
    try {
      const data = await saveDailyJob(formData).unwrap();
      if (data?.statusCode === 201) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setFormFields(initialFormFields);
        return { success: true };
      } else {
        toast.error(data?.message?data?.message:"Error Fetching Data");
        return { success: false };
      }
    } catch (err) {
      toast.error("Failed to Submit");
      console.error("Failed to save daily job:", err);
      return { success: false, error: err };
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
        <Box sx={{}}>
          {/* <Typography
            sx={{ fontSize: "1rem", fontWeight: "600" }}
            className="mb-3"
          >
            Add New Job
          </Typography> */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 500 }}>Job Type:</Typography>
            <RadioGroup
              row
              value={jobType}
              onChange={(e) => setJobType(e.target.value as "New" | "Repeat")}
            >
              <FormControlLabel value="New" control={<Radio />} label="New" />
              <FormControlLabel
                value="Repeat"
                control={<Radio />}
                label="Repeat"
              />
            </RadioGroup>
          </Box>
        </Box>
        <Grid container spacing={2} pt={1}>
          {formFields
            .filter((f) => shouldShowField(f.id))
            .map((field) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={field.id}>
                {field.component === "dropdown" ? (
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
                    type={field.type || "text"}
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
        <Typography
          sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 2 }}
        >
          * All fields are mandatory
        </Typography>
        <Box className="flex justify-end">
          {/* <ButtonComponent
            text="Save"
            textColor="#0073B7"
            color="white"
            borderRadius="100px"
            p={2}
            border="1px solid #0073B7"
            styles={{ marginRight: '.5rem' }}
            onClick={handleSave}
          /> */}
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
      <SubmitPopups onSubmit={submitFormData} isLoading={isLoading} />
    </Box>
  );
};

export default CreatePlan;