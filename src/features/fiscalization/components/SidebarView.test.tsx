import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SidebarView } from './SidebarView'
import { describe, it, expect, vi } from 'vitest'

// Mock all SVG imports
vi.mock('../../../icons/svg/home.svg?react', () => ({
  default: () => <div data-testid="home-icon">Home</div>
}))

vi.mock('../../../icons/svg/mail.svg?react', () => ({
  default: () => <div data-testid="mail-icon">Mail</div>
}))

vi.mock('../../../icons/svg/files.svg?react', () => ({
  default: () => <div data-testid="files-icon">Files</div>
}))

vi.mock('../../../icons/svg/link.svg?react', () => ({
  default: () => <div data-testid="link-icon">Link</div>
}))

vi.mock('../../../icons/svg/logout.svg?react', () => ({
  default: () => <div data-testid="logout-icon">Logout</div>
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('SidebarView', () => {
  it('renders app title', () => {
    renderWithRouter(<SidebarView />)
    
    expect(screen.getByText('fscam')).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    renderWithRouter(<SidebarView />)
    
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Inspecciones')).toBeInTheDocument()
    expect(screen.getByText('Links')).toBeInTheDocument()
  })

  it('renders all navigation icons', () => {
    renderWithRouter(<SidebarView />)
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
    expect(screen.getByTestId('files-icon')).toBeInTheDocument()
    expect(screen.getByTestId('link-icon')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    renderWithRouter(<SidebarView />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
    
    expect(links[0]).toHaveAttribute('href', '/inicio')
    expect(links[1]).toHaveAttribute('href', '/email')
    expect(links[2]).toHaveAttribute('href', '/inspecciones')
    expect(links[3]).toHaveAttribute('href', '/links')
  })

  it('renders logout section', () => {
    renderWithRouter(<SidebarView />)
    
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument()
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument()
  })

  it('applies correct styling structure', () => {
    renderWithRouter(<SidebarView />)
    
    const section = screen.getByText('fscam').closest('section')
    expect(section).toHaveClass('flex', 'flex-col', 'justify-between', 'h-full', 'p-5')
  })
})