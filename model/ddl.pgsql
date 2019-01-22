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

--
-- Name: account; Type: TABLE; Schema: public; Owner: cemese_user
--

CREATE TABLE public.account (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(355) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_login timestamp without time zone
);


ALTER TABLE public.account OWNER TO cemese_user;

--
-- Name: account_role; Type: TABLE; Schema: public; Owner: cemese_user
--

CREATE TABLE public.account_role (
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    grant_date timestamp without time zone
);


ALTER TABLE public.account_role OWNER TO cemese_user;

--
-- Name: account_user_id_seq; Type: SEQUENCE; Schema: public; Owner: cemese_user
--

CREATE SEQUENCE public.account_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_user_id_seq OWNER TO cemese_user;

--
-- Name: account_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cemese_user
--

ALTER SEQUENCE public.account_user_id_seq OWNED BY public.account.user_id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: cemese_user
--

CREATE TABLE public.images (
    id integer NOT NULL,
    originalname character varying NOT NULL,
    encoding character varying NOT NULL,
    mimetype character varying(50) NOT NULL,
    destination character varying NOT NULL,
    filename character varying NOT NULL,
    path character varying NOT NULL,
    size numeric NOT NULL
);


ALTER TABLE public.images OWNER TO cemese_user;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: cemese_user
--

CREATE SEQUENCE public.images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO cemese_user;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cemese_user
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: menus; Type: TABLE; Schema: public; Owner: cemese_user
--

CREATE TABLE public.menus (
    id integer NOT NULL,
    menu_id integer NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    "order" integer NOT NULL,
    description text NOT NULL,
    title_min character varying(15)
);


ALTER TABLE public.menus OWNER TO cemese_user;

--
-- Name: menus_id_seq; Type: SEQUENCE; Schema: public; Owner: cemese_user
--

CREATE SEQUENCE public.menus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menus_id_seq OWNER TO cemese_user;

--
-- Name: menus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cemese_user
--

ALTER SEQUENCE public.menus_id_seq OWNED BY public.menus.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: cemese_user
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title text NOT NULL,
    text text NOT NULL,
    friendly_url text NOT NULL,
    create_at timestamp without time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO cemese_user;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: cemese_user
--

CREATE SEQUENCE public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO cemese_user;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cemese_user
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: cemese_user
--

CREATE TABLE public.role (
    role_id integer NOT NULL,
    role_name character varying(255) NOT NULL
);


ALTER TABLE public.role OWNER TO cemese_user;

--
-- Name: role_role_id_seq; Type: SEQUENCE; Schema: public; Owner: cemese_user
--

CREATE SEQUENCE public.role_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_role_id_seq OWNER TO cemese_user;

--
-- Name: role_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cemese_user
--

ALTER SEQUENCE public.role_role_id_seq OWNED BY public.role.role_id;


--
-- Name: account user_id; Type: DEFAULT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.account ALTER COLUMN user_id SET DEFAULT nextval('public.account_user_id_seq'::regclass);


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Name: menus id; Type: DEFAULT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.menus ALTER COLUMN id SET DEFAULT nextval('public.menus_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: role role_id; Type: DEFAULT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.role ALTER COLUMN role_id SET DEFAULT nextval('public.role_role_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: cemese_user
--

COPY public.account (user_id, username, password, email, created_on, last_login) FROM stdin;
2	claudio	claudio.123	claudio.dcv@gmail.com	2019-01-21 00:00:00	\N
3	esteban	esteban.1234	esteban.dcv@gmail.com	2019-01-21 00:00:00	\N
\.


--
-- Data for Name: account_role; Type: TABLE DATA; Schema: public; Owner: cemese_user
--

COPY public.account_role (user_id, role_id, grant_date) FROM stdin;
2	1	\N
3	2	\N
\.


--
-- Name: account_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cemese_user
--

SELECT pg_catalog.setval('public.account_user_id_seq', 3, true);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: cemese_user
--

COPY public.images (id, originalname, encoding, mimetype, destination, filename, path, size) FROM stdin;
22	pokemon_icon_065_00.png	7bit	image/png	uploads/	9af19661cd1399a7eb2c1c407963e891	uploads/9af19661cd1399a7eb2c1c407963e891	36555
45	121-00.png	7bit	image/png	uploads/	b689ed85de470264e4a7835fda349ed8	uploads/b689ed85de470264e4a7835fda349ed8	38353
46	175.png	7bit	image/png	uploads/	40a0c522964625d30f8ca6846a7c4a3c	uploads/40a0c522964625d30f8ca6846a7c4a3c	186166
47	jpg.jpg	7bit	image/jpeg	uploads/	26f41a989c764d8203410a1090d11fd0	uploads/26f41a989c764d8203410a1090d11fd0	12042
48	pokemon_icon_149_00.png	7bit	image/png	uploads/	877f13959c7abf0e3dfd5f4905989ad3	uploads/877f13959c7abf0e3dfd5f4905989ad3	34444
49	pokemon_icon_094_00.png	7bit	image/png	uploads/	c1d34dab30e7d5d62e7c72c85d17a365	uploads/c1d34dab30e7d5d62e7c72c85d17a365	29084
50	Captura.PNG	7bit	image/png	uploads/	57706a5940c718df5e6018e0a9fbb5e4	uploads/57706a5940c718df5e6018e0a9fbb5e4	113227
62	descarga.jpg	7bit	image/jpeg	uploads/	e28af83dacd61d9d0500485fb6643e83	uploads/e28af83dacd61d9d0500485fb6643e83	11194
\.


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cemese_user
--

SELECT pg_catalog.setval('public.images_id_seq', 62, true);


--
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: cemese_user
--

COPY public.menus (id, menu_id, title, url, "order", description, title_min) FROM stdin;
1	1	Galeria	/cemese/galery	1	Galeria	G
2	1	Entrada	/cemese/posts	2	Entradas	E
\.


--
-- Name: menus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cemese_user
--

SELECT pg_catalog.setval('public.menus_id_seq', 2, true);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: cemese_user
--

COPY public.posts (id, title, text, friendly_url, create_at) FROM stdin;
25	No Te Marches (Potencia)	<p>No dejare que te marches de aquí</p><p>ahora qe estas a mi lado</p><p>no volvere a sufrir por no quidar tu amor</p><p>he sufrido tanto</p><p>estando lejos te ti</p><p>qe aora qe tu estas aqi</p><p>no dejare qe te marches jamas de mi</p><p>porque eres mi sol pq eres mi amor</p><p>mi mejor cancion</p><p>porque si no estas yo no se qien soi</p><p>eso siente mi corazon</p><p>nunca te marches</p><p>qedate a mi lado</p><p>tu si eres mi reina</p><p>yo tu esclavo hooooo!</p><p>nunca te marches qedate a mi lado</p><p>tu si eres mi reina</p><p>yo tu esclavooo</p><p>hoooo mi amooooor!</p><p>nananananana!</p><p>no dejare qe te marches de aqi</p><p>aora qe estas a mi lado</p><p>no volvere a sufrir</p><p>por no quidarte amooor</p><p>nunca te marches</p><p>qedate a mi lado</p><p>tu si eres mi reina</p><p>yo tu esclavoooo</p><p>heeeee</p><p>nunca de marches</p><p>qedate a mi lado</p><p>tu si eres mi reina</p><p>yo tu esclavooo</p><p>hoooo mi amoooor!</p>	no-te-marches-potencia	2019-01-20 02:51:35.103
27	Atento	<p><img src="/cemese/display/image?filename=57706a5940c718df5e6018e0a9fbb5e4&amp;mimetype=image%2Fpng"></p>	atento	2019-01-20 03:40:28.222
66	asd	<p><img src="/cemese/display/image?filename=c1d34dab30e7d5d62e7c72c85d17a365&amp;mimetype=image%2Fpng"></p>	1	2019-01-22 00:53:05.685
64	ePALE	<p><img src="/cemese/display/image?filename=c1d34dab30e7d5d62e7c72c85d17a365&amp;mimetype=image%2Fpng">ASDASD</p><p>AS</p><p>AS</p><p>D</p><p>ASD</p><p>ASD</p><p>ASD</p><p>ASD</p><p>A</p><p>S</p>	asdasd-as-as-d-asd-asd-asd-asd-a-1	2019-01-21 01:54:49.77
26	Pedacito de mi vida (Pedrina y Rio)	<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/d3vwOTrnJts"></iframe><p><br></p><p><br></p><p><br></p><p>No puede vivir sin ti</p><p>mi angustiado corazón</p><p>Toditas las noches cariñito</p><p>me la paso en vela mi amor</p><p>en ti pensando y por ti sufriendo</p><p>Vuelve pedacito de mi vida</p><p>yo te lo suplico por Dios,</p><p>no hagas desdichado a mi corazón.</p><p>Que vacío hay en mi alma</p><p>que amargura en mi existir</p><p>Siento que me haces falta</p><p>yo no sé sin ti vivir</p><p>Toditas las noches cariñito</p><p>me la paso en vela mi amor</p><p>en ti pensando y por ti sufriendo</p><p>Vuelve pedacito de mi vida</p><p>yo te lo suplico por Dios,</p><p>no hagas desdichado a mi corazón.</p><p>No puede vivir sin ti</p><p>mi angustiado corazón</p><p>Toditas las noches cariñito</p><p>me la paso en vela mi amor</p><p>en ti pensando y por ti sufriendo</p><p>Vuelve pedacito de mi vida</p><p>yo te lo suplico por Dios,</p><p>no hagas desdichado a mi corazón.</p><p>Que vacío hay en mi alma</p><p>que amargura en mi exsitir</p><p>siento que me haces falta</p><p>yo no se sin ti vivir</p><p>Toditas las noches cariñito</p><p>me la paso en vela mi amor</p><p>en ti pensando y por ti sufriendo</p><p>Vuelve pedacito de mi vida</p><p>yo te lo suplico por Dios,</p><p>no hagas desdichado a mi corazón.</p><p><img src="/cemese/display/image?filename=26f41a989c764d8203410a1090d11fd0&amp;mimetype=image%2Fjpeg"></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/yhIop99m1gs"></iframe><p><br></p>	pedacito-de-mi-vida-pedrina-y-rio	2019-01-20 03:09:38.587
28	La parabólica (La Sonora Dinamita)	<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/s37GxC9Xho8"></iframe><p><br></p><p><br></p><p>Yo a ti te comparo&nbsp;</p><p>Con una antena parabolica&nbsp;</p><p>Con una antena parabolica&nbsp;</p><p>Bolica bolica bolica bolica</p><p><br></p><p>Que se le meten las señales&nbsp;</p><p>Por toditos los canales&nbsp;</p><p>Por toditos los canales&nbsp;</p><p>Canales canales canales canales</p><p><br></p><p>A ti te gustan las peliculas&nbsp;</p><p>Y todo lo que esta de moda&nbsp;</p><p>A ti te gustan las peliculas&nbsp;</p><p>La moda, la rumba, la rumba y el son</p><p><br></p><p>A ti te gusta lo exitante&nbsp;</p><p>Y todo lo exuberante&nbsp;</p><p>A ti te gusta la cumbia&nbsp;</p><p>La rumba, la conga y el jazz</p><p><br></p><p>La parabolica la parabolica&nbsp;</p><p>La parabolica la parabolica&nbsp;</p><p>La parabolica la parabolica&nbsp;</p><p>La parabolica la parabolica</p><p>Yo a ti te comparo&nbsp;</p><p>Con una antena parabolica&nbsp;</p><p>Con una antena parabolica&nbsp;</p><p>Bolica bolica bolica bolica</p><p>Que se le meten las señales&nbsp;</p><p>Por toditos los canales&nbsp;</p><p>Por toditos los canales&nbsp;</p><p>Canales canales canales canales</p><p>La parabolica la parabolica&nbsp;</p><p>La parabolica la parabolica&nbsp;</p><p>La parabolica la parabolica&nbsp;</p><p>La parabolica la parabolica</p><p>Ponte a practicar&nbsp;</p><p>El drama del amor&nbsp;</p><p>El drama del amor</p><p>Debes de bailar&nbsp;</p><p>La cumbia salsa y rock&nbsp;</p><p>La cumbia salsa y rock</p><p>La parabolica la parabolica&nbsp;</p><p>La parabolica la parabolica&nbsp;</p><p>La parabolica la parabolica&nbsp;</p><p>La parabolica la parabolica</p><p>Compositores: Isaac Villanueva Mendoza</p><p>Letra de La parabólica © Universal Music Publishing Group</p>	la-parabolica-la-sonora-dinamita	2019-01-20 03:46:30.757
\.


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cemese_user
--

SELECT pg_catalog.setval('public.posts_id_seq', 66, true);


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: cemese_user
--

COPY public.role (role_id, role_name) FROM stdin;
1	ADMIN
2	READ_ONLY
\.


--
-- Name: role_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cemese_user
--

SELECT pg_catalog.setval('public.role_role_id_seq', 1, false);


--
-- Name: account account_email_key; Type: CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_email_key UNIQUE (email);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (user_id);


--
-- Name: account_role account_role_pkey; Type: CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT account_role_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: account account_username_key; Type: CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_username_key UNIQUE (username);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: menus menus_pkey; Type: CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pkey PRIMARY KEY (id);


--
-- Name: posts post_pkey; Type: CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- Name: role role_role_name_key; Type: CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_role_name_key UNIQUE (role_name);


--
-- Name: account_role account_role_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT account_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(role_id);


--
-- Name: account_role account_role_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cemese_user
--

ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT account_role_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.account(user_id);


--
-- PostgreSQL database dump complete
--

