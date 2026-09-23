import { db } from "@/prisma/db";

export async function getUsers() {
  return db.orm.public.User.all();
}

export async function getUserByEmail(email: string) {
  return db.orm.public.User.first({
    email,
  });
}

export async function getUserById(id: string) {
  return db.orm.public.User.first({
    id,
  });
}
