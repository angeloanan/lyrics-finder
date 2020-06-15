import { safeTrim } from '../utils/safeTrim'

test('Safe Trim - Undefined', () => {
  const a = undefined
  const text = safeTrim(a, '\u200B')

  expect(text).toBe('\u200B')
})

test('Safe Trim - null', () => {
  const a = null
  const text = safeTrim(a, '\u200B')

  expect(text).toBe('\u200B')
})

test('Safe Trim - NewLine', () => {
  const text = safeTrim('\n', '\u200B')

  expect(text).toBe('\u200B')
})

test('Safe Trim - Text', () => {
  const text = safeTrim('\nThis is some text!\n', '\u200B')

  expect(text).toBe('This is some text!')
})
