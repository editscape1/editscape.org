--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 15.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


--
-- Name: contact_message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contact_message (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    email character varying(120) NOT NULL,
    message text NOT NULL,
    "timestamp" timestamp without time zone,
    responded boolean
);


--
-- Name: contact_message_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contact_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contact_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contact_message_id_seq OWNED BY public.contact_message.id;


--
-- Name: portfolio_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.portfolio_item (
    id integer NOT NULL,
    title character varying(120) NOT NULL,
    description text NOT NULL,
    image_url character varying(255),
    media_url character varying(255),
    media_type character varying(10),
    thumbnail_url character varying(255),
    link character varying(255),
    created_at timestamp without time zone
);


--
-- Name: portfolio_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.portfolio_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolio_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.portfolio_item_id_seq OWNED BY public.portfolio_item.id;


--
-- Name: contact_message id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_message ALTER COLUMN id SET DEFAULT nextval('public.contact_message_id_seq'::regclass);


--
-- Name: portfolio_item id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portfolio_item ALTER COLUMN id SET DEFAULT nextval('public.portfolio_item_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alembic_version (version_num) FROM stdin;
9bfb48098cce
\.


--
-- Data for Name: contact_message; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.contact_message (id, name, email, message, "timestamp", responded) FROM stdin;
1	testing	testuser@gmail.com	can we talk?	2025-07-31 21:26:19.774275	f
2	Amit	amitscb_chd@gmail.com	Let's have a call	2025-07-31 21:29:42.211258	f
\.


--
-- Data for Name: portfolio_item; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.portfolio_item (id, title, description, image_url, media_url, media_type, thumbnail_url, link, created_at) FROM stdin;
\.


--
-- Name: contact_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contact_message_id_seq', 2, true);


--
-- Name: portfolio_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.portfolio_item_id_seq', 1, false);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: contact_message contact_message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_message
    ADD CONSTRAINT contact_message_pkey PRIMARY KEY (id);


--
-- Name: portfolio_item portfolio_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portfolio_item
    ADD CONSTRAINT portfolio_item_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

