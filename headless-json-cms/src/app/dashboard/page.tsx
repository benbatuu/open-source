"use client"

import { useEffect, useMemo, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Database, Image, Users, TrendingUp, Clock, Plus, ArrowRight, AlertTriangle, CheckCircle2, Server, HardDrive, Activity } from "lucide-react"
import Link from "next/link"

type ContentItem = {
  id: string
  title: string
  slug: string
  content: any
  schema: string
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
  author: string
}

type Schema = {
  id: string
  name: string
  slug: string
  fields: Array<{ id: string; name: string }>
  createdAt: string
  updatedAt: string
}

type MediaFile = {
  filename: string
  url: string
  size: number
  createdAt: string
  modifiedAt: string
}

export default function DashboardPage() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [files, setFiles] = useState<MediaFile[]>([])
  const [backupTimestamp, setBackupTimestamp] = useState<string | null>(null)
  const [cmsVersion, setCmsVersion] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [contentRes, schemasRes, filesRes, backupRes] = await Promise.all([
          fetch("/api/content"),
          fetch("/api/schemas"),
          fetch("/api/upload"),
          fetch("/api/backup"),
        ])

        if (contentRes.ok) setContent(await contentRes.json())
        if (schemasRes.ok) setSchemas(await schemasRes.json())
        if (filesRes.ok) setFiles(await filesRes.json())
        if (backupRes.ok) {
          const backupData = await backupRes.json()
          setBackupTimestamp(backupData?.metadata?.timestamp ?? null)
          setCmsVersion(backupData?.metadata?.version ?? null)
        }
      } catch (_) {
        // ignore
      }

      // Ping critical APIs for uptime
      try {
        const endpoints = ["/api/content", "/api/schemas", "/api/upload"]
        const checks = await Promise.all(
          endpoints.map(async (e) => {
            try {
              const r = await fetch(e, { method: "GET" })
              return [e, r.ok] as const
            } catch {
              return [e, false] as const
            }
          })
        )
        setApiStatus(Object.fromEntries(checks))
      } catch (_) {
        // ignore
      }
    }

    fetchAll()
  }, [])

  const totalContent = content.length
  const totalSchemas = schemas.length
  const totalMedia = files.length
  const totalMediaSize = useMemo(
    () => files.reduce((acc, f) => acc + (Number(f.size) || 0), 0),
    [files]
  )

  const recentContent = useMemo(
    () => [...content].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5),
    [content]
  )

  const schemaDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const item of content) {
      counts[item.schema] = (counts[item.schema] || 0) + 1
    }
    const bySlugOrId = (id: string) => schemas.find((s) => s.id === id || s.slug === id)?.name || id
    return Object.entries(counts)
      .map(([schemaId, count]) => ({ label: bySlugOrId(schemaId), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
  }, [content, schemas])

  const recentSchemas = useMemo(
    () => [...schemas].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5),
    [schemas]
  )

  const schemaIssues = useMemo(() => {
    return schemas.filter((s) => !s.name || !s.slug || !Array.isArray(s.fields))
  }, [schemas])

  const latestThreeImages = useMemo(() => {
    const onlyImages = files.filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f.filename))
    return [...onlyImages]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
  }, [files])

  const formatBytes = (bytes: number) => {
    if (!bytes) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  const stats = [
    {
      title: "Toplam içerik",
      value: String(totalContent),
      change: "",
      changeType: "neutral" as const,
      description: "Tüm içerikler",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "İçerik türü",
      value: String(totalSchemas),
      change: "",
      changeType: "neutral" as const,
      description: "Aktif şemalar",
      icon: Database,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Medya dosyası",
      value: String(totalMedia),
      change: "",
      changeType: "neutral" as const,
      description: "Yüklenen dosyalar",
      icon: Image,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Kullanıcılar",
      value: "-",
      change: "",
      changeType: "neutral" as const,
      description: "Aktif kullanıcılar",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here's what's happening with your content today.
            </p>
          </div>
          <Link href="/content/editor" className="inline-flex">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Content
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="stat-card hover:shadow-hard transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="stat-value">{stat.value}</div>
                  {stat.change ? (
                    <Badge 
                      variant="secondary"
                      className="text-xs"
                    >
                      {stat.change}
                    </Badge>
                  ) : null}
                </div>
                <p className="stat-label">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 🧾 Content Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Son 5 içerik
                  </CardTitle>
                  <CardDescription>
                    En son güncellenen içerikler
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  Tümünü gör
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentContent.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.schema}
                      </Badge>
                      <Badge 
                        variant={item.status === "published" ? "success" : item.status === "draft" ? "warning" : "secondary"}
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Yazar: {item.author || "-"}</span>
                      <span>•</span>
                      <span>{new Date(item.updatedAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {recentContent.length === 0 && (
                <div className="text-sm text-muted-foreground">Gösterilecek içerik yok.</div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
              <CardDescription>
                Sık kullanılan kısayollar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <FileText className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Yeni İçerik Oluştur</div>
                  <div className="text-xs text-muted-foreground">Yeni içerik ekleyin</div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Database className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Şema Oluştur</div>
                  <div className="text-xs text-muted-foreground">İçerik yapısını tanımlayın</div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Image className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Medya Yükle</div>
                  <div className="text-xs text-muted-foreground">Dosya ve görseller ekleyin</div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <TrendingUp className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Analitik</div>
                  <div className="text-xs text-muted-foreground">İçerik performansı</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* İçerik Tiplerine Göre Dağılım */}
        <Card>
          <CardHeader>
            <CardTitle>İçerik tiplerine göre dağılım</CardTitle>
            <CardDescription>Şema bazlı özet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {schemaDistribution.map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm">{s.label}</span>
                  </div>
                  <span className="text-sm font-medium">{s.count}</span>
                </div>
              ))}
              {schemaDistribution.length === 0 && (
                <div className="text-sm text-muted-foreground">Dağılım verisi yok.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 🧩 Schema Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Şema Özeti</CardTitle>
            <CardDescription>Toplam şema: {totalSchemas}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="font-medium mb-2">Son eklenen şemalar</div>
              <div className="space-y-2">
                {recentSchemas.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{new Date(s.updatedAt).toLocaleString()}</div>
                    </div>
                    <Badge variant="secondary">{s.slug}</Badge>
                  </div>
                ))}
                {recentSchemas.length === 0 && (
                  <div className="text-sm text-muted-foreground">Henüz şema yok.</div>
                )}
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Eksik alanlar / hatalı şemalar</div>
              <div className="space-y-2">
                {schemaIssues.map((s) => (
                  <div key={s.id} className="flex items-center gap-2 rounded-md border p-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="text-sm">
                      <span className="font-medium">{s.name || s.slug || s.id}</span> doğrulanamadı
                    </div>
                  </div>
                ))}
                {schemaIssues.length === 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle2 className="h-4 w-4" /> Tüm şemalar geçerli görünüyor
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🖼️ Media Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Medya Özeti</CardTitle>
            <CardDescription>Toplam medya: {totalMedia} • Boyut: {formatBytes(totalMediaSize)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {latestThreeImages.map((img) => (
                <img key={img.filename} src={img.url} alt={img.filename} className="h-16 w-16 rounded object-cover border" />
              ))}
              {latestThreeImages.length === 0 && (
                <div className="text-sm text-muted-foreground">Önizlenecek görsel yok.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 🧑‍💻 User & Role Summary (placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı ve Roller</CardTitle>
            <CardDescription>Kimlik doğrulama entegre edildiğinde doldurulur</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border p-4">
              <div className="text-sm text-muted-foreground">Aktif kullanıcı</div>
              <div className="text-xl font-semibold">-</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm text-muted-foreground">Roller dağılımı</div>
              <div className="text-sm">Admin / Editor / Viewer</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm text-muted-foreground">Son giriş yapanlar</div>
              <div className="text-sm">-</div>
            </div>
          </CardContent>
        </Card>

        {/* ⚙️ System Health */}
        <Card>
          <CardHeader>
            <CardTitle>Sistem Sağlığı</CardTitle>
            <CardDescription>API durumu, yedekleme ve sürüm bilgisi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 p-4 rounded-lg border">
                <Server className="h-4 w-4" />
                <div>
                  <div className="font-medium">API Uptime</div>
                  <div className="text-sm text-muted-foreground">
                    /api/content: {apiStatus["/api/content"] ? "✅ 200" : "❌"} • /api/schemas: {apiStatus["/api/schemas"] ? "✅ 200" : "❌"} • /api/upload: {apiStatus["/api/upload"] ? "✅ 200" : "❌"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg border">
                <HardDrive className="h-4 w-4" />
                <div>
                  <div className="font-medium">Son yedekleme</div>
                  <div className="text-sm text-muted-foreground">{backupTimestamp ? new Date(backupTimestamp).toLocaleString() : "Bilinmiyor"}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg border">
                <Activity className="h-4 w-4" />
                <div>
                  <div className="font-medium">CMS sürümü</div>
                  <div className="text-sm text-muted-foreground">{cmsVersion ?? "-"}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}