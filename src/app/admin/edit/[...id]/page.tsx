import { SelectPostWithTags, type SelectPost } from "@/db/schema";
import { getPostFromSlug } from "@/server";
import { redirect } from "next/navigation";
import { FullPostDisplay } from "@/components/custom/post-display";
import { readPurposeCookie } from "@/server";
import { env } from "@/env";
import { getPostFromId } from "@/server/content";
import PostEditor from "@/components/custom/post-editor";
import { BackToDashboardButton } from "@/components/custom/nav-buttons";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  if (!id) {
    console.log("Couldnt get id from catch-all route");
    return redirect("/not-found");
  }
  // const res = await getPostFromSlug(slug);

  const session = await readPurposeCookie("session", "session");
  if (!session || session.sub !== env.ADMIN_EMAIL) {
    console.log("Determined Session invalid");

    return redirect("/not-found");
  }

  const resp = await getPostFromId(id);

  if (!resp.success || !resp.data) {
    console.log("Error getting post from ID");
    redirect("/not-found");
  }

  const post = resp.data as SelectPostWithTags;

  return (
    <div className="max-w-screen-lg w-full mt-48 p-4 mx-auto">
      <BackToDashboardButton />
      {post ? (
        <PostEditor post={post} />
      ) : (
        <p>{`There was an error retrieving this post. Try again later. Sorrrrryyyyyy`}</p>
      )}
    </div>
  );
}
