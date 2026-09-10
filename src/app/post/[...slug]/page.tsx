import { type SelectPost } from "@/db/schema";
import { getPostFromSlug } from "@/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";

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

  const post = res.data as SelectPost;

  return (
    <div className="max-w-md">
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
      {post.featuredImage && (
        <Image alt="Featured Image" src={post.featuredImage}></Image>
      )}
      <Markdown>{post.content}</Markdown>
    </div>
  );
}
