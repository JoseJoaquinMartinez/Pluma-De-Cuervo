-- AlterTable
CREATE SEQUENCE chapter_chapternumber_seq;
ALTER TABLE "Chapter" ALTER COLUMN "chapterNumber" SET DEFAULT nextval('chapter_chapternumber_seq');
ALTER SEQUENCE chapter_chapternumber_seq OWNED BY "Chapter"."chapterNumber";
