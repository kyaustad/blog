import { BackToDashboard } from "@/components/custom/admin-actions";
import PostComposer from "@/components/custom/post-composer";
import { db } from "@/db";
import {
  InsertPost,
  type SelectPost,
  type SelectPostWithTags,
  type SelectTag,
  posts,
  postsTags,
} from "@/db/schema";
import { getPostFromId } from "@/server/content";

export default function CreatePostPage() {
  return (
    <div className="flex flex-col items-center h-screen gap-8 w-full p-8 mx-auto">
      <BackToDashboard />
      <h1 className="text-2xl font-bold">Create a Post</h1>

      <PostComposer
        className="flex flex-col gap-4"
        editorClassName="min-h-[800px]"
      />
      {/*<Cruddy<SelectPostWithTags, CreatePostWithTags>
        mode="create"
        onCreate={async (data: CreatePostWithTags) => {
          const tagIds = data.tags.map((tg) => tg.id);
          const post = {
            title: data.title,
            content: data.content,
            featuredImage: data.featuredImage,
            summary: data.summary,
            postedBy: data.postedBy,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            slug: data.slug,
            published: data.published,
            publishedAt: data.publishedAt,
          };

          const newPost = await db
            .insert(posts)
            .values(post as InsertPost)
            .returning();

          if (!newPost || newPost.length === 0) {
            throw new Error("Error writing new post to DB!");
          }
          const newPostId = newPost[0].id;

          for (const tag in tagIds) {
            await db
              .insert(postsTags)
              .values({ postId: newPostId, tagId: Number(tag) });
          }

          const finalResponse = await getPostFromId(Number(newPostId));

          if (!finalResponse || !finalResponse.success) {
            throw new Error(
              "Error retrieving final created post with tags from DB!",
            );
          }
          return finalResponse.data as SelectPostWithTags;
        }}
        fields={[
          {
            key: "title",
            label: "Title",
            render: (value, item) => <PostCreateTitle title={value} />,
          },
        ]}
      ></Cruddy>*/}
    </div>
  );
}
