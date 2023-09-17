import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "@/configs/supabase-client"
import { Product, NEW_PRODUCT } from "@/types/product";

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('product')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data as Product[] || [];
  } catch (error) {
    throw error;
  }
}

export const useProductsQuery = () => useQuery({
  queryKey: ['products'],
  queryFn: () => fetchProducts(),
  staleTime: 1 * 60 * 1000
})

const fetchProduct = async (id: number | null): Promise<Product | null> => {
  if (!id) return null;

  if (0 === id) return NEW_PRODUCT;

  try {
    const { data, error } = await supabaseClient
      .from('product')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data as Product || null;
  } catch (error) {
    throw error;
  }
}

export const useItemQuery = (id: number | null) => useQuery({
  queryKey: ['product', id],
  queryFn: () => fetchProduct(id),
  enabled: Boolean(id),
  staleTime: 1 * 60 * 1000
})

const addProduct = async ({ id, created_at, updated_at, ...product }: Product) => {
  try {
    const { error } = await supabaseClient
      .from('product')
      .insert({ ...product });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Product) => addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  });
}

const updateProduct = async ({ id, created_at, updated_at, ...product }: Product) => {
  try {
    const { error } = await supabaseClient
      .from('product')
      .update({ ...product })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Product) => updateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  });
}
