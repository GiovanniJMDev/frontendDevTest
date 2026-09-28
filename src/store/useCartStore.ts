import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "../data/mock";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  count: number;
  cartItems: CartItem[];
  likedProducts: Product[];
  setCount: (count: number) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  toggleLiked: (product: Product) => void;
  reset: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      count: 0,
      cartItems: [],
      likedProducts: [],
      setCount: (count) => set({ count: Math.max(0, count) }),
      addProduct: (product) =>
        set((state) => {
          const existingItem = state.cartItems.some(
            (item) => item.product.id === product.id,
          );

          return {
            count: state.count + 1,
            cartItems: existingItem
              ? state.cartItems.map((item) =>
                  item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                )
              : [...state.cartItems, { product, quantity: 1 }],
          };
        }),
      removeProduct: (productId) =>
        set((state) => {
          const item = state.cartItems.find(
            (cartItem) => cartItem.product.id === productId,
          );

          if (!item) {
            return state;
          }

          return {
            count: Math.max(0, state.count - 1),
            cartItems:
              item.quantity > 1
                ? state.cartItems.map((cartItem) =>
                    cartItem.product.id === productId
                      ? { ...cartItem, quantity: cartItem.quantity - 1 }
                      : cartItem,
                  )
                : state.cartItems.filter(
                    (cartItem) => cartItem.product.id !== productId,
                  ),
          };
        }),
      toggleLiked: (product) =>
        set((state) => ({
          likedProducts: state.likedProducts.some(
            (likedProduct) => likedProduct.id === product.id,
          )
            ? state.likedProducts.filter(
                (likedProduct) => likedProduct.id !== product.id,
              )
            : [...state.likedProducts, product],
        })),
      reset: () => set({ count: 0, cartItems: [] }),
    }),
    {
      name: "mobile-shop-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        count: state.count,
        cartItems: state.cartItems,
        likedProducts: state.likedProducts,
      }),
    },
  ),
);
