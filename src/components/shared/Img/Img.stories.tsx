import type { Meta, StoryObj } from "@storybook/react-vite";
import { Img } from "./Img";

const meta = {
  title: "Shared/Img",
  component: Img,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Img>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0b/IPhone_17_Pro.png",
    alt: "Apple iPhone 17 Pro",
    className: "h-64 w-64 object-contain",
  },
};

export const BrokenImage: Story = {
  args: {
    src: "/image-that-does-not-exist.jpg",
    alt: "Producto sin imagen",
    className: "h-64 w-64 object-contain",
  },
};
