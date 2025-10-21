"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  Image, 
  Database,
  BookOpen,
  Download,
  LogOut,
  Sparkles,
  ExternalLink,
  MessageCircle,
  BarChart3,
  Archive,
  Tag
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

// Icon mapping for menu items
const iconMap = {
  LayoutDashboard,
  FileText,
  BookOpen,
  Image,
  Database,
  Tag,
  Users,
  BarChart3,
  Settings,
  MessageCircle,
  Archive
}

const support = [
  {
    name: "Documentation",
    href: "/docs",
    icon: BookOpen,
    description: "Guides and API docs"
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, getMenuItems, logout } = useAuth()
  
  const menuItems = getMenuItems()

  return (
    <div className="flex h-full w-72 flex-col bg-card border-r border-border shadow-soft">
      {/* Header */}
      <div className="flex h-20 items-center px-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Dev Portfolio CMS</h1>
            <p className="text-xs text-muted-foreground">Headless Content Management</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const IconComponent = iconMap[item.icon as keyof typeof iconMap]
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-primary text-primary-foreground shadow-soft"
                )}
              >
                <IconComponent className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.label}</p>
                </div>
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-l-full" />
                )}
              </Link>
            )
          })}
        </div>
        
        {/* Support Section */}
        <div className="border-t border-border pt-4 mt-6">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Support
          </p>
          <div className="space-y-1">
            {support.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-primary text-primary-foreground shadow-soft"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-l-full" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
      
      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-sm font-semibold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role || "user"}</p>
          </div>
        </div>
        
        <div className="space-y-2 mt-3">
          <Link href="/" target="_blank">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 hover:bg-muted/50" 
            >
              <ExternalLink className="h-4 w-4" />
              View Blog
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 hover:bg-muted/50"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}