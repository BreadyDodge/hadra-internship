// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `x-todoist_${name}`);

export const taskTable = createTable("tasks", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  done: int("done").default(0),
});
