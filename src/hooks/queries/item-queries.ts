import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "@/configs/supabase-client"
import { Item, NEW_ITEM } from "@/types/item";

const fetchItems = async (): Promise<Item[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('item')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data as Item[] || [];
  } catch (error) {
    throw error;
  }
}

export const useItemsQuery = () => useQuery({
  queryKey: ['items'],
  queryFn: () => fetchItems(),
  staleTime: 1 * 60 * 1000
})

const fetchItem = async (id: number | null): Promise<Item | null> => {
  if (!id) return null;

  if (0 === id) return NEW_ITEM;

  try {
    const { data, error } = await supabaseClient
      .from('item')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data as Item || null;
  } catch (error) {
    throw error;
  }
}

export const useItemQuery = (id: number | null) => useQuery({
  queryKey: ['item', id],
  queryFn: () => fetchItem(id),
  enabled: Boolean(id),
  staleTime: 1 * 60 * 1000
})

const addItem = async ({ id, created_at, updated_at, ...item }: Item) => {
  try {
    const { error } = await supabaseClient
      .from('item')
      .insert({ ...item });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Item) => addItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  });
}

const updateItem = async ({ id, created_at, updated_at, ...item }: Item) => {
  try {
    const { error } = await supabaseClient
      .from('item')
      .update({ ...item })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

export const useUpdateItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Item) => updateItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  });
}
