import {
  AlertTriangleIcon,
  CheckIcon,
  InfoIcon,
  SparklesIcon,
  XCircleIcon,
} from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Shared/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  args: {
    children: "Apple",
    variant: "brand",
    size: "sm",
  },
};

export const Variants: Story = {
  args: {
    children: "Badge",
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="brand">Marca</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="secondary">Secundario</Badge>
      <Badge variant="success">Disponible</Badge>
      <Badge variant="warning">Oferta</Badge>
      <Badge variant="danger">Agotado</Badge>
      <Badge variant="info">Información</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    children: "Disponible",
    variant: "success",
    icon: <CheckIcon size={13} strokeWidth={2.5} />,
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="brand" icon={<SparklesIcon size={13} />}>
        Destacado
      </Badge>
      <Badge variant="success" icon={<CheckIcon size={13} />}>
        Disponible
      </Badge>
      <Badge variant="warning" icon={<AlertTriangleIcon size={13} />}>
        Oferta
      </Badge>
      <Badge variant="danger" icon={<XCircleIcon size={13} />}>
        Agotado
      </Badge>
      <Badge variant="info" icon={<InfoIcon size={13} />}>
        Info
      </Badge>
    </div>
  ),
};
