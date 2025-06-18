import { FormField } from ".";
// Add this interface at the top of your file
interface FormValidation {
    isValid: boolean;
    errorMessage?: string;
  }

  // Interface for individual form field
export interface UserFormField {
  id: string;
  label: string;
  value: string;
  type?: string;
  component?: 'dropdown' | 'input';
  options?: string[];
  required?: boolean;
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
          if (typeof value === 'string' && !/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~ ]+$/.test(value)) {
            errors[field.id] = `${field.label} can contain alphanumeric and special characters`;
          }
          break;
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



// Validation function with proper types
export const validateUserFields = (
  formFields: UserFormField[],
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
): boolean => {
  const newErrors: Record<string, string> = {};

  formFields.forEach(field => {
    const value = field.value.trim();

    // Required check
    if (field.required && !value) {
      newErrors[field.id] = `${field.label} is required`;
    }

    // First/Last Name: Only alphabets
    if ((field.id === 'firstName' || field.id === 'lastName') && value) {
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(value)) {
        newErrors[field.id] = `${field.label} must contain only alphabets`;
      }
    }

    // Email validation
    if (field.id === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors[field.id] = 'Invalid email format';
      }
    }

    // Phone number: Exactly 10 digits
    if (field.id === 'phoneNumber' && value) {
      const digitsOnly = value.replace(/\D/g, '');
      if (!/^\d{10}$/.test(digitsOnly)) {
        newErrors[field.id] = 'Phone number must be 10 digits';
      }
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

