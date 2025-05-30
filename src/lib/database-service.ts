import { supabase, Portfolio, Media, PageContent, isSupabaseConfigured } from './supabase'

// Helper function to check configuration
const checkConfiguration = () => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Please add your Supabase URL and key to .env.local file.')
  }
}

// Helper function to check if database is set up
export const checkDatabaseSetup = async () => {
  checkConfiguration()
  
  try {
    // Try to query the portfolio table to see if it exists
    const { data, error } = await supabase
      .from('portfolio')
      .select('id')
      .limit(1)
    
    if (error && error.code === 'PGRST116') {
      throw new Error('Database tables not found. Please run the database.sql script in your Supabase SQL editor.')
    }
    
    if (error) {
      throw new Error(`Database connection error: ${error.message}`)
    }
    
    return { success: true, message: 'Database is properly configured' }
  } catch (error) {
    console.error('Database setup check failed:', error)
    throw error
  }
}

// Portfolio Services - Core CMS functionality
export const portfolioService = {
  // Get all portfolio items with optional filtering by category
  async getAll(category?: 'personal' | 'commercial' | 'events', status?: 'published' | 'draft') {
    checkConfiguration()
    
    let query = supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }
    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Portfolio[]
  },

  // Get portfolio by ID
  async getById(id: string) {
    checkConfiguration()
    
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Portfolio
  },

  // Create new portfolio item
  async create(portfolio: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>) {
    checkConfiguration()
    
    // Ensure proper data formatting
    const portfolioData = {
      title: portfolio.title,
      description: portfolio.description || null,
      category: portfolio.category,
      image_url: portfolio.image_url,
      video_url: portfolio.video_url || null,
      tags: Array.isArray(portfolio.tags) ? portfolio.tags : [],
      date: portfolio.date,
      featured: Boolean(portfolio.featured),
      status: portfolio.status || 'draft'
    }
    
    const { data, error } = await supabase
      .from('portfolio')
      .insert([portfolioData])
      .select()

    if (error) {
      console.error('Create error details:', error)
      throw new Error(`Failed to create portfolio item: ${error.message}`)
    }

    if (!data || data.length === 0) {
      throw new Error('No data returned after creation - check your permissions')
    }

    return data[0] as Portfolio
  },

  // Update portfolio item
  async update(id: string, updates: Partial<Portfolio>) {
    checkConfiguration()
    
    // Clean the updates object to remove any undefined values and ensure proper types
    const cleanUpdates: any = {}
    
    if (updates.title !== undefined) cleanUpdates.title = updates.title
    if (updates.description !== undefined) cleanUpdates.description = updates.description || null
    if (updates.category !== undefined) cleanUpdates.category = updates.category
    if (updates.image_url !== undefined) cleanUpdates.image_url = updates.image_url
    if (updates.video_url !== undefined) cleanUpdates.video_url = updates.video_url || null
    if (updates.tags !== undefined) cleanUpdates.tags = Array.isArray(updates.tags) ? updates.tags : []
    if (updates.date !== undefined) cleanUpdates.date = updates.date
    if (updates.featured !== undefined) cleanUpdates.featured = Boolean(updates.featured)
    if (updates.status !== undefined) cleanUpdates.status = updates.status

    // Always update the updated_at timestamp
    cleanUpdates.updated_at = new Date().toISOString()

    // First check if the record exists
    const { data: existingRecord, error: checkError } = await supabase
      .from('portfolio')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError) {
      console.error('Record check error:', checkError)
      throw new Error(`Portfolio item not found or access denied: ${checkError.message}`)
    }

    if (!existingRecord) {
      throw new Error('Portfolio item not found')
    }

    // Now perform the update
    const { data, error } = await supabase
      .from('portfolio')
      .update(cleanUpdates)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Update error details:', error)
      throw new Error(`Failed to update portfolio item: ${error.message}`)
    }

    if (!data || data.length === 0) {
      throw new Error('No data returned after update - check your permissions')
    }

    return data[0] as Portfolio
  },

  // Delete portfolio item
  async delete(id: string) {
    checkConfiguration()
    
    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get portfolio statistics for dashboard
  async getStats() {
    checkConfiguration()
    
    const { data: all, error: allError } = await supabase
      .from('portfolio')
      .select('category, status')

    if (allError) throw allError

    const stats = {
      personal: all?.filter(item => item.category === 'personal').length || 0,
      commercial: all?.filter(item => item.category === 'commercial').length || 0,
      events: all?.filter(item => item.category === 'events').length || 0,
      published: all?.filter(item => item.status === 'published').length || 0,
      draft: all?.filter(item => item.status === 'draft').length || 0,
      total: all?.length || 0
    }

    return stats
  },

  // Get featured items for homepage
  async getFeatured() {
    checkConfiguration()
    
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('featured', true)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(6)

    if (error) throw error
    return data as Portfolio[]
  }
}

// Media Services - For managing images and videos
export const mediaService = {
  // Get all media files
  async getAll() {
    checkConfiguration()
    
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Media[]
  },

  // Upload file to Supabase Storage
  async upload(file: File, bucket: string = 'media') {
    checkConfiguration()
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${fileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    // Save media record to database
    const mediaRecord = {
      name: file.name,
      url: publicUrl,
      type: file.type.startsWith('image/') ? 'image' as const : 'video' as const,
      size: file.size
    }

    const { data, error } = await supabase
      .from('media')
      .insert([mediaRecord])
      .select()
      .single()

    if (error) throw error
    return data as Media
  },

  // Delete media file
  async delete(id: string) {
    checkConfiguration()
    
    // First get the media record to get the file path
    const { data: media, error: getError } = await supabase
      .from('media')
      .select('url')
      .eq('id', id)
      .single()

    if (getError) throw getError

    // Extract file path from URL and delete from storage
    const filePath = media.url.split('/').pop()
    if (filePath) {
      await supabase.storage
        .from('media')
        .remove([filePath])
    }

    // Delete from database
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Page Content Services - For basic page management
export const pageService = {
  // Get content for a specific page
  async getPageContent(pageName: string) {
    checkConfiguration()
    
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_name', pageName)
      .order('section')

    if (error) throw error
    return data as PageContent[]
  },

  // Update page content section
  async updateContent(pageName: string, section: string, updates: Partial<PageContent>) {
    checkConfiguration()
    
    const { data, error } = await supabase
      .from('page_content')
      .update(updates)
      .eq('page_name', pageName)
      .eq('section', section)
      .select()

    if (error) throw error
    return data
  },

  // Create new page content section
  async createContent(content: Omit<PageContent, 'id' | 'updated_at'>) {
    checkConfiguration()
    
    const { data, error } = await supabase
      .from('page_content')
      .insert([content])
      .select()
      .single()

    if (error) throw error
    return data as PageContent
  }
}

// Analytics Services - Dashboard data
export const analyticsService = {
  async getDashboardData() {
    checkConfiguration()
    
    try {
      // Get portfolio stats
      const portfolioStats = await portfolioService.getStats()
      
      // Get recent portfolio items
      const recentItems = await supabase
        .from('portfolio')
        .select('title, category, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5)

      // Get media count
      const { count: mediaCount } = await supabase
        .from('media')
        .select('*', { count: 'exact', head: true })

      return {
        portfolio: portfolioStats,
        recentItems: recentItems.data || [],
        mediaCount: mediaCount || 0,
        lastUpdated: new Date().toISOString()
      }
    } catch (error) {
      console.error('Analytics service error:', error)
      throw error
    }
  }
} 