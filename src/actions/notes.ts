"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/prisma/db";

import {
  noteIdSchema,
  noteSchema,
  updateNoteSchema,
} from "@/lib/validations/notes";

export type NoteActionState = {
  errors?: {
    title?: string[];
    content?: string[];
    noteId?: string[];
  };

  values?: {
    title?: string;
    content?: string;
  };

  message?: string;
};

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createUniqueSlug(title: string, currentNoteId?: string) {
  const baseSlug = createSlug(title) || "note";

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingNote = await db.orm.public.Note.first({
      slug,
    });

    if (!existingNote || existingNote.id === currentNoteId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

export async function createNote(
  _previousState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const rawTitle = formData.get("title");

  const rawContent = formData.get("content");

  const result = noteSchema.safeParse({
    title: rawTitle,
    content: rawContent,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,

      values: {
        title: typeof rawTitle === "string" ? rawTitle : "",

        content: typeof rawContent === "string" ? rawContent : "",
      },
    };
  }

  const { title, content } = result.data;

  try {
    const slug = await createUniqueSlug(title);

    const note = await db.orm.public.Note.create({
      title,
      slug,
      content,
      authorId: session.user.id,
    });

    revalidatePath("/dashboard/notes");

    revalidatePath("/dashboard");

    redirect(`/dashboard/notes/${note.slug}`);
  } catch (error) {
    throw error;
  }
}

export async function updateNote(
  _previousState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const rawNoteId = formData.get("noteId");

  const rawTitle = formData.get("title");

  const rawContent = formData.get("content");

  const result = updateNoteSchema.safeParse({
    noteId: rawNoteId,
    title: rawTitle,
    content: rawContent,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,

      values: {
        title: typeof rawTitle === "string" ? rawTitle : "",

        content: typeof rawContent === "string" ? rawContent : "",
      },
    };
  }

  const { noteId, title, content } = result.data;

  const note = await db.orm.public.Note.first({
    id: noteId,
    authorId: session.user.id,
  });

  if (!note) {
    return {
      values: {
        title,
        content,
      },

      message: "Note not found or you do not have permission to edit it.",
    };
  }

  const oldSlug = note.slug;

  try {
    const slug = await createUniqueSlug(title, noteId);

    await db.orm.public.Note.where({
      id: noteId,
      authorId: session.user.id,
    }).update({
      title,
      slug,
      content,
    });

    revalidatePath("/dashboard/notes");

    revalidatePath("/dashboard");

    revalidatePath(`/dashboard/notes/${oldSlug}`);

    revalidatePath(`/dashboard/notes/${slug}`);

    redirect(`/dashboard/notes/${slug}`);
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const result = noteIdSchema.safeParse({
    noteId: formData.get("noteId"),
  });

  if (!result.success) {
    throw new Error("Invalid note ID.");
  }

  const { noteId } = result.data;

  const note = await db.orm.public.Note.first({
    id: noteId,
    authorId: session.user.id,
  });

  if (!note) {
    redirect("/dashboard/notes");
  }

  await db.orm.public.Note.where({
    id: noteId,
    authorId: session.user.id,
  }).delete();

  revalidatePath("/dashboard/notes");

  revalidatePath("/dashboard");

  redirect("/dashboard/notes");
}

export async function toggleBookmark(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const result = noteIdSchema.safeParse({
    noteId: formData.get("noteId"),
  });

  if (!result.success) {
    throw new Error("Invalid note ID.");
  }

  const { noteId } = result.data;

  const note = await db.orm.public.Note.first({
    id: noteId,

    // IMPORTANT:
    // ensure the note belongs to
    // the logged-in user.
    authorId: session.user.id,
  });

  if (!note) {
    redirect("/dashboard/notes");
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

  revalidatePath("/dashboard/bookmarks");

  revalidatePath(`/dashboard/notes/${note.slug}`);

  revalidatePath("/dashboard");

  redirect(`/dashboard/notes/${note.slug}`);
}
