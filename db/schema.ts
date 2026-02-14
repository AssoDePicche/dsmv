import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const LikedPokemon = sqliteTable("liked_pokemon", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});
