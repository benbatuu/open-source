"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function useAnalytics() {
  const pathname = usePathname()

  const trackView = async (data: {
    page: string
    postId?: string
    category?: string
    sessionId?: string
  }) => {
    try {
      const sessionId = data.sessionId || getSessionId()
      
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "view",
          data: {
            ...data,
            sessionId
          }
        }),
      })
    } catch (error) {
      console.error("Analytics tracking error:", error)
    }
  }

  const trackComment = async (data: {
    postId: string
    commentId: string
    sessionId?: string
  }) => {
    try {
      const sessionId = data.sessionId || getSessionId()
      
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "comment",
          data: {
            ...data,
            sessionId
          }
        }),
      })
    } catch (error) {
      console.error("Analytics tracking error:", error)
    }
  }

  // Auto-track page views
  useEffect(() => {
    const sessionId = getSessionId()
    
    trackView({
      page: pathname,
      sessionId
    })
  }, [pathname])

  return {
    trackView,
    trackComment
  }
}

function getSessionId(): string {
  if (typeof window === "undefined") return ""
  
  // Use localStorage instead of sessionStorage for persistent session across page refreshes
  let sessionId = localStorage.getItem("analytics_session_id")
  if (!sessionId) {
    sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    localStorage.setItem("analytics_session_id", sessionId)
  }
  return sessionId
}
