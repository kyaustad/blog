import { SelectPost } from "@/db/schema";
import { getAllPosts } from "@/server";
import Markdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PostCard } from "@/components/custom/post-display";

export default async function Home() {
  let allPosts = [];
  const allPostsResponse = await getAllPosts({ onlyPublished: true });

  if (!allPostsResponse.success) {
    throw new Error(allPostsResponse.message);
  }
  allPosts = allPostsResponse.data ?? [];

  return (
    <main className="min-h-[80vh] h-full mt-12 bg-background text-foreground">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          {`Kyle's Blog`}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {`Technical writing, thoughts, ramblings, and deep dives on learning things in all the wrong ways.`}
        </p>
        <Separator className="my-8" />
      </header>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 pb-24">
        {allPosts.length === 0 ? (
          <div>No Posts Yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {allPosts.map((post) => (
              <PostCard key={post.id + post.title} post={post}></PostCard>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
