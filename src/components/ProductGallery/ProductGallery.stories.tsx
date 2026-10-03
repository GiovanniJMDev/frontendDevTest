import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyProductDetail } from "../../../.storybook/fixtures";
import { ProductGallery } from "./ProductGallery";

const meta = {
  title: "Product detail/ProductGallery",
  component: ProductGallery,
} satisfies Meta<typeof ProductGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: storyProductDetail,
  },
};
