import { SelectPostWithTags, type SelectPost } from "@/db/schema";
import { getPostFromSlug } from "@/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";
import { FullPostDisplay } from "@/components/custom/post-display";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPostFromSlug(slug)).data as SelectPostWithTags;

  return {
    title: `${post.title} | Kyle Austad`,
    description: `${post.summary}`,
    alternates: {
      canonical: `https://blog.kyleaustad.dev/post/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Kyle Austad`,
      description: post.summary ?? "Technical writing for the clueless",
      url: `https://blog.kyleaustad.dev/post/${post.slug}`,
      siteName: "Kyle Austad's Blog",
      images: [
        {
          url: `${post.featuredImage ?? "https://res.cloudinary.com/dmphandji/image/upload/v1790443114/blog/images/OpenGraph.webp"}`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary ?? "Technical writing for the clueless",
      images: [
        `${post.featuredImage ?? "https://res.cloudinary.com/dmphandji/image/upload/v1790443114/blog/images/OpenGraph.webp"}`,
      ],
    },
  };
}

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
