CREATE TABLE `posts` (
	`id` integer PRIMARY KEY,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`posted_by` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
