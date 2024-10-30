DROP TABLE IF EXISTS public."user" CASCADE;
DROP TABLE IF EXISTS public."report" CASCADE;
DROP TABLE IF EXISTS public."annotation" CASCADE;
DROP TABLE IF EXISTS public."report_category" CASCADE;
DROP TABLE IF EXISTS public."report_status" CASCADE;
DROP TABLE IF EXISTS public."business_entity" CASCADE;

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  "picture" TEXT NOT NULL,
  "role" VARCHAR(255) NOT null DEFAULT 'Handler',
  "created_at" TIMESTAMP NOT NULL DEFAULT (now())
);

CREATE TABLE "report" (
  "id" SERIAL PRIMARY KEY,
  "created_by" INTEGER,
  "assigned_to" INTEGER,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "location" VARCHAR(255) NOT NULL,
  "category_id" INTEGER NOT NULL,
  "status_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT (now()),
  "updated_at" TIMESTAMP NOT NULL DEFAULT (now())
);

CREATE TABLE "report_category" (
  "id" SERIAL PRIMARY KEY,
  "category_name" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL
);

CREATE TABLE "report_status" (
  "id" SERIAL PRIMARY KEY,
  "status_name" VARCHAR(255) NOT NULL
);

CREATE TABLE "business_entity" (
  "id" SERIAL PRIMARY KEY,
  "report_id" INTEGER NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "industry" VARCHAR(100) NOT NULL,
  "address" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(255) NOT NULL,
  "relation" VARCHAR(100) NOT NULL
);

CREATE TABLE "annotation" (
  "id" SERIAL PRIMARY KEY,
  "report_id" INTEGER NOT NULL,
  "created_by" INTEGER NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "annotation" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT (now())
);

ALTER TABLE "report" ADD FOREIGN KEY ("created_by") REFERENCES "user" ("id") ON DELETE SET NULL;
ALTER TABLE "report" ADD FOREIGN KEY ("assigned_to") REFERENCES "user" ("id") ON DELETE SET NULL;
ALTER TABLE "report" ADD FOREIGN KEY ("category_id") REFERENCES "report_category" ("id") ON DELETE RESTRICT;
ALTER TABLE "report" ADD FOREIGN KEY ("status_id") REFERENCES "report_status" ("id") ON DELETE RESTRICT;
ALTER TABLE "annotation" ADD FOREIGN KEY ("created_by") REFERENCES "user" ("id") ON DELETE CASCADE;
ALTER TABLE "annotation" ADD FOREIGN KEY ("report_id") REFERENCES "report" ("id") ON DELETE CASCADE;
ALTER TABLE "business_entity" ADD FOREIGN KEY ("report_id") REFERENCES "report" ("id") ON DELETE CASCADE;

