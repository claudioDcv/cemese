--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 9.6.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;


-- Drop table

-- DROP TABLE public.account

CREATE TABLE public.account (
	user_id serial NOT NULL,
	username varchar(50) NOT NULL,
	"password" varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	created_on timestamp NOT NULL,
	last_login timestamp NULL,
	CONSTRAINT account_email_key UNIQUE (email),
	CONSTRAINT account_pkey PRIMARY KEY (user_id),
	CONSTRAINT account_username_key UNIQUE (username)
);

-- Drop table

-- DROP TABLE public.account_role

CREATE TABLE public.account_role (
	user_id int4 NOT NULL,
	role_id int4 NOT NULL,
	grant_date timestamp NULL,
	CONSTRAINT account_role_pkey PRIMARY KEY (user_id, role_id),
	CONSTRAINT account_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES role(role_id),
	CONSTRAINT account_role_user_id_fkey FOREIGN KEY (user_id) REFERENCES account(user_id)
);

-- Drop table

-- DROP TABLE public.categories

CREATE TABLE public.categories (
	id serial NOT NULL,
	title text NOT NULL,
	"text" text NOT NULL,
	friendly_url text NOT NULL,
	create_at timestamp NOT NULL,
	CONSTRAINT category_pkey PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public.images

CREATE TABLE public.images (
	id serial NOT NULL,
	originalname varchar NOT NULL,
	"encoding" varchar NOT NULL,
	mimetype varchar(50) NOT NULL,
	destination varchar NOT NULL,
	filename varchar NOT NULL,
	"path" varchar NOT NULL,
	"size" numeric NOT NULL,
	CONSTRAINT images_pkey PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public.menus

CREATE TABLE public.menus (
	id serial NOT NULL,
	menu_id int4 NOT NULL,
	title text NOT NULL,
	url text NOT NULL,
	order_position int4 NOT NULL,
	description text NOT NULL,
	title_min varchar(15) NULL,
	CONSTRAINT menus_pkey PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public.posts

CREATE TABLE public.posts (
	id serial NOT NULL,
	title text NOT NULL,
	"text" text NOT NULL,
	friendly_url text NOT NULL,
	create_at timestamp NOT NULL,
	CONSTRAINT post_pkey PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public."role"

CREATE TABLE public."role" (
	role_id serial NOT NULL,
	role_name varchar(255) NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (role_id),
	CONSTRAINT role_role_name_key UNIQUE (role_name)
);
