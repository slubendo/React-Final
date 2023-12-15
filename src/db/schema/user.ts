import { text, integer, sqliteTable} from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
    id: integer('id').notNull().unique().primaryKey({ autoIncrement: true }),
    name: text("content").notNull().unique(),
    image: text("image").notNull(),
})
export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert