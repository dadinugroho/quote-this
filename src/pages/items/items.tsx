import { useState } from "react";
import { Item, NEW_ITEM, NEW_ITEM_IDX } from "@/types/item";
import { useCreateItemMutation, useItemsQuery, useUpdateItemMutation } from "@/hooks/queries/item-queries";
import { SheetSide } from "@/components/utils/sheet-side";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import MainLayout from "@/pages/layouts/main-layout";
import ItemList from "@/pages/items/components/items-list";
import ItemForm from "@/pages/items/components/item-form";

const Items = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const { mutate: createMutate } = useCreateItemMutation();
  const { mutate: updateMutate } = useUpdateItemMutation();

  const openAddItem = () => {
    setSelectedItemId(NEW_ITEM_IDX);
    console.log('Add', NEW_ITEM_IDX, selectedItemId);
  }

  const openEditItem = (id: number) => {
    setSelectedItemId(id);
  }

  const closeSheet = () => {
    setSelectedItemId(null);
  };

  const onSubmit = (item: Item) => {
    if (NEW_ITEM_IDX === item.id) {
      createMutate(item, { onSuccess: () => setSelectedItemId(null) });
      return;
    }
    updateMutate(item, { onSuccess: () => setSelectedItemId(null) });
  }

  const { data, isSuccess, isLoading } = useItemsQuery();

  if (isLoading) return <Skeleton className="w-[300px] h-8 rounded-full" />;

  const title = selectedItemId ? 'Edit item' : 'Add new item';
  const sheetOpen = null !== selectedItemId;
  const selectedItem: Item = data?.find((item: Item) => item.id === selectedItemId) || NEW_ITEM;

  return (
    <>
      <MainLayout>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight self-start">Items</h2>
          <Button onClick={() => openAddItem()}>Add new item</Button>
        </div>
        {isSuccess && <ItemList data={data} onUpdateButtonClick={openEditItem} />}
      </MainLayout>
      {sheetOpen && (
        <SheetSide
          open={sheetOpen}
          setSheetOpen={closeSheet}
          title={title}
        >
          <ItemForm
            itemData={selectedItem}
            onSubmit={(item: Item) => onSubmit(item)}
          />
        </SheetSide>)}
    </>
  );
};

export default Items;
