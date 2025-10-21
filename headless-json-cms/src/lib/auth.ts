import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface AuthUser {
  userId: string
  email: string
  role: string
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    }
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from Authorization header
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  // Try to get token from cookies
  const tokenFromCookie = request.cookies.get("auth_token")?.value
  if (tokenFromCookie) {
    return tokenFromCookie
  }

  return null
}

export function getUserFromRequest(request: NextRequest): AuthUser | null {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }

  return verifyToken(token)
}

export function isAuthenticated(request: NextRequest): boolean {
  return getUserFromRequest(request) !== null
}

export function isAdmin(request: NextRequest): boolean {
  const user = getUserFromRequest(request)
  return user?.role === "admin" || false
}
