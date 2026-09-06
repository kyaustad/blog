import LogoutButton from "@/components/custom/logout-button";
import { RefEditor } from "@/components/custom/ref-markdown-editor";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 w-full">
      <h1>Dashboard Page</h1>
      <LogoutButton />
      <RefEditor markdown="Hello, world!" className="w-full" />
    </div>
  );
}
