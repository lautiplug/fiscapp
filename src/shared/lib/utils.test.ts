import { describe, it, expect } from 'vitest'
import { formatDate, getGreetingByHour, validateEmail, truncateText, capitalize } from './utils'

describe('formatDate', () => {
  it('formats date correctly with default locale', () => {
    const date = new Date('2025-01-15T12:00:00.000Z')
    const formatted = formatDate(date)
    expect(formatted).toMatch(/15\/01\/2025/)
  })

  it('formats date correctly with custom locale', () => {
    const date = new Date('2025-01-15T12:00:00.000Z')
    const formatted = formatDate(date, 'en-US')
    expect(formatted).toMatch(/01\/15\/2025/)
  })
})

describe('getGreetingByHour', () => {
  it('returns morning greeting for hours 6-11', () => {
    expect(getGreetingByHour(6)).toBe('Buenos días')
    expect(getGreetingByHour(9)).toBe('Buenos días')
    expect(getGreetingByHour(11)).toBe('Buenos días')
  })

  it('returns afternoon greeting for hours 12-18', () => {
    expect(getGreetingByHour(12)).toBe('Buenas tardes')
    expect(getGreetingByHour(15)).toBe('Buenas tardes')
    expect(getGreetingByHour(18)).toBe('Buenas tardes')
  })

  it('returns night greeting for hours 19-23 and 0-5', () => {
    expect(getGreetingByHour(19)).toBe('Buenas noches')
    expect(getGreetingByHour(23)).toBe('Buenas noches')
    expect(getGreetingByHour(0)).toBe('Buenas noches')
    expect(getGreetingByHour(5)).toBe('Buenas noches')
  })
})

describe('validateEmail', () => {
  it('validates correct email formats', () => {
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('test.email+tag@domain.co.uk')).toBe(true)
    expect(validateEmail('firstname.lastname@company.org')).toBe(true)
  })

  it('rejects invalid email formats', () => {
    expect(validateEmail('invalid-email')).toBe(false)
    expect(validateEmail('user@')).toBe(false)
    expect(validateEmail('@domain.com')).toBe(false)
    expect(validateEmail('user..name@domain.com')).toBe(false)
    expect(validateEmail('')).toBe(false)
  })
})

describe('truncateText', () => {
  it('returns original text if within maxLength', () => {
    expect(truncateText('Hello', 10)).toBe('Hello')
    expect(truncateText('Short', 5)).toBe('Short')
  })

  it('truncates text when exceeding maxLength', () => {
    expect(truncateText('This is a long text', 10)).toBe('This is a ...')
    expect(truncateText('Hello World!', 5)).toBe('Hello...')
  })

  it('handles edge cases', () => {
    expect(truncateText('', 5)).toBe('')
    expect(truncateText('Hi', 2)).toBe('Hi')
    expect(truncateText('Hey', 2)).toBe('He...')
  })
})

describe('capitalize', () => {
  it('capitalizes first letter and lowercases the rest', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('WORLD')).toBe('World')
    expect(capitalize('hELLo WoRLd')).toBe('Hello world')
  })

  it('handles edge cases', () => {
    expect(capitalize('')).toBe('')
    expect(capitalize('h')).toBe('H')
    expect(capitalize('H')).toBe('H')
  })
})