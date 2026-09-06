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

export default function PostComposer({
  editorClassName,
  className,
}: {
  className?: string;
  editorClassName?: string;
}) {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [published, setPublished] = useState(false);
  const [slug, setSlug] = useState("");
  const editorRef = useRef<MDXEditorMethods | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setMarkdown(markdown);
    }
  }, [markdown]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          content: markdown,
          postedBy,
          published,
          slug,
        } as InsertPost),
      });
      const data = await response.json();
      if (data.success) {
        setMarkdown("");
        setTitle("");
        setPostedBy("");
        setPublished(false);
        setSlug("");
        toast.success("Post created successfully");
      } else {
        toast.error(data.message ?? "Failed to create post");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className={className}>
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
        markdown={markdown}
        className={editorClassName}
        onChange={setMarkdown}
      />
      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
