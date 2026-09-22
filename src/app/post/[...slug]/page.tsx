import { SelectPostWithTags, type SelectPost } from "@/db/schema";
import { getPostFromSlug } from "@/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";
import { FullPostDisplay } from "@/components/custom/post-display";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getPostFromSlug(slug);

  if (res.success === false) {
    return redirect("/not-found");
  }

  const post = res.data as SelectPostWithTags;

  return (
    <div className="max-w-screen-lg w-full mt-32 p-4 mx-auto">
      {post ? (
        <FullPostDisplay post={post} />
      ) : (
        <p>{`There was an error retrieving this post. Try again later. Sorrrrryyyyyy`}</p>
      )}
    </div>
  );
}
