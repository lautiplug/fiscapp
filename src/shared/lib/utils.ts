export const formatDate = (date: Date, locale = 'es-AR'): string => {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export const getGreetingByHour = (hour: number): string => {
  if (hour >= 6 && hour < 12) {
    return "Buenos días"
  } else if (hour >= 12 && hour < 19) {
    return "Buenas tardes"
  } else {
    return "Buenas noches"
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // Additional check to prevent consecutive dots
  if (email.includes('..')) return false
  return emailRegex.test(email)
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '...'
}

export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}