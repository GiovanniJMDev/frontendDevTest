import type { Meta, StoryObj } from "@storybook/react-vite";
import { mockProductDetails } from "../../data/mock";
import { ProductSpecifications } from "./ProductSpecifications";

const meta = {
  title: "Product detail/ProductSpecifications",
  component: ProductSpecifications,
} satisfies Meta<typeof ProductSpecifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: mockProductDetails[0],
  },
};
