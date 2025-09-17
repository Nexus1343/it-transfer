import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Consistent number formatting to prevent hydration errors
export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

// Consistent date formatting to prevent hydration errors  
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  });
}
