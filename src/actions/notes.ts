"use server";

import { auth } from "@/auth";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { noteSchema } from "@/lib/validations/notes";

export async function createNote(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  const result = noteSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? "Invalid note.");
  }

  const { title, content } = result.data;

  const createdSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  let slug = createdSlug;
  const existingNote = await db.orm.public.Note.first({
    slug,
  });

  if (existingNote) {
    slug = `${createdSlug}-${Date.now()}`;
  }

  const note = await db.orm.public.Note.create({
    title,
    slug,
    content,
    authorId: session.user.id,
  });

  revalidatePath(`/dashboard/notes/${note.slug}`);
  redirect(`/dashboard/notes/${note.slug}`);
}

export async function updateNote(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  const noteId = String(formData.get("noteId") ?? "");

  if (!noteId) {
    throw new Error("Note ID is required.");
  }

  const result = noteSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? "Invalid note.");
  }

  const { title, content } = result.data;

  const note = await db.orm.public.Note.first({
    id: noteId,
    authorId: session.user.id,
  });

  if (!note) {
    throw new Error("Note not found.");
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  await db.orm.public.Note.where({
    id: noteId,
    authorId: session.user.id,
  }).update({
    title,
    slug,
    content,
  });

  revalidatePath(`/dashboard/notes/${slug}`);
  redirect(`/dashboard/notes/${slug}`);
}

export async function deleteNote(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const noteId = String(formData.get("noteId") ?? "");

  if (!noteId) {
    throw new Error("Note ID is required.");
  }

  await db.orm.public.Note.where({
    id: noteId,
    authorId: session.user.id,
  }).delete();

  redirect("/dashboard/notes");
}

export async function toggleBookmark(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const noteId = String(formData.get("noteId") ?? "");

  if (!noteId) {
    throw new Error("Note ID is required.");
  }

  const note = await db.orm.public.Note.first({
    id: noteId,
  });

  if (!note) {
    throw new Error("Note not found.");
  }

  const existingBookmark = await db.orm.public.Bookmark.first({
    userId: session.user.id,
    noteId,
  });

  if (existingBookmark) {
    await db.orm.public.Bookmark.where({
      id: existingBookmark.id,
      userId: session.user.id,
    }).delete();
  } else {
    await db.orm.public.Bookmark.create({
      userId: session.user.id,
      noteId,
    });
  }

  redirect(`/dashboard/notes/${note.slug}`);
}
