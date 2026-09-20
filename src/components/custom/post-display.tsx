"use client";

import { type SelectPostWithTags } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EyeIcon } from "@phosphor-icons/react";
import { Badge } from "../ui/badge";
import { TracingBeam } from "../ui/tracing-beam";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import { CodeBlock } from "../ui/code-block";
import { Separator } from "../ui/separator";
import { TextFlippingBoard } from "../ui/text-flipping-board";

/* -------------------------------------------------------------------------- */
/*                                  Post Card                                 */
/* -------------------------------------------------------------------------- */

export function PostCard({
  post,
  className,
}: {
  post: SelectPostWithTags;
  className?: string;
}) {
  const router = useRouter();

  return (
    <Card
      className={cn(
        className,
        "max-h-125 min-h-125 flex flex-col justify-between",
      )}
    >
      <div className="flex flex-col">
        <CardHeader className="m-0">
          <div className="flex flex-row w-full justify-between items-center">
            <CardTitle className="text-lg">{post.title}</CardTitle>

            <CardTitle className="font-light text-sm">
              {format(post.publishedAt ?? post.createdAt, "yyyy-MM-dd")}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col gap-4 m-0 mt-2">
          {post.featuredImage && (
            <div className="w-full aspect-21/9 overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title + "featured image"}
                height={400}
                width={900}
                className="object-cover w-full"
              />
            </div>
          )}
        </CardContent>
      </div>

      <CardDescription className="p-4 text-foreground prose">
        {post.summary}
      </CardDescription>

      <CardFooter className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={post.id + tag.id + tag.title + post.title}
              className="text-xs font-light max-h-5"
              variant="secondary"
            >
              {tag.title}
            </Badge>
          ))}
        </div>

        <Link href={`/post/${post.slug}`}>
          <Button className="flex flex-row gap-2">
            <EyeIcon size={6} />
            Read
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Code Block Config                             */
/* -------------------------------------------------------------------------- */

const codeFilenames = {
  js: "JavaScript.js",
  ts: "TypeScript.ts",
  jsx: "React-JS.jsx",
  tsx: "React.tsx",
  rust: "rust.rs",
  Rust: "rust.rs",
  python: "python.py",
  cpp: "code.cpp",
  cs: "code.cs",
  css: "style.css",
  txt: "code.txt",
} as const;

type CodeLanguage = keyof typeof codeFilenames;

function getCodeFilename(language: string): string {
  if (language in codeFilenames) {
    return codeFilenames[language as CodeLanguage];
  }

  return `code.${language}`;
}

/* -------------------------------------------------------------------------- */
/*                             Markdown Components                            */
/* -------------------------------------------------------------------------- */

const markdownComponents: Components = {
  /* -------------------------------- Headings ------------------------------- */

  h1: ({ className, ...props }) => (
    <h1
      className={cn("mt-8 mb-4 text-3xl font-bold tracking-tight", className)}
      {...props}
    />
  ),

  h2: ({ className, ...props }) => (
    <h2
      className={cn("mt-8 mb-4 text-2xl font-bold tracking-tight", className)}
      {...props}
    />
  ),

  h3: ({ className, ...props }) => (
    <h3
      className={cn("mt-6 mb-3 text-xl font-semibold", className)}
      {...props}
    />
  ),

  h4: ({ className, ...props }) => (
    <h4
      className={cn("mt-5 mb-2 text-lg font-semibold", className)}
      {...props}
    />
  ),

  h5: ({ className, ...props }) => (
    <h5
      className={cn("mt-4 mb-2 text-base font-semibold", className)}
      {...props}
    />
  ),

  h6: ({ className, ...props }) => (
    <h6
      className={cn("mt-4 mb-2 text-sm font-semibold", className)}
      {...props}
    />
  ),

  /* --------------------------------- Text --------------------------------- */

  p: ({ className, ...props }) => (
    <p className={cn("mb-4 leading-7 wrap-anywhere", className)} {...props} />
  ),

  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold", className)} {...props} />
  ),

  em: ({ className, ...props }) => (
    <em className={cn("italic", className)} {...props} />
  ),

  del: ({ className, ...props }) => (
    <del className={cn("line-through", className)} {...props} />
  ),

  /* --------------------------------- Links -------------------------------- */

  a: ({ className, ...props }) => (
    <a
      className={cn(
        "font-medium underline underline-offset-4 wrap-anywhere",
        className,
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  /* --------------------------------- Lists -------------------------------- */

  ul: ({ className, ...props }) => (
    <ul className={cn("my-4 ml-6 list-disc space-y-2", className)} {...props} />
  ),

  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-4 ml-6 list-decimal space-y-2", className)}
      {...props}
    />
  ),

  li: ({ className, ...props }) => (
    <li className={cn("wrap-anywhere", className)} {...props} />
  ),

  /* ------------------------------ Blockquotes ------------------------------ */

  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("my-6 border-l-4 pl-4 italic", className)}
      {...props}
    />
  ),

  /* -------------------------------- Images -------------------------------- */

  img: ({ className, ...props }) => (
    <img className={cn("my-6 h-auto max-w-full ", className)} {...props} />
  ),

  /* --------------------------------- Table -------------------------------- */

  table: ({ className, ...props }) => (
    <div className="my-6 w-full max-w-full overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),

  thead: ({ className, ...props }) => (
    <thead className={cn("border-b", className)} {...props} />
  ),

  tbody: ({ className, ...props }) => (
    <tbody className={cn("[&>tr:last-child]:border-0", className)} {...props} />
  ),

  tr: ({ className, ...props }) => (
    <tr className={cn("border-b", className)} {...props} />
  ),

  th: ({ className, ...props }) => (
    <th
      className={cn("px-4 py-2 text-left font-semibold", className)}
      {...props}
    />
  ),

  td: ({ className, ...props }) => (
    <td className={cn("px-4 py-2", className)} {...props} />
  ),

  /* ------------------------------- Separator ------------------------------- */

  hr: ({ className, ...props }) => (
    <hr className={cn("my-8 border-border", className)} {...props} />
  ),

  /* ----------------------------- Inline / Block Code ----------------------------- */

  code: ({ className, children, ...props }) => {
    /*
     * react-markdown adds:
     *
     *   language-rust
     *
     * to fenced code blocks. Inline code does not receive this class.
     *
     * react-markdown has already parsed the fenced block by this point,
     * so `children` contains only the contents of this specific block.
     */
    const match = /language-([^\s]+)/.exec(className || "");

    if (match) {
      const language = match[1];

      return (
        <div className="w-full my-8">
          <CodeBlock
            language={language}
            filename={getCodeFilename(language)}
            code={String(children).replace(/\n$/, "")}
          />
        </div>
      );
    }

    /*
     * Inline code
     */
    return (
      <code
        className={cn(
          "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
          "wrap-anywhere",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
};

/* -------------------------------------------------------------------------- */
/*                              Full Post Display                             */
/* -------------------------------------------------------------------------- */

export function FullPostDisplay({
  post,
  className,
}: {
  post: SelectPostWithTags;
  className?: string;
}) {
  return (
    // <TracingBeam className={cn(className, "px-6 mb-200 ")}>
    <div
      className={cn(
        "flex min-w-0 max-w-full ml-4 flex-col gap-4 bg-muted/50 p-6",
      )}
    >
      {/*<TextFlippingBoard text={post.title} />*/}
      <h1 className="text-3xl font-semibold">{post.title}</h1>

      {post.featuredImage && (
        <div className="w-full max-h-164 aspect-video overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title + " featured image"}
            loading="eager"
            width={2000}
            height={1500}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="w-full flex flex-row justify-between items-center my-4">
        <div className="flex flex-row gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={post.id + tag.id + tag.title + post.title}
              className="text-base font-light"
              variant="default"
            >
              {tag.title}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold text-sm">{post.postedBy}</p>
          <p className="font-light text-xs">
            {format(post.publishedAt ?? post.createdAt, "yyyy-MM-dd")}
          </p>
        </div>
      </div>
      <Separator className={"w-full min-h-1.5 my-2"} />

      <div className={cn("min-w-0 max-w-full mt-6", "wrap-anywhere")}>
        <Markdown components={markdownComponents}>{post.content}</Markdown>
      </div>
    </div>
    // </TracingBeam>
  );
}
