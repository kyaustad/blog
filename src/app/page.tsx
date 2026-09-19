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
import { Cruddy } from "@/components/custom/crud-component";

export default async function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          DeezNutz
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          DeezNutz
        </p>
        <Separator className="my-8" />
      </header>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 pb-24">
        <Cruddy<SelectPost>
          mode={"read"}
          onRead={async () => {
            let allPosts = [];
            const allPostsResponse = await getAllPosts({ onlyPublished: true });

            if (!allPostsResponse.success) {
              throw new Error(allPostsResponse.message);
            }

            allPosts = allPostsResponse.data ?? [];

            return allPosts;
          }}
        />
      </section>
    </main>
  );
}
