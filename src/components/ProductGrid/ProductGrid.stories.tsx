import { MemoryRouter } from "react-router";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { mockProducts } from "../../data/mock";
import { ProductGrid } from "./ProductGrid";

const meta = {
  title: "Products/ProductGrid",
  component: ProductGrid,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithProducts: Story = {
  args: {
    products: mockProducts,
  },
};

export const Empty: Story = {
  args: {
    products: [],
  },
};
