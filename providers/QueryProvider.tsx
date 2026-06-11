/**
 * TanStack React Query provider for server-state caching.
 *
 * @module QueryProvider
 * @category Providers
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/** Provides a per-app QueryClient instance to the component tree. */
export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
