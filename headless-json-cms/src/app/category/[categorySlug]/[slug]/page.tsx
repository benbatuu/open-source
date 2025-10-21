import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import { EditorJSPreview } from "@/components/editor/editorjs";
import { CommentSection } from "@/components/blog/comment-section";
import { Metadata } from "next";
import { loadSettings } from "@/lib/settings";
import { getCategoryBySlug } from "@/lib/categories";
import { loadContent, ContentItem } from "@/lib/file-system";
import { notFound } from "next/navigation";
import { Favicon } from "@/components/favicon";

// Revalidate every 60 seconds to pick up settings changes
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string, slug: string }> }): Promise<Metadata> {
  try {
    const { categorySlug, slug } = await params
    const settings = loadSettings()
    const posts = loadContent()
    const category = getCategoryBySlug(categorySlug)
    
    const post = posts.find((p: ContentItem) => 
      p.slug === slug && 
      p.status === "published" &&
      ((p.metadata as { category?: string })?.category === categorySlug || p.metadata?.tags?.includes(categorySlug))
    )
    
    if (!post || !category) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found."
      }
    }

    const title = post.metadata?.["seo-title"] || post.title
    const description = post.metadata?.["seo-description"] || post.metadata?.description || `Read ${post.title} on ${settings.general.siteName}`
    const keywords = post.metadata?.["seo-keywords"] || post.metadata?.tags?.join(", ") || ""
    const image = post.metadata?.["seo-image"] || post.metadata?.cover || ""
    const canonicalUrl = post.metadata?.["canonical-url"] || `${settings.general.siteUrl}/category/${categorySlug}/${slug}`

    return {
      title: `${title} | ${settings.general.siteName}`,
      description,
      keywords,
      authors: [{ name: post.author }],
      icons: settings.general.favicon ? {
        icon: settings.general.favicon,
        shortcut: settings.general.favicon,
        apple: settings.general.favicon,
      } : undefined,
      openGraph: {
        title: `${title} | ${settings.general.siteName}`,
        description,
        url: canonicalUrl,
        siteName: settings.general.siteName,
        images: image ? [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          }
        ] : [],
        locale: "en_US",
        type: "article",
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [post.author],
        tags: post.metadata?.tags || [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | ${settings.general.siteName}`,
        description,
        images: image ? [image] : [],
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
        canonical: canonicalUrl,
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Blog Post",
      description: "A blog post from our site"
    }
  }
}

export default async function CategoryBlogPostPage({ params }: { params: Promise<{ categorySlug: string, slug: string }> }) {
  const { categorySlug, slug } = await params
  
  try {
    const settings = loadSettings()
    const posts = loadContent()
    const category = getCategoryBySlug(categorySlug)
    
    const post = posts.find((p: ContentItem) => 
      p.slug === slug && 
      p.status === "published" &&
      ((p.metadata as { category?: string })?.category === categorySlug || p.metadata?.tags?.includes(categorySlug))
    )

    if (!post || !category) {
      notFound()
    }

    // Get related posts from the same category
    const relatedPosts = posts
      .filter((p: ContentItem) =>
        p.id !== post.id &&
        p.status === "published" &&
        ((p.metadata as { category?: string })?.category === categorySlug || p.metadata?.tags?.includes(categorySlug))
      )
      .slice(0, 3)

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

        {/* Article */}
        <article className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm mb-8">
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                  <span className="text-muted-foreground">/</span>
                  <Link href={`/category/${categorySlug}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {category.name}
                  </Link>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-foreground font-medium">{post.title}</span>
                </nav>

                {/* Post Header */}
                <header className="mb-12">
                  <div className="flex items-center gap-2 mb-4">
                    {post.metadata?.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                    <Badge variant="outline">{category.name}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />5 min read
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    {post.title}
                  </h1>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>By {post.author}</span>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Share:
                      </span>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.metadata?.["seo-title"] || post.title)}&url=${encodeURIComponent(`${settings.general.siteUrl}/category/${categorySlug}/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${settings.general.siteUrl}/category/${categorySlug}/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${settings.general.siteUrl}/category/${categorySlug}/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {post.metadata?.tags && post.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.metadata.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </header>

                {/* Cover Image */}
                {post.metadata?.cover ? (
                  <div className="mb-8">
                    <img
                      src={post.metadata.cover}
                      alt={post.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  <div className="mb-8">
                    <div className="w-full h-64 md:h-96 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">📝</span>
                        </div>
                        <p>No cover image</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Post Content */}
                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-li:text-foreground prose-li:leading-relaxed prose-img:rounded-lg prose-img:shadow-md">
                  <EditorJSPreview data={post.content} />
                </div>

                {/* Post Footer */}
                <footer className="mt-16 pt-8 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-sm text-muted-foreground">Author</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Share this post:
                      </span>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.metadata?.["seo-title"] || post.title)}&url=${encodeURIComponent(`${settings.general.siteUrl}/category/${categorySlug}/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${settings.general.siteUrl}/category/${categorySlug}/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${settings.general.siteUrl}/category/${categorySlug}/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </footer>

                {/* Comments Section */}
                <section className="py-0">
                  <div className="container">
                    <CommentSection postId={post.id} postSlug={post.slug} />
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Table of Contents */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Table of Contents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <nav className="space-y-2">
                        {post.content?.blocks?.map(
                          (block: { type: string; data?: { level?: number; text?: string } }, index: number) => {
                            if (block.type === "header") {
                              const level = block.data?.level || 2;
                              const text = block.data?.text || "";
                              const id = text
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-");
                              return (
                                <a
                                  key={index}
                                  href={`#${id}`}
                                  className={`block text-sm hover:text-primary transition-colors ${
                                    level === 2
                                      ? "font-medium"
                                      : level === 3
                                      ? "ml-4"
                                      : "ml-8"
                                  }`}
                                >
                                  {text}
                                </a>
                              );
                            }
                            return null;
                          }
                        )}
                      </nav>
                    </CardContent>
                  </Card>

                  {/* Recent Posts */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {relatedPosts.slice(0, 5).map((relatedPost) => (
                          <div key={relatedPost.id} className="flex gap-3">
                            <div className="w-16 h-16 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                              <span className="text-xs">📝</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/category/${categorySlug}/${relatedPost.slug}`}
                                className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                              >
                                {relatedPost.title}
                              </Link>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(relatedPost.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Popular Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Popular Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {post.metadata?.tags?.slice(0, 5).map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm">{tag}</span>
                            <Badge variant="secondary" className="text-xs">
                              {Math.floor(Math.random() * 10) + 1}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(relatedPost.createdAt)}
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        <Link
                          href={`/category/${categorySlug}/${relatedPost.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {relatedPost.metadata?.description ||
                          "No description available"}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          {relatedPost.author}
                        </div>
                        <Link href={`/category/${categorySlug}/${relatedPost.slug}`}>
                          <Button variant="ghost" size="sm">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

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
    );
  } catch (error) {
    console.error("Error loading category blog post:", error)
    notFound()
  }
}