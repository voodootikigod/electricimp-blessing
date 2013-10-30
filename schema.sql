-- Expected schema for postgresql 9.2 table
CREATE TABLE "audit" (
  "action" char(1) NOT NULL COLLATE "default",
  "pkg" json NOT NULL,
  "created_at" timestamp(6) WITH TIME ZONE NOT NULL DEFAULT now()
)
WITH (OIDS=FALSE);