DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  "id" serial primary key,
  "username" VARCHAR(128),
  "role" varchar,
  "created_at" timestamp
);


DROP TABLE IF EXISTS "kol";
CREATE TABLE "kol" (
  "id" serial primary key,
  "name" varchar(128),
  "other_name" varchar(128),
  "youtube_id" integer,
  "instagram_id" integer
);

DROP TABLE IF EXISTS "reputation";
CREATE TABLE "reputation" (
  "id" serial primary key,
  "kol_id" integer,
  "rating" decimal(9,2),
  "rating_attribute_id" integer,
  "status" varchar(128),
  "created_at" timestamp
);

DROP TABLE IF EXISTS "youtube_channel";
CREATE TABLE "youtube_channel" (
  "id" serial primary key,
  "kol_id" integer,
  "channel_id" varchar(128),
  "channel_name" varchar(128),
  "followers" integer,
  "video_published" integer
);

DROP TABLE IF EXISTS "youtube_video" ;
CREATE TABLE "youtube_video" (
  "id" serial primary key,
  "channel_id" integer,
  "event_id" integer,
  "video_name" varchar(128),
  "likes" integer,
  "dislike" integer,
  "views" integer,
  "created_at" timestamp
);

DROP TABLE IF EXISTS "instagram";
CREATE TABLE "instagram" (
  "id" serial primary key,
  "kol_id" integer,
  "instagram_user_id" varchar(128),
  "name" varchar(128),
  "business_type" varchar(128),
  "posts" integer,
  "followers" integer
);

DROP TABLE IF EXISTS "instagram_post";
CREATE TABLE "instagram_post" (
  "id" serial primary key,
  "post_id" varchar(128),
  "event_id" integer,
  "instagram_id" int,
  "content" text,
  "likes" integer,
  "hashtag" varchar(128),
  "created_at" timestamp
);

DROP TABLE IF EXISTS "comment";
CREATE TABLE "comment" (
  "id" serial primary key,
  "media_id" integer,
  "media_type_id" integer,
  "content" text,
  "comment_attribute_id" integer,
  "likes" integer,
  "dislike" integer,
  "created_at" timestamp
);

DROP TABLE IF EXISTS "event";
CREATE TABLE "event" (
  "id" serial primary key,
  "name" varchar(128)
);

DROP TABLE IF EXISTS config."attribute";
CREATE TABLE config."attribute" (
  "id" serial primary key,
  "description" VARCHAR (128)
);

DROP TABLE IF EXISTS config."media_type";
CREATE TABLE config."media_type" (
  "id" serial primary key,
  "is_youtube" boolean,
  "is_instagram" boolean,
  "description" VARCHAR (128)
);


