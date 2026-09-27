import galaxyS26UltraImage from "../../assets/galaxy-s26-ultra.png";
import iphone17ProImage from "../../assets/iphone-17-pro-max-.png";
import onePlus13Image from "../../assets/oneplus-13.png";
import pixel10ProImage from "../../assets/pixel-10-pro.png";
import type { Product, ProductListResponse } from "./types";

export const mockProducts: Product[] = [
  {
    id: "iphone-17-pro",
    brand: "Apple",
    model: "iPhone 17 Pro",
    price: "1329",
    imgUrl: iphone17ProImage,
  },
  {
    id: "galaxy-s26-ultra",
    brand: "Samsung",
    model: "Galaxy S26 Ultra",
    price: "1449",
    imgUrl: galaxyS26UltraImage,
  },
  {
    id: "pixel-10-pro",
    brand: "Google",
    model: "Pixel 10 Pro",
    price: "1099",
    imgUrl: pixel10ProImage,
  },
  {
    id: "oneplus-13",
    brand: "OnePlus",
    model: "OnePlus 13",
    price: "999",
    imgUrl: onePlus13Image,
  },
];

export const mockProductsResponse: ProductListResponse = {
  value: mockProducts,
  Count: mockProducts.length,
};
