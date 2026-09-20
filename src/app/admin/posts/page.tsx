import { getAllPosts } from "@/server";
import { BackToDashboardButton } from "@/components/custom/nav-buttons";
import { PostCard } from "@/components/custom/post-display";

export default async function AdminAllPostsPage() {
  let allPosts = [];
  const allPostsResponse = await getAllPosts({ onlyPublished: true });

  if (!allPostsResponse.success) {
    throw new Error(allPostsResponse.message);
  }
  allPosts = allPostsResponse.data ?? [];

  return (
    <div className="w-full  mt-24 flex flex-col p-8 gap-6 mx-auto">
      <BackToDashboardButton />
      {/* Posts Grid */}
      <section className="container mx-auto px-4 pb-24">
        {allPosts.length === 0 ? (
          <div>No Posts Yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {allPosts.map((post) => (
              <PostCard
                key={post.id + post.title}
                adminMode={true}
                post={post}
              ></PostCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
