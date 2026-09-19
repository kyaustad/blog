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
import { Textarea } from "../ui/textarea";
import { TagSelector } from "./tag-selector";
import { Badge } from "../ui/badge";

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
  const [title, setTitle] = useState<string>(""); // Done
  const [content, setContent] = useState<string>(""); // Done
  const [featuredImage, setFeaturedImage] = useState<string | null>(null); // Done
  const [summary, setSummary] = useState<string>("");
  const [postedBy, setPostedBy] = useState<string>("Kyle Austad");
  const [slug, setSlug] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [tags, setTags] = useState<SelectTag[]>([]);

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
      <div className="flex flex-col gap-2 bg-muted/50 rounded-lg p-2 w-full">
        <Label className="text-lg">Featured Image</Label>
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
      </div>
      <div className="flex flex-col gap-2 bg-muted/50 rounded-lg p-2 w-full">
        <Label className="text-lg">Title</Label>

        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 bg-muted/50 rounded-lg p-2">
        <Label className="text-lg">Summary</Label>

        <Textarea
          placeholder="A Summary of the post"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 bg-muted/50 rounded-lg p-2">
        <Label className="text-lg">Posted By</Label>
        <Input
          type="text"
          placeholder="Posted By"
          value={postedBy}
          onChange={(e) => setPostedBy(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 bg-muted/50 rounded-lg p-2">
        <div className="flex items-center gap-2 justify-center">
          <Checkbox
            id="published"
            checked={published}
            onCheckedChange={(checked) => setPublished(checked === true)}
          />
          <Label htmlFor="published" className="text-md">
            Published?
          </Label>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-muted/50 rounded-lg p-2">
        <Label className="text-lg">Slug</Label>

        <Input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => {
            const newValue = e.target.value.trim().replace(/ /g, "-");
            setSlug(newValue);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 bg-muted/50 rounded-lg p-2">
        <Label className="text-lg">Tags</Label>
        <div className="w-full flex flex-wrap gap-3">
          {tags.length > 0 &&
            tags.map((tag) => (
              <Badge
                className="cursor-pointer hover:bg-destructive"
                onClick={() => {
                  const newTags = tags.filter((t) => t.id !== tag.id);
                  setTags(newTags);
                }}
                key={Number(tag.id) * 2 + tag.title}
              >
                {tag.title}
              </Badge>
            ))}
        </div>
        <TagSelector
          selectedTags={tags}
          onSelectionChange={(pressedTag) => {
            const alreadyIncluded = tags
              .map((tag) => tag.id)
              .includes(pressedTag.id);

            if (alreadyIncluded) {
              console.log("Tag already included, removing now...");
              const newTags = tags.filter((tag) => tag.id !== pressedTag.id);
              setTags(newTags);
            } else {
              console.log("Adding new tag to array");
              setTags((prev) => [...prev, pressedTag]);
            }
          }}
          triggerClassName="w-full"
        />
      </div>
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
