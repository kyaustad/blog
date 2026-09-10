PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`featured_image` text,
	`summary` text,
	`posted_by` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	`slug` text NOT NULL UNIQUE,
	`published` integer DEFAULT false NOT NULL,
	`published_at` integer DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_posts`(`id`, `title`, `content`, `featured_image`, `summary`, `posted_by`, `created_at`, `updated_at`, `slug`, `published`, `published_at`) SELECT `id`, `title`, `content`, `featured_image`, `summary`, `posted_by`, `created_at`, `updated_at`, `slug`, `published`, `published_at` FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;