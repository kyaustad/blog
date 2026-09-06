import { Toaster } from "sonner";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeToggle from "@/components/custom/theme-toggle";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Toaster />
        <Suspense fallback={<div>Loading...</div>}>
          <TooltipProvider>
            <ThemeToggle className="fixed top-4 right-4" />
            {children}
          </TooltipProvider>
        </Suspense>
      </ThemeProvider>
    </>
  );
}
