'use client'
import React, { useEffect, useState } from 'react'

export const FooterInfo: React.FC = () => {
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('Loading...')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    // Fetch location (simplified)
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        setLocation(`${data.city}, ${data.country_name}`)
      })
      .catch(() => setLocation('Global'))

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col gap-1 text-sm text-gray-400">
      <p>Visitor Location: {location}</p>
      <p>Current Local Time: {time}</p>
    </div>
  )
}
