import { Item, ItemStatus, StringKeysOfItem } from "@/types/item";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormFieldType } from "@/types/form";
import FormFieldSheetGenerator from "@/components/utils/form-field-sheet-generator";

type ItemFormProps = {
  itemData: Item;
  onSubmit: (item: Item) => void;
}

const ItemForm = ({ itemData, onSubmit }: ItemFormProps) => {
  if (!itemData) return null;
  
  const { handleSubmit, register, getValues, setValue } = useForm<Item>({ defaultValues: itemData });

  const formFields: FormField[] = [
    { type: FormFieldType.INPUT, fieldName: 'code', label: 'Code' },
    { type: FormFieldType.INPUT, fieldName: 'name', label: 'Name' },
    { type: FormFieldType.INPUT, fieldName: 'base_unit', label: 'Base unit' },
    { type: FormFieldType.INPUT, fieldName: 'price', label: 'Price' },
    {
      type: FormFieldType.SWITCH,
      fieldName: 'status',
      label: 'Status',
      defaultChecked: (itemStatus: string) => ItemStatus.ACTIVE === itemStatus,
      onCheckedChange: (checked: boolean) => setValue('status', checked ? ItemStatus.ACTIVE : ItemStatus.DRAFT)
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        {formFields?.map((field: FormField, idx: number) => {
          const fieldName: StringKeysOfItem = field.fieldName as StringKeysOfItem;
          return <FormFieldSheetGenerator
            key={idx}
            field={field}
            fieldValue={getValues(fieldName)}
            register={register}
          />
        })}
      </div>
      <div className="grid gap-4 py-4">
        <Button type="submit">{0 === itemData.id ? 'Create new item' : 'Save item'}</Button>
      </div>
    </form>
  );
}

export default ItemForm;
