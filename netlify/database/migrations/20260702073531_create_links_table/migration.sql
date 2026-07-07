CREATE TABLE IF NOT EXISTS "links" (
	"code" varchar(6) PRIMARY KEY,
	"url" text NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
