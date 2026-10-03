import type {
  AddToCartRequest,
  AddToCartResponse,
  Product,
  ProductDetail,
  ProductListResponse,
} from "../types/product";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://itx-frontend-test.onrender.com";

const request = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "message" in payload
        ? String(payload.message)
        : `API request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
};

export const getProducts = async (): Promise<Product[]> => {
  const payload = await request<ProductListResponse | Product[]>("/api/product");

  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.value;
};

export const getProduct = (id: string): Promise<ProductDetail> => {
  return request<ProductDetail>(`/api/product/${encodeURIComponent(id)}`);
};

export const addProductToCart = (
  requestBody: AddToCartRequest,
): Promise<AddToCartResponse> => {
  return request<AddToCartResponse>("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
};
