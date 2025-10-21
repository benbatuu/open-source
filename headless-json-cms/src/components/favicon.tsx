"use client"

import { useEffect } from "react"

interface FaviconProps {
  faviconUrl?: string
}

export function Favicon({ faviconUrl }: FaviconProps) {
  useEffect(() => {
    if (faviconUrl) {
      // Remove existing favicon links
      const existingLinks = document.querySelectorAll('link[rel*="icon"]')
      existingLinks.forEach(link => link.remove())

      // Add new favicon
      const link = document.createElement('link')
      link.rel = 'icon'
      link.type = 'image/x-icon'
      link.href = faviconUrl
      document.head.appendChild(link)

      // Add shortcut icon
      const shortcutLink = document.createElement('link')
      shortcutLink.rel = 'shortcut icon'
      shortcutLink.type = 'image/x-icon'
      shortcutLink.href = faviconUrl
      document.head.appendChild(shortcutLink)

      // Add apple touch icon
      const appleLink = document.createElement('link')
      appleLink.rel = 'apple-touch-icon'
      appleLink.href = faviconUrl
      document.head.appendChild(appleLink)
    }
  }, [faviconUrl])

  return null
}
