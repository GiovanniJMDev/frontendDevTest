import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyProductDetail } from "../../../.storybook/fixtures";
import { ProductPurchasePanel } from "./ProductPurchasePanel";

const meta = {
  title: "Product detail/ProductPurchasePanel",
  component: ProductPurchasePanel,
} satisfies Meta<typeof ProductPurchasePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: storyProductDetail,
    onAddToCart: () => undefined,
    onRemoveFromCart: () => undefined,
    quantity: 1,
  },
};
