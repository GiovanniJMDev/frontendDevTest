import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/api";

export const productsQueryKey = ["products"] as const;

export const useProducts = () => {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: getProducts,
  });
};
