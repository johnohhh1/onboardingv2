import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../lib/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Restaurant Onboarding System',
  description: 'Multi-restaurant team member onboarding management system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
