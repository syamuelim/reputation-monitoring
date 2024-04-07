DROP TABLE IF EXISTS 'users';
CREATE TABLE 'users' (
  'id' integer primary key,
  'username' VARCHAR(128),
  'role' varchar,
  'created_at' timestamp
);


DROP TABLE IF EXISTS 'kol';
CREATE TABLE 'kol' (
  'id' integer primary key,
  'name' varchar(128),
  'other_name' varchar(128),
  'youtube_id' integer ,
  'instagram_id' integer 
);

DROP TABLE IF EXISTS 'reputation';
CREATE TABLE reputation (
  id INTEGER PRIMARY KEY,
  kol_id INTEGER,
  rating DECIMAL(9,2),
  rating_attribute_id INTEGER,
  status VARCHAR(128),
  reputation_at TIMESTAMP,
  created_at TIMESTAMP
);

DROP TABLE IF EXISTS 'youtube_channel';
CREATE TABLE 'youtube_channel' (
  'id' integer primary key,
  'kol_id' integer,
  'channel_id' varchar(128),
  'channel_name' varchar(128),
  'followers' integer,
  'video_published' integer
);

DROP TABLE IF EXISTS 'youtube_video' ;
CREATE TABLE 'youtube_video' (
  'id' integer primary key,
  'channel_id' integer,
  'event_id' integer,
  'video_name' varchar(128),
  'likes' integer,
  'dislike' integer,
  'views' integer,
  'created_at' timestamp
);

DROP TABLE IF EXISTS 'instagram';
CREATE TABLE 'instagram' (
  'id' integer primary key,
  'kol_id' integer,
  'instagram_user_id' varchar(128),
  'name' varchar(128),
  'business_type' varchar(128),
  'posts' integer,
  'followers' integer
);

DROP TABLE IF EXISTS 'instagram_post';
CREATE TABLE 'instagram_post' (
  'id' integer primary key,
  'post_id' varchar(128),
  'media_url' varchar(1000),
  'comments_count' integer,
  'event_id' integer,
  'instagram_id' int,
  'content' text,
  'likes' integer,
  'hashtag' varchar(128),
  'created_at' timestamp
);

DROP TABLE IF EXISTS 'comment';
CREATE TABLE 'comment' (
  'id' integer primary key,
  'media_id' integer,
  'media_type_id' integer,
  'content' text,
  'comment_attribute_id' integer,
  'likes' integer,
  'dislike' integer,
  'created_at' timestamp
);

DROP TABLE IF EXISTS 'event';
CREATE TABLE 'event' (
  'id' integer primary key,
  'name' varchar(128)
);

DROP TABLE IF EXISTS config.'attribute';
CREATE TABLE config.'attribute' (
  'id' integer primary key,
  'description' VARCHAR (128)
);

DROP TABLE IF EXISTS config.'media_type';
CREATE TABLE config.'media_type' (
  'id' integer primary key,
  'is_youtube' boolean,
  'is_instagram' boolean,
  'description' VARCHAR (128)
);

DROP TABLE IF EXISTS 'session';
CREATE TABLE 'session' (
  'id' integer primary key,
  'session' varchar(128),
  'user_name' varchar(128),
  'expired_datetime' timestamp
);

DROP TABLE IF EXISTS 'watching';
CREATE TABLE 'watching' (
  'id' integer primary key,
  'session_id' integer,
  'kol_id' integer
);

INSERT INTO public.kol
(id, 'name', other_name, youtube_id, instagram_id)
VALUES(1, 'kol_1', 'kol_1a', 1, 1);

INSERT INTO public.youtube_channel
(id, kol_id, channel_id, channel_name, followers, video_published)
VALUES(1, 1, NULL, 'channel one', 10, 100);

INSERT INTO public.youtube_video
(id, channel_id, event_id, video_name, likes, dislike, 'views', created_at)
VALUES(1, 1, NULL, 'first video', 100, 60, 160, NULL);
INSERT INTO public.youtube_video
(id, channel_id, event_id, video_name, likes, dislike, 'views', created_at)
VALUES(2, 1, NULL, 'second video', 200, 40, 240, NULL);

-- reputation
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(1, 1, 5, 'ACTIVE', now(), '2023-01-01T00:00:00');

INSERT INTO public.reputation
(id, kol_id, rating, status, created_at , reputation_at)
VALUES(2, 1, 1, 'ACTIVE', now(), '2023-02-01T00:00:00');

INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(3, 1, 3, 'ACTIVE', now(), '2023-03-01T00:00:00');

INSERT INTO public.reputation
(id, kol_id, rating, status, created_at , reputation_at)
VALUES(4, 1, 2, 'ACTIVE', now(), '2023-04-01T00:00:00');

INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(5, 1, 4, 'ACTIVE', now(), '2023-05-01T00:00:00');

INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(6, 1, 4, 'ACTIVE', now(), '2023-06-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(7, 1, 2, 'ACTIVE', now(), '2023-07-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(8, 1, 3, 'ACTIVE', now(), '2023-08-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(9, 1, 1, 'ACTIVE', now(), '2023-09-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(10, 1, 5, 'ACTIVE', now(), '2023-10-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(11, 1, 5, 'ACTIVE', now(), '2023-11-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(12, 1, 3, 'ACTIVE', now(), '2023-12-01T00:00:00');


INSERT INTO public.reputation
(id, kol_id, rating, status, created_at , reputation_at)
VALUES(14, 54, 2, 'ACTIVE', now(), '2023-02-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(15, 54, 5, 'ACTIVE', now(), '2023-03-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at , reputation_at)
VALUES(16, 54, 3, 'ACTIVE', now(), '2023-04-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(17, 54, 4, 'ACTIVE', now(), '2023-05-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(18, 54, 5, 'ACTIVE', now(), '2023-06-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(19, 54, 5, 'ACTIVE', now(), '2023-07-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(20, 54, 4, 'ACTIVE', now(), '2023-08-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(21, 54, 5, 'ACTIVE', now(), '2023-09-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(22, 54, 2, 'ACTIVE', now(), '2023-10-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(23, 54, 2, 'ACTIVE', now(), '2023-11-01T00:00:00');
INSERT INTO public.reputation
(id, kol_id, rating, status, created_at, reputation_at)
VALUES(24, 54, 1, 'ACTIVE', now(), '2023-12-01T00:00:00');

INSERT INTO public.instagram
(id, kol_id, instagram_user_id, name, posts, followers)
VALUES(1, 54, 12281817, 'kyliejenner', now(), '6896', '398996545');

INSERT INTO public.instagram_post
( id, post_id, instagram_id, content, likes, created_at, comments_count, media_url)
VALUES( 1, '18026762923768321', 1, 'our 2 for $22 lip single valentine sale is happening NOW! kyliecosmetics \nhere’s my favorite new juicy lip combo 💦\n🤍 Precision Pout Lip Liner shade ‘Cinnamon’\n🤍 Tinted Butter Balm shade ‘Love That 4 U’\n🤍 Gloss Drip shade ‘Playfully Pink’', '748450', '2024-02-13T18:54:16+0000', 2642, null);
INSERT INTO public.instagram_post
( id,post_id, instagram_id, content, likes, created_at, comments_count, media_url)
VALUES(2, '18076133575412615', 1, 'starting my monday right alo', '3249782', '2024-02-12T15:35:59+0000', 6272, 'https://scontent.cdninstagram.com/v/t51.29350-15/426144312_1040089973755831_610218993483383279_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=18de74&_nc_ohc=DF3iOFG1Ri4AX_fTiYQ&_nc_oc=AQkxGlpZ3QJSApj2tWre80P5tm0ggMPDMdR1XZWJFsfcdyol3HMqqQSX0cPrPSnSBmo&_nc_ht=scontent.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AfAwrccCQBJKAQYIqG70E_fZFhtXk9buIGuaq1rGjtbVSg&oe=65D16015');
INSERT INTO public.instagram_post
( id,post_id, instagram_id, content, likes, created_at, comments_count, media_url)
VALUES(3, '18002198576182675', 1, 'my new lip butter just dropped in a yummy vanilla caramel flavor and the results are in! this silky formula provides moisture for up to 24 hours!!! It has skincare ingredients like shea butter, jojoba seed oil, and cloudberry seed oil. our new lip butter is formulated with a moisture barrier complex that protects your lip barrier and improves dry and chapped lips. available now on kylieskin.com kylieskin', '1080177', '2024-02-11T04:34:08+0000', 2260, 'https://scontent.cdninstagram.com/v/t51.29350-15/425943494_1135247590749978_5175804932678144512_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=18de74&_nc_ohc=Gpk1M5O2a-UAX_FqOdy&_nc_ht=scontent.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AfBWCkLU4ntxo6eQRB1msvZuTh6Z0Q52DYiugNlXa-pVkg&oe=65D10C65');
INSERT INTO public.instagram_post
( id,post_id, instagram_id, content, likes, created_at, comments_count, media_url)
VALUES( 4,'17940086444688366', 1, 'peachy glam using kyliecosmetics 🫶🏻🫶🏻🍑\n🤍 kylieskin Lip Butter \n🤍 Power Plush Foundation shade 4.5c \n🤍 Power Plush Concealer shade 4.5WN\n🤍 Glow Balm shade ‘doin the most’\n🤍 Kendall & Kylie eyeshadow palette\n🤍 Precision Pout Lip Liner shade ‘cappuccino’\n🤍 Matte Lip shade ‘dirty peach’\n🤍 High Gloss shade ‘one in a billion’', '2461871', '2024-02-11T03:29:03+0000', 8376, null);

INSERT INTO public.instagram_post
( id,post_id, instagram_id, content, likes, created_at, comments_count, media_url)
VALUES(5, '18008135279253365', 1, '🫶🏻🫶🏻', '4589641', '2024-02-10T00:46:56+0000', 10835, 'https://scontent.cdninstagram.com/v/t51.29350-15/426230381_399564329419178_3420469731240209928_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=18de74&_nc_ohc=Bln8M0bcc5UAX9Lvjn_&_nc_ht=scontent.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AfAs3qzGI4cLg0JHHvL-MyfOTUC0_haPqZIjeowq5Vh-nQ&oe=65D204EE');

INSERT INTO public.instagram_post
(id, post_id, instagram_id, content, likes, created_at, comments_count, media_url)
VALUES( 6,'17919612206779630', 1, 'kris jenner is quaking', '3950663', '2024-02-09T22:30:05+0000', 12548, 'https://scontent.cdninstagram.com/v/t51.29350-15/426064399_769419878401709_6841881175653310224_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=18de74&_nc_ohc=EhHYxatZSFsAX8u60jh&_nc_ht=scontent.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AfBQgM0VPO_056wCHrh7EnwM5k0WHKOcGpkvNfCuJnrxYg&oe=65D191B0');
