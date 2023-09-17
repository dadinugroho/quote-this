import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormField, FormFieldType } from "@/types/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type FormFieldSheetGeneratorProps = {
  field: FormField;
  register: UseFormRegister<any>;
  fieldValue: string;
}

const FormFieldSheetGenerator = ({ field, register, fieldValue }: FormFieldSheetGeneratorProps) => {
  let generatedField: ReactNode = null;

  switch (field.type) {
    case FormFieldType.TEXTAREA: {
      generatedField = (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={field.fieldName} className="text-right">
            {field.label}
          </Label>
          <Textarea {...register(field.fieldName)} className="col-span-3" required />
        </div>
      );
      break;
    }
    case FormFieldType.NUMBER: {
      generatedField = (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={field.fieldName} className="text-right">
            {field.label}
          </Label>
          <Input {...register(field.fieldName)} type="number" min="0" step="0.1" required />
        </div>
      );
      break;
    }
    case FormFieldType.SWITCH: {
      generatedField = (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={field.fieldName} className="text-right">
            {field.label}
          </Label>
          <div className="col-span-3">
            <Switch
              defaultChecked={(field.defaultChecked && field.defaultChecked(fieldValue)) || false}
              onCheckedChange={field.onCheckedChange}
              {...register(field.fieldName)}
              className="col-span-3"
            />
          </div>
        </div>
      );
      break;
    }
    default: {
      generatedField = (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={field.fieldName} className="text-right">
            {field.label}
          </Label>
          <Input {...register(field.fieldName)} className="col-span-3" required />
        </div>
      );
    }
  }

  return generatedField;
}

export default FormFieldSheetGenerator;
