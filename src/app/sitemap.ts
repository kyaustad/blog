// app/sitemap.ts
import { SelectPostWithTags } from "@/db/schema";
import { getAllPosts } from "@/server";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic URLs (e.g., blogs)
  const postsResponse = await getAllPosts({ onlyPublished: true });

  const posts = postsResponse.data as SelectPostWithTags[];

  const blogEntries = posts.map((post: any) => ({
    url: `https://blog.kyleaustad.dev/post/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));

  return [
    {
      url: "https://blog.kyleaustad.dev",
      lastModified: new Date(),
    },
    ...blogEntries,
  ];
}
