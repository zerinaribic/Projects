# Repository of the cs412 Spring 2018 course

## Cheatsheets

psql CLI cheatsheets:

https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546
https://gist.github.com/apolloclark/ea5466d5929e63043dcf

git CLI cheatsheet:

https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf

Linux BASH (Konsole) cheatsheet:

https://learncodethehardway.org/unix/bash_cheat_sheet.pdf

## Database initial Setup

To create the DB user (should already exist on the lab computers) run the following query on the psql (don't forget to enter real password instead of xxxxx):

```
CREATE USER iuslab WITH
	LOGIN
	NOSUPERUSER
	CREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';
```

To create database from the comand line (CLI) enter the following command:

```
createdb CS416_DB
```

To connect psql to the database enter the following command:

```
psql cs416_db
```

To leave psql enter

```
\q
```

To create table "User" in the database enter the following command from psql:

```
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
```

To show records from User table run the following query in psql:

```
SELECT * FROM public.User;
```

To insert new row into table "User", run the following command:

```
INSERT INTO public.User (name,email) VALUES ('john','john@gmail.com');
```
