import { loadAnalytics, saveAnalytics } from "./file-storage"

export interface ViewEvent {
  id: string
  page: string
  postId?: string
  category?: string
  ip: string
  userAgent: string
  country?: string
  city?: string
  referrer?: string
  timestamp: string
  sessionId: string
}

export interface CommentEvent {
  id: string
  postId: string
  commentId: string
  ip: string
  userAgent: string
  country?: string
  city?: string
  timestamp: string
  sessionId: string
}

export interface AnalyticsData {
  views: ViewEvent[]
  comments: CommentEvent[]
  lastUpdated: string
}

export interface AnalyticsStats {
  totalViews: number
  uniqueVisitors: number
  totalComments: number
  topPosts: Array<{
    postId: string
    title: string
    views: number
    comments: number
  }>
  topCategories: Array<{
    category: string
    views: number
    posts: number
  }>
  viewsByCountry: Array<{
    country: string
    views: number
    percentage: number
  }>
  viewsByDay: Array<{
    date: string
    views: number
    uniqueVisitors: number
  }>
  viewsByHour: Array<{
    hour: number
    views: number
  }>
  referrers: Array<{
    referrer: string
    views: number
    percentage: number
  }>
  deviceTypes: Array<{
    type: string
    views: number
    percentage: number
  }>
}

// Load analytics data
const analyticsData: AnalyticsData = loadAnalytics()

export const analyticsService = {
  // Track page view
  trackView: (data: {
    page: string
    postId?: string
    category?: string
    ip: string
    userAgent: string
    country?: string
    city?: string
    referrer?: string
    sessionId: string
  }): void => {
    // Check if this is a duplicate view from the same IP and session within the last 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
    const recentView = analyticsData.views.find(view => 
      view.ip === data.ip && 
      view.sessionId === data.sessionId && 
      view.page === data.page &&
      new Date(view.timestamp) > new Date(thirtyMinutesAgo)
    )

    // If it's a duplicate view within 30 minutes, don't track it
    if (recentView) {
      return
    }

    const viewEvent: ViewEvent = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...data,
      timestamp: new Date().toISOString()
    }

    analyticsData.views.push(viewEvent)
    analyticsData.lastUpdated = new Date().toISOString()
    saveAnalytics(analyticsData)
  },

  // Track comment
  trackComment: (data: {
    postId: string
    commentId: string
    ip: string
    userAgent: string
    country?: string
    city?: string
    sessionId: string
  }): void => {
    const commentEvent: CommentEvent = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...data,
      timestamp: new Date().toISOString()
    }

    analyticsData.comments.push(commentEvent)
    analyticsData.lastUpdated = new Date().toISOString()
    saveAnalytics(analyticsData)
  },

  // Get analytics stats
  getStats: (days: number = 30): AnalyticsStats => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const recentViews = analyticsData.views.filter(
      view => new Date(view.timestamp) >= cutoffDate
    )
    const recentComments = analyticsData.comments.filter(
      comment => new Date(comment.timestamp) >= cutoffDate
    )

    // Unique visitors (by IP and session combination)
    const uniqueVisitors = new Set(recentViews.map(view => `${view.ip}-${view.sessionId}`)).size

    // Top posts
    const postViews = new Map<string, { views: number; title: string }>()
    const postComments = new Map<string, number>()

    recentViews.forEach(view => {
      if (view.postId) {
        const current = postViews.get(view.postId) || { views: 0, title: view.postId }
        current.views++
        postViews.set(view.postId, current)
      }
    })

    recentComments.forEach(comment => {
      const current = postComments.get(comment.postId) || 0
      postComments.set(comment.postId, current + 1)
    })

    const topPosts = Array.from(postViews.entries())
      .map(([postId, data]) => ({
        postId,
        title: data.title,
        views: data.views,
        comments: postComments.get(postId) || 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Top categories
    const categoryViews = new Map<string, { views: number; posts: Set<string> }>()
    recentViews.forEach(view => {
      if (view.category) {
        const current = categoryViews.get(view.category) || { views: 0, posts: new Set() }
        current.views++
        if (view.postId) {
          current.posts.add(view.postId)
        }
        categoryViews.set(view.category, current)
      }
    })

    const topCategories = Array.from(categoryViews.entries())
      .map(([category, data]) => ({
        category,
        views: data.views,
        posts: data.posts.size
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Views by country
    const countryViews = new Map<string, number>()
    recentViews.forEach(view => {
      if (view.country) {
        const current = countryViews.get(view.country) || 0
        countryViews.set(view.country, current + 1)
      }
    })

    const totalCountryViews = Array.from(countryViews.values()).reduce((a, b) => a + b, 0)
    const viewsByCountry = Array.from(countryViews.entries())
      .map(([country, views]) => ({
        country,
        views,
        percentage: totalCountryViews > 0 ? (views / totalCountryViews) * 100 : 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Views by day
    const dayViews = new Map<string, { views: number; uniqueVisitors: Set<string> }>()
    recentViews.forEach(view => {
      const date = new Date(view.timestamp).toISOString().split('T')[0]
      const current = dayViews.get(date) || { views: 0, uniqueVisitors: new Set() }
      current.views++
      current.uniqueVisitors.add(`${view.ip}-${view.sessionId}`)
      dayViews.set(date, current)
    })

    const viewsByDay = Array.from(dayViews.entries())
      .map(([date, data]) => ({
        date,
        views: data.views,
        uniqueVisitors: data.uniqueVisitors.size
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Views by hour
    const hourViews = new Map<number, number>()
    recentViews.forEach(view => {
      const hour = new Date(view.timestamp).getHours()
      const current = hourViews.get(hour) || 0
      hourViews.set(hour, current + 1)
    })

    const viewsByHour = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      views: hourViews.get(hour) || 0
    }))

    // Referrers
    const referrerViews = new Map<string, number>()
    recentViews.forEach(view => {
      const referrer = view.referrer || 'Direct'
      const current = referrerViews.get(referrer) || 0
      referrerViews.set(referrer, current + 1)
    })

    const totalReferrerViews = Array.from(referrerViews.values()).reduce((a, b) => a + b, 0)
    const referrers = Array.from(referrerViews.entries())
      .map(([referrer, views]) => ({
        referrer,
        views,
        percentage: totalReferrerViews > 0 ? (views / totalReferrerViews) * 100 : 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Device types
    const deviceViews = new Map<string, number>()
    recentViews.forEach(view => {
      let deviceType = 'Desktop'
      if (view.userAgent.includes('Mobile')) {
        deviceType = 'Mobile'
      } else if (view.userAgent.includes('Tablet')) {
        deviceType = 'Tablet'
      }
      
      const current = deviceViews.get(deviceType) || 0
      deviceViews.set(deviceType, current + 1)
    })

    const totalDeviceViews = Array.from(deviceViews.values()).reduce((a, b) => a + b, 0)
    const deviceTypes = Array.from(deviceViews.entries())
      .map(([type, views]) => ({
        type,
        views,
        percentage: totalDeviceViews > 0 ? (views / totalDeviceViews) * 100 : 0
      }))
      .sort((a, b) => b.views - a.views)

    return {
      totalViews: recentViews.length,
      uniqueVisitors,
      totalComments: recentComments.length,
      topPosts,
      topCategories,
      viewsByCountry,
      viewsByDay,
      viewsByHour,
      referrers,
      deviceTypes
    }
  },

  // Get all analytics data
  getAllData: (): AnalyticsData => {
    return analyticsData
  }
}
