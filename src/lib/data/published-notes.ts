import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/prisma/db";

export async function getPublishedNotes() {
  "use cache";

  cacheLife("hours");
  cacheTag("published-notes");

  return db.orm.public.Note.where({
    published: true,
  })
    .orderBy((note) => note.createdAt.desc())
    .all();
}

export async function getPublishedNote(slug: string) {
  "use cache";

  cacheLife("hours");

  cacheTag("published-notes");
  cacheTag(`published-note-${slug}`);

  return db.orm.public.Note.first({
    slug,
    published: true,
  });
}
