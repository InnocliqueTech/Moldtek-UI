import { Box, Typography, Grid,SelectChangeEvent} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReusableInput from '../../../Components/ReUsable/TextField';
import DropdownComponent from '../../../Components/ReUsable/Dropdown';
import ButtonComponent from '../../../Components/ReUsable/Button';
import { toast } from 'react-toastify';
import SubmitPopups from './submitPopups';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../../store';
import { setPrintingDropDownValues, setSubmitAndPublishPopup } from '../../../store/slices/masterDataSlice';
import { listOfLables } from '../../createMasterData/data';
import { validateFormFields } from './formValidation';
import { useSaveDailyJobMutation, useSegmentsDropdownMutation, useSubStrateDropDownMutation } from '../../../store/services/api';
import { SaveDailyJobRequest } from '../../../store/Interfaces/createDailyPlanTypes';
import DropdownTextComponent from '../../../Components/ReUsable/DropdownText';
import AutoSuggest from '../../../Components/ReUsable/AutoSuggest';
import { unitEffectiveNumbersResp } from './mockData';


const LOCAL_STORAGE_KEY = 'savedPlansData';

export interface FormField {
  id: string;
  label: string;
  value: string | string[];
  type?: string;
  component?: 'dropdown' | 'input';
  options?: string[];
  allowTextFiled?:boolean
}

interface ProductUnit {
  unitEffectiveNumber: string;
  customerName: string;
  brandDescription: string;
}

const unitEffectiveNoData : ProductUnit[] = unitEffectiveNumbersResp;
const unitEffectiveNoList = unitEffectiveNoData.map((item:ProductUnit)=>{
  return  item.unitEffectiveNumber
})

const CreatePlan: React.FC = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const [subStrateDropDown] = useSubStrateDropDownMutation();
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<string>('');
  const [unitEffectivityOptions] = useState<string[]>(unitEffectiveNoList);
  useEffect(() => {
    const fetchDropdownValues = async () => {
      const response = await subStrateDropDown({
        substrate: "",
        substrateType: "printing",
      }).unwrap();
      const substrateList = response?.data?.map((item: any) => item.substrate);
      dispatch(setPrintingDropDownValues(substrateList));
    };

    fetchDropdownValues();
  }, [subStrateDropDown, dispatch]);

  const typeOfLabelOptions = listOfLables.map((option) => option.labelTypeName);
  const {dropDownValuesPrinting} = useSelector((state:RootState)=>state.masterData)
  const [segmentsDropdown,{data:segmentData}] = useSegmentsDropdownMutation();
  
  useEffect(() => {
      segmentsDropdown({
        segment: "",
      });
    }, []);
  const segmentNames = segmentData?.statusCode === 200 ? segmentData?.data?.map((item: any) => item.segment) : [];

const initialFormFields: FormField[] = [
  { id: 'indentNumber', label: 'Indent Number:', value: '' },
  { id: 'jobRunDate', label: 'Job Run Date', type: 'date', value: '' },
  { id: 'unitEffectivityNumber', label: 'Unit Effective Number:', value: '' },
  { id: 'segment', label: 'Segment', component: 'dropdown', value: '', options: [] },
  { id: 'labelType', label: 'Type of Label', value: '', component: 'dropdown', options: [] },
  { id: 'ppcIndentQtyNos', label: 'PPC Indent Qty (NOS):', value: '' },
  { id: 'noOfColorsSetting', label: 'No of Colors for settings', value: '' },
  { id: 'noOfSpecialColors', label: 'No of special colors', value: '' },
  { id: 'webLengthForColorMatch', label: '1 Web Length for Colours Match', value: '' },
  { id: 'numberOfRolls', label: 'No of Rolls', component: 'dropdown', options: ['1','2','3','4','5','6'], value: '' },
  { id: 'balanceIndentQtyPlanned', label: 'Bal to Print Indent Qty (Mtrs) planned', value: '' },
  { id: 'customerName', label: 'Customer Name', type: 'text', value: '' },
  { id: 'brandName', label: 'Brand Name & Pack-size', type: 'text', value: '' },
  { id: 'jarCap', label: 'Jar/Cap', type: 'text',value:'',component:"dropdown",options:["JAR","CAP","JAR&CAP"] },
  { id: 'width', label: 'Width', value: '' },
  { id: 'thickness', label: 'Thickness', type: 'text', value: '' },
  { id: 'substrateType', label: 'Substrate Type', type: 'text', value: '',component:"dropdown",options:[], allowTextFiled: true},
  { id: 'gsm', label: 'GSM', type: 'text', value: '' },
  { id: 'repeatLength', label: 'Repeat Length', value: '' },
  { id: 'ups', label: 'UPS', value: '' },
  { id: 'dyne', label: 'Dyne', value: '' },
  { id: 'substrate', label: 'Printing Substrate', value: ''},
  { id: 'lamSubstrate', label: 'Lamination Substrate', value: '' },
];

const [formFields, setFormFields] = useState<FormField[]>(initialFormFields);

useEffect(() => {
  setFormFields(prevFields =>
    prevFields.map(field => {
      if (field.id === 'segment' && segmentNames.length) {
        return { ...field, options: segmentNames };
      }
      if (field.id === 'labelType' && typeOfLabelOptions.length) {
        return { ...field, options: typeOfLabelOptions };
      }
      if (field.id === 'substrateType' && dropDownValuesPrinting.length) {
        return { ...field, options: dropDownValuesPrinting };
      }
      return field;
    })
  );
}, [segmentNames.join(), typeOfLabelOptions.join(), dropDownValuesPrinting.join()]);


  
  // const fieldsToSkipForRepeat = [
  //   'customerName',
  //   'brandName',
  //   'jarCap',
  //   'width',
  //   'thickness',
  //   'subStrateType',
  //   'gsm',
  //   'repeatLength',
  //   'ups',
  //   'substrate',
  //   'lamSubstrate',
  //   'dyne',
  //   'substrateType'
  // ];

  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [jobType, setJobType] = useState<'New' | 'Repeat'>('New');
  const jobType: 'Repeat' = 'Repeat'; 

  const [saveDailyJob, { isLoading }] = useSaveDailyJobMutation();

  const allowedFields = [
    'indentNumber',
    'jobRunDate',
    'unitEffectivityNumber',
    'ppcIndentQtyNos',
    'numberOfRolls',
  ];

  const shouldShowField = (fieldId: string): boolean => {
    return allowedFields.includes(fieldId); // ⬅️ Only show specified fields
  };

  const handleInputChange = (
    fieldId: string,
    value: string | string[] | SelectChangeEvent<string | string[]>
  ) => {
    let extractedValue =
      typeof value === 'object' && 'target' in value ? value.target.value : value;
  
    if (fieldId === "substrateType" && Array.isArray(extractedValue)) {
      extractedValue = extractedValue.filter(Boolean).map(v => v.trim()).join(" ");
    }
  
    if (fieldId === 'unitEffectivityNumber') {
      setSelectedUnitNumber(extractedValue as string);
    }
  
    setFormFields(prevFields =>
      prevFields.map(field =>
        field.id === fieldId ? { ...field, value: extractedValue } : field
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
  

  const prepareSubmitData = (): SaveDailyJobRequest => {
    const formData: any = {};
    
    formFields.forEach(field => {
      if (allowedFields.includes(field.id)) {
        if (['ppcIndentQtyNos', 'numberOfRolls'].includes(field.id)) {
          formData[field.id] = Number(field.value) || 0;
        } else {
          formData[field.id] = field.value;
        }
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
          setSelectedUnitNumber(parsedData['unitEffectivityNumber'] || '');
        }
      } catch (error) {
        console.error('Failed to parse saved data:', error);
      }
    }
  }, []);
  



  return (
    <Box className="bg-white rounded-xl px-5 py-2">
      <Box sx={{ mb: 1, pb: 1 }}>
        {/* <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 500 }}>Job Type:</Typography>
          <RadioGroup
            row
            value={jobType}
            onChange={(e) => setJobType(e.target.value as "New" | "Repeat")}
          >
            <FormControlLabel value="New" control={<Radio />} label="New" />
            <FormControlLabel value="Repeat" control={<Radio />} label="Repeat" />
          </RadioGroup>
        </Box> */}
        <Grid container spacing={2} pt={1}>
          {formFields
            .filter((f) => shouldShowField(f.id))
            .map((field) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={field.id}>
                {
                field.id === 'unitEffectivityNumber' ? (
                  <AutoSuggest
                    label="Unit Effective Number"
                    value={selectedUnitNumber}
                    onChange={(val) => handleInputChange('unitEffectivityNumber', val)}
                    staticOptions={unitEffectivityOptions}
                    error={!!errors[field.id]}
                    helperText={errors[field.id]}
                  />
                ):
                field.component === "dropdown" && !field.allowTextFiled ? (
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
                ) :field.component === "dropdown" && field.allowTextFiled ? (
                  <DropdownTextComponent
                    label={field.label}
                    options={field.options || []}
                    value={field.value}
                    onChange={(value) => handleInputChange(field.id, value)}
                    isMultiSelect={false}
                    checkbox={false}
                    error={!!errors[field.id]}
                    helperText={errors[field.id]}
                    dropdown='printingDailyPlan'
                    allowNewOption
                  />
                ): (
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