import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import { MantineProvider, Loader } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorFallback } from "@/components/ErrorFallback";
import { AuthProvider } from "@/auth/AuthProvider";
import { NavigateSetter, his } from "./navigate";
import "./configs/i18n";
import "@mantine/core/styles.css";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={(error, errorInfo) => {
      console.log("Error catched by error boundary", { error, errorInfo });
    }}
    onReset={() => {
      his.navigate("/login");
    }}
  >
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MantineProvider>
            <NavigateSetter />
            <Notifications />
            <Suspense fallback={<Loader style={{ margin: "20vh auto" }} />}>
              <App />
            </Suspense>
          </MantineProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </ErrorBoundary>
);
