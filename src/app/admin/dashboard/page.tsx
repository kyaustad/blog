import LogoutButton from "@/components/custom/logout-button";
import { ActionCard } from "@/components/custom/admin-actions";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center h-[80vh] gap-8 mt-24 w-full p-8 mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <LogoutButton />

      <div className="grid grid-cols-2 gap-4 w-full max-w-screen-md">
        <ActionCard mode="all-posts" />
        <ActionCard mode="create" />
        <ActionCard mode="browse-media" />
        <ActionCard mode="upload-media" />
      </div>
    </div>
  );
}
