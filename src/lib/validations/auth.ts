import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Please enter a valid email address.")
        .transform((email) => email.toLowerCase()),

    password: z
        .string()
        .min(1, "Password is required."),
});

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Name is required.")
            .min(2, "Name must contain at least 2 characters.")
            .max(50, "Name cannot exceed 50 characters."),

        email: z
            .string()
            .trim()
            .min(1, "Email is required.")
            .email("Please enter a valid email address.")
            .transform((email) => email.toLowerCase()),

        password: z
            .string()
            .min(1, "Password is required.")
            .min(8, "Password must contain at least 8 characters.")
            .max(128, "Password cannot exceed 128 characters."),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password."),
    })
    .refine(
        ({ password, confirmPassword }) =>
            password === confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        },
    );