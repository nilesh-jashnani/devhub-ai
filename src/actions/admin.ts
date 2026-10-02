"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/prisma/db";
import { isAdmin } from "@/lib/auth-helper";

import {
  updateNotePublishedSchema,
  updateUserRoleSchema,
} from "@/lib/validations/admin";

export async function updateUserRole(formData: FormData) {
  const session = await isAdmin();

  const parsed = updateUserRoleSchema.safeParse({
    userId: formData.get("userId"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    console.error("Invalid role update:", parsed.error.flatten());
    return;
  }

  const { userId, role } = parsed.data;

  if (userId === session.user.id) {
    return;
  }

  const user = await db.orm.public.User.first({
    id: userId,
  });

  if (!user) {
    return;
  }

  await db.orm.public.User.where({
    id: userId,
  }).update({
    role,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/users");
}

export async function updateNotePublished(formData: FormData) {
  await isAdmin();

  const parsed = updateNotePublishedSchema.safeParse({
      noteId: formData.get("noteId"),
      published: formData.get("published"),
    });

  if (!parsed.success) {
    console.error("Invalid publish update:", parsed.error.flatten());
    return;
  }

  const { noteId, published } = parsed.data;

  const note = await db.orm.public.Note.first({
    id: noteId,
  });

  if (!note) {
    console.error(
      "Note not found while updating publication status:",
      noteId,
    );
    return;
  }

  const shouldPublish = published === "true";

  await db.orm.public.Note.where({
    id: noteId,
  }).update({
    published: shouldPublish,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/notes");

  revalidatePath("/learn");
  revalidatePath(`/learn/${note.slug}`);
}
