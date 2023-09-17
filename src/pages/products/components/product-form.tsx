import { Product, ProductStatus, StringKeysOfProduct } from "@/types/product";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormFieldType } from "@/types/form";
import FormFieldSheetGenerator from "@/components/utils/form-field-sheet-generator";

type ProductFormProps = {
  productData: Product;
  onSubmit: (product: Product) => void;
}

const ProductForm = ({ productData, onSubmit }: ProductFormProps) => {
  if (!productData) return null;

  const { handleSubmit, register, getValues, setValue } = useForm<Product>({ defaultValues: productData });

  const formFields: FormField[] = [
    { type: FormFieldType.INPUT, fieldName: 'code', label: 'Code' },
    { type: FormFieldType.INPUT, fieldName: 'name', label: 'Name' },
    { type: FormFieldType.INPUT, fieldName: 'short_description', label: 'Short desc' },
    { type: FormFieldType.TEXTAREA, fieldName: 'description', label: 'Description' },
    { type: FormFieldType.NUMBER, fieldName: 'min_length', label: 'MinLength' },
    { type: FormFieldType.NUMBER, fieldName: 'max_length', label: 'MaxLength' },
    {
      type: FormFieldType.SWITCH,
      fieldName: 'status',
      label: 'Status',
      defaultChecked: (productStatus: string) => ProductStatus.ACTIVE === productStatus,
      onCheckedChange: (checked: boolean) => setValue('status', checked ? ProductStatus.ACTIVE : ProductStatus.DRAFT)
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        {formFields?.map((field: FormField, idx: number) => {
          const fieldName: StringKeysOfProduct = field.fieldName as StringKeysOfProduct;
          return <FormFieldSheetGenerator
            key={idx}
            field={field}
            fieldValue={getValues(fieldName)}
            register={register}
          />
        })}
      </div>
      <div className="grid gap-4 py-4">
        <Button type="submit">{0 === productData.id ? 'Create new product' : 'Save product'}</Button>
      </div>
    </form>
  );
}

export default ProductForm;
