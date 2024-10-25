DROP TABLE IF EXISTS public."user" CASCADE;
DROP TABLE IF EXISTS public."report" CASCADE;
DROP TABLE IF EXISTS public."annotation" CASCADE;

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "role" VARCHAR(50) NOT NULL
);

CREATE TABLE "report" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "location" VARCHAR(255) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
  "created_at" TIMESTAMP NOT NULL DEFAULT (now())
);

CREATE TABLE "annotation" (
  "id" SERIAL PRIMARY KEY,
  "report_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "annotation" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT (now())
);

ALTER TABLE "report" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL;

ALTER TABLE "annotation" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE;

ALTER TABLE "annotation" ADD FOREIGN KEY ("report_id") REFERENCES "report" ("id") ON DELETE CASCADE;
