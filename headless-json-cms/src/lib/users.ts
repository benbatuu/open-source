import bcrypt from "bcryptjs"
import { loadUsers, saveUsers, User } from "./file-storage"

// Load users from file
const users: User[] = loadUsers()

export const userService = {
  // Find user by email
  findByEmail: (email: string): User | undefined => {
    return users.find(u => u.email === email)
  },

  // Find user by ID
  findById: (id: string): User | undefined => {
    return users.find(u => u.id === id)
  },

  // Create new user
  create: async (userData: { name: string; email: string; password: string; role?: string }): Promise<User> => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // Create new user
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || "admin",
      createdAt: new Date().toISOString()
    }

    // Add to users array and save to file
    users.push(newUser)
    saveUsers(users)
    return newUser
  },

  // Update user password
  updatePassword: async (userId: string, newPassword: string): Promise<void> => {
    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    users[userIndex].password = hashedPassword
    saveUsers(users)
  },

  // Verify password
  verifyPassword: async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
  },

  // Update user
  update: async (userId: string, updateData: { name?: string; email?: string; role?: string }): Promise<User> => {
    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Check if email is being changed and if it already exists
    if (updateData.email && updateData.email !== users[userIndex].email) {
      const existingUser = users.find(u => u.email === updateData.email && u.id !== userId)
      if (existingUser) {
        throw new Error("User with this email already exists")
      }
    }

    // Update user data
    if (updateData.name) users[userIndex].name = updateData.name
    if (updateData.email) users[userIndex].email = updateData.email
    if (updateData.role) users[userIndex].role = updateData.role

    saveUsers(users)
    return users[userIndex]
  },

  // Delete user
  delete: (userId: string): void => {
    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Don't allow deleting the last admin user
    const adminUsers = users.filter(u => u.role === "admin")
    if (users[userIndex].role === "admin" && adminUsers.length === 1) {
      throw new Error("Cannot delete the last admin user")
    }

    users.splice(userIndex, 1)
    saveUsers(users)
  },

  // Get all users (for debugging)
  getAll: (): User[] => {
    return users
  }
}
