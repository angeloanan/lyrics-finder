/**
 * Trims text safely, taking care of `undefined`
 * @param text Text to trim safely
 * @param replacer Replaced text when undefined
 */
export function safeTrim(text: unknown, replacer: string): string {
  // Check if undefined, null or empty string
  if (!text) {
    return replacer
  }

  // Trim and check if empty (Newlines get trimmed)
  const trimmedText = (text as string).trim()
  if (trimmedText === '') {
    return replacer
  }

  return trimmedText
}
