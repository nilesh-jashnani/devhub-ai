import { redirect } from "next/navigation";

import { auth } from "@/auth";

export async function isUser() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return session;
}

export async function isAdmin() {
  const session = await isUser();

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return session;
}
