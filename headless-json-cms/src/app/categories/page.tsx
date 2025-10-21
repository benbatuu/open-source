import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Tag } from "lucide-react"
import { Metadata } from "next"
import { loadSettings } from "@/lib/settings"
import { loadCategories } from "@/lib/categories"
import { loadContent, ContentItem } from "@/lib/file-system"
import { Favicon } from "@/components/favicon"

// Revalidate every 60 seconds to pick up changes
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = loadSettings()
    return {
      title: `Categories | ${settings.general.siteName || "AI Tech Blog"}`,
      description: "Browse all categories and topics",
      icons: settings.general.favicon ? {
        icon: settings.general.favicon,
        shortcut: settings.general.favicon,
        apple: settings.general.favicon,
      } : undefined,
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Categories | AI Tech Blog",
      description: "Browse all categories and topics",
    }
  }
}

export default async function CategoriesPage() {
  const settings = loadSettings()
  const categories = loadCategories()
  const posts = loadContent()

  // Filter published posts
  const publishedPosts = posts.filter((post: ContentItem) => post.status === "published")

  // Helper function to get posts count for a category
  const getPostsCount = (categorySlug: string) => {
    return publishedPosts.filter((post: ContentItem) => 
      (post.metadata as { category?: string })?.category === categorySlug || 
      post.metadata?.tags?.includes(categorySlug)
    ).length
  }

  // Helper function to get latest post for a category
  const getLatestPost = (categorySlug: string) => {
    return publishedPosts
      .filter((post: ContentItem) => 
        (post.metadata as { category?: string })?.category === categorySlug || 
        post.metadata?.tags?.includes(categorySlug)
      )
      .sort((a: ContentItem, b: ContentItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Favicon faviconUrl={settings.general.favicon} />
      
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              {settings.general.logo ? (
                <>
                  <img 
                    src={settings.general.logo} 
                    alt={settings.general.siteName || "Site Logo"} 
                    className="h-8 w-auto"
                  />
                  <span className="text-2xl font-bold">
                    {settings.general.siteName || "AI Tech Blog"}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  {settings.general.siteName || "AI Tech Blog"}
                </span>
              )}
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/categories" className="text-sm font-medium text-primary transition-colors relative group">
                Categories
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors bg-primary/10 px-3 py-1.5 rounded-full">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Categories
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Explore our content by category and discover topics that interest you
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No categories found</h3>
              <p className="text-muted-foreground">
                Categories will appear here once they are created.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => {
                const postsCount = getPostsCount(category.slug)
                const latestPost = getLatestPost(category.slug)
                
                return (
                  <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        {category.icon && (
                          <span className="text-2xl">{category.icon}</span>
                        )}
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                      </div>
                      {category.description && (
                        <CardDescription className="text-sm">
                          {category.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{postsCount} {postsCount === 1 ? 'post' : 'posts'}</span>
                          <span>Created {formatDate(category.createdAt)}</span>
                        </div>
                        
                        {latestPost && (
                          <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground mb-2">Latest post:</p>
                            <Link 
                              href={`/category/${category.slug}/${latestPost.slug}`}
                              className="block group/link"
                            >
                              <p className="text-sm font-medium group-hover/link:text-primary transition-colors line-clamp-2">
                                {latestPost.title}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(latestPost.createdAt)}
                              </div>
                            </Link>
                          </div>
                        )}
                        
                        <div className="pt-4">
                          <Link href={`/category/${category.slug}`}>
                            <Button variant="outline" className="w-full group/btn">
                              View All Posts
                              <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/categories" className="text-sm font-medium text-primary transition-colors">
              Categories
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by{" "}
              <a 
                href="https://bennbatuu.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors"
              >
                bennbatuu
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
