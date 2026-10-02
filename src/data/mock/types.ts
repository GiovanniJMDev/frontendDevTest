export interface Product {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

export interface ProductListResponse {
  value: Product[];
  Count: number;
}

export interface ProductOption {
  code: number;
  name: string;
  priceModifier?: number;
  hex?: string;
}

export interface ProductOptions {
  colors: ProductOption[];
  storages: ProductOption[];
  rams?: ProductOption[];
}

export interface ProductDetail extends Product {
  networkTechnology: string;
  networkSpeed: string;
  gprs: string;
  edge: string;
  announced: string;
  status: string;
  dimentions: string;
  weight: string;
  sim: string;
  displayType: string;
  displayResolution: string;
  displaySize: string;
  os: string;
  cpu: string;
  chipset: string;
  gpu: string;
  externalMemory: string;
  internalMemory: string[];
  ram: string;
  primaryCamera: string | string[];
  secondaryCmera: string | string[];
  speaker: string;
  audioJack: string;
  wlan: string[];
  bluetooth: string[];
  gps: string;
  nfc: string;
  radio: string;
  usb: string;
  sensors: string[];
  battery: string;
  colors: string[];
  options: ProductOptions;
}

export interface AddToCartRequest {
  id: string;
  colorCode: number;
  storageCode: number;
}

export interface AddToCartResponse {
  count: number;
}
