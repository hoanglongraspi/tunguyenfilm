import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts Google Drive sharing links to embed format for video display
 * Handles various Google Drive URL formats and converts them to preview URLs
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return url;

  // If it's already a preview URL, return as-is
  if (url.includes('/preview')) {
    return url;
  }

  // Regular expressions to match different Google Drive URL formats
  const patterns = [
    // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/,
    // https://drive.google.com/open?id=FILE_ID
    /https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
    // https://drive.google.com/file/d/FILE_ID/edit
    /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/edit/,
    // https://drive.google.com/file/d/FILE_ID (without additional parameters)
    /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/
  ];

  // Try each pattern to extract the file ID
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }

  // If no pattern matches, return the original URL
  return url;
}

/**
 * Checks if a URL is a Google Drive link
 */
export function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com');
}

/**
 * Validates if a Google Drive URL is in the correct embed format
 */
export function isValidGoogleDriveEmbedUrl(url: string): boolean {
  return isGoogleDriveUrl(url) && url.includes('/preview');
}
