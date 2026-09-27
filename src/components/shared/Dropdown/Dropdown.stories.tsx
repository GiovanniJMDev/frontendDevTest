import { ChevronDown } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Dropdown } from "./Dropdown";

const meta = {
  title: "Shared/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: "Ordenar por",
    children: "Opciones",
  },
  render: () => (
    <Dropdown
      trigger={
        <Button variant="secondary">
          Ordenar por
          <ChevronDown size={16} />
        </Button>
      }
    >
      <button
        type="button"
        role="menuitem"
        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-secondary-700 hover:bg-surface-muted"
      >
        Más recientes
      </button>
      <button
        type="button"
        role="menuitem"
        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-secondary-700 hover:bg-surface-muted"
      >
        Precio: menor a mayor
      </button>
      <button
        type="button"
        role="menuitem"
        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-secondary-700 hover:bg-surface-muted"
      >
        Precio: mayor a menor
      </button>
    </Dropdown>
  ),
};

export const CustomChildren: Story = {
  args: {
    trigger: "Filtros",
    children: "Filtros disponibles",
  },
  render: () => (
    <Dropdown trigger={<Button variant="ghost">Filtros</Button>} align="right">
      <div className="space-y-3 p-3">
        <label className="flex items-center gap-2 text-sm text-secondary-700">
          <input type="checkbox" /> En stock
        </label>
        <label className="flex items-center gap-2 text-sm text-secondary-700">
          <input type="checkbox" /> En oferta
        </label>
      </div>
    </Dropdown>
  ),
};
