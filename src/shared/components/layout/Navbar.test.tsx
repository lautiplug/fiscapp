import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './Navbar'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock the SVG imports
vi.mock('../../../icons/svg/notifications.svg?react', () => ({
  default: () => <div data-testid="notifications-icon">Notifications</div>
}))

vi.mock('../../../icons/svg/profile.svg?react', () => ({
  default: () => <div data-testid="profile-icon">Profile</div>
}))

// Helper to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  beforeEach(() => {
    // Mock current time for consistent tests
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders greeting message', () => {
    renderWithRouter(<Navbar />)
    
    expect(screen.getByText(/Buenos días|Buenas tardes|Buenas noches/, { exact: false })).toBeInTheDocument()
  })

  it('displays current time and date', () => {
    // Set a specific date for testing
    vi.setSystemTime(new Date('2025-01-15 10:30:00'))
    
    renderWithRouter(<Navbar />)
    
    expect(screen.getByText(/Son las/)).toBeInTheDocument()
    expect(screen.getByText(/del/)).toBeInTheDocument()
  })

  it('shows correct greeting based on time of day', () => {
    // Test morning greeting
    vi.setSystemTime(new Date('2025-01-15 09:00:00'))
    renderWithRouter(<Navbar />)
    expect(screen.getByText('Buenos días, Emir.')).toBeInTheDocument()
    
    // Clean up and test afternoon
    screen.getByText('Buenos días, Emir.').remove
    vi.setSystemTime(new Date('2025-01-15 15:00:00'))
    renderWithRouter(<Navbar />)
    expect(screen.getByText('Buenas tardes, Emir.')).toBeInTheDocument()
  })

  it('renders navigation icons', () => {
    renderWithRouter(<Navbar />)
    
    expect(screen.getByTestId('notifications-icon')).toBeInTheDocument()
    expect(screen.getByTestId('profile-icon')).toBeInTheDocument()
  })

  it('has link to profile page', () => {
    renderWithRouter(<Navbar />)
    
    const profileLink = screen.getByRole('link')
    expect(profileLink).toHaveAttribute('href', '/perfil')
  })
})