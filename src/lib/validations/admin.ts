import { z } from "zod";

export const updateUserRoleSchema = z.object({
    userId: z
        .string()
        .trim()
        .min(1, "User ID is required."),

    role: z.enum([
        "USER",
        "ADMIN",
    ]),
});

export const updateNotePublishedSchema = z.object({
    noteId: z
        .string()
        .trim()
        .min(1, "Note ID is required."),

    published: z.enum([
        "true",
        "false",
    ]),
});