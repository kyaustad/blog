import { getAllPosts } from "@/server";

export default async function Home() {
  try {
    const allPostsResponse = await getAllPosts();
    console.log(allPostsResponse);

    if (!allPostsResponse.success) {
      throw new Error(allPostsResponse.message);
    }

    const allPosts = allPostsResponse.data;
    console.log(allPosts);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Home</h1>
    </div>
  );
}
