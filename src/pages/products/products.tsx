import { useState } from "react";
import { Product, NEW_PRODUCT, NEW_PRODUCT_IDX } from "@/types/product";
import { useCreateProductMutation, useProductsQuery, useUpdateProductMutation } from "@/hooks/queries/product-queries";
import { SheetSide } from "@/components/utils/sheet-side";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import MainLayout from "@/pages/layouts/main-layout";
import ProductList from "@/pages/products/components/products-list";
import ProductForm from "@/pages/products/components/product-form";

const Products = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const { mutate: createMutate } = useCreateProductMutation();
  const { mutate: updateMutate } = useUpdateProductMutation();

  const openAddProduct = () => {
    setSelectedProductId(NEW_PRODUCT_IDX);
  }

  const openEditProduct = (id: number) => {
    setSelectedProductId(id);
  }

  const closeSheet = () => {
    setSelectedProductId(null);
  };

  const onSubmit = (product: Product) => {
    if (NEW_PRODUCT_IDX === product.id) {
      createMutate(product, { onSuccess: () => setSelectedProductId(null) });
      return;
    }
    updateMutate(product, { onSuccess: () => setSelectedProductId(null) });
  }

  const { data, isSuccess, isLoading } = useProductsQuery();

  if (isLoading) return <Skeleton className="w-[300px] h-8 rounded-full" />;

  const title = selectedProductId ? 'Edit product' : 'Add new product';
  const sheetOpen = null !== selectedProductId;
  const selectedProduct: Product = data?.find((product: Product) => product.id === selectedProductId) || NEW_PRODUCT;

  return (
    <>
      <MainLayout>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight self-start">Products</h2>
          <Button onClick={() => openAddProduct()}>Add new product</Button>
        </div>
        {isSuccess && <ProductList data={data} onUpdateButtonClick={openEditProduct} />}
      </MainLayout>
      {sheetOpen && (
        <SheetSide
          open={sheetOpen}
          setSheetOpen={closeSheet}
          title={title}
        >
          <ProductForm
            productData={selectedProduct}
            onSubmit={(product: Product) => onSubmit(product)}
          />
        </SheetSide>)}
    </>
  );
};

export default Products;
