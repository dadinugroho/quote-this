export enum FormFieldType {
  INPUT = 'input',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  SWITCH = 'switch'
}

type FormFieldOption = {
  id: string;
  name: string;
}

export type FormField = {
  type: FormFieldType;
  fieldName: string;
  label: string;
  data?: FormFieldOption[];
  defaultChecked?: (value: string) => void;
  onCheckedChange?: (checked: boolean) => void;
}
