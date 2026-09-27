import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ThemeToggleButton } from "./components/shared/ThemeToggleButton/ThemeToggleButton";
import { useTheme } from "./hooks/useTheme";
import router from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <div className="fixed bottom-6 right-6 z-40">
        <ThemeToggleButton isDark={isDark} onToggle={toggleTheme} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
