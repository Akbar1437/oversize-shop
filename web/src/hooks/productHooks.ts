import { useQuery } from "@tanstack/react-query";
import apiClient from "../http/apiClient";
import { ProductType } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => (await apiClient.get<ProductType[]>(`/products`)).data,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["slug", slug],
    queryFn: async () =>
      (await apiClient.get<ProductType>(`/slug/${slug}`)).data,
  });

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await apiClient.get<[]>(`/categories`)).data,
  });

export const useSearchProductQuery = (query: string) => {
  console.log("query", query);

  return useQuery({
    queryKey: ["search", query],
    queryFn: async () =>
      (await apiClient.get<ProductType[]>(`/search/${query}`)).data,

    enabled: query === "" ? false : true,
  });
};
