import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { EditorJSPreview } from "@/components/editor/editorjs"
import { Metadata } from "next"
import { loadSettings } from "@/lib/settings"
import { loadContent, ContentItem } from "@/lib/file-system"
import { Favicon } from "@/components/favicon"

// Revalidate every 60 seconds to pick up settings changes
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = loadSettings()
    const posts = loadContent()
    
    const featuredPosts = posts.filter((post: ContentItem) => post.metadata?.featured)
    const latestPost = posts.sort((a: ContentItem, b: ContentItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    
    return {
      title: settings.general.siteName || "Dev Portfolio CMS",
      description: settings.general.siteDescription || "A modern headless content management system",
      keywords: latestPost?.metadata?.["seo-keywords"] || "blog, cms, content management",
      authors: [{ name: settings.general.siteName || "CMS Admin" }],
      icons: settings.general.favicon ? {
        icon: settings.general.favicon,
        shortcut: settings.general.favicon,
        apple: settings.general.favicon,
      } : undefined,
      openGraph: {
        title: settings.general.siteName || "Dev Portfolio CMS",
        description: settings.general.siteDescription || "A modern headless content management system",
        url: settings.general.siteUrl || "https://your-site.com",
        siteName: settings.general.siteName || "Dev Portfolio CMS",
        images: featuredPosts[0]?.metadata?.cover ? [
          {
            url: featuredPosts[0].metadata.cover,
            width: 1200,
            height: 630,
            alt: featuredPosts[0].title,
          }
        ] : [],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: settings.general.siteName || "Dev Portfolio CMS",
        description: settings.general.siteDescription || "A modern headless content management system",
        images: featuredPosts[0]?.metadata?.cover ? [featuredPosts[0].metadata.cover] : [],
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
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Dev Portfolio CMS",
      description: "A modern headless content management system",
    }
  }
}

export default async function HomePage() {
  // Server-side data fetching
  const posts = loadContent()
  const settings = loadSettings()
  
  // Filter published posts and sort by creation date
  const publishedPosts = posts
    .filter((post: ContentItem) => post.status === "published")
    .sort((a: ContentItem, b: ContentItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  
  // Get all unique tags
  const allTags: string[] = Array.from(new Set(
    publishedPosts.flatMap((post: ContentItem) => post.metadata?.tags || [])
  ))

  // Helper functions

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const getExcerpt = (post: ContentItem) => {
    if (post.metadata?.description) {
      return post.metadata.description
    }
    
    // Extract text from first paragraph block
    const firstParagraph = post.content?.blocks?.find((block: any) => block.type === "paragraph")
    if (firstParagraph?.data?.text) {
      return firstParagraph.data.text.substring(0, 250) + "..."
    }
    
    return "No description available"
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

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-muted/30 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {settings.general.siteName || "AI Technology Blog"}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              {settings.general.siteDescription || "Stay updated with the latest developments in artificial intelligence, machine learning, and cutting-edge technology."}
            </p>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="default" size="lg" className="px-6 py-3">
                  All Posts
                </Button>
                {allTags.slice(0, 6).map((tag: string) => (
                  <Button key={tag} variant="outline" size="lg" className="px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all">
                    {tag}
                  </Button>
                ))}
                {allTags.length > 6 && (
                  <Button variant="ghost" size="lg" className="px-6 py-3">
                    +{allTags.length - 6} more
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {publishedPosts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Featured Post</h2>
              <p className="text-muted-foreground text-lg">Discover our most popular content</p>
            </div>
            {(() => {
              const featuredPost = publishedPosts.find((post: ContentItem) => post.metadata?.featured) || publishedPosts[0]
              return (
                <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background to-muted/20">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary">Featured</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(featuredPost.createdAt)}
                        </div>
                      </div>
                      <CardTitle className="text-2xl mb-4">{featuredPost.title}</CardTitle>
                      <CardDescription className="text-base mb-6">
                        {getExcerpt(featuredPost)}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {featuredPost.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            5 min read
                          </div>
                        </div>
                        <Link href={`/blog/${featuredPost.slug}`}>
                          <Button>
                            Read More
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    {featuredPost.metadata?.cover ? (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={featuredPost.metadata.cover}
                          alt={featuredPost.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📝</span>
                          </div>
                          <p className="text-muted-foreground">Blog Post Image</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )
            })()}
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          
          {publishedPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                No blog posts have been published yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPosts.map((post: ContentItem) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Cover Image */}
                  {post.metadata?.cover && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.metadata.cover}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {getExcerpt(post)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {post.metadata?.tags && post.metadata.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.metadata.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          {/* Navigation Links */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/categories" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          
          {/* Copyright */}
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