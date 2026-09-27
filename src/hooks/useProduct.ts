import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/api";

export const productQueryKey = (id: string) => {
  return ["product", id] as const;
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: productQueryKey(id ?? ""),
    queryFn: () => getProduct(id ?? ""),
    enabled: Boolean(id),
  });
};
