import { Heart, ShoppingBag } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Shared/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Comprar ahora",
    variant: "primary",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primario</Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Eliminar</Button>
    </div>
  ),
};

export const ImageActions: Story = {
  render: () => (
    <div className="flex gap-3 rounded-2xl bg-surface-muted p-4">
      <Button variant="icon" size="md" aria-label="Añadir a favoritos">
        <Heart />
      </Button>
      <Button variant="icon" size="md" aria-label="Comprar">
        <ShoppingBag />
      </Button>
    </div>
  ),
};
