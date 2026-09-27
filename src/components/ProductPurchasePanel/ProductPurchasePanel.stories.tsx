import type { Meta, StoryObj } from "@storybook/react-vite";
import { mockProductDetails } from "../../data/mock";
import { ProductPurchasePanel } from "./ProductPurchasePanel";

const meta = {
  title: "Product detail/ProductPurchasePanel",
  component: ProductPurchasePanel,
} satisfies Meta<typeof ProductPurchasePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: mockProductDetails[0],
    onAddToCart: () => undefined,
  },
};
