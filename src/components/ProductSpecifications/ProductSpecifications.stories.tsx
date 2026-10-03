import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyProductDetail } from "../../../.storybook/fixtures";
import { ProductSpecifications } from "./ProductSpecifications";

const meta = {
  title: "Product detail/ProductSpecifications",
  component: ProductSpecifications,
} satisfies Meta<typeof ProductSpecifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: storyProductDetail,
  },
};
