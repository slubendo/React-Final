import { text, sqliteTable} from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
    id: text('id').notNull().unique().primaryKey(),
    name: text("content").notNull().unique(),
    image: text("image").notNull(),
})
export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert