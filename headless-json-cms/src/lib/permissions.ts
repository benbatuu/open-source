export type Role = "admin" | "editor"

export interface Permission {
  resource: string
  actions: string[]
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    { resource: "users", actions: ["read", "create", "update", "delete"] },
    { resource: "content", actions: ["read", "create", "update", "delete"] },
    { resource: "media", actions: ["read", "create", "update", "delete"] },
    { resource: "schemas", actions: ["read", "create", "update", "delete"] },
    { resource: "categories", actions: ["read", "create", "update", "delete"] },
    { resource: "settings", actions: ["read", "update"] },
    { resource: "analytics", actions: ["read"] },
    { resource: "backup", actions: ["read", "create", "import", "export"] },
    { resource: "dashboard", actions: ["read"] }
  ],
  editor: [
    { resource: "content", actions: ["read", "create", "update", "delete"] },
    { resource: "media", actions: ["read", "create", "update", "delete"] },
    { resource: "schemas", actions: ["read", "create", "update"] },
    { resource: "categories", actions: ["read", "create", "update"] },
    { resource: "dashboard", actions: ["read"] }
  ]
}

export const SIDEBAR_MENU_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    roles: ["admin", "editor"] as Role[]
  },
  {
    id: "content",
    label: "Content",
    href: "/content",
    icon: "FileText",
    roles: ["admin", "editor"] as Role[]
  },
  {
    id: "media",
    label: "Media",
    href: "/media",
    icon: "Image",
    roles: ["admin", "editor"] as Role[]
  },
  {
    id: "schemas",
    label: "Schemas",
    href: "/schemas",
    icon: "Database",
    roles: ["admin", "editor"] as Role[]
  },
  {
    id: "categories",
    label: "Categories",
    href: "/dashboard/categories",
    icon: "Tag",
    roles: ["admin", "editor"] as Role[]
  },
  {
    id: "users",
    label: "Users",
    href: "/users",
    icon: "Users",
    roles: ["admin"] as Role[]
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: "BarChart3",
    roles: ["admin"] as Role[]
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: "Settings",
    roles: ["admin"] as Role[]
  },
  {
    id: "backup",
    label: "Backup & Export",
    href: "/backup",
    icon: "Archive",
    roles: ["admin"] as Role[]
  }
]

export function hasPermission(userRole: Role, resource: string, action: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  const resourcePermission = permissions.find(p => p.resource === resource)
  
  if (!resourcePermission) {
    return false
  }
  
  return resourcePermission.actions.includes(action)
}

export function canAccessRoute(userRole: Role, route: string): boolean {
  const menuItem = SIDEBAR_MENU_ITEMS.find(item => item.href === route)
  
  if (!menuItem) {
    return true // Allow access to routes not in menu
  }
  
  return menuItem.roles.includes(userRole)
}

export function getAccessibleMenuItems(userRole: Role) {
  return SIDEBAR_MENU_ITEMS.filter(item => item.roles.includes(userRole))
}

export function getResourceActions(userRole: Role, resource: string): string[] {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  const resourcePermission = permissions.find(p => p.resource === resource)
  
  return resourcePermission?.actions || []
}
