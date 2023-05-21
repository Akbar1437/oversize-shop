import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../http/apiClient";
import { ProductType } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      (await apiClient.get<ProductType[]>(`api/products`)).data,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["slug", slug],
    queryFn: async () =>
      (await apiClient.get<ProductType>(`api/slug/${slug}`)).data,
  });

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await apiClient.get<[]>(`api/categories`)).data,
  });

export const useSearchProductQuery = (query: string) => {
  console.log("query", query);

  return useQuery({
    queryKey: ["search", query],
    queryFn: async () =>
      (await apiClient.get<ProductType[]>(`api/search/${query}`)).data,

    enabled: query === "" ? false : true,
  });
};

export const useGetProductDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: async () =>
      (await apiClient.get<ProductType>(`api/products/${id}`)).data,
  });

// Admin

export const useGetAdminProdcutsQuery = (page: number) =>
  useQuery({
    queryKey: ["admin-products", page],
    queryFn: async () =>
      (
        await apiClient.get<{
          products: [ProductType];
          page: number;
          pages: number;
        }>(`/api/products/admin?page=${page}`)
      ).data,
  });

export const useCreateProductMutation = () =>
  useMutation({
    mutationFn: async () =>
      (
        await apiClient.post<{ product: ProductType; message: string }>(
          `api/products`
        )
      ).data,
  });

export const useDeleteProductMutation = () =>
  useMutation({
    mutationFn: async (productId: string) =>
      (await apiClient.delete(`api/products/${productId}`)).data,
  });

export const useUpdateProductMutation = () =>
  useMutation({
    mutationFn: async (product: {
      _id: string;
      name: string;
      slug: string;
      price: number;
      image: string;
      images: string[];
      category: string;
      brand: string;
      countInStock: number;
      description: string;
    }) =>
      (
        await apiClient.put<{ product: ProductType; message: string }>(
          `api/products/${product._id}`,
          product
        )
      ).data,
  });

export const useUploadProductMutation = () =>
  useMutation({
    mutationFn: async (formData: FormData) =>
      (
        await apiClient.post<{ secure_url: string }>(
          `api/uploads/local`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
      ).data,
  });
