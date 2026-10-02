import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  addProductToCart,
  getProduct,
  getProducts,
} from "./api";

const createResponse = (payload: unknown, init: Partial<Response> = {}) =>
  ({
    ok: true,
    status: 200,
    json: async () => payload,
    ...init,
  }) as Response;

describe("product API service", () => {
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("getProducts", () => {
    it("returns products when the API responds with an array", async () => {
      const products = [
        {
          id: "1",
          brand: "Apple",
          model: "iPhone",
          price: "999",
          imgUrl: "/iphone.png",
        },
      ];
      fetchMock.mockResolvedValue(createResponse(products));

      await expect(getProducts()).resolves.toEqual(products);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://itx-frontend-test.onrender.com/api/product",
        { headers: { Accept: "application/json" } },
      );
    });

    it("returns the value property when the API responds with an object", async () => {
      const products = [
        {
          id: "1",
          brand: "Apple",
          model: "iPhone",
          price: "999",
          imgUrl: "/iphone.png",
        },
      ];
      fetchMock.mockResolvedValue(
        createResponse({ value: products, Count: products.length }),
      );

      await expect(getProducts()).resolves.toEqual(products);
    });
  });

  describe("getProduct", () => {
    it("requests the product detail using an encoded id", async () => {
      const product = {
        id: "phone/1",
        brand: "Apple",
        model: "iPhone",
        price: "999",
        imgUrl: "/iphone.png",
      };
      fetchMock.mockResolvedValue(createResponse(product));

      await expect(getProduct("phone/1")).resolves.toEqual(product);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://itx-frontend-test.onrender.com/api/product/phone%2F1",
        { headers: { Accept: "application/json" } },
      );
    });
  });

  describe("addProductToCart", () => {
    it("sends the product and selected options in a POST request", async () => {
      const requestBody = { id: "1", colorCode: 10, storageCode: 20 };
      const responseBody = { count: 1 };
      fetchMock.mockResolvedValue(createResponse(responseBody));

      await expect(addProductToCart(requestBody)).resolves.toEqual(responseBody);
      expect(fetchMock).toHaveBeenCalledWith(
        "https://itx-frontend-test.onrender.com/api/cart",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );
    });
  });

  describe("request errors", () => {
    it("throws the API message for a failed request", async () => {
      fetchMock.mockResolvedValue(
        createResponse({ message: "Producto no disponible" }, { ok: false, status: 409 }),
      );

      await expect(getProduct("1")).rejects.toThrow("Producto no disponible");
    });

    it("throws the HTTP status when the API has no error message", async () => {
      fetchMock.mockResolvedValue(
        createResponse(null, { ok: false, status: 500 }),
      );

      await expect(getProduct("1")).rejects.toThrow(
        "API request failed with status 500",
      );
    });
  });
});
