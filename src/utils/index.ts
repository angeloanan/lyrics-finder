import tips from '../constants/tips'

export function newError(name: string, message: string): Error {
  const err = new Error(message)
  err.name = name

  return err
}

/**
 * Gets a random whole number.
 * @param min Minimum number (Inclusive)
 * @param max Maximum number (Inclusive)
 */
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Gets a random Bot tips
 */
export const getTips = (): string => {
  const max = tips.length - 1 // Zero based index

  const randomIndex = getRandomInt(0, max)
  return tips[randomIndex]
}

/**
 * Wrap the strings in codeblocks
 * @param input Strings to be wrapped
 */
export function wrapInCodeblocks(input: string[] | string): string {
  let wrappedCode = '```\n'

  if (Array.isArray(input)) {
    wrappedCode += input.join('\n')
  } else {
    wrappedCode += input
  }

  wrappedCode += '```'

  return wrappedCode
}
