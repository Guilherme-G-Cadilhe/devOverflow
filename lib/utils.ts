import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimesamp = (createdAt: Date): string => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdAt.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years >= 1) {
    return `${years} Year${years > 1 ? "s" : ""} ago`;
  } else if (months >= 1) {
    return `${months} Month${months > 1 ? "s" : ""} ago`;
  } else if (weeks >= 1) {
    return `${weeks} Week${weeks > 1 ? "s" : ""} ago`;
  } else if (days >= 1) {
    return `${days} Day${days > 1 ? "s" : ""} ago`;
  } else if (hours >= 1) {
    return `${hours} Hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} Minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} Second${seconds > 1 ? "s" : ""} ago`;
  }
};

export const formatNumberWithExtension = (number: number): string => {
  if (number >= 1000000) {
    // For numbers in millions, round to one decimal place
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    // For numbers above 10,000 and below a million, round to the nearest thousand
    return Math.round(number / 1000) + "K";
  } else {
    // For smaller numbers, no extension needed
    return number.toString();
  }
};
