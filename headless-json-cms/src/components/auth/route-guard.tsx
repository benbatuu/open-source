"use client"

import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Role } from "@/lib/permissions"

interface RouteGuardProps {
  children: React.ReactNode
  allowedRoles?: Role[]
  requiredPermission?: {
    resource: string
    action: string
  }
  fallbackPath?: string
}

export function RouteGuard({ 
  children, 
  allowedRoles, 
  requiredPermission, 
  fallbackPath = "/dashboard" 
}: RouteGuardProps) {
  const { user, loading, requireAuth, requireRole, requirePermission } = useAuth()

  useEffect(() => {
    if (loading) return

    // Check authentication
    requireAuth()

    // Check role-based access
    if (allowedRoles && user) {
      requireRole(allowedRoles)
    }

    // Check permission-based access
    if (requiredPermission && user) {
      requirePermission(requiredPermission.resource, requiredPermission.action)
    }
  }, [user, loading, allowedRoles, requiredPermission, requireAuth, requireRole, requirePermission])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  // Check role access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
