"use server";

import bcrypt from "bcryptjs";

import { db } from "@/prisma/db";
import { signOut } from "@/auth";

export async function registerUser(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return {
      error: "All fields are required.",
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters.",
    };
  }

  const existingUser = await db.orm.public.User.first({
    email,
  });

  if (existingUser) {
    return {
      error: "An account with this email already exists.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.orm.public.User.create({
    name,
    email,
    passwordHash,
    role: "USER",
  });

  return {
    success: true,
    message: "User created successfully",
  };
}

export async function logout() {
  await signOut({
    redirectTo: "/login",
  });
}
