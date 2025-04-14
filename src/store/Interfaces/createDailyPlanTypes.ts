export interface FormField {
    id: string;
    label: string;
    value: string | string[];
    type?: string;
    component?: 'dropdown' | 'input';
    options?: string[];
  }
  
export interface Plan {
    id: number;
    formFields: FormField[];
  }
  