import { FormField } from ".";
// Add this interface at the top of your file
interface FormValidation {
    isValid: boolean;
    errorMessage?: string;
  }
  
  // Add this validation function
export const validateFormFields = (fields: FormField[]): FormValidation => {
    const errors: Record<string, string> = {};
    
    for (const field of fields) {
      const value = field.value;
      
      // Check if field is empty
      if ((typeof value === 'string' && value.trim() === '') || 
          (Array.isArray(value) && value.length === 0)) {
        errors[field.id] = `${field.label} is required`;
        continue;
      }
      
      // Field-specific validations
      switch (field.id) {
        case 'indentNumber':
        case 'unitEffectivityNumber':
        case 'substrate':
        case 'lamSubstrate':
          if (typeof value === 'string' && !/^[a-zA-Z0-9]+$/.test(value)) {
            errors[field.id] = `${field.label} must be alphanumeric`;
          }
          break;
          
        case 'ppcIndentQtyNos':
        case 'noOfColorsSetting':
        case 'noOfSpecialColors':
        case 'numberOfRolls':
        case 'colorsForCirMatch':
        case 'webLengthForColorMatch':
        case 'balanceIndentQtyPlanned':
        case 'ups':
        case 'width':
        case 'repeatLength':
        case  'dyne':
        case  'gsm' :
          if (typeof value === 'string' && !/^\d+$/.test(value)) {
            errors[field.id] = `${field.label} must be a number`;
          }
          break;
          
        case 'jobRunDate':
          if (typeof value === 'string') {
            const selectedDate = new Date(value);
            const currentDate = new Date();
            selectedDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
          
            if (selectedDate < currentDate) {
              errors[field.id] = 'Job run date cannot be in the past';
            }
          }
          
          break;
          
        // Add any other specific validations as needed
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errorMessage: Object.keys(errors).length > 0 
        ? 'Please fix the following errors:' 
        : undefined,
      ...errors
    };
  };