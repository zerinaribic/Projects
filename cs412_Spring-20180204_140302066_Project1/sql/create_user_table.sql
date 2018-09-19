CREATE TABLE public."User"
(
    id serial,
    name character varying,
    email character varying,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."User"
    OWNER to iuslab;