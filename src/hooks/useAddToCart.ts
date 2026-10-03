import { useMutation } from "@tanstack/react-query";
import type { AddToCartRequest } from "../types/product";
import { addProductToCart } from "../services/api";

export const useAddToCart = () =>
  useMutation({
    mutationFn: (request: AddToCartRequest) => addProductToCart(request),
  });
