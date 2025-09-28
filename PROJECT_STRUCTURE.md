# FiscApp - Project File System Documentation

## Overview
FiscApp is a React TypeScript application for managing enterprise tax inspections, built with Vite, TailwindCSS, and modern React patterns.

## 📁 Root Directory Structure

```
fiscapp/
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── vite.config.ts             # Vite bundler configuration
│   ├── tsconfig.json              # TypeScript root configuration
│   ├── tsconfig.app.json          # TypeScript app-specific config
│   ├── tsconfig.node.json         # TypeScript Node.js config
│   ├── eslint.config.js           # ESLint linting rules
│   ├── components.json            # shadcn/ui components config
│   └── custom.d.ts                # Custom TypeScript declarations
├── 📄 Documentation
│   ├── README.md                  # Project documentation
│   └── REFACTORING.md             # Recent refactoring changes
├── 📄 Data & Assets
│   ├── MOCK_DATA.json             # Mock data for development
│   ├── index.html                 # HTML entry point
│   └── public/                    # Static assets
└── 📁 src/                        # Source code (detailed below)
```

## 📂 Source Code Architecture (`src/`)

### 🏗️ **App Structure** (`src/app/`)
Core application setup and routing configuration:
- `router.tsx` - React Router setup and route definitions
- `layout.tsx` - Root layout component
- `providers.tsx` - Global providers wrapper

### ⚛️ **Main Entry Points**
- `main.tsx` - React app entry point and ReactDOM render
- `App.tsx` - Main application component (providers only)
- `vite-env.d.ts` - Vite environment type definitions

### 🎯 **Feature Modules** (`src/features/`)

#### **Fiscalization Feature** (`src/features/fiscalization/`)
Main inspection management functionality:

**Components:**
- `InspectionsManaging.tsx` - Dashboard with time-based greetings and metrics
- `Table.tsx` - Inspection data table with Tanstack Table
- `SidebarView.tsx` - Navigation sidebar
- `Reminders.tsx` - Reminder management system
- `Pagination.tsx` - Table pagination controls

**Business Logic:**
- `hooks/useGetEnterprisesHeader.ts` - Header data fetching
- `hooks/useGetMonthlyStats.ts` - Monthly statistics
- `hooks/columns.tsx` - Table column definitions
- `services/inspections.ts` - API service layer

**File Structure:**
```
fiscalization/
├── components/        # UI components
├── hooks/            # Custom hooks
├── services/         # API services
├── pages/           # Route pages (future)
├── types/           # TypeScript types (future)
└── utils/           # Utility functions (future)
```

#### **Auth Feature** (`src/features/auth/`)
Authentication system (prepared structure):
```
auth/
├── components/       # Login, signup components
├── hooks/           # Auth-related hooks
├── services/        # Auth API calls
└── types/           # Auth type definitions
```

#### **Team Feature** (`src/features/team/`)
Team management (future feature):
```
team/
├── components/      # Team-related UI
├── services/        # Team API services
└── types/           # Team type definitions
```

### 🔧 **Shared Resources** (`src/shared/`)

#### **Layout System** (`src/shared/layout/`)
- `MainLayout.tsx` - Main grid layout with green theme

#### **UI Components** (`src/shared/components/`)
**Layout Components:**
- `layout/Navbar.tsx` - Header with time-based greeting and search

**UI Dialogs:**
- `ui/DialogAddInspection.tsx` - Add inspection form modal
- `ui/DialogAddReminder.tsx` - Add reminder form modal

**Charts (Future):**
- `charts/` - Data visualization components

#### **Context & State** (`src/shared/context/`)
- `EnterpriseContext.tsx` - Enterprise data state management
- `RemindersContext.tsx` - Reminders state management

#### **Custom Hooks** (`src/shared/hooks/`)
- `useFormEnterprises.ts` - Form handling for enterprises
- `useAddReminders.ts` - Reminder creation logic

#### **Utilities** (`src/shared/utils/`)
- `overdueEnterprises.ts` - Business logic for overdue calculations

#### **Styling** (`src/shared/styles/`)
- `index.css` - Global CSS and Tailwind imports

### 🎨 **UI Foundation** (`src/components/`)

#### **shadcn/ui Components** (`src/components/ui/`)
Reusable UI primitives from shadcn/ui:
- `button.tsx` - Button component variants
- `dialog.tsx` - Modal dialog components
- `input.tsx` - Form input components
- `table.tsx` - Table components
- `calendar.tsx` - Date picker calendar
- `checkbox.tsx` - Checkbox inputs
- `label.tsx` - Form labels
- `popover.tsx` - Popover containers
- `alert.tsx` - Alert notifications
- `input-otp.tsx` - OTP input fields

#### **Date Components** (`src/components/date-picker/`)
- `date-picker.tsx` - Single date picker
- `date-range-picker.tsx` - Date range picker

### 🛠️ **Development Tools**
- `src/lib/utils.ts` - Utility functions (cn, etc.)
- `src/config/` - Configuration files (future)
- `src/test/` - Test files (future)
- `src/logs/` - Logging utilities (future)

### 🎭 **Assets** (`src/icons/`)
- `svg/` - SVG icon components loaded via vite-plugin-svgr

## 🏗️ **Architecture Patterns**

### **Feature-Based Organization**
- Each feature has its own folder with components, hooks, services
- Shared resources in `src/shared/`
- Clear separation of concerns

### **Component Structure**
- UI components in dedicated folders
- Business logic separated into custom hooks
- Services for API communication
- Context for state management

### **Styling Approach**
- TailwindCSS for styling
- Green color palette for enterprise branding
- shadcn/ui for consistent component design
- Custom CSS for specific needs

## 🔧 **Technology Stack**

### **Core Technologies**
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS 4** - Styling framework

### **UI & Components**
- **Radix UI** - Headless UI primitives
- **shadcn/ui** - Component library
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### **Data & Forms**
- **React Hook Form** - Form handling
- **Tanstack Table** - Table management
- **date-fns** - Date manipulation
- **date-fns-tz** - Timezone handling

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **vite-plugin-svgr** - SVG as React components

## 🎯 **Key Features Implemented**

### **Time Management**
- Auto-updating time display
- Argentina timezone support
- Time-based greetings (Buenos días/tardes/noches)

### **Inspection Management**
- Enterprise inspection tracking
- Status management (waiting, completed, not located)
- Monthly statistics and metrics

### **UI/UX**
- Responsive grid layout
- Green enterprise color scheme
- Professional dashboard interface
- Form validation and error handling

### **State Management**
- Context-based state for enterprises
- Separate context for reminders
- Custom hooks for business logic

## 📋 **Future Expansion Points**

### **Ready-to-Implement**
- Authentication system (folder structure exists)
- Team management features
- Chart components for data visualization
- Testing framework
- Configuration management

### **Scalability Considerations**
- Feature-based organization allows easy addition of new modules
- Shared utilities can be extended
- Component library can grow with new shadcn/ui additions
- Services layer ready for API integration

  