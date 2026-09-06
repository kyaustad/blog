"use client";

import "@mdxeditor/editor/style.css";
import type { ForwardedRef } from "react";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  Separator,
  DiffSourceToggleWrapper,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";

async function imageUploadHandler(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("media", image);
  formData.append("type", "image");

  const response = await fetch("/api/media/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success || !data.data) {
    throw new Error(data?.message ?? "Image upload failed");
  }
  return data.data as string; // Cloudinary secure_url for MDXEditor
}

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      contentEditableClassName="prose dark:prose-invert max-w-none min-h-[240px] p-4"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageUploadHandler }),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "ts" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            ts: "TypeScript",
            jsx: "JavaScript (JSX)",
            tsx: "TypeScript (TSX)",
            rust: "Rust",
            python: "Python",
            cpp: "C++",
            cs: "C#",
            css: "CSS",
            txt: "Plain Text",
          },
        }),
        diffSourcePlugin({ viewMode: "rich-text" }),
        frontmatterPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <ListsToggle />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <InsertThematicBreak />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
