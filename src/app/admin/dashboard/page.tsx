import LogoutButton from "@/components/custom/logout-button";
import PostComposer from "@/components/custom/post-composer";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 w-full">
      <h1>Dashboard Page</h1>
      <LogoutButton />
      <PostComposer
        className="flex flex-col gap-4"
        editorClassName="w-full h-full text-foreground"
      />
    </div>
  );
}
