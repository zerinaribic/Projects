CREATE TABLE "public"."tasks" (
    "addr_140" character varying,
    "id" serial,
    "name" character varying,
    "description" character varying,
    "status" character varying,
    PRIMARY KEY ("id")
);

ALTER TABLE public."tasks"
    OWNER to iuslab;
