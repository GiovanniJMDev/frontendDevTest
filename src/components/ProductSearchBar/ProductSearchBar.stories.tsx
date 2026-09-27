import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductSearchBar } from "./ProductSearchBar";

const meta = {
  title: "Products/ProductSearchBar",
  component: ProductSearchBar,
} satisfies Meta<typeof ProductSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    search: "",
    resultCount: 3,
    onSearchChange: () => undefined,
  },
};
