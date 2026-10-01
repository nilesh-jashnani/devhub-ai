import { db } from "@/prisma/db";

export async function getPublishedNotes() {
  return db.orm.public.Note.where({
    published: true,
  })
    .orderBy((note) => note.createdAt.desc())
    .all();
}

export async function getPublishedNote(slug: string) {
  return db.orm.public.Note.first({
    slug,
    published: true,
  });
}
