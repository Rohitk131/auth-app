import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { connect } from 'http2';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectToDatabase = async () => {};