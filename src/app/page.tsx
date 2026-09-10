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

export default async function Home() {
  let allPosts: SelectPost[] = [];
  try {
    const allPostsResponse = await getAllPosts();

    if (!allPostsResponse.success) {
      throw new Error(allPostsResponse.message);
    }

    allPosts = allPostsResponse.data ?? [];
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Welcome to my blog
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts, stories, and technical explorations shared one post at a
          time.
        </p>
        <Separator className="my-8" />
      </header>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col justify-between transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 mt-2">
                  <Markdown>{post.content}</Markdown>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground">
                  Read more &rarr;
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {allPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No posts found yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
