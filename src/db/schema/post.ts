import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { user } from "./user"

export const posts = sqliteTable("posts", {
    id: text('id').notNull().unique().primaryKey(),
    userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})


export type Post = typeof posts.$inferSelect // return type when queried
export type NewPost = typeof posts.$inferInsert // insert type