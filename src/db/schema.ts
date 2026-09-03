import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    postedBy: text('posted_by').notNull(),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp'}).$onUpdate(() => new Date()),
    slug: text('slug').notNull(),
    published: integer('published', { mode: 'boolean'}).default(false).notNull(),
    publishedAt: integer('published_at', { mode: 'timestamp'}).default(sql`(CURRENT_TIMESTAMP)`),

})