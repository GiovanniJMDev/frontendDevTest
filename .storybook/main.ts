import type { StorybookConfig } from "@storybook/react-vite";

const config = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: "@storybook/react-vite",
  docs: {
    autodocs: "tag",
  },
} satisfies StorybookConfig;

export default config;
