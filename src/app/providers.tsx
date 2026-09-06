import { Toaster } from "sonner";
import { Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster richColors />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  );
}
