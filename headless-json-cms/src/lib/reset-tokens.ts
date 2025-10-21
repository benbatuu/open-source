import crypto from "crypto"
import { loadResetTokens, saveResetTokens, ResetToken } from "./file-storage"

// Load reset tokens from file
const resetTokens: { [key: string]: ResetToken } = loadResetTokens()

export const resetTokenService = {
  // Generate reset token
  generate: (userId: string): string => {
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    resetTokens[token] = {
      userId,
      expiresAt: expiresAt.toISOString()
    }

    saveResetTokens(resetTokens)
    return token
  },

  // Validate reset token
  validate: (token: string): { valid: boolean; userId?: string; error?: string } => {
    const tokenData = resetTokens[token]
    
    if (!tokenData) {
      return { valid: false, error: "Invalid token" }
    }

    if (new Date() > new Date(tokenData.expiresAt)) {
      // Remove expired token
      delete resetTokens[token]
      saveResetTokens(resetTokens)
      return { valid: false, error: "Token has expired" }
    }

    return { valid: true, userId: tokenData.userId }
  },

  // Remove reset token (after successful password reset)
  remove: (token: string): void => {
    delete resetTokens[token]
    saveResetTokens(resetTokens)
  },

  // Clean up expired tokens (optional cleanup function)
  cleanup: (): void => {
    const now = new Date()
    let hasChanges = false
    Object.keys(resetTokens).forEach(token => {
      if (now > new Date(resetTokens[token].expiresAt)) {
        delete resetTokens[token]
        hasChanges = true
      }
    })
    if (hasChanges) {
      saveResetTokens(resetTokens)
    }
  }
}
