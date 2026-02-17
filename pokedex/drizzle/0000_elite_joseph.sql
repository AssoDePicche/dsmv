CREATE TABLE `liked_pokemon` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `liked_pokemon_name_unique` ON `liked_pokemon` (`name`);