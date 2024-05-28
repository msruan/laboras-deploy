import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomToken = () => {
  return crypto.randomBytes(16).toString("hex"); // Gera uma string hexadecimal de 32 caracteres
};