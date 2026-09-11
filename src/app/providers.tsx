import { Toaster } from "sonner";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Toaster />
        <Suspense fallback={<div>Loading...</div>}>
          <TooltipProvider>{children}</TooltipProvider>
        </Suspense>
      </ThemeProvider>
    </>
  );
}
