"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Role, hasPermission, canAccessRoute, getAccessibleMenuItems, getResourceActions } from "@/lib/permissions"

interface User {
  id: string
  name: string
  email: string
  role: Role
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        setLoading(false)
        return
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        localStorage.removeItem("auth_token")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("auth_token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("auth_token", data.token)
        }
        setUser(data.user)
        return { success: true, user: data.user }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: "Network error" }
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
    router.push("/auth/login")
  }

  const requireAuth = () => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }

  const requirePermission = (resource: string, action: string) => {
    if (!user || !hasPermission(user.role, resource, action)) {
      router.push("/dashboard")
    }
  }

  const requireRole = (allowedRoles: Role[]) => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.push("/dashboard")
    }
  }

  const canAccess = (route: string) => {
    return user ? canAccessRoute(user.role, route) : false
  }

  const hasResourcePermission = (resource: string, action: string) => {
    return user ? hasPermission(user.role, resource, action) : false
  }

  const getMenuItems = () => {
    return user ? getAccessibleMenuItems(user.role) : []
  }

  const getUserResourceActions = (resource: string): string[] => {
    return user ? getResourceActions(user.role, resource) : []
  }

  return {
    user,
    loading,
    login,
    logout,
    requireAuth,
    requirePermission,
    requireRole,
    canAccess,
    hasResourcePermission,
    getMenuItems,
    getResourceActions: getUserResourceActions,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isEditor: user?.role === "editor"
  }
}
