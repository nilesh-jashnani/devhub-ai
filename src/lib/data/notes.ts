import { db } from "@/prisma/db";

export async function getNotes() {
  return db.orm.public.Note.all();
}

export async function getNoteBySlug(slug: string) {
  return db.orm.public.Note.first({
    slug,
  });
}
