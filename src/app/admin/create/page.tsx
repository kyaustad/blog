import { BackToDashboard } from "@/components/custom/admin-actions";
import PostComposer from "@/components/custom/post-composer";

export default function CreatePostPage() {
  return (
    <div className="flex flex-col min-w-screen-2xl items-center h-screen gap-8 w-full p-8 mx-auto">
      <BackToDashboard />
      <h1 className="text-2xl font-bold">Create a Post</h1>

      <PostComposer
        className="flex flex-col gap-4 w-full"
        editorClassName="min-h-[800px] w-full"
      />
    </div>
  );
}
