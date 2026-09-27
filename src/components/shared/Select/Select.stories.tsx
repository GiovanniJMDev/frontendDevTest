import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const meta = {
  title: "Shared/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Color",
    value: "black",
    options: [
      { value: "black", label: "Black" },
      { value: "silver", label: "Silver" },
      { value: "blue", label: "Blue" },
    ],
    onValueChange: () => undefined,
    className: "min-w-64",
  },
};
