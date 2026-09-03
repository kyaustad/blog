ALTER TABLE `posts` ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `published` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `published_at` integer DEFAULT (CURRENT_TIMESTAMP);