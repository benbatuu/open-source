import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import { loadSettings } from "@/lib/settings"
import { getCategoryBySlug } from "@/lib/categories"
import { loadContent, ContentItem } from "@/lib/file-system"
import { notFound } from "next/navigation"
import { Favicon } from "@/components/favicon"

// Revalidate every 60 seconds to pick up settings changes
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  try {
    const { categorySlug } = await params
    const settings = loadSettings()
    const category = getCategoryBySlug(categorySlug)
    
    if (!category) {
      return {
        title: "Category Not Found",
        description: "The requested category could not be found."
      }
    }

    const title = `${category.name} | ${settings.general.siteName}`
    const description = `Explore all posts in the ${category.name} category on ${settings.general.siteName}`

    return {
      title,
      description,
      keywords: `${category.name}, blog posts, articles, ${settings.general.siteName}`,
      icons: settings.general.favicon ? {
        icon: settings.general.favicon,
        shortcut: settings.general.favicon,
        apple: settings.general.favicon,
      } : undefined,
      openGraph: {
        title,
        description,
        url: `${settings.general.siteUrl}/category/${categorySlug}`,
        siteName: settings.general.siteName,
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: `@${settings.general.siteName?.toLowerCase().replace(/\s+/g, '')}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: `${settings.general.siteUrl}/category/${categorySlug}`,
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Category",
      description: "A category page from our site"
    }
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params
  
  try {
    const settings = loadSettings()
    const posts = loadContent()
    const category = getCategoryBySlug(categorySlug)
    
    if (!category) {
      notFound()
    }

    // Get posts from this category
    const categoryPosts = posts.filter((post: ContentItem) => 
      post.status === "published" &&
      ((post.metadata as any)?.category === categorySlug || post.metadata?.tags?.includes(categorySlug))
    )

    // Helper functions
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

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
                <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors relative group">
                  Categories
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
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

        {/* Breadcrumb */}
        <section className="py-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                Categories
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{category.name}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              {category.icon && (
                <span className="text-4xl">{category.icon}</span>
              )}
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: category.color || "#3B82F6" }}
              ></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {category.description || `Explore all posts in the ${category.name} category.`}
            </p>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{categoryPosts.length} posts</span>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {categoryPosts.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Latest Posts</h2>
                  <Link href="/categories">
                    <Button variant="outline" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      All Categories
                    </Button>
                  </Link>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPosts.map((post) => (
                    <Card key={post.id} className="card-modern rounded-lg border bg-card text-card-foreground shadow-soft hover:shadow-medium transition-all duration-300">
                      <CardContent className="p-6">
                        {post.metadata?.cover && (
                          <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
                            <img
                              src={post.metadata.cover}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <Badge variant="secondary" className="mb-2">
                          {post.schema}
                        </Badge>
                        <h3 className="text-xl font-bold mb-2">
                          <Link
                            href={`/category/${categorySlug}/${post.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {post.metadata?.description || "No description available."}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-6">
                  There are no published posts in this category yet.
                </p>
                <Link href="/categories">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Browse All Categories
                  </Button>
                </Link>
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
    );
  } catch (error) {
    console.error("Error loading category page:", error)
    notFound()
  }
}
