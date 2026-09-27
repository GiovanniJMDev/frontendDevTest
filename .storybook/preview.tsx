import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Tema global de los componentes",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const themeClass = context.globals.theme === "dark" ? "dark" : "";

      return (
        <div
          className={themeClass}
          style={{
            minHeight: "100vh",
            background: "var(--color-background)",
            color: "var(--color-content)",
            padding: "1rem",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
