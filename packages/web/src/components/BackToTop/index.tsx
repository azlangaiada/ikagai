'use client'
import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

// Button component to scroll back to the top of the page
export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Toggles the visibility of the back-to-top button based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Smoothly scrolls the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[13.5rem] right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center"
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  )
}
