import { SelectPost } from "@/db/schema";
import { getAllPosts } from "@/server";
import Markdown from "react-markdown";

export default async function Home() {
  let allPosts: SelectPost[] = [];
  try {
    const allPostsResponse = await getAllPosts();
    console.log(allPostsResponse);

    if (!allPostsResponse.success) {
      throw new Error(allPostsResponse.message);
    }

    allPosts = allPostsResponse.data ?? [];
    console.log(allPosts);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPosts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 rounded-md p-4 max-w-md"
          >
            <h2>{post.title}</h2>
            <Markdown>{post.content}</Markdown>
          </div>
        ))}
      </div>
    </div>
  );
}
