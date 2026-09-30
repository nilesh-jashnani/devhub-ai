"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { db } from "@/prisma/db";
import { signIn, signOut } from "@/auth";
import { loginSchema, registerSchema } from "@/lib/validations/auth";

export type LoginActionState = {
  errors?: {
    email?: string[];
    password?: string[];
  };

  values?: {
    email?: string;
  };

  message?: string;
};

export type RegisterActionState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };

  values?: {
    name?: string;
    email?: string;
  };

  message?: string;
};

export async function loginUser(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const rawEmail = formData.get("email");

  const validatedFields = loginSchema.safeParse({
    email: rawEmail,
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,

      values: {
        email: typeof rawEmail === "string" ? rawEmail : "",
      },
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          values: {
            email,
          },

          message: "Invalid email or password.",
        };
      }

      return {
        values: {
          email,
        },

        message: "Unable to sign in right now. Please try again.",
      };
    }

    throw error;
  }

  return {};
}

export async function registerUser(
  _previousState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const rawName = formData.get("name");

  const rawEmail = formData.get("email");

  const validatedFields = registerSchema.safeParse({
    name: rawName,
    email: rawEmail,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,

      values: {
        name: typeof rawName === "string" ? rawName : "",

        email: typeof rawEmail === "string" ? rawEmail : "",
      },
    };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await db.orm.public.User.first({
    email,
  });

  if (existingUser) {
    return {
      errors: {
        email: ["An account with this email already exists."],
      },

      values: {
        name,
        email,
      },
    };
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    await db.orm.public.User.create({
      name,
      email,
      passwordHash,
      role: "USER",
    });
  } catch (error) {
    console.error("Registration failed:", error);

    return {
      values: {
        name,
        email,
      },

      message: "Unable to create your account right now. Please try again.",
    };
  }

  redirect("/login");
}

export async function logout() {
  await signOut({
    redirectTo: "/login",
  });
}
