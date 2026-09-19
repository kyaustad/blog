"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
  SelectContent,
  SelectSeparator,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { type APIResponse } from "@/types";
import { type SelectTag } from "@/db/schema";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  FileSearchIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type TagSelectorProps = {
  onSelectionChange: (newTags: SelectTag) => void;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  selectedTags: SelectTag[];
};
export function TagSelector({
  onSelectionChange,
  className,
  triggerClassName,
  contentClassName,
  selectedTags,
}: TagSelectorProps) {
  const [tags, setTags] = useState<SelectTag[]>([]);
  const [filteredTags, setFilteredTags] = useState<SelectTag[]>([]);
  const [search, setSearch] = useState<string>("");
  const [addTagLoading, setAddTagLoading] = useState<boolean>(false);

  const fetchTags = useCallback(async () => {
    try {
      const response = await fetch("/api/tags", {
        method: "GET",
        credentials: "include",
      });

      const tags: SelectTag[] = (await response.json())?.data;

      setTags(tags);
    } catch {
      toast.error("Error fetching all tags!");
    }
  }, []);

  const handleAddTag = async () => {
    setAddTagLoading(true);
    try {
      const response = await fetch("/api/tags", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          tagTitle: search.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Error hitting the PUT endpoint to add a tag!");
      }

      setSearch("");
      await fetchTags();
    } catch {
      toast.error("Error adding tag to DB!");
    } finally {
      setAddTagLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    setFilteredTags(tags);
  }, [tags]);

  useEffect(() => {
    const newFilteredTags = tags.filter((tag) =>
      tag.title.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredTags(newFilteredTags);
  }, [search]);

  return (
    <Select>
      <SelectTrigger className={triggerClassName}>
        <p>Select A Tag</p>
      </SelectTrigger>
      <SelectContent
        side="bottom"
        className={cn(
          contentClassName,
          "mt-8 flex flex-col gap-2 min-h-[400px] overflow-auto",
        )}
      >
        <SelectSeparator />

        <div className="relative p-2">
          <Input
            type="text"
            className="min-h-10"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          ></Input>
          {filteredTags.length === 0 && search !== "" && (
            <Button
              disabled={addTagLoading}
              size={"icon-sm"}
              onClick={handleAddTag}
              className={
                "w-full max-w-24 absolute right-20 top-1/2 -translate-y-1/2"
              }
            >
              {addTagLoading ? (
                <div className="flex flex-row gap-2">
                  <Spinner className="animate-spin" />
                  <p>Adding...</p>
                </div>
              ) : (
                <div className="flex flex-row">
                  <PlusIcon size={4} className="mx-1" /> Add Tag
                </div>
              )}
            </Button>
          )}
          <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
        <SelectSeparator />
        <div className="flex flex-col gap-2 py-2 w-full">
          {filteredTags.map((tag) => (
            <SelectItem
              className={cn(
                "px-2 cursor-pointer w-full max-w-2xl mx-auto",
                selectedTags.map((t) => t.id).includes(tag.id)
                  ? "bg-emerald-500/20 hover:bg-destructive/50"
                  : "bg-primary/20 hover:bg-accent",
              )}
              key={tag.id + tag.title}
              onClick={() => {
                onSelectionChange(tag);
              }}
            >
              {tag.title}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
