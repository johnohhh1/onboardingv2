'use client'

import { useTheme } from '../lib/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label="Toggle dark mode"
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
          isDarkMode ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
      <Sun
        className={`absolute left-1.5 h-4 w-4 text-yellow-500 transition-opacity duration-200 ${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <Moon
        className={`absolute right-1.5 h-4 w-4 text-blue-500 transition-opacity duration-200 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </button>
  )
} 