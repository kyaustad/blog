"use client";

import { useState, useRef, useEffect } from "react";
import { RefEditor } from "./ref-markdown-editor";
import { type MDXEditorMethods } from "@mdxeditor/editor";
import type { InsertPost } from "@/db/schema";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type SelectPost, type SelectTag } from "@/db/schema";
import { FileUploader } from "./file-uploader";
import Image from "next/image";

type CreatePostWithTags = Omit<SelectPost, "id"> & {
  tags: SelectTag[];
};

export default function PostComposer({
  editorClassName,
  className,
}: {
  className?: string;
  editorClassName?: string;
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [postedBy, setPostedBy] = useState<string>("Kyle Austad");
  const [slug, setSlug] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);

  const editorRef = useRef<MDXEditorMethods | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setMarkdown(content);
    }
  }, [content]);

  const handleSubmit = async () => {
    console.log("Featured Image: ", featuredImage);
    // try {
    //   const response = await fetch("/api/posts", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       title,
    //       content,
    //       featuredImage,
    //       summary,
    //       postedBy,
    //       createdAt: new Date().toDateString(),
    //       published,
    //       publishedAt: published === true ? new Date() : undefined,
    //       slug,
    //     } as InsertPost),
    //   });
    //   const data = await response.json();
    //   if (data.success) {
    //     toast.success("Post created successfully");
    //   } else {
    //     toast.error(data.message ?? "Failed to create post");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to create post");
    // }
  };

  return (
    <div className={className}>
      <Label>Featured Image</Label>
      <FileUploader onUpload={(url) => setFeaturedImage(url)} />
      {featuredImage && (
        <Image
          src={featuredImage}
          alt="featured image"
          width={1920}
          height={1080}
          className="mx-auto w-full max-w-md"
        ></Image>
      )}
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Posted By"
        value={postedBy}
        onChange={(e) => setPostedBy(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Checkbox
          id="published"
          checked={published}
          onCheckedChange={(checked) => setPublished(checked === true)}
        />
        <Label htmlFor="published">Published</Label>
      </div>
      <Input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <RefEditor
        ref={editorRef}
        markdown={content}
        className={editorClassName}
        onChange={setContent}
      />
      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
