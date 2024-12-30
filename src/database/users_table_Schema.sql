CREATE TABLE public."Users"
(
    id text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    name text,
    email text,
    password text,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;