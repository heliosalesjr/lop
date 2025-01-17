"use server";
import { signIn, signOut } from '@/app/auth'

export const login = async () => {
  await signIn("github");
}

export const logout = async () => {
  await signOut();
}

