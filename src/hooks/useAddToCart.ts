import { useMutation } from "@tanstack/react-query";
import type { AddToCartRequest } from "../data/mock/types";
import { addProductToCart } from "../services/api";
import { useCartStore } from "../store/useCartStore";

export const useAddToCart = () => {
  const setCount = useCartStore((state) => state.setCount);

  return useMutation({
    mutationFn: (request: AddToCartRequest) => addProductToCart(request),
    onSuccess: ({ count }) => {
      setCount(count);
    },
  });
};
