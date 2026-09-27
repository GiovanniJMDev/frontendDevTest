import { MemoryRouter } from "react-router";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { mockProducts } from "../../data/mock";
import { ProductCard } from "./ProductCard";

const meta = {
  title: "Products/ProductCard",
  component: ProductCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-full max-w-70">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: mockProducts[0],
  },
};
