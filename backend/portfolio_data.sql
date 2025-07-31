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
-- Data for Name: portfolio_item; Type: TABLE DATA; Schema: public; Owner: editscape_db_user
--

COPY public.portfolio_item (id, title, description, image_url, media_url, media_type, thumbnail_url, link, created_at) FROM stdin;
\.


--
-- Name: portfolio_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: editscape_db_user
--

SELECT pg_catalog.setval('public.portfolio_item_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

